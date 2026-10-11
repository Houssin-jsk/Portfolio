import { readFile, readdir, mkdir, writeFile, rename, open, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { indexNowConfig as config } from '../../config/indexnow.mjs';
import { canonicalUrl, sitemapUrls, robotsAllows, pageContent, hash, planChanges, eligibleEvent, submitBatch } from './core.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const directory = resolve(root, '.indexnow');
const statePath = resolve(directory, 'state.json'), queuePath = resolve(directory, 'queue.json');
const args = new Set(process.argv.slice(2));
if ([...args].some(arg => !['--plan', '--submit', '--manual', '--dry-run'].includes(arg))) throw new Error('Unsupported IndexNow option.');
const log = message => console.log(message); // Counts/status only; never keys, key locations, bodies, or raw network errors.

async function get(url, limit = 2000000) {
  let response;
  try { response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) }); }
  catch { throw new Error('Public resource fetch failed; nothing submitted.'); }
  if (response.status !== 200) throw new Error(`Public resource HTTP ${response.status}; nothing submitted.`);
  if (Number(response.headers.get('content-length')) > limit) throw new Error('Public resource exceeds size limit.');
  const chunks = []; let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length; if (size > limit) throw new Error('Public resource exceeds size limit.'); chunks.push(chunk);
  }
  return { response, bytes: Buffer.concat(chunks) };
}
async function api(path) {
  let response;
  try {
    response = await fetch(`https://api.github.com/repos/${config.repository}/${path}`, {
      headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
      redirect: 'error', signal: AbortSignal.timeout(15000),
    });
  } catch { throw new Error('Production deployment verification failed.'); }
  if (!response.ok) throw new Error(`GitHub deployment verification HTTP ${response.status}.`);
  return response.json();
}
async function deploymentProof() {
  const head = await api(`commits/${config.branch}`);
  const deployments = await api(`deployments?environment=${config.productionEnvironment}&per_page=20`);
  const latest = deployments.find(item => item.environment === config.productionEnvironment && item.creator?.login === config.deploymentActor);
  if (!latest || latest.sha !== head.sha) throw new Error('Latest production deployment does not match the latest main commit.');
  const statuses = await api(`deployments/${latest.id}/statuses?per_page=1`);
  const status = statuses[0];
  if (status?.state !== 'success' || status.creator?.login !== config.deploymentActor) throw new Error('Latest production deployment is not successful.');
  const host = new URL(status.environment_url).hostname;
  if (!(host.startsWith(config.deploymentHostPrefix) && host.endsWith(config.deploymentHostSuffix))) throw new Error('Deployment belongs to a different Vercel project.');
  let event = { repository: { full_name: config.repository }, deployment: latest, deployment_status: status };
  if (process.env.GITHUB_EVENT_NAME === 'deployment_status') event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  if (!eligibleEvent(event, config, head.sha, latest)) throw new Error('Not the latest successful production event.');
  if (process.env.GITHUB_ACTIONS === 'true') {
    const checkedOut = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
    if (checkedOut !== head.sha) throw new Error('Workflow checkout does not match the deployed commit.');
  }
  return { id: latest.id, sha: latest.sha };
}
async function verificationKey() {
  const candidates = (await readdir(resolve(root, 'public'))).filter(name => /^[a-z0-9-]{8,128}\.txt$/i.test(name));
  const valid = [];
  for (const name of candidates) {
    const value = (await readFile(resolve(root, 'public', name), 'utf8')).trim();
    if (/^[a-z0-9-]{8,128}$/i.test(value) && name === `${value}.txt`) valid.push({ value, name });
  }
  if (valid.length !== 1) throw new Error('Exactly one valid existing IndexNow verification file is required.');
  const keyLocation = `${config.origin}/${valid[0].name}`;
  const remote = await get(keyLocation, 1024);
  if (remote.bytes.toString('utf8').trim() !== valid[0].value) throw new Error('Deployed verification file does not match the existing key.');
  return { key: valid[0].value, keyLocation };
}
async function publicPages() {
  const sitemap = await get(`${config.origin}/sitemap.xml`);
  if (!/xml/i.test(sitemap.response.headers.get('content-type') || '')) throw new Error('Sitemap is not XML.');
  const robots = (await get(`${config.origin}/robots.txt`, 100000)).bytes.toString('utf8');
  const urls = sitemapUrls(sitemap.bytes.toString('utf8'), config.origin);
  const pages = [];
  for (const url of urls) {
    if (!robotsAllows(robots, url)) continue;
    const fetched = await get(url);
    if (!/text\/html/i.test(fetched.response.headers.get('content-type') || '')) continue;
    const content = pageContent(fetched.bytes.toString('utf8'), url, fetched.response.headers);
    if (!content) continue;
    // Include same-host local image bytes so replacement under the same filename counts.
    const assets = [];
    for (const src of [...new Set(content.images.map(image => image.src))]) {
      const image = new URL(src);
      if (image.origin === config.origin && image.pathname.startsWith('/images/')) {
        if (assets.length >= 10) throw new Error('Page exceeds the supported image limit.');
        assets.push([src, hash((await get(src, 6000000)).bytes)]);
      }
    }
    pages.push({ url, fingerprint: hash(JSON.stringify({ ...content, assets })) });
  }
  return pages;
}
async function loadState() {
  try {
    const state = JSON.parse(await readFile(statePath, 'utf8'));
    if (state.origin !== config.origin || state.schema !== 1 || !state.pages) throw new Error('Invalid state.');
    for (const [url, entry] of Object.entries(state.pages)) {
      canonicalUrl(url, config.origin);
      if (!/^[a-f0-9]{64}$/.test(entry.fingerprint)) throw new Error('Invalid fingerprint.');
    }
    return state;
  } catch (error) { if (error.code === 'ENOENT') return null; throw new Error('Invalid IndexNow journal; nothing submitted.'); }
}
async function save(path, value) {
  const temporary = `${path}.tmp`; await writeFile(temporary, JSON.stringify(value, null, 2), { mode: 0o600 }); await rename(temporary, path);
}
async function plan() {
  const proof = await deploymentProof();
  await verificationKey();
  const pages = await publicPages(), state = await loadState();
  const attemptId = process.env.GITHUB_RUN_ID || randomUUID();
  const { next, queue, baseline } = planChanges(state, pages, proof.id, attemptId);
  next.origin = config.origin;
  log(`IndexNow: ${pages.length} eligible page(s), ${queue.length} changed page(s); ${baseline ? 'initial baseline, no notification' : 'journal compared'}.`);
  if (args.has('--dry-run')) { log('Dry run: no POST and no state changes.'); return; }
  await save(statePath, next);
  await save(queuePath, { origin: config.origin, proof, attemptId, urls: queue });
}
async function submit() {
  const queue = JSON.parse(await readFile(queuePath, 'utf8'));
  if (queue.origin !== config.origin || !Array.isArray(queue.urls)) throw new Error('Invalid notification plan.');
  if (!queue.urls.length) { log('IndexNow: nothing changed; no POST.'); return; }
  const proof = await deploymentProof();
  if (proof.id !== queue.proof.id || proof.sha !== queue.proof.sha) throw new Error('Deployment changed after planning; nothing submitted.');
  const state = await loadState();
  const live = new Map((await publicPages()).map(page => [page.url, page.fingerprint]));
  const urls = queue.urls.map(item => {
    const url = canonicalUrl(item.url, config.origin), record = state?.pages[url];
    if (record?.status !== 'pending' || record.attemptId !== queue.attemptId || record.fingerprint !== item.fingerprint || live.get(url) !== item.fingerprint) throw new Error('Plan no longer matches the deployed content or journal.');
    return url;
  });
  const status = await submitBatch({ ...(await verificationKey()), urls, config });
  for (const url of urls) state.pages[url] = { ...state.pages[url], status: 'accepted', httpStatus: status };
  await save(statePath, state);
  // Consume the plan so repeating the submit phase cannot POST again.
  await save(queuePath, { ...queue, urls: [] });
  log(`IndexNow: ${urls.length} URL(s) accepted with HTTP ${status}${status === 202 ? ' (provider verification pending)' : ''}.`);
}
await mkdir(directory, { recursive: true });
let lock;
try {
  lock = await open(resolve(directory, 'lock'), 'wx');
  if (args.has('--manual')) {
    if (process.env.GITHUB_ACTIONS === 'true') throw new Error('Use the staged CI phases instead.');
    await plan(); if (!args.has('--dry-run')) await submit();
  } else if (args.has('--plan')) await plan();
  else if (args.has('--submit')) await submit();
  else throw new Error('Choose --plan, --submit, or --manual.');
} catch (error) {
  // Never leak URLs or key material from exceptions thrown by fetch/URL/file APIs.
  const safe = /^(IndexNow|Public resource|GitHub deployment|Latest production|Production deployment|Not the latest|Deployment belongs|Workflow checkout|Exactly one|Deployed verification|Invalid |Deployment changed|Plan no longer|Non-canonical|Unsupported sitemap|Sitemap |Page exceeds|Choose |Use the staged)/.test(error.message);
  console.error(safe ? error.message : 'IndexNow execution failed safely; no automatic retry.'); process.exitCode = 1;
} finally {
  if (lock) { await lock.close(); await unlink(resolve(directory, 'lock')); }
}
