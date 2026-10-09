# Phase 5 runtime evidence — 2026-10-09

Captured from the Cowork Linux VM on the user's Mac (aarch64, Node v22.23.2,
Python 3.10.12). External repositories were opened read-only; git was run
with `--no-optional-locks`, and the ALLB working-tree listing was identical
before and after the checks below.

## Selected commits and working-tree state

| Repository | Commit | Branch | Working tree |
| --- | --- | --- | --- |
| `/Users/vesahe/Documents/Repos/allb.xyz` | `de82c3691ae3ebdf6607cbcdf79d5e7c4e2d5378` (2026-10-02, "Prakriya core…") | `codex/phase1-reproducible` | Dirty: `M Cargo.toml`, `D docs/BRAHMI_FONT_PROTOTYPE.md`, `D package-lock.json`, `?? docs/AGI_BRIDGE_ROADMAP.md`, `?? pnpm-lock.yaml`, `?? pnpm-workspace.yaml`, `?? src/bin/maataa_shell.rs` |
| `/Users/vesahe/revenue/live/maataa-os` | `50fce492e9db0c0f88839a1cf03932709ef24b09` | `main` | Clean |
| `maataa-ui-full-alpha7` (this checkout) | `9c8d8433` + pre-existing local edits + the Phase 1–5 files listed in `PHASES-1-5-INTEGRATION-STATUS.md` | — | Dirty (pre-existing work preserved) |

Because ALLB is dirty, any result below is for "de82c369 plus local edits",
not for a clean commit.

## Checks run (read-only)

| Check | Command | Result |
| --- | --- | --- |
| ALLB contract drift | `node scripts/generate-contracts.mjs --check` | **Pass** (exit 0) — generated TS/Python/JSON-schema contracts match the spec |
| ALLB Python contract tests | `PYTHONDONTWRITEBYTECODE=1 python3 -B -m unittest contracts/test_python_contracts.py` | **Pass** — 4 tests |
| ALLB structured-file validation | `node scripts/validate-structured-files.mjs` | **Not runnable** — `ajv` package not installed in that checkout (exit 1, `ERR_MODULE_NOT_FOUND`) |
| ALLB repository hygiene | `node scripts/repository-hygiene.mjs` | **Fail** — "Required baseline file missing: package-lock.json" (consistent with the working-tree deletion above) |
| Desktop contract suite (alpha7) | `pnpm test:contracts` equivalent: `tsc -p tsconfig.contracts.json` + `node --experimental-strip-types --test tests/contracts/*.contract-spec.ts` | **Pass** — tsc exit 0; 38 tests: 37 pass, 0 fail, 1 skipped (live runtime check, see below) |

## Checks NOT run, and why

| Check | Reason |
| --- | --- |
| ALLB `cargo test --workspace --locked`, clippy, fmt | No `cargo`/`rustup` in the VM. Not installed (installing toolchains needs your approval). |
| ALLB WASM build / `wrangler dev` / live `/health` | Needs cargo + wasm-pack + wrangler. Therefore **no live Desktop↔ALLB handshake was performed.** |
| ALLB RTL (`make sim …`) | No simulator toolchain in the VM. |
| maataa-os `./scripts/smoke-alpha.sh` (cargo check, host unit tests, release build, sizecheck, QEMU) | No cargo, no `thumbv7m-none-eabi` target, no `qemu-system-arm`. The `maataa-os.bin` in the tree is dated 2025-11-06 and is **not** accepted as current evidence. |
| alpha7 Tauri `cargo test` | No cargo in the VM; the crate also `compile_error!`s on non-macOS. |
| alpha7 Vitest / Vite builds / Playwright | `node_modules` were installed on macOS; the Linux VM lacks `@rollup/rollup-linux-arm64-gnu` and Playwright browsers. |

## Disk

