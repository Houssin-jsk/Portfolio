# El Houssaine Ouahad Portfolio

Next.js foundation for a personal Data Analyst portfolio. The project uses the App Router, TypeScript, Tailwind CSS, Motion for React, Lucide React, and local project assets.

## Foundation status

This repository is intentionally in the foundation phase. It includes the application shell, identity tokens, typed content boundaries, and asset directories. The full editorial portfolio interface is not implemented yet.

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```powershell
npm run build
npm run start
```

## Vercel

The repository is compatible with Vercel's Next.js preset. Import the repository in Vercel, or run:

```powershell
npx vercel
npx vercel --prod
```

## Asset locations

- `public/images/` — personal and approved project imagery
- `public/icons/` — custom icons
- `public/videos/` — approved, optimized video only
- `public/documents/` — CV and downloadable documents

The project documentation in `DOCS/` is the source of truth for the later visual and content implementation.
