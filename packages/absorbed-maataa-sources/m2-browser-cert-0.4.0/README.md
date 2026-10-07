# MAATAA UI V3 — M2 Browser & React Adapter Certification

Release: **0.4.0**

MAATAA UI remains foundation-first: 11 active workspace packages, frozen v1 contract/API/registry compatibility from M1, and a real-browser certification lane added in M2.

## Active kernel

`contracts → core/registry → ai/governance/renderer/adapter-sdk → control → react → recipes → testing`

The active package count remains exactly 11. Camera, robotics, IoT, building, spatial/digital-twin and the broader domain catalogue remain roadmap/experimental surfaces.

## Completed milestones

- **M0R / 0.3.3** — retrospective foundation reconciliation
- **M1 / 0.3.3** — contract/API/registry freeze and lifecycle invariant hardening
- **M2 / 0.4.0** — real-browser + React-adapter certification

See `architecture.json`, `docs/M2-COMPLETION.md` and `ROADMAP.md`.

## M2 browser certification

M2 uses a system-provided Chromium/Chrome runtime through the Chrome DevTools Protocol. The browser is an environment prerequisite, not an npm dependency.

The browser lane certifies:

- accessibility-tree semantics for adapter primitives;
- keyboard tab navigation;
- dialog initial focus and focus restoration;
- polite live-region updates;
- responsive layouts at 390/768/1440px;
- `prefers-reduced-motion` handling;
- `forced-colors: active` handling;
- PNG screenshot visual regression.

Run:

```bash
npm run gate:browser-runtime
npm run certify:browser
```

Reviewed screenshot baselines are only updated with:

```bash
npm run visuals:update
```

## React adapter boundary

The kernel still has **zero external package dependencies in `dependencies`**. React is an optional host-provided peer for `@maataa/react` at `>=18.2.0 <20`.

M2 certifies MAATAA's adapter host contract and browser semantics; it does not claim to certify the third-party React implementation itself. See ADR-002 and ADR-004.

## Governed control invariant

`Context → Recommendation → Proposal → Policy → Approval → Authorized Command → Dispatch → Ack/Nack → Observed State → Verification → Evidence`

ACK is not verification. Browser UI is not a safety-rated hardware layer.

## Canonical toolchain

- Node `22.16.x`
- npm `10.9.2`
- root npm workspaces
- `package-lock.json`
- no pnpm/Turbo/Nx/Lerna in the certified tree

## Tree-only kernel reproducibility

`npm run fresh-clone` still copies the repository to a clean temporary checkout, uses an empty npm cache, runs `npm ci --offline --ignore-scripts`, and executes `certify:kernel`. Browser certification is an additional environment-dependent gate in the full certification lane.

## Full certification

```bash
npm ci --ignore-scripts
npm run certify
```

The canonical result is `certification/certification.json`; `certification/REPORT.md` is generated from it.
