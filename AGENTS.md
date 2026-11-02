# Inner Shift Hydrogen Site

## Purpose and Scope

The website for Inner Shift — leadership programs that work on what stays below the surface. It is a brochure site with a contact form: no cart, checkout, or customer accounts. Hydrogen is kept for Oxygen hosting and so Shopify content (pages, metaobjects) can be used as a content source later.

The homepage currently shows a coming-soon hero only.

## Setup and Commands

Use Bun 1.4 and the Makefile as the canonical command surface.

```bash
make setup              # dependencies, commit hook, .env, route types
make link               # shopify hydrogen link (once the repo is published)
make dev                # local Hydrogen server (mock.shop until linked)
make check              # ESLint and TypeScript
make build              # production Hydrogen bundle
make optimize-images    # resize/recompress matching raster assets
```

## Architecture and Layout

- `app/routes/` contains React Router 7 route modules, loaders, actions, and page composition.
- `app/ui/` contains brand-agnostic design-system primitives; `app/components/` contains Hydrogen-aware composites; `app/sections/` contains marketing layouts receiving plain props.
- `app/lib/` contains request, Shopify, and other application helpers.
- `app/styles/` owns Tailwind v4 tokens and global styles.
- `server.ts`, `app/lib/context.ts`, and `app/root.tsx` establish the Oxygen request boundary and app shell.

Read `docs/CONVENTIONS.md` before changing routes, components, sections, design tokens, or assets.

## Important Boundaries and Gotchas

- Do not reintroduce commerce code (cart, checkout, customer accounts, product routes) unless explicitly asked.
- The contact form, when added, is a route `action` that sends mail through an email provider; keep secrets in `Env`, never in code.
- Run `make optimize-images` after adding or replacing matching raster assets, and commit optimized outputs.

## Engineering Practices

- Prefer the simplest approach that keeps the system consistent and robust. Extend existing patterns rather than adding abstractions, helpers, or compatibility layers the task doesn't need.
- Never hardcode colours, font names, sizes, durations, or easings in components — add a token in `app/styles/tailwind.css` and use it.
- Commit messages follow Conventional Commits (enforced by `.githooks/commit-msg`).