Free space on the Mac volume was measured at 11 GB, then 8.2 GB, then
6.1 GB during this session (this session wrote only small text files). That
is at or below ALLB's own 6 GiB preflight minimum, so no large build should
be started until space is recovered.

## Not claimed

No production readiness, hardware readiness, K7 backing, Siddham NPU
execution, Hemant Samwat timing, or live Desktop↔runtime integration is
claimed by this evidence.

## Follow-up (same day)

Free space recovered to 37 GB. Native macOS checks still could not be run from
this session: the Cowork VM has ~330 MB of its own disk and no Rust/QEMU, and
Terminal can only be granted to Claude in click-only mode (no typing). The
collector `scripts/collect-runtime-evidence.sh` was added so the checks can be
run on macOS in one command; it was dry-run in the VM (all cargo steps
correctly SKIPPED as "cargo not found", external repos confirmed unchanged).

## macOS run 20261009T003252Z (`runtime-evidence-20261009T003252Z.log`)

Host: Darwin 27.0.0 arm64; cargo/rustc 1.91.0 (default toolchain), rustup
1.29.1, node 22.22.3, QEMU 11.1.2, Arm GNU size 2.44. 36 GB free. All three
repositories had identical `git status` before and after.

| Check | Result |
| --- | --- |
| alpha7 contracts typecheck | **Pass** |
| alpha7 contract tests | **Pass** — 38 tests: 37 pass, 0 fail, 1 skipped (live runtime) |
| alpha7 Tauri `cargo test --offline --locked` | **Pass** — 9 passed (existing registry/browser tests; no Rust was changed in Phases 1–5) |
| ALLB cargo tests | **Skipped** — `rust-toolchain.toml` pins `1.91.0`, which is not installed under that name (the default toolchain is the same rustc 1.91.0). The collector now uses the same-version default toolchain and logs the substitution. |
| maataa-os host tests / check / release build | **Not evaluated (blocked)** — exit 101 because crate `bare-metal v0.2.5` is not in the local cargo cache and builds run `--offline`. This is a missing-dependency blocker, not a test failure. QEMU and size steps did not run. |

## macOS run 20261009T003534Z (`runtime-evidence-20261009T003534Z.log`) — fresh runtime evidence

Run with `MAATAA_EVIDENCE_ALLOW_FETCH=1` (user-approved `cargo fetch --locked`
into `~/.cargo`). All builds/tests `--offline --locked`, build output in
`~/maataa-evidence-build`. All three repositories had identical `git status`
before and after (ALLB still has its pre-existing 7 dirty paths).

| Check | Commit | Result |
| --- | --- | --- |
| alpha7 contract typecheck + tests | `9c8d8433` + local edits | **Pass** — 37 pass, 0 fail, 1 skipped (live runtime) |
| alpha7 Tauri `cargo test` | same | **Pass** — 9 |
| ALLB contract drift | `de82c369` + 7 dirty paths | **Pass** |
| ALLB `cargo test` (runtime + siddham-contracts) | same | **Pass** — 5 runtime + 3 contract tests. HAL logged "Physical /dev/mem unaccessible. Operating in HW Simulation Mode." Toolchain: `stable-aarch64-apple-darwin` = rustc 1.91.0, substituted for the pinned name `1.91.0` (same version, logged). |
| ALLB `cargo test -p siddham-authority-desktop` | same | **Pass** — 31 (one `unused import: ProtectedAction` warning) |
| maataa-os host unit tests | `50fce492` (clean) | **Pass** — 31 |
| maataa-os `cargo check` + release build (thumbv7em-none-eabihf) | same | **Pass** — binary sha256 `947213ed4d629abd0085fb8f488041e9c01a8988f3d2777d29cd0456b7990b85` |
| maataa-os size | same | **Pass** — text 15,752 B, data 0, bss 8 (limit 524,288) |
| maataa-os QEMU boot (netduinoplus2, cortex-m4) | same | **Pass** — 5/5 virtual drivers, virtual flash, 2 static capsules, 6 scheduler ticks "health: nominal", clean semihosting exit (exit 0, not the 60 s alarm) |

