# El Houssaine Ouahad — Portfolio

A production-ready, responsive portfolio for a Junior Data Analyst and AI enthusiast based in Tangier, Morocco. Built with Next.js App Router, TypeScript, Motion, and server-side Supabase REST integration.

## Temporary coming-soon page

The public homepage currently shows the portfolio rebuild announcement. It uses
`app/page.tsx` and `app/coming-soon.css`, with local fonts and CSS-only animations
that respect reduced-motion preferences. No launch date or percentage is implied.

The previous homepage is preserved in `components/legacy-portfolio.tsx` and is
not mounted by any route. Its styles remain in `app/globals.css`; all original
sections, assets, API routes, and configuration remain available for the rebuild.
To deliberately restore that interface later, render `LegacyPortfolio` from
`app/page.tsx` and switch the layout stylesheet back to `app/globals.css`.

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The site works without database credentials, but booking, contact, and comment submissions return an honest setup message until Supabase is connected.

## Content management

All frequently changed information lives in [`config/site.ts`](./config/site.ts):

- `personal`: name, role, location, email, portrait, WhatsApp, and CV path
- `social`: GitHub and LinkedIn URLs
- `education` and `skills`: timeline and skill categories
- `projects`: cards and complete project-modal content
- `availability`: working days, hours, slot length, unavailable dates, and minimum notice

Only add verified links. `null` values intentionally hide unavailable CV/social actions.

### Add a CV

Place the verified PDF in `public/documents/`, then set:

```ts
cvPath: "/documents/el-houssaine-ouahad-cv.pdf"
```

The View and Download actions appear automatically.

### Change availability

Edit the `availability` object in `config/site.ts`. Days use JavaScript weekday numbers (`1` Monday through `5` Friday). Add closed days as ISO dates:

```ts
unavailableDates: ["2026-08-14", "2026-08-21"]
```

Weekends, past dates, unavailable dates, short-notice times, and already reserved slots are rejected server-side as well as hidden in the interface.

## Connect Supabase

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Add these server-only variables:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Never expose the service role key in browser code or use a `NEXT_PUBLIC_` prefix. The API routes keep names, emails, messages, booking data, and moderation state on the server.

The database has a unique constraint on `(booking_date, booking_time)` to prevent race-condition duplicates. API routes also validate all fields, use honeypot spam fields, basic per-instance rate limits, and return loading/success/error states to the UI.

## Comment moderation

Every submitted testimonial is stored with `status = 'pending'`. Only `approved` rows are returned publicly. In the Supabase Table Editor:

- approve: change `status` from `pending` to `approved`
- hide: change it to `rejected` or `pending`
- delete: remove the row from `testimonials`

The visitor's email is never selected by the public API and never displayed.

## Deploy to Vercel

Import the repository in Vercel, keep the Next.js defaults, and add both environment variables in Project Settings → Environment Variables. Deploy after running:

```powershell
npm exec tsc -- --noEmit
npm run lint
npm run build
```

The site includes Open Graph metadata, robots rules, sitemap generation, a favicon, semantic sections, keyboard focus states, reduced-motion support, responsive navigation, and safe-area spacing.
