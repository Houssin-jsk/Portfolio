# El Houssaine Ouahad — Portfolio

A static, responsive portfolio for an AI Technician / Data Analyst. It is designed as a dark editorial data interface and can be deployed directly to Vercel without a build step.

## Run locally

```powershell
npx serve .
```

Then open the local URL shown in the terminal. Any static server works; for example, VS Code Live Server.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select **Other** as the framework preset. No build command or output directory is required.
4. Deploy.

Or deploy from the repository folder with the Vercel CLI:

```powershell
npx vercel
npx vercel --prod
```

## Content to add before launch

- A PDF CV, then replace the muted **CV — file to add** label with a link.
- The LinkedIn profile URL, then replace the muted LinkedIn label with a link.
- Anonymized screenshots from the Complete BI Project (and any work that can be shared) to strengthen the case study.
- A public production URL can be added as the `og:url` metadata value in `index.html` after deployment.

## Structure

```text
index.html       Site structure and metadata
style.css        Design tokens, responsive layout, animation styles
script.js        Reveal behavior and reduced-motion support
profile.png      Existing portrait asset (not used in the current editorial layout)
DOCS/            Source-of-truth design documentation
```
