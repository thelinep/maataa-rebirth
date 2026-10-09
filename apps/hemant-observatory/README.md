# Hemant Samwat Observatory Runtime

A local, inspectable observatory app inside the MAATAA alpha7 checkout: a std-only Rust time core and CLI (`hemant-shell`), a Next.js App Router interface, and local API routes that only return contract-valid Rust output. Every result names its method, evidence class, time scale, uncertainty and limitations. Astronomy and Panchanga values are **pending**: none are computed.

## Run locally (macOS)

```sh
cargo build --workspace --offline          # builds target/debug/hemant-shell
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 4210
# or: pnpm dev   (runs the same two steps)
```

All checks: `bash scripts/check.sh` (Rust fmt/test/clippy/build, fixture drift, contract tests, tsc, next build, Playwright desktop + mobile). Logs go to `evidence/`.

## Architecture

| Layer | Files | Notes |
| --- | --- | --- |
| Time core | `crates/hemant-core/src/time.rs` | Injectable `WallClock`; `WallClockSnapshot` (point reading, unverified, uncertainty unknown); `MonotonicInterval`; Unix ns → proleptic Gregorian UTC for 0001–9999; leap seconds not counted. |
| Units | `units.rs` | User-selected Kashi epoch (minute precision) and `hemant-traditional-units-v1`. |
| Method registry | `registry.rs` | `hemant.method-registry/1`, the single source of method provenance. |
| Result envelope | `result.rs` | `hemant.time-result/2` with `reading`, `civil`, `epoch`, `elapsed`, `pending`, `methods_used`. |
| Ephemeris boundary | `astronomy.rs` | `EphemerisProvider` trait; only `NoEphemeris` (always `Pending`). |
| CLI | `crates/hemant-shell` | `--json`, `--unix-nanos N`, `--methods-json`; fails closed on bad arguments. |
| Contract (TS) | `lib/contract.ts` | Strict validators shared by routes, UI and tests. |
| Shell bridge | `lib/shell.ts`, `lib/time-response.ts` | Fixed binary, fixed argument shapes, 2 s timeout, 64 KB output, empty environment. |
| API | `app/api/{time,convert,methods}` | `convert` accepts only `unix_nanos` (bounded signed integer). |
| UI | `components/observatory.tsx`, `components/modules/*`, `app/[section]` | 15 module pages plus the overview. |

## Module status

| Module | Status | Works now | Pending |
| --- | --- | --- | --- |
| Live clock & converter | Implemented | Host snapshot with age, UTC, IST, Hemant units, input conversion | Trusted time source, TAI/TT/TDB, sidereal time |
| Observatory | Workspace · pending | Labelled illustrative SVG + text equivalent, state-query builder | Computed positions |
| Panchanga | Workspace · pending | Field definitions, decision checklist | Ruleset decision and all values |
| Sankranti | Workspace · pending | Sign boundaries, dependency map, epoch relation | Event-time calculation |
| Brahmi cosmology | Reference | Evidence layers, Unicode ranges | Sourced transliteration engine |
| API & developer | Implemented | Three local endpoints, CLI, live schema | Hosted API/SDK |
| Educational astronomy | Reference | Time-scale and position-type explanations | Guided exercises |
| Simulation timeline | Partial | Sourced/definitional/user-selected dated items with filters | Computed events |
| Services | Reference | Honest inventory incl. undeployed domains | Any hosted service |
| Methods & sources | Implemented | Registry rendered from Rust | Astronomy/Panchanga methods |
| Mobile | Partial | Device vs snapshot comparison | Offline logging |
| Widgets | Partial | Clock widget with source/age | Published embed |
| Modes | Implemented | Mode switch over identical evidence | — |
| Planetary analytics | Workspace · pending | Body/frame reference, query builder | All coordinates |
| Ratio engine | Workspace · pending | Definition draft + checklist (not stored) | Accepted definitions (none) |

## Limits

- Host time is a point snapshot, **unverified**, uncertainty **unknown**. Agreement with another clock is not verification.
- Unix time skips leap seconds; the elapsed Hemant units are a Unix-time difference.
- The 1979 epoch is user-selected (minute precision); its Sankranti instant is not recomputed.
- The overview sky diagram and the Observatory SVG are illustrative.
- No database, realtime feed, telemetry, account system or network collection exists. Requested domains are not deployed.

Design records: `ASTRONOMY-METHODS.md`, `ASTRONOMY-DECISION-001.md`, `PANCHANGA-DECISION.md`, `DEPENDENCIES.md`. Progress: `PROGRESS.md`.
