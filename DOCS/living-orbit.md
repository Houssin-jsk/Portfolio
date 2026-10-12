# Living Orbit V2 — luminous point of light

## Scope

Only Living Orbit changed. The portrait, layout, typography, palette and original ellipse remain unchanged. Reduced-motion CSS and JavaScript checks were removed only from this component, as explicitly requested. Windows settings and unrelated site accessibility/motion rules were not changed.

## Implementation

The original ellipse is expressed as the closed path `M870 285 A420 150 0 1 1 30 285 A420 150 0 1 1 870 285 Z`, with the same -22° rotation about (450,285). The visible line and SVG animateMotion reference this same path. Motion starts after the original 1.6s draw-in, uses 8 seconds of travel followed by a 550ms highlight hold (8.55 seconds per cycle), and repeats indefinitely. A 200ms departure ramp and 200ms arrival ramp connect to steady travel with matching velocity, avoiding a hard stop or jump. The line itself and the portrait remain stationary; the earlier pointer parallax was removed.

The light combines a warm-white core, sharp four-point gold silhouette, fine diffraction rays, radial illumination and a small bounded Gaussian bloom. An inverse SVG scaling factor keeps the optical silhouette approximately 21px wide (18% larger than before) and its invisible hit target 44px wide on mobile and desktop. No particles, spinning, extra artwork or animation dependencies.

At the existing path start/end highlight point, progress is held at 1 for 550ms. The 300ms optical glint begins 125ms into the hold and finishes 125ms before departure. Its first trigger is at 9.725 seconds, then every 8.55 seconds; the remainder of each lap has steady illumination. CSS and SVG timelines pause on document visibility changes. The initial SMIL repeat-event glint trigger was not observed during browser sampling and was replaced by a verified CSS boundary sequence.

Click/Enter/Space retains the existing brief green orbit and 'Stay curious.' message interaction. If native SVG motion is unsupported, the interactive light stays at the path's starting point. The live announcement remains accessible. Unique React useId identifiers prevent SVG definition collisions and hydration mismatch.

## Actual validation

- Production build including lint/type checks and standalone TypeScript passed.
- Production HTTP integration tests: 7 passed; metadata, structured data, sitemap, robots and page scope preserved.
- Real browser draw-in sample: dash offset .875 → 0; traveler opacity 0 → 1. Portrait rectangle was identical before and after.
- Real browser eight-second revolution: sampled point returned within 2.12px of its start (tool sampling overhead). The path is closed and shared with the visible line, so no separate positional approximation is used.
- Glint sampling across a loop: maximum observed extra-light opacity .565, 2 nonzero samples and 93 zero samples at approximately 100ms intervals; the highlight is confined to its configured 300ms window.
- Desktop and 390px mobile visual checks confirmed controlled luminosity, stationary orbit/portrait, no document horizontal overflow and a 44px hit target. Native keyboard activation succeeded. Browser console: no captured warnings/errors.
- A temporary-tab check did not produce document.hidden in this browser automation environment; visibility-based pause/resume is implemented but not verified with a true hidden-tab transition.
- Windows Animation Effects ON/OFF and physical mobile taps were not tested. No OS settings were changed. This component no longer references prefers-reduced-motion, matchMedia or any motion library, so it is configured to run independently of that preference. No claim of an actual ON/OFF comparison is made.

Browser-native path animation reference: [MDN animateMotion guide](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL).

## Exact files changed

- `components/space/hero-orbit.tsx`
- `components/space/hero-orbit.module.css`
- `DOCS/living-orbit.md`

Local review: `http://localhost:3101/`. No commit, push or deployment.

## Star size and highlight-hold refinement

Only the optical group is scaled by 1.18; the SVG path, portrait, hit target, gradients and glow intensity are unchanged. Native animateMotion keyPoints/keyTimes specify a real stationary endpoint interval. Spline ramps bring velocity gently to zero before the hold and gently restore it afterward. The end and next start are the same point on the closed orbit, so no positional reset occurs.

Current browser validation at 1440px: six identical-position samples spanned 478ms inside the configured 550ms hold, and the glint was observed during those stationary samples. The first sample after the hold moved 1.23px over 92ms, confirming gentle resumption. Portrait remained stationary throughout. A 390px visual check showed the larger luminous light, no horizontal overflow and the unchanged 44px target. Browser console was clean. Production build (including lint/type validation) and standalone TypeScript passed.

Files changed in this refinement: `components/space/hero-orbit.tsx`, `components/space/hero-orbit.module.css`, and `DOCS/living-orbit.md`. Previous V2 validation measurements above are retained as historical checks. No commit, push or deployment.
