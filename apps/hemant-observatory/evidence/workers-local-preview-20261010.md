# Local Cloudflare Worker preview evidence — 2026-10-10

The current Hemant source snapshot was copied to an isolated temporary directory so the app's existing `node_modules` symlink and workspace were not changed. A second isolated copy started without `node_modules`; `pnpm install --offline --frozen-lockfile` materialized 334 pinned packages from the local pnpm store with zero downloads. Build and runtime commands ran against that clean copy with the pinned OpenNext and Wrangler versions.

## Checks

- `pnpm exec opennextjs-cloudflare build` — PASS; Rust/Wasm parity preflight, Next.js production build, and OpenNext Worker bundle completed.
- `pnpm exec opennextjs-cloudflare preview --port 4291` — PASS; local workerd server started and was stopped after smoke checks.
- Local HTTP smoke checks — PASS:
  - `/` — 200
  - `/api/health` — 200
  - `/api/time` — 200
  - `/api/methods` — 200
  - `/api/spacecraft/sclk/mars2020-demo?sclk=0189345666-00000` — 200; returned `hemant.spacecraft-clock/1`, TDT, and `unverified-reference-demonstration`
  - malformed legacy-style SCLK input — 400
  - `0284040067-00000`, outside the embedded V19 correlation interval — 422
- `pnpm exec wrangler deploy --dry-run --outdir .wrangler-dry-run` — PASS; Wrangler bundled 5,343.18 KiB of Worker and assets, then exited without upload.
- `git diff --check` — PASS on the workspace after evidence and status updates.

## Limits

This is local Worker-runtime and packaging evidence only. Dependency resolution used the already-cached pnpm store because the environment could not verify current registry reachability; it is not a fresh network install, Cloudflare deployment, DNS/TLS check, or flight qualification. The sample correlation remains a bounded implementation of an archival NAIF M2020 V19 refit; UTC/TDB conversion and independent CSPICE comparison remain open.
