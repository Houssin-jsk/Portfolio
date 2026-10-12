import assert from 'node:assert/strict';
import test from 'node:test';
import { seoConfig } from '../config/seo.ts';
import { brandConfig } from '../config/brand.ts';

const base = process.env.SEO_TEST_BASE_URL || 'http://localhost:3100';
const canonical = `${seoConfig.origin}/`;
async function request(path, headers) {
  const response = await fetch(new URL(path, base), { headers, redirect: 'manual', signal: AbortSignal.timeout(10000) });
  return { response, body: await response.text() };
}

test('Public homepage is indexable, has correct metadata, and exposes only Hero and About', async () => {
  const { response, body } = await request('/');
  assert.equal(response.status, 200);
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i);
  assert.match(body, /<html[^>]*lang="en"/);
  assert.ok(body.includes(`<title>${seoConfig.site.title}</title>`));
  assert.ok(body.includes(`name="description" content="${seoConfig.site.description}"`));
  const links = [...body.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
  assert.equal(links.length, 1);
  assert.equal(new URL(links[0][1]).href, canonical);
  const ogUrl = body.match(/property="og:url" content="([^"]+)"/)?.[1];
  assert.equal(new URL(ogUrl).href, canonical);
  assert.ok(body.includes(`property="og:site_name" content="${seoConfig.brand}"`));
  assert.doesNotMatch(body, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i);
  assert.doesNotMatch(body, /<meta[^>]*name="keywords"/);
  assert.doesNotMatch(body, /hrefLang=/i);
  assert.match(body, /A curious mind/);
  assert.match(body, /two years studying Computer Maintenance and Networks during high school, followed by a two-year Specialized Technician program in Artificial Intelligence, with a Data Analyst specialization/);
  assert.doesNotMatch(body, /Four years studying computer maintenance/);
  assert.equal([...body.matchAll(/<img[^>]*alt="El Houssaine Ouahad"/g)].length, 1);
  assert.match(body, /icons%2Flogo_black\.png/);
  assert.match(body, /icons%2Flogo_%2523077F64\.png/);
  assert.match(body, /images%2Fprofile\.png/);
  assert.equal([...body.matchAll(/<section\b/g)].length, 2);
  assert.doesNotMatch(body, /New portfolio in progress|Something new|id="(?:creations|discover|explorations|thoughts|contact)"|Applied AI Project|The next idea starts here/);
  const ids = new Set([...body.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of body.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const target = new URL(match[1], base);
    if (target.origin === new URL(base).origin) {
      assert.equal(target.pathname, '/');
      if (target.hash) assert.ok(ids.has(target.hash.slice(1)), `Broken homepage anchor: ${target.hash}`);
    }
  }
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
  assert.equal(website.description, seoConfig.site.description);
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

for (const [path, destination] of [['/design-preview', '/'], ['/design-preview/about', '/#about']]) {
  test(`retired preview permanently redirects to its homepage replacement: ${path}`, async () => {
    const { response, body } = await request(path);
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), base).href, new URL(destination, base).href);
    assert.doesNotMatch(body, /Curious mind|type="application\/ld\+json"/);
  });
}

for (const path of ['/not-a-published-page']) {
  test(`production does not expose content or homepage JSON-LD at ${path}`, async () => {
    const { response, body } = await request(path);
    assert.equal(response.status, 404);
    assert.match(body, /noindex/);
    assert.equal(/type="application\/ld\+json"|Room to think|Applied AI Project|two-year Specialized Technician program/.test(body), false, 'Production response leaked preview content or homepage JSON-LD');
    const rsc = await request(path, { RSC: '1' });
    assert.equal(rsc.response.status, 404);
    assert.equal(/Room to think|Applied AI Project|two-year Specialized Technician program/.test(rsc.body), false, 'RSC response leaked unpublished content');
  });
}

test('official favicon and Apple touch icon share one accessible PNG source', async () => {
  const { body } = await request('/');
  for (const relation of ['icon', 'apple-touch-icon']) {
    const links = [...body.matchAll(new RegExp(`<link[^>]*rel="${relation}"[^>]*href="([^"]+)"`, 'g'))];
    assert.equal(links.length, 1);
    assert.equal(links[0][1], brandConfig.appIcon);
  }
  assert.doesNotMatch(body, /href="\/icon\.svg/);
  const response = await fetch(new URL(brandConfig.appIcon, base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /image\/png/);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});
