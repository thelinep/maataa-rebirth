# Enterprise 1.0 roadmap

Resume point: the engineering implementation is committed through governance; the final security inventory and release evidence changes complete the interrupted engineering work. This file records implementation coverage, not current qualification. Current execution status lives in each exact-commit release pack's `release.json` and `dashboard.json`.

The remaining steps below track enterprise release qualification. Product capability work from the current registry/specimen prototype to a complete, adoptable UI product is sequenced separately in [`PRODUCT-ROADMAP.md`](../product/PRODUCT-ROADMAP.md).

| Steps | Delivered scope | Implementation commits |
| --- | --- | --- |
| 01–03 | Safe generated source, identifiers and adversarial regressions | c399812 |
| 04–06 | Canonical compatibility status and complete searchable discovery | d3aeda1, fcb47a8 |
| 07–10 | Generated layout audit/loaders, selected layout execution and matching code generation | 2c29cbb |
| 11–13 | Canonical device runtime, container responsiveness and declared capability checks | 63194a9, 20560f8 |
| 14–17 | Critical keyboard/focus contracts and browser accessibility tests; manual review separate | 809b324, 9ca0656 |
| 18–20 | Source-backed grammar, CompositionSpec v1 and bounded host planner | 1c492fa, 6735f89 |
| 21–22 | Resolved public export classification and canonical identity/versioning policy | 95f5c47 |
| 23–24 | Packed Vite, Next, React minimum peer and Node minimum SSR consumers | d2ad6fb, 04be6f3 |
| 25–26 | Dependency audit, active dependency graph, SBOM and license inventory; distribution approval separate | bf73e9c, resumed security milestone |
| 27–28 | Measured module topology, bundle ceilings and local runtime trials | 241af72, 60a24ed |
| 29–30 | Generated canonical documentation and Chromium/Firefox/WebKit matrix | 7cff7f1, 9ca0656 |
| 31 | Clean exact-commit automated evidence with checksums and machine-readable dashboard | d4e0d27, resumed evidence milestone |

Run `pnpm certify:enterprise` from a clean committed tree. The workflow preserves raw results under `.certification/release-evidence/<commit>/<run>/`. Exit 1 means failed automation; exit 2 means automated PASS with enterprise release BLOCKED. No current PASS is stored in this document because changing source invalidates qualification for the new commit.

## Remaining release milestones

User designations recorded on 2026-10-05: **TLPS** is the selected enterprise pilot; **Hemant Kumar Dixit** owns release approval and private security reporting. Pilot integration/results, owner acceptance, a private reporting channel and response commitments remain pending. Additional structurally different pilots are still needed for multi-product acceptance. Historical dashboard ownership blockers refer to missing acceptance evidence; the designation alone does not turn those gates into PASS.

| Step | Milestone | Required evidence |
| --- | --- | --- |
| 32 | Alpha qualification/promotion | Exact candidate automation, reviewed scope and deliberate version/tag decision; frozen alpha8.6 stays unchanged |
| 33 | Beta 1 | Packaging/security acceptance, license approval, manual accessibility and representative device review |
| 34 | Enterprise pilots | Named, structurally different real applications and measured integration/upgrade outcomes |
| 35 | Beta 2 | Accepted pilot results, developer experience, deterministic bounded planning and performance evidence |
| 36 | API/schema freeze | Human approval of API, canonical IDs, schema and migration commitments |
| 37 | RC1 | Release owner, private security channel, supported-version acceptance and controlled publishing |
| 38 | Fresh complete certification | Repeat the full exact-candidate matrix plus all accepted external/manual evidence |
| 39 | Enterprise 1.0 GA | Accepted RC evidence, owner approval and qualified release/publisher provenance |

No remote is currently configured and the package remains private. Repository protection and controlled publishing therefore remain blocked. License records are inventory, not legal acceptance; local performance trials are not production targets; automated accessibility is not screen-reader or real-device acceptance. These external requirements must be supplied and reviewed before promotion. Keep the package version unchanged until a dedicated qualified release step.
