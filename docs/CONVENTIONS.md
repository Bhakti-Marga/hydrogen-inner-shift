# Inner Shift — Project conventions

How this codebase is structured and styled. If something isn't in this doc,
follow the existing patterns in `app/ui/`, `app/sections/` and `app/routes/`.

## General principles

**Prefer the simplest approach that fits.** Extend existing tokens, primitives
and route structure only as far as the task requires. A small change that
matches the house style beats a general abstraction.

## 1. Tech stack

| Layer     | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | Shopify Hydrogen (Oxygen runtime)               |
| Routing   | React Router 7 (flat file routes)               |
| Styling   | Tailwind CSS v4 with `@theme` design tokens     |
| Variants  | `class-variance-authority` (`cva`)              |
| Tooling   | Bun 1.4, Vite, TypeScript (strict)              |

Brochure site only — no cart, checkout or customer accounts.

## 2. Folder structure

```
app/
├── ui/          # Brand-agnostic primitives (Section, Wordmark, …)
├── components/  # Hydrogen-aware composites (query Shopify / use Hydrogen utils)
├── sections/    # Marketing layouts receiving plain props
├── routes/      # Flat file-based routes
├── styles/      # tailwind.css (tokens + keyframes), fonts.css
└── lib/         # Request context, session, helpers
```

### `sections/` contract

- **Layout-fixed.** A section owns one visual recipe; copy comes in via typed props.
- **No Shopify data.** Sections receive plain strings and image URLs.
- **Every section exposes `padding` and `className`.** `padding` maps to the
  `<Section padding>` preset (`default | none | no-top | no-bottom`); `className`
  is forwarded to the outer `<Section>`.
- Private helpers stay at the bottom of the section file.

### Static assets

```
public/
├── brand/              # Logos, wordmarks (URL: /brand/…)
├── images/pages/<page>/ # Assets grouped by the page that owns them
└── fonts/              # Self-hosted woff2 fonts
app/assets/brand/       # Small brand files bundled by Vite (favicon)
```

- Group page art under `public/images/pages/<page>/` and strip the page name
  from the filename (e.g. `pages/home/hero-iceberg.jpg`).
- Portrait crops for small screens use the `-mobile` suffix and are served via
  `<picture><source media="(max-width: 767px)">`.

### Image optimization

`scripts/optimize-images.js` (`make optimize-images`) resizes raster assets in
`public/images/` to ~2× their display size and recompresses them **in their
original format** (no WebP/AVIF conversion). It only overwrites a file when
the result is smaller, and skips files under 200 KB.

- Each asset family needs a rule in `RESIZE_RULES` (`pattern`, `maxWidth`,
  `maxHeight`, `quality` ≥ 90). There is no catch-all.
- Photos with smooth gradients ship as JPG; palette-quantized PNG bands them.
  Choose the format when authoring the asset, not in the optimizer.
- Use `sharp` (not ImageMagick or Pillow) for ad-hoc crops/resizes.
- Commit the optimized files. Restore pristine originals before re-running
  with a different `quality`.

## 3. Design tokens

All tokens live in `app/styles/tailwind.css` under `@theme`. Never hardcode hex
codes, font names, sizes, durations or easings — reference the token.

### Colours

| Token    | Hex       | Notes                             |
| -------- | --------- | --------------------------------- |
| `ember`  | `#FF4F37` | Primary CTA, accents              |
| `cobalt` | `#164DB2` | Program cards                     |
| `abyss`  | `#0C182E` | Deep water, page background       |
| `mist`   | `#FFFFFF66` | Muted headline text on dark water (white at 40%) |

### Typography

- `font-inter` (default) — Inter variable, latin / latin-ext.
- `font-mono` — IBM Plex Mono 400 (latin / latin-ext), for uppercase labels.
- `text-wordmark` + `tracking-wordmark` — INNER SHIFT logo (18px, 100%, 0.4em).
  Use the `<Wordmark />` primitive rather than restyling text.
- `text-hero` / `text-hero-md` — uppercase hero headline (Inter 500, 36px desktop).
- `text-label` + `tracking-label` — mono uppercase eyebrows and status labels
  (11px, 2.2px tracking); `text-label-lg` for the larger progress label.

### Motion

- Durations: `duration-fast|base|slow|page`; easings: `ease-base|out-soft`.
- Keyframes are `--animate-*` tokens: `animate-hero-settle`, `animate-rise-in`,
  `animate-sink-in`, `animate-fade-in`, `animate-progress-sweep`, `animate-beacon`.
- Always prefix with `motion-safe:`. Stagger with
  `motion-safe:[animation-delay:var(--duration-*)]`.
- LCP images animate scale only (no opacity) so they paint immediately.

### Layout

- Full-bleed page gutter: `px-6`, `xl:px-10` from 1280px.
