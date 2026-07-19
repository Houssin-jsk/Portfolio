# El Houssaine Ouahad — Portfolio

A personal dark editorial data interface for El Houssaine Ouahad, Technicien Spécialisé en Intelligence Artificielle — Option Data Analyst.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS with project design tokens
- Motion for React
- Lucide React and Simple Icons
- Local Space Grotesk and Inter fonts through `next/font/local`
- Vercel

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```powershell
npm exec tsc -- --noEmit
npm run lint
npm run build
```

## Deploy

The project deploys from the repository root using Vercel's Next.js preset with automatic build and output detection.

```powershell
npx vercel
npx vercel --prod
```

Production: `https://el-houssaine-portfolio.vercel.app`

## Content and assets

All factual site content lives in `content/`. Personal and approved project media belongs in `public/`. The documents in `DOCS/` remain the source of truth for identity, content, interaction, accessibility, and implementation decisions.

Still required for complete direct links:

- PDF CV in `public/documents/`
- Verified LinkedIn profile URL
- Anonymized screenshots for the featured BI case study

Until the CV and LinkedIn URL are supplied, those actions open a pre-addressed email request instead of a broken or invented link.
