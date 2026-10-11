# OUAHAD SPACE V2 — Phase 1

The V1 identity has evolved into a modular personal digital space within
`/design-preview`. Coming Soon at `/`, project records, assets, deployment
configuration, and environment settings are unchanged. Nothing is published.

## Open locally

Run `npm run dev` and open `http://localhost:3000/design-preview`, using the port
Next.js prints if 3000 is occupied. The expanded biography is at
`/design-preview/about`. Stop a running preview before building: development
and production use the same `.next` output folder.

## Structure

- `app/design-preview/layout.tsx`: shared site shell and noindex metadata.
- `app/design-preview/page.tsx`: homepage section assembly.
- `app/design-preview/about/page.tsx`: fuller third-person biography.
- `app/design-preview/tokens.module.css`: shared palette, spacing, motif strength.
- `app/design-preview/preview.module.css`: responsive component styling.
- `components/design-preview/site-shell.tsx`: shared header and footer.
- `components/design-preview/section-heading.tsx`: reusable section hierarchy.
- `components/design-preview/sections.tsx`: Hero, About, Creations, Discover,
  Contact, and collection rendering.
- `content/space.ts`: navigation, biography, typed future content collections.
- `config/design-preview.ts`: existing motif switches and selected project slugs.

The original project card and SVG motif components are reused. All sections are
server-rendered and immediately visible; interactions use links and native
details elements. No new dependencies or animation libraries are required.

## Future content

Explorations and Thoughts deliberately have empty arrays and honest empty states.
No tools, experiments, articles, metrics, or dates have been invented. To publish
an item later, create its actual working destination, then add a `SpaceEntry`
with a unique slug, title, description, href, and kind. The collection component
renders it without changing the surrounding design. Tool functionality, article
pages, a CMS, search, subscriptions, and publishing are outside Phase 1.

Project descriptions and contact links still come from `config/site.ts`; card
illustrations remain labeled concept sketches, not screenshots. Brand colors
remain exactly #3590DF, #077F64, and #F3A339. Motifs can be independently disabled
in `config/design-preview.ts`.

## Validation

Run `npm run lint`, `npm exec tsc -- --noEmit`, and `npm run build`.
The legacy `next lint` command may print its deprecation notice; no tooling
migration is included. Preview routes inherit noindex and remain outside the
production sitemap. Commit, push, and deployment require user approval.

V2 checks passed: lint, standalone TypeScript, and production build. Browser
review covered 320, 390, 768, 1024, and 1440 px layouts with no horizontal
overflow, 44 px mobile navigation targets, keyboard project disclosures, About
page navigation, optimized portrait loading, and a clean console. The production
homepage still renders Coming Soon.
