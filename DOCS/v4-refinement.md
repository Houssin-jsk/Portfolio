# OUAHAD SPACE V4 refinement

## Changes

1. Desktop Hero uses `calc(100dvh - header height)`, a 620px minimum for readable short-screen scrolling, and flexible portrait rows. Heading and spacing use viewport-aware clamps. Essential content is not clipped.
2. About padding, paragraph spacing, signature and footer are smaller. Complete biography text is unchanged. Content remains naturally sized.
3. Root metadata now uses the original 1254px official app icon for favicon and Apple touch icon. `config/brand.ts` is the single icon URL source. The old automatic `app/icon.svg` was moved to `components/space/legacy-icon.svg` for preservation, eliminating its metadata conflict. No favicon.ico, Apple icon route or manifest was present.
4. `components/space/icons.tsx` exports NavigateIcon, ExternalLinkIcon, ScrollDownIcon and BackToTopIcon. Shared 24px geometry, 1.6px stroke, currentColor, 16/20/24px support, decorative accessibility by default and an optional accessible title. Only actual navigation functions use them; no contact section was added.
5. Mobile uses a compact 72px header, removes secondary labels, brings the portrait, concise intro and CTA together, and keeps all fields in a wrapping line. Dynamic viewport units adapt the portrait to toolbar changes. About retains a comfortable single column and the complete narrative.
6. Original red Next.js issue: not reproduced. Fresh development page returned 200; captured console had no warning/error, Next Dev Tools showed Static/Route Info/Preferences and no Issues entry. The indicator remains enabled. Its original cause cannot be established from available evidence.

## Changed files in V4

- `app/layout.tsx`
- `app/icon.svg` moved to `components/space/legacy-icon.svg`
- `config/brand.ts` (new)
- `components/space/icons.tsx` (new)
- `components/space/identity.module.css`
- `components/space/sections.tsx`
- `components/space/site-shell.tsx`
- `tests/seo-integration.test.mjs`
- `DOCS/v4-refinement.md` (this file)

The earlier local redesign changes and user-supplied untracked logos remain uncommitted. Public icon and portrait assets were reused without modification. SEO, JSON-LD, sitemap, robots, IndexNow, project records and inactive future components remain intact.

## Verification and limitations

Lint, standalone TypeScript, production build, SEO and IndexNow unit tests and production HTTP tests are checked. The first build exposed an SVG direction prop type collision introduced during this pass; it was corrected by excluding the inherited SVG direction attribute from public icon props. Existing next lint deprecation and Node module-type notices remain. Development Fast Refresh emitted a full-reload notice during CSS editing; no runtime/hydration error was captured.

Desktop measurements and visual review: 1920x1080, 1440x900 and 1366x768. Header plus Hero fits inside the initial viewport; About plus footer also fits. A 1366x550 short-screen check permits natural scrolling instead of clipping. Mobile/tablet checks: 360x740, 375x812, 390x844, 430x932 and 768x1024. No document horizontal overflow; all images load. Internal navigation is checked. These are browser viewport simulations, not physical iPhone Safari tests; actual Safari toolbar behavior and an installed iOS shortcut remain manual checks.

## Preview and icon cache verification

Review the existing homepage at `http://localhost:3101/`. To restart the production review server:

```powershell
npm run build
npm run start -- -p 3101
```

For development, stop the production server before `npm run dev -- -p 3101`. Do not rebuild while a server is using `.next`.

The favicon URL includes `?v=ouahad-v4` to refresh prior cached URLs. In browser DevTools, verify exactly one `rel=icon` and one `rel=apple-touch-icon`, both pointing to that official PNG, with a successful image/png response. Hard reload, close/reopen the tab, or use a fresh browser profile if a favicon remains cached. Existing home-screen shortcuts can retain their old icon: remove and re-add the shortcut after this version is deployed. No deployed icon change is claimed yet.

No commit, push or deployment was performed. Search Console's previously reported sitemap fetch issue remains unresolved and separate from V4.

### Final production measurements

| Viewport | Header + Hero bottom | About + footer height |
| --- | ---: | ---: |
| 1920 × 1080 | 1008px | 719px |
| 1440 × 900 | 900px | 692px |
| 1366 × 768 | 768px | 659px |
| 360 × 740 | 618px | 966px |
| 375 × 812 | 646px | 966px |
| 390 × 844 | 632px | 914px |
| 430 × 932 | 665px | 898px |
| 768 × 1024 | 825px | 736px |

All eight final measurements show loaded images and no horizontal overflow or clipped text. Mobile biography scrolls naturally to preserve readable type and all facts. Final fresh production browser console: zero warnings/errors. Validation completed: lint passed, standalone tsc passed, production build passed, 2 SEO unit + 7 IndexNow + 7 HTTP integration tests passed (16 total).
