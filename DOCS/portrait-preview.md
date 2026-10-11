# Portrait-led OUAHAD SPACE refinement

## Asset and composition

The hero uses the existing `public/images/profile.png` through `siteConfig`.
It is a 2086 × 2989 RGBA PNG with alpha values spanning 0–255: an existing
transparent cutout. The original file is unchanged. Next Image optimizes it,
uses responsive sizes, and prioritizes the above-fold hero image.

The blue poster rectangle, grid, orange disc, green block, and coordinate labels
were replaced by the person, a quiet blue atmosphere, a fine orange trace,
secondary blue contours, an olive branch, and restrained palm shadows. The
portrait softly fades into the warm page surface. Copy introduces El Houssaine
directly; existing projects, About content, and honest future-content states stay.

Desktop places heading and introduction beside a large portrait. Mobile orders
heading → compact portrait → introduction/actions so visitors see the person
within the first screen. The portrait uses a different height/crop, smaller motifs,
and touch-friendly wrapping actions rather than shrinking the desktop layout.

## Why production returned 404

The route path was correct and committed: `app/design-preview/page.tsx` plus its
layout and About page are present on local and remote `main`. Before refinement,
both pointed to commit `05338918775f97dbe4f17f0422070074d83bacf6`.
That SEO commit introduced `assertPreviewAccess()` with
`if (process.env.NODE_ENV !== "development") notFound()` in the preview layout
and pages. It intentionally rejected production requests. The route was not
missing or misspelled; the production guard was the cause. Public HTTP inspection
confirmed 404 while `/` returned the correct Coming Soon page.

The current request explicitly allows a public experimental preview. Its three
guard calls/imports and the obsolete helper were removed. The preview remains
noindex and excluded from the sitemap; the homepage stays Coming Soon and indexable.
Integration tests now require 200 responses for both preview pages and 404 for
unknown paths. No DNS, redirect, or Vercel configuration changes are needed.

## Local and release verification

Stop running dev/start servers before building (both use `.next`), then run:

```powershell
npm run lint
npm exec tsc -- --noEmit
npm run test:seo
npm run build
npm run start -- --port 3100
# In another terminal:
npm run test:seo:integration
```

Open `http://localhost:3100/design-preview` and `/design-preview/about`; both must
return 200 in the production server. `/` must remain Coming Soon. Check portrait
visibility and overflow on phone, tablet, and desktop.

After the verified change is committed and pushed to the deployment branch,
confirm Vercel builds that latest commit. Verify
`https://www.ouahad.space/design-preview` returns 200 and contains "Curious mind."
and the portrait; verify `/design-preview/about` returns 200, both retain noindex,
and `/` still renders Coming Soon. `npm run audit:seo` performs read-only checks
of the homepage, preview status, robots, sitemap, and redirects. Dashboard access
was unavailable in the prior audit, so public HTTP verification is also necessary.

## Files for this refinement

Validated before push: lint, TypeScript, production build, two serialization tests,
six HTTP integration tests, and browser checks at 320, 390, 768, 1024, and 1440 px.
Both experimental routes returned 200 with noindex. Coming Soon remained intact;
no horizontal overflow or browser console errors were observed. Portrait source
transparency was verified without changing the original PNG.

- `components/design-preview/sections.tsx`
- `app/design-preview/preview.module.css`
- `app/design-preview/layout.tsx`
- `app/design-preview/page.tsx`
- `app/design-preview/about/page.tsx`
- `lib/preview-access.ts` (removed obsolete production blocker)
- `tests/seo-integration.test.mjs`
- `DOCS/seo-foundation.md`
- `DOCS/portrait-preview.md`
