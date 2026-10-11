# Visual identity prototype V1

Historical V1 notes. The preview now runs OUAHAD SPACE V2; see
`DOCS/ouahad-space-v2.md`. Shared palette tokens moved to
`app/design-preview/tokens.module.css`.

Local-only experiment at `/design-preview`. The Coming Soon implementation at
`/` is preserved. No domain, Vercel, environment, or production settings change.

## Run

```powershell
npm run dev
```

Open http://localhost:3000/design-preview (or the port printed by Next.js).

## Palette and motif controls

Edit the tokens on `.preview` in `app/design-preview/preview.module.css`:

- `--brand-blue: #3590DF`
- `--brand-orange: #F3A339`
- `--brand-green: #077F64`
- `--paper`, `--paper-deep`, `--ink`, and `--muted` control neutral surfaces/text.
- `--palm-opacity` and `--olive-opacity` control motif strength on desktop.

Set any of `motifs.palm`, `motifs.olive`, or `motifs.waves` to `false` in
`config/design-preview.ts` to disable that element independently. Edit the
`.palm`, `.olive`, and `.waves` CSS classes to change placement, scale, or tone;
edit `components/design-preview/motifs.tsx` to adjust their inline SVG geometry.
The mobile olive treatment uses a lower opacity to keep it behind the text.

## Content and implementation

- `app/design-preview/page.tsx`: composition, navigation, route metadata.
- `components/design-preview/project-card.tsx`: reusable cards with native,
  keyboard-operable disclosures. No client JavaScript is needed for interaction.
- Existing `config/site.ts`: project descriptions, verified email/social links.
- Existing `public/images/profile.png`: portrait. There are no project screenshot
  assets in the repository; card graphics are explicitly labeled concept sketches.
- `config/design-preview.ts`: selected project slugs and independent motif switches.

CSS Modules keep the prototype styles isolated from Coming Soon. Sections are
visible on first render; there are no entrance animations or scroll observers.
The preview has `noindex, nofollow` metadata and is omitted from the sitemap.
This is an unlinked route, not an authentication boundary: if deployed later,
anyone who knows its URL can visit it.

## Checks

```powershell
npm run lint
npm exec tsc -- --noEmit
npm run build
```

The existing `npm run lint` script uses `next lint`, which is deprecated in
Next.js 15.5 but still available. No tooling configuration is changed for this
experiment. On Windows, these checks may require normal filesystem access if a
sandbox prevents Next.js from resolving the project path.

Commit, push, and deployment require explicit approval for this experiment.

## V1 verification

- Existing lint command and standalone TypeScript check passed.
- Production build generated `/` and `/design-preview` successfully.
- Browser checked at 1440 px, 390 px, and 320 px: no horizontal overflow.
- Navigation anchors, keyboard project disclosures, existing portrait, and email
  destination verified. No browser console warnings or errors observed.
- Small text on blue uses the darker neutral ink token for 4.87:1 contrast.
- `/` still renders Coming Soon; its source, CSS, and layout are unchanged.
