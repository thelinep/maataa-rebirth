# Native MAATAA Desktop → MAATAA UI → TLPS round-trip

Date: 2026-10-09 (Asia/Kolkata)

## Scope and isolation

- Source checkout: `9c8d8433a86ec76da3bfb63e49a3ab423c231020` (`feat/alpha8.7-composition-kernel`).
- Built an unsigned macOS WebKit app bundle from the current checkout with a temporary Tauri identifier, `in.maataa.desktop.tauri-smoke`, so the smoke-test record uses a separate application-support registry from the regular MAATAA Desktop installation.
- Used one synthetic test idea only: “A fictional observatory crew discovers a musical signal in an imagined comet.”
- The regular MAATAA Desktop workspace registry was left unchanged. No source code was changed during this native round-trip.

## Observed native results

| Step | Result |
|---|---|
| TLPS Idea → Script preview and explicit approval | PASS — saved project record v1 |
| TLPS → Desktop registration | PASS — Desktop reported the same project ID at v1 |
| Desktop → MAATAA UI / Brahmini Workbench | PASS — same project ID; opened at v1; TLPS and Desktop both showed v1 |
| MAATAA UI → Continue in TLPS | PASS — same project ID; “Up to date at v1” |
| TLPS → Return to Desktop | PASS — Desktop came forward and retained the same ID/version |
| Desktop → reopen record in TLPS | PASS — reopened the same ID at v1 and showed “Up to date at v1” |
| Brahmini script generation in packaged native app | BLOCKED as expected — the packaged app cannot reach the Brahmini runtime; generation control was disabled. No workaround was attempted. |

Native screen evidence was captured in the task view with the Desktop project card and its “Project record · v1” badge visible.

## Automated and build evidence

The current `project-context-20261009T123534Z.log` records successful contract typecheck/tests, TLPS typecheck, Tauri formatting/tests, Desktop web-shell Playwright checks (7/7), TLPS mocked Idea → Script checks (4 passed, 1 live-model check skipped), and project-context browser checks (10/10). The successful run used an alternate free local port after earlier ports were occupied; it did not change the alpha7 working tree.

The current source also built as an unsigned macOS Tauri app bundle. Its unmodified app identifier is `in.maataa.desktop.tauri-trial`; the native smoke used a separate identifier solely for isolated local test data.

## What this proves—and does not prove

This proves a native macOS WebKit window can carry one approved local TLPS record through the Desktop and MAATAA UI context panel and back to TLPS, preserving its ID and version in this test. It remains a local prototype: no sign-in, shared database, or server is behind the record. The TLPS idea/version data and Desktop project index are local app records, not a production service contract.

The run does not prove Brahmini model generation, a qualified script-writing model, Electron parity, cross-device synchronization, production identity/API/database integration, MAATAA OS time integration, or Hemant Samwat verified time. Current displayed event times still use the computer clock and are explicitly unverified.

## Remaining gates, in order

1. Confirm the canonical `maataa-auth`, `maataa-db-studio`, and `maataa-api-studio` sources/contracts; implement or connect one authorized record service instead of treating local app storage as shared authority.
2. Make the packaged Brahmini runtime reachable through its approved local/model path; qualify the model for script drafting and retain preview, explicit approval, and validation before saving a new version.
3. Move Desktop and TLPS persistence onto the agreed record authority with migration, conflict/stale-version handling, access control, audit history, backup, and recovery tests.
4. Add MAATAA OS clock/timer provenance only after a real OS time source is available; carry its source, synchronization age, and uncertainty into Desktop/TLPS events. Keep time marked unverified until then.
5. Repeat the same native acceptance path against the canonical packaged app identity and user-approved test workspace, then verify Electron parity and the required operating systems.
6. Close the TLPS workflow with an accepted script draft and downstream review/export handoff; do not count the idea-only v1 or mocked tests as a finished film-production workflow.

No commit or push was made. Existing unrelated dirty paths were preserved.
