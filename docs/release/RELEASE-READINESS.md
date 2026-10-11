# Release readiness

**Current disposition: BLOCKED for Beta/RC/GA promotion.** The package remains private and no public release is claimed.

The latest saved exact-commit enterprise run is `eef053ffb9b1df3d332a4ed3f125391790f2a613` (`1.0.0-alpha.8.4`, finished 2026-10-06T20:13:16Z). Its automated gates report **PASS**, while external/manual gates keep `releaseCertified: false` and overall status **BLOCKED**. That run does not qualify any later commit. As of 2026-10-11 the release branch `feat/alpha8.7-composition-kernel` has a clean tree at `cc11c3a7` plus this documentation update; no exact-candidate run exists for it. See the exact [release record](../../.certification/release-evidence/eef053ffb9b1df3d332a4ed3f125391790f2a613/1791317304445/release.json) and [dashboard](../../.certification/release-evidence/eef053ffb9b1df3d332a4ed3f125391790f2a613/1791317304445/dashboard.json).

Outstanding acceptance includes real TLPS and structurally different application pilots, legal/license approval, manual screen-reader and representative real-device review, approved runtime performance targets, API/schema freeze, private security reporting route and response commitments, remote tag protection, controlled publisher, and a fresh clean-tree certification pack.

**Certification scope boundary.** `pnpm certify:enterprise` qualifies the `@maataa/ui` package only: typecheck covers `src` (`tsconfig.json`), unit tests cover root `tests/**/*.test.ts(x)` (`vitest.config.ts`), and browser tests cover `tests/e2e` (`playwright.config.ts`). `apps/hemant-observatory` and the Hemant clock display in MAATAA Desktop (`apps/maataa-desktop-tauri`) are present in the repository and candidate history but are **outside the `@maataa/ui` release claims and certification scope**. An enterprise PASS or BLOCKED pack for a candidate does not certify, validate, or release either Hemant surface. Uncommitted Hemant planetarium work is preserved on branch `hemant/planetarium-wip` and is not part of the candidate.

**Repository remote (verified 2026-10-11 by `git fetch`).** `origin` is `https://github.com/thelinep/maataa-rebirth.git`. It exposes one branch, `feat/alpha8.7-composition-kernel` at `d7f3e7a2`; the local branch was 0 behind and 5 ahead before this documentation commit. The remote has **no tags**: `maataa-ui-alpha8.5.3` and `maataa-ui-alpha8.6` exist locally only. Remote tag protection and controlled publishing remain **unverified**; Git access alone cannot read repository-host protection settings.

NEVO Events remains an **unselected** structurally different pilot candidate. It is not a recorded release commitment until an application owner is named and approves a charter.

The package version stays `1.0.0-alpha.8.4` (deliberate release debt per [governance](../governance.md)); existing tags are immutable and are not moved.

The named MAATAA release approval/private-security-reporting owner is Hemant Kumar Dixit. This designation does not constitute approval or configure the private reporting route. Application pilot owners and acceptance remain separate.

For product maturity, pilot status, implementation scope, saved passes, release steps, and the sequenced closure plan, use the [completion matrix](COMPLETION-MATRIX.md). Follow [`ROADMAP.md`](ROADMAP.md) for steps 01–39 and [`EVIDENCE.md`](EVIDENCE.md) for exact-candidate evidence rules.
