# OUAHAD SPACE V3 — main website foundation

## Public scope

`app/page.tsx` mounts the shared SpaceShell, one homepage JSON-LD script,
SpaceHero, and SpaceAbout. Header navigation contains Home and About Me; the
hero links only to About. The minimal footer contains verified GitHub and a
back-to-top anchor. There is no project, skills, contact, discovery, journal,
placeholder, or extra page interface mounted publicly.

The existing transparent `public/images/profile.png` remains unchanged and is
used by Next Image, with priority for the above-fold portrait. Desktop pairs the
person with the typography. Mobile places the portrait between the heading and
the introduction, with its own crop, dimensions, and motif treatment. The palette,
wave contours, palm shadows, olive branches, local fonts, and reduced-motion
support are preserved.

About uses three third-person paragraphs covering identity, childhood interest,
four years in maintenance/networks, subsequent AI/Data Analyst studies, and a
creative, questioning, continuously learning approach. No expertise or experience
claims were added.

## SEO and old URLs

The homepage remains indexable and canonical at `https://www.ouahad.space/`.
`config/seo.ts` now has actual OUAHAD SPACE site metadata; Coming Soon metadata
is preserved separately. The Person/WebSite graph keeps the existing IDs and
verified facts, with an updated WebSite description. Robots, sitemap, favicon,
verification files, and IndexNow workflow are unchanged. After an approved
production deployment, IndexNow should detect this real homepage content change
using its existing journal rather than requiring a manual submission.

The App Router preview pages are retired. Next config supplies two permanent
redirects: `/design-preview` → `/`, `/design-preview/about` → `/#about`.
No domain/DNS configuration changes or duplicate public implementations remain.
Unknown paths still return 404 with noindex.

## Preserved source and moves

| Original path | Current preserved/reusable path |
| --- | --- |
| Coming Soon implementation in `app/page.tsx` | `components/legacy-coming-soon.tsx`; its `app/coming-soon.css` is retained |
| `components/design-preview/motifs.tsx` | `components/space/motifs.tsx` |
| `components/design-preview/project-card.tsx` | `components/space/project-card.tsx` |
| `components/design-preview/section-heading.tsx` | `components/space/section-heading.tsx` |
| `components/design-preview/site-shell.tsx` | `components/space/site-shell.tsx` |
| `components/design-preview/sections.tsx` | Active Hero/About in `components/space/sections.tsx`; future sections in `components/space/future-sections.tsx` |
| `app/design-preview/preview.module.css` | `components/space/space.module.css` |
| `app/design-preview/tokens.module.css` | `components/space/tokens.module.css` |
| `app/design-preview/layout.tsx` | `components/space/space-shell.tsx`, with metadata owned by the root layout |
| `app/design-preview/page.tsx` | Unmounted `components/space/future-homepage.tsx` |
| `app/design-preview/about/page.tsx` | Unmounted `components/space/future-about.tsx` |
| `config/design-preview.ts` | `config/space.ts` |

Additional files created: `app/base.css`, `components/legacy-coming-soon.tsx`,
`components/space/future-sections.tsx`, and this document. Modified integration
files: `app/page.tsx`, `app/layout.tsx`, `config/seo.ts`, `content/space.ts`,
`lib/seo.ts`, `next.config.ts`, and `tests/seo-integration.test.mjs`.
The old preview/renamed component paths disappear from the route/source tree,
but their useful implementation is preserved at the destinations above.
Existing project data, unrelated section components, assets, APIs, and the legacy
portfolio remain intact.

## Local checks and publication

Stop any running dev/start server before building, because they share `.next`.

```powershell
npm run lint
npm exec tsc -- --noEmit
npm run test:seo
npm run test:indexnow
npm run build
npm run start -- --port 3100
# In another terminal:
npm run test:seo:integration
```

Open `http://localhost:3100/`. Confirm two main sections, portrait visibility,
valid anchors, and the two preview redirects. Development inspection uses
`npm run dev -- --port 3100` after stopping the production server.

V3 validation passed: lint, standalone TypeScript, production build, two SEO
serialization tests, seven IndexNow tests, and six updated HTTP integration tests.
The production route table contains `/` and no preview pages. Browser review at
320, 390, 768, 1024, and 1440 px confirmed two main sections, loaded portraits,
portrait visibility within the first screen, valid anchors, and no horizontal
overflow or clipped text. Fresh production and development sessions showed no
hydration, runtime, or browser-console errors. Development Dev Tools showed no
Issues entry. The user's earlier red "1 Issue" indicator was **not reproduced**
before or after integration; its original cause is unknown, not claimed fixed.
Temporary HMR module errors occurred while files were moved, and disappeared on
the completed clean development restart. Initial dev compilation took 14 seconds;
the completed request returned 200. No dev-indicator suppression was added.
Non-fatal CLI notices remain for deprecated `next lint` and Node's module detection.

The correct production branch is main. No commit, push, or deployment is performed
for V3 without the user's approval. After approval, review the diff and publish:

```powershell
git status --short
git diff --check
git add -- app components config/seo.ts config/space.ts config/design-preview.ts content/space.ts lib/seo.ts next.config.ts tests/seo-integration.test.mjs DOCS/v3-integration.md
git diff --cached --stat
git commit -m "Integrate OUAHAD SPACE V3 as the public homepage"
git push origin main
```

The deleted config path is included so its move is staged. If unrelated files
have since been added under app/components, stage only the paths in the move
table and modified integration list instead. After Vercel finishes, confirm the
latest commit's deployment status, `/` returns the new design, preview URLs
redirect correctly, and the existing IndexNow workflow processes the meaningful
homepage update. Do not run V3 integration tests against the live domain before
the V3 deployment: it still serves the preceding version until publication.
