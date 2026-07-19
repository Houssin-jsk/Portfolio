# 06 — Responsive and Accessibility

## Responsive priorities

- Mobile is not a compressed desktop version.
- Hero typography must remain readable at 320px width.
- Project cards become one column on small screens.
- Horizontal data visuals may scroll, but never force the whole page to overflow.
- Keep buttons large enough to tap.
- Video backgrounds must not cause layout shifts.

## Breakpoints

Use content-driven breakpoints around 640px, 768px, 1024px, and 1280px. Avoid designing only for one laptop screenshot.

## Accessibility requirements

- Semantic headings in correct order.
- Descriptive image alt text.
- Visible keyboard focus states.
- Good contrast for muted text and mint/blue accents.
- All links and buttons have clear labels.
- Respect `prefers-reduced-motion`.
- Never put important copy inside a video or decorative canvas.

## Quality checks

Test at 320px, 375px, 768px, 1024px, and 1440px. Check Chrome Lighthouse for performance, accessibility, SEO, and best practices before deployment.
