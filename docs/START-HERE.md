# Start here

This page is for someone opening the MAATAA UI repository for the first time. You do not need to understand every folder before you can run the demo or make a small change.

## What this repository contains

MAATAA UI is a React and TypeScript component library plus a local demo application. It provides visual building blocks and declared UI catalogs. The library does not provide a production backend, authentication, payments, or authority over a host application's data.

## Run the demo

You need Node.js 20 or later and pnpm. From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm demo
```

Open the local address printed by Vite. The demo is a local preview; its fixtures may be synthetic and do not establish that a real service, booking, payment, or integration exists.

## Find the right place

| If you want to…                              | Start in…                                                                                                             |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Change a UI component                        | `src/` and the matching domain folder, such as `src/forms/`, `src/actions/`, or `src/surfaces/`                       |
| Change hooks, themes, or typography          | `src/hooks/`, `src/themes/`, or `src/typography/`                                                                     |
| Change UI catalogs and composition           | `src/registries/`, `src/pages/`, `src/layouts/`, `src/workspaces/`, `src/devices/`, `src/tools/`, or `src/ai-spaces/` |
| Change demo behavior or sample data          | `examples/redux-demo/`, `src/demo/`, or `src/static-data/`                                                            |
| Add or update component examples             | `stories/`; generated stories are under `stories/generated/`                                                          |
| Add or update tests                          | `tests/`; browser-driven end-to-end checks are under `tests/e2e/`                                                     |
| Learn the architecture or product boundaries | `docs/README.md`, `ARCHITECTURE.md`, and `PUBLIC-SURFACE.md`                                                          |
| Find theme and accessibility rules           | `THEMING.md` and `ACCESSIBILITY.md`                                                                                   |
| Find historical local analysis               | `.certification/analysis-history/` and `docs/archive/README.md`                                                       |

Prefer editing the owning source module. Generated catalogs, manifests, and stories are outputs; check their generator and validation script before editing them directly.

## Make a small change safely

1. Read the nearby module and its tests before changing behavior.
2. Change the source in the owning folder; add or update a test when behavior changes.
3. Run the checks that match your change:

   ```bash
   pnpm typecheck
   pnpm test
   pnpm docs:check
   ```

4. For a package build or local demo build, run `pnpm build` or `pnpm demo:build`.
5. Review `git status` and the diff. Keep generated changes only when the relevant generator intentionally produced them.

`pnpm certify` runs a broader local gate, including type checks, tests, story generation, Storybook, and the demo build. It can update generated stories, so review the resulting diff.

## Read results honestly

A passing local test or build shows that the checked code passed that check. It does not prove production readiness, external provider availability, enterprise acceptance, real-device support, or release approval. `pnpm certify:enterprise` records automated and manual release gates separately; read its exact-commit report before making a release claim.

Keep `.env` local. Do not paste secret values into issues, docs, screenshots, or commits. Build outputs and local certification data belong in ignored output folders, not in source modules.

## More detailed guides

Use [`docs/README.md`](README.md) to choose a guide by audience. For an end-user view of the application, run the local demo and open the Docs or Help sections from its menu.