### What this evidence does and does not establish

- It is fresh, commit-tied evidence that ALLB's software-native runtime and Authority tests pass (on a dirty tree) and that the maataa-os QEMU alpha builds, fits, and boots on a clean commit.
- The prototype's own banner lines (e.g. "verification certified: true", "comm frame signed: true") are its simulated engine outputs, not external certification.
- It does **not** establish a Desktop↔runtime connection: no live handshake ran, so the integration gate remains red. ALLB still runs NPU/HAL in simulation; maataa-os runs virtual peripherals only. Not hardware-ready, not K7-backed, no Hemant Samwat time service.

## First live Desktop ↔ ALLB handshake — run 20261009T004442Z (`allb-live-handshake-20261009T004442Z.log`)

- **Runtime built from:** ALLB `de82c369` + its 7 pre-existing dirty paths (unchanged before/after). Built with `cargo build --locked --lib --release --target wasm32-unknown-unknown` (rustc 1.91.0, same-version toolchain substitution) and `wasm-bindgen 0.2.127` (exact `Cargo.lock` version, compiled into `~/maataa-evidence-build/tools`). The installed `wasm-pack` is an x86_64 binary that cannot run on this Mac, so ALLB's optional `wasm-opt` pass was not applied. WASM sha256 `ccafb87b431c554f84e2c22bf6adccb747e4397ad779d159c20f0ef7e207ff0e` (756,198 bytes).
- **Worker:** byte-identical copy of `services/edge_worker/src` (digests recorded), run with `wrangler@4.126.0 dev --local` on `127.0.0.1:8788` using a minimal config (no routes/deploy/build hook; `ENVIRONMENT=local-evidence`). Port 8787 was already held by an unrelated `node` process (PID 966), left untouched.
- **Raw probes:** `/health` → `{"status":"OK","service":"maataa-sovereign-worker","environment":"local-evidence","contractVersion":"1.1.0"}`; tokenize `𑀅𑀆` → `["𑀅","𑀆"]`; sutra 6.1.77 → `इको यणचि`, category Vidhi, with attribution.
- **Desktop handshake (alpha7 adapter):** **connected** — identity `maataa-sovereign-worker`, contract 1.1.0 compatible, health ok, transport `http-loopback`, `runtimeEchoedRequestId: false`, `capabilitiesReported: false`.
- **Integration gate:** **RED** as designed — `capabilities-not-reported-by-runtime`, `missing-capability:brahmi:tokenize`.
- **Observation:** the edge worker's sutra response uses `hardware_gate`, while ALLB's governed `runtime_contract` returns `hardwareGate`. Two ALLB surfaces disagree on field casing; worth an ALLB contract decision before Desktop consumes either.

This is the first evidence of a real process-level handshake between the Desktop adapter and ALLB's runtime. It is local (`wrangler dev`), not deployed; it does not use the governed Authority path (approvals, evidence ledger), and it says nothing about K7, Siddham NPU hardware, or Hemant Samwat time.

## ALLB capabilities endpoint + integration gate GREEN — runs 20261009T010617Z and 20261009T010630Z

Change (approved by the owner, uncommitted in ALLB, pre-existing 7 dirty paths byte-identical): `GET /capabilities` on the edge worker returns `{ contractVersion, capabilities }` serialized by `runtime_capabilities_json()` → `runtime_contract::runtime_capabilities()`; capability `mode` now reflects the build (`SoftwareWasm` in WASM, `SoftwareNative` natively); malformed reports return 500. Desktop adapter reads and strictly validates `/capabilities`.

