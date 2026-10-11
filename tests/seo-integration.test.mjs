import assert from 'node:assert/strict';
import test from 'node:test';
import { seoConfig } from '../config/seo.ts';

const base = process.env.SEO_TEST_BASE_URL || 'http://localhost:3100';
const canonical = `${seoConfig.origin}/`;
async function request(path, headers) {
  const response = await fetch(new URL(path, base), { headers, redirect: 'manual', signal: AbortSignal.timeout(10000) });
  return { response, body: await response.text() };
}

test('homepage is indexable and serves consistent metadata without changing Coming Soon', async () => {
  const { response, body } = await request('/');
  assert.equal(response.status, 200);
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i);
  assert.match(body, /<html[^>]*lang="en"/);
  assert.ok(body.includes(`<title>${seoConfig.comingSoon.title}</title>`));
  assert.ok(body.includes(`name="description" content="${seoConfig.comingSoon.description}"`));
  const links = [...body.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
  assert.equal(links.length, 1);
  assert.equal(new URL(links[0][1]).href, canonical);
  const ogUrl = body.match(/property="og:url" content="([^"]+)"/)?.[1];
  assert.equal(new URL(ogUrl).href, canonical);
  assert.ok(body.includes(`property="og:site_name" content="${seoConfig.brand}"`));
  assert.doesNotMatch(body, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i);
  assert.doesNotMatch(body, /<meta[^>]*name="keywords"/);
  assert.doesNotMatch(body, /hrefLang=/i);
  assert.match(body, /Something new<br\s*\/>is taking/);
  assert.match(body, /New portfolio in progress/);
});

test('one server-rendered JSON-LD graph connects verified Person and WebSite', async () => {
  const { body } = await request('/');
  const scripts = [...body.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const graph = JSON.parse(scripts[0][1]);
  assert.equal(graph['@context'], 'https://schema.org');
  assert.equal(graph['@graph'].length, 2);
  const person = graph['@graph'].find(node => node['@type'] === 'Person');
  const website = graph['@graph'].find(node => node['@type'] === 'WebSite');
  assert.equal(person['@id'], `${canonical}#person`);
  assert.equal(website['@id'], `${canonical}#website`);
  assert.equal(person.url, canonical);
  assert.equal(website.url, canonical);
  assert.equal(person.name, seoConfig.name);
  assert.equal(website.name, seoConfig.brand);
  assert.deepEqual(person.sameAs, [seoConfig.social.github]);
  assert.deepEqual(person.knowsAbout, [...seoConfig.focus]);
  assert.equal(website.author['@id'], person['@id']);
  assert.equal(website.about['@id'], person['@id']);
  assert.equal(person.mainEntityOfPage['@id'], website['@id']);
  assert.equal(website.inLanguage, 'en');
  for (const field of ['jobTitle', 'alumniOf', 'worksFor', 'award', 'image']) assert.equal(person[field], undefined);
});

test('robots and sitemap advertise only the canonical published homepage', async () => {
  const { response, body } = await request('/sitemap.xml');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /xml/);
  assert.match(body, /^<\?xml[^>]*\?>\s*<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  const urls = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, [canonical]);
  assert.doesNotMatch(body, /<lastmod>|design-preview|hreflang/);
  assert.match(body.trim(), /<\/urlset>$/);
  const robots = await request('/robots.txt');
  assert.equal(robots.response.status, 200);
  assert.ok(robots.body.includes('Allow: /'));
  assert.ok(robots.body.includes('Disallow: /api/'));
  assert.ok(robots.body.includes('Disallow: /design-preview'));
  assert.ok(robots.body.includes(`Sitemap: ${seoConfig.origin}/sitemap.xml`));
  assert.doesNotMatch(robots.body, /Disallow: \/\s*(?:\r?\n|$)/);
});

for (const path of ['/design-preview', '/design-preview/about', '/not-a-published-page']) {
  test(`production does not expose content or homepage JSON-LD at ${path}`, async () => {
    const { response, body } = await request(path);
    assert.equal(response.status, 404);
    assert.match(body, /noindex/);
    assert.equal(/type="application\/ld\+json"|Room to think|Applied AI Project|Four years studying/.test(body), false, 'Production response leaked preview content or homepage JSON-LD');
    const rsc = await request(path, { RSC: '1' });
    assert.equal(rsc.response.status, 404);
    assert.equal(/Room to think|Applied AI Project|Four years studying/.test(rsc.body), false, 'RSC response leaked unpublished content');
  });
}
