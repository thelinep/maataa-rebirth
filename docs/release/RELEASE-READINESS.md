# Release readiness

**Current disposition: BLOCKED for Beta/RC/GA promotion.** The package remains private and no public release is claimed.

The latest saved exact-commit enterprise run is `9a18d8f5806cc1661b3619e8371948f775c2f808` (`1.0.0-alpha.8.4`, darwin arm64, Node v22.22.3, finished 2026-10-11T12:11:59Z) on branch `feat/alpha8.7-composition-kernel`, clean at start and at finish. All 20 execution gates and source integrity report **PASS** (unit tests 323/323; browser 450/450 across six Chromium, Firefox and WebKit projects), so `automatedStatus` is **PASS**; external/manual gates keep `releaseCertified: false` and overall status **BLOCKED** (exit 2). It qualifies that commit only: later commits, including the documentation commit recording this result, are not covered. Earlier runs on `e1016429` and `8461cef2` failed (cross-app browser specs, a stale catalogue test, a 4.4:1 contrast defect, and a stale public-surface manifest) and were fixed in `8461cef2` and `9a18d8f5`. See the exact [release record](../../.certification/release-evidence/9a18d8f5806cc1661b3619e8371948f775c2f808/1791720393081/release.json) and [dashboard](../../.certification/release-evidence/9a18d8f5806cc1661b3619e8371948f775c2f808/1791720393081/dashboard.json). The previous pack for `eef053ff` (2026-10-06) is superseded.

Outstanding acceptance includes real TLPS and structurally different application pilots, legal/license approval, manual screen-reader and representative real-device review, approved runtime performance targets, API/schema freeze, private security reporting route and response commitments, remote tag protection, controlled publisher, and a fresh clean-tree certification pack.

**Certification scope boundary.** `pnpm certify:enterprise` qualifies the `@maataa/ui` package only: typecheck covers `src` (`tsconfig.json`), unit tests cover root `tests/**/*.test.ts(x)` (`vitest.config.ts`), and browser tests cover `tests/e2e` (`playwright.config.ts`). `apps/hemant-observatory` and the Hemant clock display in MAATAA Desktop (`apps/maataa-desktop-tauri`) are present in the repository and candidate history but are **outside the `@maataa/ui` release claims and certification scope**. An enterprise PASS or BLOCKED pack for a candidate does not certify, validate, or release either Hemant surface. Uncommitted Hemant planetarium work is preserved on branch `hemant/planetarium-wip` and is not part of the candidate.

**Repository remote (verified 2026-10-11 by `git fetch`).** `origin` is `https://github.com/thelinep/maataa-rebirth.git`. At that fetch it exposed one branch, `feat/alpha8.7-composition-kernel` at `d7f3e7a2`; the branch was later pushed to `3e6120c2` (2026-10-11). The remote has **no tags**: `maataa-ui-alpha8.5.3` and `maataa-ui-alpha8.6` exist locally only. Remote tag protection and controlled publishing remain **unverified**; Git access alone cannot read repository-host protection settings.

NEVO Events remains an **unselected** structurally different pilot candidate. It is not a recorded release commitment until an application owner is named and approves a charter.

The package version stays `1.0.0-alpha.8.4` (deliberate release debt per [governance](../governance.md)); existing tags are immutable and are not moved.

The named MAATAA release approval/private-security-reporting owner is Hemant Kumar Dixit. This designation does not constitute approval or configure the private reporting route. Application pilot owners and acceptance remain separate.

**Release scope (owner-accepted 2026-10-11):** this release counts only the `@maataa/ui` package. Hemant and all other applications in the repository are not part of it and are not described as released or certified. See gate 1 of the [acceptance packet](ACCEPTANCE-PACKET.md).

For each outstanding manual/external gate, its decider and the record to fill, use the [acceptance packet](ACCEPTANCE-PACKET.md).

For product maturity, pilot status, implementation scope, saved passes, release steps, and the sequenced closure plan, use the [completion matrix](COMPLETION-MATRIX.md). Follow [`ROADMAP.md`](ROADMAP.md) for steps 01–39 and [`EVIDENCE.md`](EVIDENCE.md) for exact-candidate evidence rules.
