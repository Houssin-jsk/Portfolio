import assert from 'node:assert/strict';
import test from 'node:test';
import { hash, canonicalUrl, sitemapUrls, robotsAllows, pageContent, planChanges, eligibleEvent, latestJournal, submitBatch } from '../scripts/indexnow/core.mjs';

const origin = 'https://www.ouahad.space', url = `${origin}/`;
const html = (text = 'Something new', build = 'one') => `<!doctype html><html><head><title>OUAHAD SPACE</title><meta name="description" content="A personal space"><link rel="canonical" href="${origin}"></head><body><!--${build}--><main class="${build}"><h1>${text}</h1><a href="/">Home</a></main><svg><path d="${build}"></path></svg><script>${build}</script></body></html>`;

test('canonical and sitemap eligibility reject other hosts, queries and fragments', () => {
  assert.equal(canonicalUrl('/', origin), url);
  for (const value of ['https://ouahad.space/', 'https://example.com/', '/?q=1', '/#fragment']) assert.throws(() => canonicalUrl(value, origin));
  assert.deepEqual(sitemapUrls(`<urlset><url><loc>${url}</loc></url><url><loc>${url}</loc></url></urlset>`, origin), [url]);
  assert.throws(() => sitemapUrls('<!DOCTYPE x><urlset></urlset>', origin));
});

test('robots supports exclusion, specific bots, longest allow, wildcard and end anchor', () => {
  assert.equal(robotsAllows('User-agent: *\nAllow: /\nDisallow: /design-preview', url), true);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /design-preview', `${origin}/design-preview/about`), false);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /\nAllow: /projects/', `${origin}/projects/example`), true);
  assert.equal(robotsAllows('User-agent: Bingbot\nDisallow: /\nUser-agent: *\nAllow: /', url), false);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /private/*$', `${origin}/private/test`), false);
});

test('fingerprints ignore builds, CSS, decorative SVG and whitespace but retain real content', () => {
  assert.equal(hash(JSON.stringify(pageContent(html(), url))), hash(JSON.stringify(pageContent(html('Something new', 'two'), url))));
  assert.notEqual(hash(JSON.stringify(pageContent(html(), url))), hash(JSON.stringify(pageContent(html('New public project'), url))));
  assert.equal(pageContent(html().replace('</head>', '<meta content="noindex, follow" name="robots"></head>'), url), null);
  assert.equal(pageContent(html(), url, new Headers({ 'x-robots-tag': 'noindex' })), null);
  assert.equal(pageContent(html().replace(origin, 'https://example.com'), url), null);
});

test('first run baselines without submitting; updates/new pages notify once', () => {
  const first = planChanges(null, [{ url, fingerprint: hash('old') }], 1, 'run-1');
  assert.equal(first.queue.length, 0);
  const same = planChanges(first.next, [{ url, fingerprint: hash('old') }], 2, 'run-2');
  assert.equal(same.queue.length, 0);
  const update = planChanges(same.next, [{ url, fingerprint: hash('new') }, { url: `${origin}/project`, fingerprint: hash('project') }], 3, 'run-3');
  assert.equal(update.queue.length, 2);
  assert.equal(update.next.pages[url].status, 'pending');
  assert.equal(planChanges(update.next, [{ url, fingerprint: hash('new') }], 3, 'retry-event').queue.length, 0);
  assert.equal(planChanges(update.next, [], 4, 'removed').queue.length, 0);
});

test('only latest successful Vercel Production events qualify, regardless of the observed false production flag', () => {
  const sha = 'a'.repeat(40), config = { repository: 'owner/repo', productionEnvironment: 'Production', deploymentActor: 'vercel[bot]' };
  const event = { repository: { full_name: config.repository }, deployment: { id: 1, sha, environment: 'Production', production_environment: false, creator: { login: 'vercel[bot]' } }, deployment_status: { state: 'success', creator: { login: 'vercel[bot]' } } };
  assert.equal(eligibleEvent(event, config, sha, { id: 1 }), true);
  assert.equal(eligibleEvent(event, config, 'b'.repeat(40), { id: 1 }), false);
  assert.equal(eligibleEvent(event, config, sha, { id: 2 }), false);
  for (const [field, value] of [['state', 'failure'], ['state', 'pending']]) assert.equal(eligibleEvent({ ...event, deployment_status: { ...event.deployment_status, [field]: value } }, config, sha, { id: 1 }), false);
  assert.equal(eligibleEvent({ ...event, deployment: { ...event.deployment, environment: 'Preview' } }, config, sha, { id: 1 }), false);
});

test('official POST handles 200/202, rejects errors and never includes provider bodies in errors', async () => {
  const config = { origin, endpoint: 'https://api.indexnow.org/indexnow' };
  const fixtureKey = 'test-only-verification'; // Not the repository verification key.
  let calls = 0;
  const fetcher = async (endpoint, options) => {
    calls++; assert.equal(endpoint, config.endpoint); assert.equal(options.method, 'POST');
    const payload = JSON.parse(options.body); assert.equal(payload.key, fixtureKey); assert.deepEqual(payload.urlList, [url]);
    return new Response('', { status: 202 });
  };
  assert.equal(await submitBatch({ key: fixtureKey, keyLocation: `${origin}/fixture.txt`, urls: [url], config, fetcher }), 202);
  assert.equal(calls, 1);
  assert.equal(await submitBatch({ key: fixtureKey, keyLocation: `${origin}/fixture.txt`, urls: [url], config, fetcher: async () => new Response('', { status: 200 }) }), 200);
  assert.equal(await submitBatch({ urls: [], config, fetcher }), null);
  assert.equal(calls, 1);
  for (const status of [400, 403, 422, 429, 500]) {
    await assert.rejects(submitBatch({ key: fixtureKey, keyLocation: `${origin}/fixture.txt`, urls: [url], config, fetcher: async () => new Response(fixtureKey, { status }) }), error => error.message.includes(`HTTP ${status}`) && !error.message.includes(fixtureKey));
  }
  await assert.rejects(submitBatch({ key: fixtureKey, keyLocation: `${origin}/fixture.txt`, urls: [url], config, fetcher: async () => { throw new Error(fixtureKey); } }), error => !error.message.includes(fixtureKey) && /uncertain/.test(error.message));
  await assert.rejects(submitBatch({ key: fixtureKey, keyLocation: `${origin}/fixture.txt`, urls: ['https://example.com/'], config, fetcher }));
  assert.equal(calls, 1);
});

test('journal restoration prefers final receipts, creation times, and latest run attempts rather than artifact IDs', () => {
  const record = (id, name, time, runId = 1) => ({ id, name, created_at: `2026-10-11T18:28:${time}Z`, runId, expired: false });
  const pending = record(900, 'indexnow-state-pending', '54');
  const final = record(100, 'indexnow-state-final', '55');
  assert.equal(latestJournal([pending, final]).id, 100);
  assert.equal(latestJournal([final, pending]).id, 100);
  const rerun = record(50, 'indexnow-state-pending-2', '56');
  assert.equal(latestJournal([pending, final, rerun]).id, 50);
  const rerunFinal = record(40, 'indexnow-state-final-2', '57');
  assert.equal(latestJournal([rerunFinal, pending, final, rerun]).id, 40);
  const newRun = record(30, 'indexnow-state-final-1', '58', 2);
  assert.equal(latestJournal([newRun, rerunFinal, final]).id, 30);
  assert.equal(latestJournal([{ ...newRun, expired: true }, final]).id, 100);
});
