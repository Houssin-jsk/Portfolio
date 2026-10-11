# OUAHAD SPACE SEO foundation

## Scope and source of truth

`config/seo.ts` owns the verified name, brand, canonical origin, GitHub URL,
focus areas, current language, and Coming Soon metadata. Existing site/profile
content reads those identity values without changing visible content. The
homepage title and description remain accurate for the temporary stage; shared
social metadata names OUAHAD SPACE. No keyword meta tag is emitted.

`lib/seo.ts` creates per-page metadata and the homepage JSON-LD graph. The Person
and WebSite have stable `https://www.ouahad.space/#person` and `/#website` IDs;
the WebSite refers to the Person as author/about, and the Person links back to
the WebSite. No job title, education, employer, award, portrait, or unverified
social profile is asserted. English is the only currently advertised language.

The homepage owns one ordinary server-rendered JSON-LD script. It is not in the
shared layout, so errors, API routes, and previews do not inherit it. Serialization
escapes HTML-sensitive characters, including `<`, and preserves the JSON value.
References: [Next.js JSON-LD](https://nextjs.org/docs/app/guides/json-ld),
[Person](https://schema.org/Person), [WebSite](https://schema.org/WebSite).

## Published routes and previews

Only the canonical homepage appears in the sitemap. The build-time `lastmod`
timestamp was removed; add a real editorial modification date only when known.
Existing change frequency/priority values remain hints, not indexing promises.
Robots permits `/`, excludes API and experimental paths, and advertises the
canonical sitemap. The homepage has no noindex directive.

The portrait refinement request explicitly makes `/design-preview` and its About
page publicly accessible experiments. Their development-only guards have been
removed; they keep noindex metadata, remain disallowed in robots, and stay outside
the homepage-only sitemap. This is public preview access, not privacy protection.
Any future private content needs authentication rather than robots/noindex rules.
See `DOCS/portrait-preview.md` for the route fix and release verification.

## Future pages and English/French content

Use `createPageMetadata({ title, description, path, language })` on each real,
published project or content page. It derives the canonical and Open Graph URLs
from the same www origin and rejects external/query/fragment paths.
`language` accepts `en` or `fr`, but does not advertise translations automatically.
When actual localized pages exist, implement the locale route/layout and matching
HTML `lang`, add only existing reciprocal hreflang alternatives, and register
their published URLs in the sitemap. Do not add guessed `/fr` or project URLs.
Keep page-specific schema in its owning page and refer to the stable identity IDs.

## Verification

Use Node 22.6+ for native TypeScript stripping (validated on Node 24):

```powershell
npm run lint
npm exec tsc -- --noEmit
npm run test:seo
npm run build
npm run start -- --port 3100
# In another terminal, against that production server:
npm run test:seo:integration
npm run audit:seo
```

Stop any development/production preview before building because they share
`.next`. Integration tests default to `http://localhost:3100`; set
`SEO_TEST_BASE_URL` to another production test server when required. They check
raw HTTP responses rather than relying on browser hydration: canonical metadata,
single linked graph, indexability, sitemap URLs, robots, public experimental-page
200 responses with noindex, and unknown-page 404s. Unknown HTML/RSC responses are
checked for content leakage.
Unit tests cover script-breaking strings and multilingual JSON round trips.
The public audit script follows a maximum of five redirects per URL without
changing settings. No Search Console submission is performed.

## Historical SEO audit — 2026-10-11, before portrait refinement

Local validation passed: lint, TypeScript, production build, two serialization
tests, and six HTTP integration tests. Local and public sitemaps parsed as XML
with .NET's XML parser. Initial tests exposed preview content in RSC payloads;
the page-level guards corrected that failure. Root canonical assertions normalize
the equivalent bare-host and trailing-slash URL forms emitted by Next.js.
Mobile browser regression check: Coming Soon text/layout preserved at 390 px,
no horizontal overflow, JSON-LD script has `display: none`, and console is clean.
The Coming Soon stylesheet is unchanged.
Known non-fatal notices: `next lint` deprecation and Node's ESM detection warning
when importing TypeScript in the tests. No package-wide module mode was changed.

- HTTPS apex redirects 308 to HTTPS www, then 200. HTTP www redirects 308 to
  HTTPS www. HTTP apex follows two 308 hops to the same final host. No loop seen.
- Public homepage: 200, Coming Soon, correct www canonical, no noindex/header
  block, and no JSON-LD yet. The new implementation still requires deployment.
- Public robots: 200 text/plain; public sitemap: 200 application/xml with the
  canonical homepage. The current deployed sitemap still has a build timestamp.
- Public `/design-preview`: 200 with noindex. The production guard will return
  404 after these changes are deployed; it is not active on the current live site.
- Vercel domain inspection failed with 403 through both connector and CLI. Public
  HTTP behavior is verified, but dashboard settings/ownership are not. No DNS,
  Vercel settings, redirect rules, credentials, or environment files were changed.

## Search Console remains unresolved

A successful HTTP request does not prove Google fetched the sitemap. The reported
"Couldn't fetch" state remains unresolved. After the approved SEO deployment,
manually confirm the exact submitted URL is
`https://www.ouahad.space/sitemap.xml`, check the matching Domain or HTTPS www
property, inspect the sitemap's latest read/error details, and use URL Inspection
on the canonical homepage to review Google's selected canonical and live fetch.
If the error persists, inspect Vercel/WAF/request logs for Google fetch failures,
challenge pages, intermittent errors, or routing differences. No security
protections should be disabled based solely on a 200 response from this audit.
Recheck the sitemap report or resubmit the same URL only if appropriate; no forced
submission is included here. Neither these changes nor a valid sitemap guarantee
indexing or search position.

## Files changed for this task

`app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`,
`app/design-preview/layout.tsx`, `app/design-preview/page.tsx`,
`app/design-preview/about/page.tsx`, `lib/preview-access.ts`,
`config/site.ts`, `content/profile.ts`,
`package.json`, `config/seo.ts`, `lib/seo.ts`, `lib/serialize-json-ld.ts`,
`tests/seo.test.mjs`, `tests/seo-integration.test.mjs`,
`scripts/audit-public-seo.mjs`, and this document.
