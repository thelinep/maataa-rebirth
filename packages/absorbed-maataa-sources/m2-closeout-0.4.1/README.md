# MAATAA UI V3 — M2 Browser & React Adapter Certification

Release: **0.4.1 — M2 closeout**

MAATAA UI remains foundation-first: 11 active workspace packages, M1-frozen v1 contract/API/registry compatibility, and an M2 browser/React-adapter certification lane whose evidence boundaries are now explicit before M3 begins.

## Active kernel

`contracts → core/registry → ai/governance/renderer/adapter-sdk → control → react → recipes → testing`

Camera, robotics, IoT, building, spatial/digital-twin and broader domain packs remain roadmap/experimental surfaces.

## Completed milestones

- **M0R / 0.3.3** — retrospective foundation reconciliation
- **M1 / 0.3.3** — contract/API/registry freeze and lifecycle invariant hardening
- **M2 / 0.4.1** — browser + React-adapter certification and evidence closeout

## M2 browser certification

M2 is pinned to **Chromium 144.0.7559.96** through direct Chrome DevTools Protocol automation. Other browser versions are not implied certified.

Browser coverage includes accessibility-tree semantics, keyboard/focus/live-region behaviour, 390/768/1440 responsive checks, reduced motion, forced colors, and screenshot regression for the ten canonical semantic-state tokens.

See:

- `docs/BROWSER-CERTIFICATION.md`
- `docs/GATE-MATRIX.md`
- `docs/VISUAL-REGRESSION.md`
- `docs/CERTIFIED-SURFACES.md`
- `docs/NOT-CERTIFIED.md`
- `docs/adr/ADR-005-CDP-INSTEAD-OF-PLAYWRIGHT-AXE-IN-M2.md`

## React adapter boundary

React remains an optional host-provided peer at `>=18.2.0 <20`; the certified kernel still has zero external packages in workspace `dependencies`. M2 certifies MAATAA's adapter host contract, not upstream React. Shipped and M3-deferred hooks are listed in `docs/REACT-SURFACE.md`.

## Foundation closeout

`docs/M0R-FINDINGS.md` records the original M0 foundation concerns and marks every item resolved, partially resolved, or explicitly deferred. Blocking M0R findings remaining: **0**.

## Certification

Kernel-only/tree-only lane:

```bash
npm run certify:kernel
npm run fresh-clone
```

Full M2 lane additionally requires the pinned Chromium runtime:

```bash
npm run gate:browser-runtime
npm run certify:browser
npm run certify
```

Visual baselines can only be intentionally updated with:

```bash
MAATAA_VISUAL_REVIEW=approved npm run visuals:update
```

The canonical certification result is `certification/certification.json`; `certification/REPORT.md` is generated from it.
