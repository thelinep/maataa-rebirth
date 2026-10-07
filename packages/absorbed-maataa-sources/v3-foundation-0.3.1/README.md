# MAATAA UI V3 — Foundation & Certification Scaffold

V3 deliberately reduces active surface area and prioritizes reproducible engineering foundations over component count.

## Certified kernel

The active 0.3.1 package surface is exactly 11 workspace packages:

`contracts → core/registry → ai/governance/renderer/adapter-sdk → control → react → recipes → testing`

See `architecture.json` for the authoritative package list and roadmap domains.

## Governed control target

The V3 reference workflow is:

`Context → Recommendation → Proposal → Policy → Approval → Authorized Command → Dispatch → Ack/Nack → Observed State → Verification → Evidence`

A command acknowledgement is never treated as physical verification. Browser UI is never treated as a safety-rated hardware layer.

## Runtime dependency statement

The 0.3.1 certified kernel has **zero external runtime dependencies**. Workspace packages do have runtime dependencies on other MAATAA workspace packages; those internal dependencies are declared in each package's `package.json` and resolved by npm workspaces.

This claim is executable: `tests/packages/runtime-dependencies.test.mjs` rejects any third-party runtime dependency or non-workspace package-lock entry.

## Canonical toolchain

This repository is **npm-only**:

- Node: `22.16.x` (`.nvmrc`)
- npm: `10.9.2` (`packageManager`)
- lockfile: `package-lock.json`
- workspaces: root `package.json`

There is no pnpm workspace declaration and no Turbo/Nx/Lerna runner in the certified tree.

## Reproducible fresh clone

`npm run fresh-clone` copies the repository to a new temporary directory, creates an empty npm cache, runs `npm ci --offline --ignore-scripts`, then runs the complete kernel gate. Because the cache is empty and the lockfile contains only workspace links, this proves the certified kernel installs from the repository tree alone.

## Gates

```bash
npm ci --ignore-scripts
npm run gate:toolchain
npm run gate:drift
npm run lint
npm run format:check
npm run check:boundaries
npm run check:exports
npm test
npm run build
npm run fresh-clone
npm run certify
```

`gate:drift` is implemented by `scripts/check-drift.mjs`.

For the local reference demo:

```bash
npm run serve
# open http://127.0.0.1:4173/apps/reference-control/
```

## Certification source of truth

`certification/certification.json` is the sole certification result source. `certification/REPORT.md` is generated from it by `npm run report:certification`; do not edit the report manually.

## Scope boundary

Camera, robotics, IoT, building, spatial/digital-twin and other rich domain packs remain **roadmap/experimental surfaces**, not active 0.3.1 packages. The camera simulator is a reference workflow built from the certified kernel, not a separately certified camera package.
