# 03 — Site Architecture

## Recommended stack

- Next.js with App Router.
- TypeScript.
- Tailwind CSS with CSS variables for the identity tokens.
- Motion for React for UI and scroll transitions.
- GSAP only if a complex pinned sequence is genuinely needed.
- Lucide React for interface icons.
- Simple Icons for technology logos.
- Vercel for hosting.

Do not add a database, CMS, authentication, or heavy 3D engine. This is a fast personal portfolio.

## Sections

1. **Opening / Hero** — name, role, statement, actions, controlled motion.
2. **Signal strip** — a small visual transition showing selected facts: BI, dashboards, Python/SQL, practical AI.
3. **About** — short personal introduction and working principles.
4. **Featured case study** — the complete BI project, given the most space.
5. **Selected work** — Loveria ERP, Excel/Power BI work, ETL/data interface projects.
6. **Toolkit** — grouped tools with recognizable icons and short context.
7. **Experience** — YAA Innovations and education.
8. **Contact** — email, LinkedIn, GitHub, CV.

## Component direction

Use reusable components such as `SectionLabel`, `ProjectCard`, `MetricLine`, `ToolIcon`, `CaseStudyPanel`, `Reveal`, and `Button`. Keep content in typed data objects rather than scattering text through JSX.

## Performance

- Use optimized local images with `next/image`.
- Lazy-load project media.
- Use `poster` images for video.
- Respect `prefers-reduced-motion`.
- Avoid loading a video, 3D canvas, and multiple animation libraries at once.
- Keep the first screen visually rich but technically light.
