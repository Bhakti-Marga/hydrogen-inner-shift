.PHONY: setup dev link preview build check lint typecheck codegen optimize-images audit clean lint-claude-md

# Establish a usable fresh checkout: locked dependencies, hooks, and route types.
setup:
	@if [ -f bun.lock ]; then bun install --frozen-lockfile; else bun install; fi
	git config core.hooksPath .githooks
	@echo "Git hooks installed (.githooks/)"
	@if [ ! -f .env ]; then \
		secret=$$(openssl rand -hex 32); \
		sed "s|^SESSION_SECRET=$$|SESSION_SECRET=$$secret|" .env.example > .env; \
		echo "Created .env with a generated SESSION_SECRET"; \
	else \
		echo ".env already exists; left untouched"; \
	fi
	bunx --no-install react-router typegen
	@echo "React Router route types generated (.react-router/types/)"

dev:
	@test -d node_modules || { echo "INNER-SHIFT: dependencies missing; run make setup"; exit 1; }
	@test -f .shopify/project.json && grep -q '"storefront"' .shopify/project.json || echo 'INNER-SHIFT: storefront not linked; running against mock.shop. Run `make link` once the repo is published.'
	bun run dev

# Connect this checkout to the store's Hydrogen storefront (Shopify login,
# interactive). Writes gitignored .shopify/project.json; dev and preview read
# storefront credentials from it.
link:
	@test -d node_modules || { echo "INNER-SHIFT: dependencies missing; run make setup"; exit 1; }
	bunx --no-install shopify hydrogen link

preview:
	@test -d node_modules || { echo "INNER-SHIFT: dependencies missing; run make setup"; exit 1; }
	bun run preview

build:
	bun run --bun build

check: lint typecheck

lint:
	bun run lint
	$(MAKE) lint-claude-md

typecheck:
	bun run typecheck

codegen:
	bun run codegen

optimize-images:
	bun run optimize:images

audit:
	bun audit --audit-level=high

clean:
	rm -rf build dist public/build .cache .react-router node_modules/.cache tsconfig.tsbuildinfo

lint-claude-md:
	@test "$$(sed '/<!--/,/-->/d' CLAUDE.md | grep -v '^$$')" = "@AGENTS.md" \
		|| { echo "ERROR: CLAUDE.md should only contain '@AGENTS.md' (plus HTML comments)."; exit 1; }
