// Read-only, bounded inspection of the current public deployment.
const targets = [
  'http://ouahad.space/', 'https://ouahad.space/', 'http://www.ouahad.space/',
  'https://www.ouahad.space/', 'https://www.ouahad.space/robots.txt',
  'https://www.ouahad.space/sitemap.xml', 'https://www.ouahad.space/design-preview',
];
await Promise.all(targets.map(async start => {
  let url = start;
  const chain = [];
  try {
    for (let i = 0; i < 5; i++) {
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
      const location = response.headers.get('location');
      chain.push({ url, status: response.status, location, contentType: response.headers.get('content-type'), xRobotsTag: response.headers.get('x-robots-tag') });
      if (response.status >= 300 && response.status < 400 && location) {
        url = new URL(location, url).href;
        continue;
      }
      const body = await response.text();
      if (/\/(robots\.txt|sitemap\.xml)$/.test(start)) chain.push({ body });
      else chain.push({
        title: body.match(/<title>(.*?)<\/title>/s)?.[1],
        canonical: body.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0],
        robots: body.match(/<meta[^>]*name="robots"[^>]*>/)?.[0],
        comingSoon: body.includes('Something new'),
        jsonLdScripts: [...body.matchAll(/<script[^>]*type="application\/ld\+json"/g)].length,
      });
      break;
    }
    console.log(JSON.stringify({ start, chain }));
  } catch (error) {
    console.log(JSON.stringify({ start, chain, error: error.message }));
    process.exitCode = 1;
  }
}));
