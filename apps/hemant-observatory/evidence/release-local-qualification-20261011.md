# Hemant Observatory local release qualification — 2026-10-11

## Scope and revision

- Checkout: `/Users/vesahe/Downloads/maataa-ui-full-alpha7/apps/hemant-observatory`
- Parent repository: `feat/alpha8.7-composition-kernel` at `d7f3e7a243f50fba2d0c0197108e33765b102c3a` when qualification began.
- The parent working tree was clean before the check. This evidence is local to that exact source snapshot; it is not a public release or deployment record.
- The main check generated `evidence/check-20261011T030715Z.log` and an empty ignored outside-status snapshot.

## Passed on this snapshot

Command: `bash scripts/check.sh --no-e2e`

- Rust formatting, 40 Rust tests, Clippy with warnings denied, and debug/release builds.
- Method registry and epoch fixture drift checks.
- Node contract/shell/telemetry tests: 11/11.
- Mars 2020 archival SCLK source-fixture smoke check.
- Rust Wasm build and Worker Wasm parity.
- TypeScript `--noEmit` and Next.js 16.3.8 production build (Turbopack).

## Worker package gate — environment/config blocked

The supported package script could not reach the bundle step:

1. `pnpm exec opennextjs-cloudflare build` exited 1. pnpm 12.6.0 attempted dependency reconciliation and failed with `Failed to create directory .../apps/hemant-observatory/node_modules: workspace hoist directory is not a real directory`. In this checkout `apps/hemant-observatory/node_modules` is a symlink to `.certification/consumer-next/node_modules`.
2. A direct, no-install diagnostic, `node node_modules/@opennextjs/cloudflare/dist/cli/index.js build`, exited 1 with `ERR_MODULE_NOT_FOUND: Cannot find package 'esbuild'` imported from the installed OpenNext Cloudflare package. `esbuild` package directories exist in local virtual stores, but the dependency link is absent from the resolver path used by this package.

Classification: the source Next build is green; Worker packaging is blocked by this checkout's dependency-tree layout. This does not establish a clean lockfile install, OpenNext Worker bundle, local workerd preview, or Wrangler dry-run for this exact revision. No network fetch or install retry was performed.

## Not run / still open

- Playwright E2E was omitted with `--no-e2e`; the existing loopback `EPERM` environment blocker was not retried.
- No production deployment, DNS/TLS change, public reachability check, or Cloudflare residency claim.
- The clock remains unverified. Panchanga/astronomy remains partial and not independently scientifically validated. Mars 2020 SCLK remains archival, bounded, and fail-closed outside its correlation data. Aditya MAG remains non-commercial pending written permission.
- Clean exact-revision install, Worker bundle/preview smoke, release review, and any external/public release authorization remain outstanding.
