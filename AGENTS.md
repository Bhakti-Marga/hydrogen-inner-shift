# Inner Shift Hydrogen Site

## Purpose and Scope

The website for Inner Shift — leadership programs that work on what stays below the surface. It is a brochure site with a contact form: no cart, checkout, or customer accounts. Hydrogen is kept for Oxygen hosting and so Shopify content (pages, metaobjects) can be used as a content source later.

The homepage is built from the final Figma design, header to footer: hero (background founders' film, "Watch the film" modal with captions, program links), the "leadership crisis" statement, stats (count-up figures), testimonials (promo film plus vertical participant films with captions), "Who it is for", "Our programs", "Why nature?" (expanding photo strip), the people section (founders' film again), the FAQ accordion, the closing CTA (`#contact`) and the footer. Programs, mission, about, why, and results follow the same section pattern, along with the confirmation page and a 404.

The contact form is a three-step modal (`app/components/contact-form-modal.tsx`) opened by any link to `#contact-form`. Its fields live in `app/lib/contact-form.json`, shared with the `/api/contact` action, which validates a submission and relays it to the BhaktiHub forms API. The API key is `BHAKTIHUB_FORMS_API_KEY` in `Env`.

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
- The contact form posts to the `/api/contact` route `action`, which relays it to BhaktiHub with `BHAKTIHUB_FORMS_API_KEY` from `Env`. Never put that key in code or prefix it `PUBLIC_`. Change fields in `contact-form.json`, not in the component.
- Run `make optimize-images` after adding or replacing matching raster assets, and commit optimized outputs.

## Engineering Practices

- Prefer the simplest approach that keeps the system consistent and robust. Extend existing patterns rather than adding abstractions, helpers, or compatibility layers the task doesn't need.
- Never hardcode colours, font names, sizes, durations, or easings in components — add a token in `app/styles/tailwind.css` and use it.
- Commit messages follow Conventional Commits (enforced by `.githooks/commit-msg`).
