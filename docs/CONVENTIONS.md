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
├── ui/          # Brand-agnostic primitives (see "UI primitives" below)
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
  `<Section padding>` preset (`default | snug | roomy | roomy-bottom | none | no-top | no-bottom`); `className`
  is forwarded to the outer `<Section>`.
- Private helpers stay at the bottom of the section file.

### UI primitives (`~/ui`)

Reach for these before writing raw markup; add a variant rather than a
one-off class when the design repeats.

| Primitive        | Use for                                                           |
| ---------------- | ----------------------------------------------------------------- |
| `Section`        | Outer block: `padding` preset (`snug` ≈112px, `roomy` 160px on desktop), `tone` (`default`, `abyss`, `light`, `white`, `soot`, `glacier`) |
| `Container`      | Content column with 24px / 60px (`xl`) outside gutters; `size` `content` (1320px) or `narrow` (1264px) |
| `Button`         | Pill CTA; `tone` `ember`/`glass`/`light`/`cobalt`, `size` `lg`/`md`/`md-icon`/`md-badge` (trailing 41px arrow badge)/`sm`/`form` (submit on a white card); `href` renders a link. `ember`/`light` hover with a rising fill (`fill-rise`), trailing icons nudge right |
| `HeroActions`    | The hero's button group. On small screens the buttons stack and share one width (the column). From `md` they sit in a row, each sized to its label. Every hero with more than one button uses this; don't lay those buttons out by hand |
| `HeroMobileBand` | Landscape photograph across the top of a hero on small screens, fading into the hero colour so the copy sits on a solid field. Use it when the hero's picture would otherwise be cropped tall behind the copy. Hidden from `md`, where that hero uses its own full-bleed image or film. Skip it when the picture is the layout (the why photo row, the mission mosaic) |
| `Reveal`         | Block that rises into place once when scrolled into view; `as` `div`/`li`/`article`/`h2`, `order` staggers siblings. Visible by default (SSR, no-JS, reduced motion, already on screen at hydration) |
| `CountUp`        | Whole-number stat that counts up from 0 when scrolled into view (CSS-driven; final value for SSR, reduced motion and screen readers) |
| `AvatarPill`     | Avatar + short line in a frosted pill; `tone` `dark`/`glass`/`cloud`/`white`/`soft`/`dusk`, `size` `md` (60px) / `sm` (44px). Opens out from its avatar once: `entrance` `reveal` (inside a `<Reveal>`, default) or `load` (hero). `flushBelow="md"` insets the avatar on small screens and is only for the homepage hero. `glass` is the shared photo pill (white at 15%, blur, white ring at 12%). `dusk` is the day-immersion pill (`#10151C` at 10%) |
| `Eyebrow`        | Uppercase 11px label; `tone` `dark`/`light`/`ink`                 |
| `ArrowBadge`     | Decorative 40px ↗ badge on link cards; `tone` `ember`/`glass`. The arrow loops out and back on the card's `group` hover/focus |
| `VideoModal`     | Native `<dialog>` player with sound, no download, and WebVTT captions on by default; `orientation` `landscape`/`portrait` (9:16); captions may be omitted only when burnt in |
| `ScrollChevrons` | Previous / next 40px square buttons for carousels; `tone` `light`/`ember` |
| `ArrowRightIcon` | Inline → for text links and buttons; inherits `currentColor`      |
| `Wordmark`       | INNER SHIFT text logo; `size` `md` (header) / `sm` (footer)       |

### Static assets

```
public/
├── brand/              # Logos, wordmarks (URL: /brand/…)
├── icons/              # Shared UI icons as files (URL: /icons/…); icons that
│                       # change colour are inline-SVG primitives in app/ui/
├── images/pages/<page>/ # Assets grouped by the page that owns them
├── videos/<page>/      # Web-encoded films + WebVTT captions (URL: /videos/…)
└── fonts/              # Self-hosted woff2 fonts
app/assets/brand/       # Small brand files bundled by Vite (favicon)
```

- Group page art under `public/images/pages/<page>/` and strip the page name
  from the filename (e.g. `pages/home/hero-founders.jpg`).
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

### Video

Keep source masters out of git (put them in `.scratch/`, which is ignored).
Ship one uncaptioned H.264 file per film and a separate WebVTT caption file,
so captions only appear in `VideoModal` and can be switched off:

```bash
ffmpeg -i master.mp4 -c:v libx264 -preset slow -crf 24 -profile:v high \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart \
  public/videos/<page>/<name>.mp4
```

