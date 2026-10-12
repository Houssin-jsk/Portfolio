# OUAHAD Interactive Icon Button System

Shared components: `IconLink` for navigation and `IconButton` for actions. Both accept normal element props, icon, className and `motion="forward" | "external" | "down" | "up"`. Icon-only controls require aria-label. Icons remain decorative inside labelled controls. No SVG arrow paths changed, no library or client animation JavaScript added.

## Visual interaction language

- Navigation: open curved corner beneath the arrow at rest. Hover/focus reveals an asymmetric green frame, tinted surface and label underline, with a 4px/-3px directional departure.
- External link: a subtle asymmetric blue frame at rest. Hover/focus strengthens its blue border and tint; arrow travels diagonally 4px/-4px. Label underline confirms the active target.
- Back to top: green frame with the corner orientation reversed and a vertical line accent. Hover/focus moves the arrow straight upward 4px.
- Hero CTA: matching green frame; arrow moves downward 4px.
- Press: frame briefly becomes solid brand color with a light arrow, scales to .93, and the glyph settles by 1px. Native :active applies to pointer/touch press. Native buttons preserve keyboard/disabled semantics.

Tokens are shared in `icon-action.module.css`: 220ms interaction duration, 80ms press duration and a single eased movement curve. Hover applies only to hover-capable fine pointers. Focus has a visible outline. Reduced motion disables transitions and positional transformations; static border/background/underline feedback remains. No repeated or idle animations. Mobile navigation uses smaller 22px frames while link targets stay 48px high.

```tsx
<IconLink href="#about" motion="down" icon={<ScrollDownIcon />}>Meet the mind behind it</IconLink>
<IconButton onClick={openPanel} icon={<NavigateIcon />}>Open panel</IconButton>
```

## Validation

Production build (including lint/type checks) and standalone TypeScript passed. Production HTTP integration tests passed. Browser-confirmed hover on navigation and external controls showed the expected directional transforms and tinted frames. Tab revealed focus-visible outlines; Enter activated About and back-to-top. A click on the external control was exercised; its verified GitHub destination and target attributes remain intact. Responsive browser checks at 360, 375, 390, 430, 768, 1366 and 1440px showed no horizontal overflow. Mobile navigation frames are visible and link targets measure 48px high. Browser console: no captured warnings/errors.

The available automation surface cannot emulate physical touch, OS reduced motion, or capture a held press reliably. CSS rules for these states were reviewed; actual touch/held-press and OS-setting validation remain manual. On a touch device press a CTA/footer control: the frame should briefly become solid without sticky hover. With system reduced motion enabled, controls should retain static visual feedback without positional motion.

## Files changed in this refinement

- `components/space/icon-action.tsx`
- `components/space/icon-action.module.css`
- `components/space/site-shell.tsx`
- `components/space/identity.module.css`
- `DOCS/motion-interactions.md`

Page layout, biography, assets, custom arrow paths and all SEO/deployment infrastructure are unchanged. No commit, push or deployment. Review at `http://localhost:3101/`.
