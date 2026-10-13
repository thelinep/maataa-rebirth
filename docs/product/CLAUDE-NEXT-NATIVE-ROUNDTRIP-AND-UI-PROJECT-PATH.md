# Next Claude prompt: prove the native round-trip and connect MAATAA UI

Copy everything between the fences into Claude Code/Cowork after opening `$REPO`.

```text
Continue the MAATAA project-path work from the current checkout. Read these first:

- docs/product/MAATAA-ORGANIC-ROADMAP.md
- docs/product/MAATAA-AUTHORITY-MAP.md
- docs/product/CLAUDE-HEMANT-TO-TLPS-EXECUTION-PROMPT.md
- runtime-evidence-20261009T052806Z.log ([source repository only](../REPO-ONLY.md))
- tlps-idea-to-script-20261009T052822Z.log ([source repository only](../REPO-ONLY.md))

This is the next bounded slice, not a request to restart the earlier phases.

## Objective

Prove and then extend the existing local project route:

**Tauri Desktop → MAATAA UI → Brahmini proposal → approved TLPS version → same record back in Desktop.**

One synthetic `prj:` ID and monotonically increasing version must be visible at each claimed hop. The project remains local-only and unauthenticated because the owner confirmed that separate `maataa-auth`, `maataa-db-studio`, and `maataa-api-studio` repositories do not exist yet. Do not invent or imply production services. DB Studio and DBB are distinct until architecture evidence says otherwise.

## Safety and evidence rules

1. Inspect current `AGENTS.md`, `git status`, current commits, package scripts and actual source before editing. The previous evidence is historical; current alpha7 and ALLB trees were dirty at the last check. Preserve all pre-existing dirty/untracked files and all TLPS records. Never reset, clean, delete, overwrite, stage, commit, push, deploy, publish, upload, or modify Google Drive.
2. Work inside alpha7 only. Do not modify `~/revenue/live/maataa-os` or other external checkouts. Do not expose, copy or reuse the plaintext demo seed credentials reported in the OS Electron auth demo.
3. Use only synthetic project ideas in tests and smoke checks. A TLPS write must still require preview plus explicit human approval bound to the exact proposal digest and expected base version. A stale, replayed, rejected or conflicting proposal must not change content.
4. Do not call localStorage a shared database, a UI guard authentication, a QEMU tick elapsed time, or a host timestamp verified Hemant time. Keep the clock basis labelled unverified. Do not qualify the Ollama model from a format check.
5. Do not claim native success based on a browser preview, unit tests, compilation, or a screenshot of a different window. If UI automation cannot observe the native window, report the exact boundary that remains unproven and give the owner a precise manual checklist.

## Step 1 — Fresh baseline and reconcile the report

- Record current branch/commit and exact changed paths for alpha7. Do not “clean up” existing edits.
- Confirm the current state of the Tauri v3 project-link writer, `apps/shared/maataa-workspace.ts`, `apps/tlps/src/IdeaToScript.tsx`, and the MAATAA UI entry points. Locate the true app launch/build commands from the current package scripts; do not guess a command from an old report.
- Confirm whether the prior 14/14 Rust tests and TLPS mocked/live checks still correspond to current source. Re-run relevant safe automated checks after implementation.
- Update no status claim until the current source and evidence agree.

## Step 2 — Native Tauri ↔ TLPS round-trip

- Build and launch the actual local Tauri app using the repository’s documented command. Do not install packages or download data.
- In the native Desktop, open TLPS → Idea → Script. Use a clearly synthetic idea; create/approve version 1 only after showing the exact preview and approval action.
- Verify the native Desktop list displays the exact same `prj:` ID and version 1, and that its history shows the record event. Use “Open record in TLPS” and verify the returned page carries the same ID/version.
- If safe and the UI supports it, approve a second synthetic version and verify the record advances to v2 without changing v1 history. Confirm replay is idempotent and stale versions are rejected without modifying the record.
- Capture concise evidence (command, app build identity, exact UI observations, time/status labels) without saving idea/script content or secrets in logs.
- If a real native window cannot be launched or observed, do not fake this step. Record it as blocked/manual-required and continue independent Step 3 work.

**Gate:** the same project ID/version makes a real native Tauri → TLPS → Tauri round-trip, with no overwrite or stale-version regression. Otherwise the native gate remains open.

## Step 3 — Add MAATAA UI as a real, same-record hop

- Identify the actual MAATAA UI route or launcher destination in this checkout. The existing Desktop opening TLPS directly is not the MAATAA UI hop.
- Add the smallest reviewable handoff so Desktop opens MAATAA UI with the current `prj:` ID and version, and MAATAA UI passes that same context to Brahmini/TLPS. Prefer the existing project-record contract and an explicit local bridge; do not add a second registry or copy project contents into a URL, event metadata or logs.
- On return, refresh the same record from its current authoritative local writer. If the record version changed, show the new version; if the UI has a stale version, refuse the write and explain the conflict.
- Make the boundary explicit: this is a local prototype, with no server-side Auth, DBB or API Studio behind it. Do not claim durable cross-device sharing, multi-user access, or production security.
- Add contract and browser tests for valid context, missing ID, invalid ID, stale version, unavailable TLPS/runtime and failed return navigation. Ensure keyboard use and screen-reader labels remain clear.

**Gate:** one same synthetic ID is visible in Desktop, MAATA UI, Brahmini preview and TLPS; approval creates the next version once; Desktop refreshes that version on return. If any app cannot carry this context through a real boundary, show the exact last proven hop.

## Step 4 — Electron compatibility assessment (do not silently change behavior)

- The saved authority map says Electron has one entry per app and cannot yet represent a TLPS record link safely. Verify this in current source.
- If Electron support is claimed for the same Desktop project path, implement a minimal additive list keyed by stable entry/record ID that preserves the existing TLPS app entry and legacy data. Add migrations and tests for old list formats, duplicates, updates, removal and stale record versions. Preserve existing localStorage values.
- If the change is too broad or unsafe for this slice, leave Electron unchanged and update the roadmap with the exact compatibility gap and a separate acceptance gate. Do not imply the Tauri result applies to Electron.

## Step 5 — Validation and status update

- Run the affected contract tests, TLPS typecheck/build and mocked Playwright suite, Tauri `cargo fmt --check` and `cargo test`, and relevant Desktop/browser tests discovered in Step 1. Re-run `apps/hemant-observatory/scripts/check.sh` only if shared contracts or Observatory integration changed.
- Do not run an external model unless needed and safe. If a local model is used, report exact model digest and keep it unqualified unless a proper task-quality evaluation passes.
- Review the exact diff and changed-file list. Run whitespace/diff checks. Confirm unrelated dirty files are unchanged from the baseline.
- Update `docs/product/MAATAA-AUTHORITY-MAP.md`, `docs/product/MAATAA-ORGANIC-ROADMAP.md`, and the main Claude prompt only where current evidence requires it. Keep Auth/DB Studio/DBB/API Studio marked not implemented; do not fill the absence with mock “connected” indicators.

## Final report format

Report:

1. What changed, with exact paths.
2. Which commands ran and exact pass/fail/skip totals.
3. Whether the native Tauri round-trip was actually observed; include evidence path.
4. Whether the MAATAA UI same-record hop is actually proven.
5. Electron status separately from Tauri.
6. What remains blocked: MAATAA OS time service, Auth, DB Studio/DBB, API Studio, scientific Panchanga/ephemeris decisions, and any unobserved native behavior.
7. Current commit and dirty state; explicitly say nothing was committed or pushed.

Do not call the full Hemant → MAATAA OS → Desktop → MAATAA UI → TLPS chain complete unless the OS bridge and every claimed application/service boundary were exercised with the same record and current-tree evidence. A successful local Tauri/TLPS slice is useful progress, but it is not proof of the entire chain.
```