| Check | Result |
| --- | --- |
| ALLB `cargo test` | **Pass** — 7 runtime tests (5 previous + `native_build_reports_native_mode_and_never_claims_the_npu` + `capability_json_matches_the_shared_contract_shape`) + 3 contract; Authority desktop pass |
| maataa-os, alpha7 Tauri, contract suite | Pass (unchanged) |
| WASM build | sha256 `4533cc4b74af264f8cbd492e50aa9d1cfa9996e0405d430f95c1e3ac9c7a935b` (760,231 bytes, no wasm-opt) |
| Live `GET /capabilities` | 200: `brahmi:tokenize`, `panini:sandhi`, `sutra:lookup` available in `SoftwareWasm`; `siddham:npu` unavailable |
| Live Desktop handshake | **connected**, capabilities reported |
| **Desktop integration gate** | **PASS** — first green run |
| ALLB worker route tests (vitest 4.1.11) | First attempt not evaluated (harness: `vitest/config` unresolvable under `npx`; left a stray `~/node_modules/.vite-temp`). Re-run 20261009T010833Z with vitest installed in the build folder: **Pass — 4 tests** (health, capabilities, malformed-capabilities → 500, unknown route → 404). |

Scope of the green gate: a local `wrangler dev` worker built from ALLB `de82c369` plus uncommitted edits, on this Mac. Not deployed, not the governed Authority path, no NPU, no K7, no Hemant Samwat time. Commit ALLB's changes and re-run to tie it to a clean commit.

Re-run 20261009T010833Z: identical WASM sha256 `4533cc4b…`, worker route tests 4/4 pass, live handshake connected, integration gate PASS, ALLB working tree unchanged.

## TLPS Idea → Script local verification — run 20261009T020051Z

Evidence log: `tlps-idea-to-script-20261009T020051Z.log`. alpha7 HEAD was
`9c8d8433` with the existing local edits; the script's before/after status
files were identical. Its build output was placed outside the repository at
`~/maataa-evidence-build/tlps-dist`. No packages were installed or downloaded.

| Check | Result |
| --- | --- |
| Contracts TypeScript check | **Pass** |
| Contract suite | **Pass** — 58 total; 56 passed, 0 failed, 2 conditional live-runtime tests skipped because `MAATAA_RUNTIME_URL` was unset |
| TLPS TypeScript check | **Pass** |
| TLPS production bundle | **Pass** — built to the external evidence-build directory |
| Mocked TLPS browser flow | **Pass** — 4/4 tests: preview/approval, independent format failure blocks approval, model-digest mismatch refuses the draft, runtime-unavailable state is shown honestly |
| Live local-model browser flow | **Pass** — 1/1 test with local Ollama `llama3.2:latest`; four mocked-only tests skipped in this mode. Brahmini's reported model digest matched the selected digest. The format-only checker passed with 3 scenes and 9 cues. The Playwright harness then saved v2 in its isolated browser context. |

The live check uses a synthetic lighthouse-story prompt and a local model only.
It proves this one local request reached the UI, passed a deterministic
screenplay-shape check, and was stored in a temporary Playwright browser
context. It does **not** qualify the model for screenplay work, grade story
quality, write to an existing user project, show the record in MAATAA Desktop,
or establish production integration. The draft remains marked “not a
production script” and the model remains “unqualified”.

The run initially exposed two test/product mismatches: the test used an
invalid TLPS draft fixture, and the UI expected a keyed provider map while the
real Brahmini endpoint returns a provider array. The fixture now uses a valid
synthetic TLPS plan and the UI handles the endpoint's actual response shape;
mocked tests were changed to use that same shape.

## Brahmini Workbench browser regression — isolated preview

The first browser attempt reused an unrelated Vite server on port 4173 and
timed out against its bootstrap-failed page. A subsequent isolated run built
the current demo to `~/maataa-evidence-build/brahmini-preview-20261009`, served
it on a separate local port, and ran the full Workbench Playwright spec:
**10 passed, 0 failed**. This includes the opt-in pointer-context test and
desktop/mobile review capture. The earlier failure was a stale-preview issue,
not a failing Workbench assertion. No app source or test output was written
into the repository by this browser run.