- Keep each file under 50 MB (GitHub warns above that, rejects above 100 MB);
  drop to 720p (`-vf scale=-2:720`) if 1080p is too large.
- Convert `.srt` to `.vtt`: prepend `WEBVTT` and a blank line, and change the
  timestamp commas to dots (`00:00:01,500` → `00:00:01.500`).
- Vertical (9:16) films, e.g. testimonials, ship at 720×1280 with `-crf 25`
  (`-vf scale=720:1280`): the portrait player is never taller than the viewport.
- Background loops reuse the same file muted, with no caption track, and only
  load from `md` up without reduced motion (`<source media>`). The still is
  for phones and reduced motion; it is not painted behind the desktop film.

## 3. Design tokens

All tokens live in `app/styles/tailwind.css` under `@theme`. Never hardcode hex
codes, font names, sizes, durations or easings — reference the token.

### Colours

| Token    | Hex       | Notes                             |
| -------- | --------- | --------------------------------- |
| `ember`  | `#FF4F37` | Primary CTA, accents              |
| `ember-deep` | `#E63F26` | Button hover fill (white text 4.1:1, vs 3.3:1 on `ember`) |
| `cobalt` | `#164DB2` | Secondary accent (taster program) |
| `bay`    | `#2E62B8` | Mission eyebrow                   |
| `pebble` | `#7E7F81` | Muted labels on white cards       |
| `abyss`  | `#0D182D` | Dark sections, page background    |
| `depth`  | `#0A111E` | Solid end of the flagship photo fade |
| `night`  | `#0B1118` | Neutral dark over the programs hero photo |
| `ink`    | `#14161A` | Text on light sections (use `/45`, `/60`… for muted) |
| `cloud`  | `#EFF2F5` | Light section and pill background |
| `frost`  | `#E1E9F6` | Stat cards on white               |
| `haze`   | `#86969B1F` | Frosted pill over dark imagery  |
| `mist`   | `#FFFFFF66` | Muted text on dark (white at 40%) |
| `flint`  | `#757575` | Placeholders and muted copy in the contact form |
| `chalk`  | `#F8F9FA` | Form field fill                   |
| `fog`    | `#E3E8EF` | Form field border                 |
| `shale`  | `#CFD3D8` | Unchecked radio ring              |
| `soot`   | `#202221` | Charcoal section behind the journey steps |
| `ash`    | `#D9D9D9` | Step-number discs on soot         |
| `glacier`| `#F3F4F8` | Pale field behind the immersion cards, the example day and the belief row |
| `sheet`  | `#EEF3F6` | Frosted card over the day-immersion photo (use at `/62`) |
| `pine`   | `#0E110D` | Green-black over the example-day photo |

### Typography

- `font-inter` (default) — Inter variable, upright and italic, latin / latin-ext.
  The only typeface.
- `text-wordmark` + `tracking-wordmark` — INNER SHIFT logo (18px, 100%, 0.4em).
  Use the `<Wordmark />` primitive rather than restyling text.
- `text-hero` / `text-hero-md` — uppercase hero headline (Inter 500, 32px, 46px desktop).
  `text-hero-intro` — the paragraph under it on small screens (16/19).
  `text-card-lead` — the bold line of a hero program card on small screens (24px).
- `text-banner` / `text-banner-md` / `text-banner-lg` (80px) — programs hero
  headline (Inter 300). `text-banner-lead` / `text-banner-lead-md` (17.5px) —
  the paragraph under it.
- `text-body` (16/24) and `text-body-lg` (16/26, intro copy).
- `text-eyebrow` — uppercase labels (11px, 1.87px tracking); use `<Eyebrow />`.
- `text-card-title` — card titles (18px, -0.78px tracking, with `font-semibold`).
- `text-mosaic` / `text-mosaic-lg` (21px) — lines set inside the mission photo tiles.
- `text-being` / `text-being-md` (48px) — “Who am I being?”.
- `text-water` / `text-water-md` (22px) — the line under that question.
- `text-approach` / `text-approach-md` (24px) — the blue approach card.
- `text-sources` / `text-sources-md` (50px) — the “what we draw on” and team headings.
- `text-card-body` (13.5px, light) and `text-card-meta` (12.5px, medium) — card
  descriptions and fact rows.
- `text-statement` / `text-statement-md` — large section statement (40px desktop).
  `text-support` (14/22.4) is the sentence under a light headline; `text-detail`
  (14/16, 0.3px tracking) is the line under a name on a frosted card.
  `text-role` (12px uppercase) is the line under a profile name; `text-whisper`
  (13/20.8) and `text-cite` (10px) are a quote and its attribution.
