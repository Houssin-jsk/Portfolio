import { createHash } from 'node:crypto';

export const hash = value => createHash('sha256').update(value).digest('hex');
export function canonicalUrl(value, origin) {
  const url = new URL(value, origin);
  if (url.origin !== origin || url.username || url.password || url.search || url.hash) throw new Error('Non-canonical URL rejected.');
  return url.href;
}
const decode = value => value.replace(/&(?:amp|lt|gt|quot|apos|nbsp);|&#(?:x[\da-f]+|\d+);/gi, entity => {
  const named = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ' };
  if (named[entity.toLowerCase()] !== undefined) return named[entity.toLowerCase()];
  const number = entity.slice(2, -1);
  const code = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number);
  return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ' ';
});
export function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(match => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4])]));
}
export function sitemapUrls(xml, origin) {
  if (/<!DOCTYPE|<!ENTITY|<!\[CDATA\[/i.test(xml) || !/<urlset\b/.test(xml) || !/<\/urlset>\s*$/.test(xml)) throw new Error('Unsupported sitemap format.');
  const urls = [...new Set([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => canonicalUrl(decode(match[1].trim()), origin)))];
  if (urls.length > 10000) throw new Error('Sitemap exceeds the supported URL limit.');
  return urls;
}
export function robotsAllows(text, url) {
  const path = new URL(url).pathname;
  const groups = []; let agents = [], rules = [], started = false;
  const save = () => { if (agents.length) groups.push({ agents, rules }); agents = []; rules = []; started = false; };
  for (const line of text.split(/\r?\n/)) {
    const match = line.split('#')[0].trim().match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const name = match[1].trim().toLowerCase(), value = match[2].trim();
    if (name === 'user-agent') { if (started) save(); agents.push(value.toLowerCase()); }
    else if (name === 'allow' || name === 'disallow') { started = true; if (value) rules.push({ allow: name === 'allow', value }); }
  }
  save();
  return ['bingbot', 'yandexbot', 'indexnow', 'googlebot'].every(agent => {
    const specific = groups.filter(group => group.agents.some(item => item !== '*' && agent.includes(item)));
    const selected = specific.length ? specific : groups.filter(group => group.agents.includes('*'));
    const matches = selected.flatMap(group => group.rules).filter(rule => {
      const pattern = rule.value.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$');
      return new RegExp(`^${pattern}`).test(path);
    }).sort((a, b) => b.value.replace(/\*/g, '').length - a.value.replace(/\*/g, '').length || Number(b.allow) - Number(a.allow));
    return !matches.length || matches[0].allow;
  });
}
export function pageContent(html, url, headers = new Headers()) {
  if (/\b(noindex|none)\b/i.test(headers.get('x-robots-tag') || '')) return null;
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!head || !body) return null;
  const meta = [...head.matchAll(/<meta\b[^>]*>/gi)].map(match => attributes(match[0]));
  if (meta.some(item => /^(robots|bingbot|googlebot|yandexbot)$/i.test(item.name || '') && /\b(noindex|none)\b/i.test(item.content || ''))) return null;
  const canonicals = [...head.matchAll(/<link\b[^>]*>/gi)].map(match => attributes(match[0])).filter(item => item.rel?.toLowerCase() === 'canonical');
  if (canonicals.length !== 1 || !canonicals[0].href) return null;
  try { if (canonicalUrl(canonicals[0].href, new URL(url).origin) !== url) return null; } catch { return null; }
  // Ignore Next build IDs, RSC payloads, scripts, styling, decorative SVGs and whitespace.
  const clean = body.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const text = decode(clean.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  if (!text) return null;
  const links = [...clean.matchAll(/<a\b[^>]*>/gi)].map(match => attributes(match[0]).href).filter(Boolean).map(href => new URL(href, url).href);
  const images = [...clean.matchAll(/<img\b[^>]*>/gi)].map(match => {
    const attr = attributes(match[0]); const source = new URL(attr.src || '', url);
    const src = source.pathname === '/_next/image' ? source.searchParams.get('url') : source.href;
    return { alt: attr.alt || '', src: new URL(src || '', url).href };
  });
  const title = decode(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  const metadata = meta.filter(item => ['description', 'og:title', 'og:description'].includes(item.name || item.property)).map(item => [item.name || item.property, item.content || '']);
  return { text, links, images, title, metadata };
}
export function planChanges(state, pages, deploymentId, attemptId) {
  if (state && (state.schema !== 1 || !state.initialized || !state.pages)) throw new Error('Invalid notification state.');
  const next = structuredClone(state || { schema: 1, initialized: true, pages: {} });
  const queue = [];
  for (const { url, fingerprint } of pages) {
    if (!state) { next.pages[url] = { fingerprint, status: 'baseline', deploymentId }; continue; }
    if (next.pages[url]?.fingerprint === fingerprint) continue;
    next.pages[url] = { fingerprint, status: 'pending', deploymentId, attemptId };
    queue.push({ url, fingerprint });
  }
  return { next, queue, baseline: !state };
}
export function eligibleEvent(event, config, headSha, latestDeployment) {
  return event.repository?.full_name === config.repository &&
    event.deployment_status?.state === 'success' && event.deployment?.environment === config.productionEnvironment &&
    event.deployment?.creator?.login === config.deploymentActor && event.deployment_status?.creator?.login === config.deploymentActor &&
    /^[a-f0-9]{40}$/.test(event.deployment?.sha || '') && event.deployment.sha === headSha &&
    event.deployment.id === latestDeployment.id;
}
export async function submitBatch({ key, keyLocation, urls, config, fetcher = fetch }) {
  if (!urls.length) return null;
  if (config.endpoint !== 'https://api.indexnow.org/indexnow' || urls.length > 10000 ||
      !/^[a-z0-9-]{8,128}$/i.test(key || '') || new URL(keyLocation).origin !== config.origin ||
      new Set(urls).size !== urls.length || urls.some(url => canonicalUrl(url, config.origin) !== url)) {
    throw new Error('IndexNow submission validation failed.');
  }
  let response;
  try {
    response = await fetcher(config.endpoint, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(config.origin).host, key, keyLocation, urlList: urls }),
    });
  } catch { throw new Error('IndexNow request outcome is uncertain; pending state retained. Review before retrying.'); }
  // Never print the response body: providers can echo the verification key.
  if (response.status === 200 || response.status === 202) return response.status;
  const reason = { 400: 'invalid request', 403: 'verification rejected', 422: 'host or URL rejected', 429: 'rate limited' }[response.status] || 'provider error';
  throw new Error(`IndexNow HTTP ${response.status}: ${reason}; pending state retained, no automatic retry.`);
}
