# Alpha 8 Certification Evidence

Observed on the user's macOS development machine on 2026-10-04 after the Alpha 8 typecheck, registry-test and Storybook stack hotfixes.

## Verified baseline

- `pnpm typecheck` — PASS.
- Vitest — 8/8 files, 21/21 tests PASS.
- `pnpm stories:generate` — 1,577 generated stories.
- `pnpm storybook:build` — PASS; 3,777 modules transformed and `storybook-static` emitted.
- `pnpm demo:build` — PASS; 2,122 modules transformed and `demo-dist` emitted.
- `pnpm validate:depth` — PASS with 1,577 direct imports, 1,577 generated stories, 9 depth files and 4 canonical defaults.
- Full `pnpm certify` chain — PASS.

## Non-blocking warnings observed

- Storybook's own runtime emits Rollup warnings about `eval` usage.
- Several Storybook chunks exceeded 500 kB.
- Demo build had a ~1.53 MB main chunk before Alpha 8.4 manual chunking.
- Vite reported some modules as both statically and dynamically imported by the preview runtime.

These warnings motivated the Alpha 8.4 Beta-prep work. They are not represented as failures of the Alpha 8 correctness gates.