- `text-quote` / `text-quote-md` (32px desktop), with `text-aside` (18px italic)
  and `text-closing` (19px italic) for the lines around quotes and stats.
- `text-stat` / `text-stat-md` (84px desktop), `text-stat-body`, `text-source`
  (uppercase source labels) and `text-caption` (13.5px footnotes).
- `text-display` / `text-display-md` — light section titles (56px desktop);
  `text-intro` / `text-intro-md` — 26px lead-in paragraph under a pill.
- `text-card-heading` (25px), `text-list` and `text-fine` — white list cards
  with numbered rows.
- `text-headline` / `text-headline-md` (44px) / `text-headline-lg` (48px) —
  side headings beside media or lists; `text-display-lg` (58px) — closing CTA.
- `text-question` / `text-question-md` and `text-answer` — FAQ rows.
- `text-fine` (13px) — list numbers and footer links; `text-wordmark-sm` —
  footer wordmark.
- `text-program` / `text-program-md` (36px) and `text-program-compact-md`
  (33px) — program card titles; `text-program-body` and `text-link`.
- `text-step` / `text-step-md` (22px) — journey step titles.
- `text-layer` / `text-layer-md` (31px) — immersion card titles; `text-pull`
  (18.5px italic) — the line under those cards.
- `text-panel` / `text-panel-md` (51.8px) — example-day headline; `text-note`
  (14.5px) — the schedule lines under it; `text-feedback` (20.5px italic) —
  the participant card that overlaps that panel.
- `text-belief` (32px) — the line above the fanned photo row, and the
  programs closing line.
- `text-taster` / `text-taster-md` (34px) — the day-immersion card title.
- `text-overview` (18px) — the underlined download link under the closing button.
- `text-form-title` (23px), `text-form-lead`, `text-label` (13px field
  labels) and `text-field` (15px input text) — contact form.
- `rounded-tile` — 16px radius for the immersion cards;
  `rounded-sheet` — 22px for the frosted day-immersion card;
  `rounded-media` — 20px radius for video frames and media cards;
  `rounded-panel` — 24px for the full-width closing panel;
  `rounded-card` (10px) and `rounded-field` (12px) — contact form card and fields.
- `shadow-float` — drop shadow under the play button on media;
  `shadow-lift` — the participant feedback card over the example-day panel;
  `shadow-sheet` — the frosted card over the day-immersion photo.

### Motion

One gesture, "surfacing": content rises a little and fades in with
`ease-out-soft`, once, and never reverses. No parallax, scroll-jacking,
springs, scale pops or side slides.

- Durations: `duration-fast|base|slow|page|reveal|stagger`; easings:
  `ease-base|out-soft`. Hovers use `fast`/`base`, entrances `reveal`/`page`.
- Keyframes are `--animate-*` tokens: `animate-rise-in`, `animate-fade-in`
  (hero, on load), `animate-rise` (the same rise without a fade — use it
  when the group contains `backdrop-filter`, which otherwise samples a stale
  frame until the fade ends), `animate-reveal` (scroll, via `<Reveal>`),
  `animate-settle` (image easing from 1.06 to 1 scale) and
  `animate-pill-open` / `animate-pill-text` (`AvatarPill` entrance).
- Hovers carry the same idea: `fill-rise` (a fill with a curved top rising
  from the bottom edge) on solid buttons, a 4px nudge on trailing arrows, and
  `active:scale-98` on press. Keyboard focus mirrors hover. Plain colour
  changes stay on glass and text links. No magnetic, ripple, glow or text-roll
  effects, and no looping motion.
- Below the hero, wrap blocks (heading, card, row), not individual words or
  icons, in `<Reveal>`. Give siblings `order={0,1,2…}`; skip footers and
  small links. Children react to it with
  `motion-safe:group-data-[state=run]/reveal:animate-settle`.
- `scroll-brighten` (scroll-linked, per word) is reserved for the leadership
  crisis statement. Don't reuse it elsewhere.
- Always prefix with `motion-safe:`. Stagger hero items with
  `motion-safe:[animation-delay:var(--duration-*)]`.
- Animate only `opacity`, `transform` and `clip-path`. LCP images do not
  animate opacity, so they paint immediately.

### Layout

- Wrap section content in `<Container>` (1320px column, 60px margins at the
  1440px design width). Only full-bleed media and carousels sit outside it.
- `--container-content` backs `max-w-content`.
- `strip-track` (`@utility`) is the expanding photo strip: one open panel,
  centred by translating the track and clamped at both ends. Panel sizes are
  `--spacing-strip-*` tokens; see `HomeNatureSection`.
