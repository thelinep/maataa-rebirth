# Acceptance gate status — 2026-10-12

This is a supplemental status snapshot, not a certification report or release approval.

## Evidence boundary

- Branch: `feat/alpha8.7-composition-kernel`.
- HEAD observed: `ff908c17b5d5dba865cde17ea16af531f97b5120`.
- The worktree was dirty when reviewed. At the initial snapshot it contained six modified files and one untracked local-IPC security note; this status addendum is also new and uncommitted. These changes are not covered by a clean-tree release pack.
- The latest saved enterprise pack remains the historical pack for `255854d577870fbc25b8c20ca2e515a9fa700566`. It is not evidence for this HEAD or the current dirty tree.
- The current local Auth/API IPC change uses a private Unix-domain socket and passed its scoped Rust tests outside the restricted network sandbox. It does not create the separate security-vulnerability reporting route required by Gate 8.
- A fresh root certification was not run. The local `vitest` and `tsc` launchers are absent after the earlier offline install failed on a missing `semver@6.3.1` tarball. `pnpm api:check` was attempted and stopped because `typescript` is not installed (`ERR_MODULE_NOT_FOUND`). No install retry or network fetch was made.
- `pnpm performance:check` passed the saved bundle-regression artifact (topology generated at `2026-10-12T05:40:28.221Z`): initial JS 998,585 B / gzip 175,183 B; composer JS 98,622 B; largest async JS 292,437 B. The script explicitly leaves route JS, registry parse cost, time-to-interactive and memory as `NOT_RUN`; this artifact is not a fresh source build or device performance acceptance.

## Gate disposition

| Gate | Status now | Remaining acceptance evidence |
| --- | --- | --- |
| 1. Product scope | **Scope selected; formal record pending** | `@maataa/ui` only; applications, including Hemant and Desktop, remain outside release claims. The tested support boundary below is selected under the user's delegation; preserve owner acceptance in the release record. |
| 2. License approval | **Pending external legal/release review** | Review the current exact-candidate license/SBOM inventory and record approval or conditions. The saved inventory belongs to the historical pack only. |
| 3. Screen-reader review | **Pending human review** | Complete VoiceOver/Safari on macOS and iOS, and NVDA with a supported Windows browser; record routes, findings, reviewer, date and exact candidate. |
| 4. Real-device acceptance | **Pending physical-device review** | Complete the documented phone, tablet and laptop matrix, including text scaling, orientation, keyboard/touch and all public routes. Emulated browser checks do not close this gate. |
| 5. Runtime performance | **Thresholds selected; measurement pending** | Apply the targets below on a clean candidate and representative mobile/desktop devices. The existing synthetic measurements and regression budgets are not proof of field performance. |
| 6. Enterprise pilots | **Blocked on external participants and systems** | TLPS owner must name participants and provision/verify its sandbox; a second structurally different application and its owner must be selected. Run each against an exact candidate and record owner disposition. |
| 7. API/schema freeze | **Freeze applied; acceptance recorded in chat, unsigned** | The stable export and canonical-ID guards are in the repository. Preserve the signed/dated owner acceptance record for the exact candidate; re-run `pnpm api:check` during fresh certification. |
| 8. Private security reporting | **Route chosen; activation blocked** | Preferred route: GitHub private vulnerability reporting for `thelinep/maataa-rebirth`. A repository admin must verify repository eligibility, enable it, verify notification delivery and monitoring, and accept response commitments. No root `SECURITY.md` is published before this is live. If repository eligibility fails, a monitored mailbox must be provided and verified instead. |
| 9. Release ownership | **Blocked** | The designated release owner must review the completed gates and record APPROVE FOR BETA or HOLD for an exact candidate. |
| 10. Remote tag protection | **Blocked on repository-admin access** | Verify remote tag state, configure an active rule preventing deletion/force updates to `maataa-ui-*`, and save repository-host evidence. Current local `gh auth status` reports invalid credentials, so no remote setting was inspected or changed. |
| 11. Controlled publisher | **Blocked** | Select and configure an authorized registry and CI publisher with provenance; validate the publish path only after Gates 1–10 are accepted. Package remains private; no publish or deploy was attempted. |
| Fresh exact-candidate qualification | **Environment-blocked** | Restore a populated local dependency store or use an authorized CI runner with dependencies available; obtain a clean exact commit, run the certification suite, then record its resulting evidence pack. |

## Performance targets selected for qualification

Under the user's delegation to choose performance targets, use the current Core Web Vitals “good” thresholds as release goals, measured at the 75th percentile and reported separately for mobile and desktop:

- Largest Contentful Paint (LCP): **≤ 2.5 seconds**.
- Interaction to Next Paint (INP): **≤ 200 milliseconds**.
- Cumulative Layout Shift (CLS): **≤ 0.1**.

These are product acceptance thresholds, not measured outcomes. Measure representative real-user or approved field-equivalent cohorts; lab-only values may diagnose regressions but do not establish field acceptance. Keep existing byte-size and automated timing budgets labelled as engineering regression limits. Source: [web.dev Web Vitals](https://web.dev/articles/vitals), which defines these thresholds and recommends assessing the 75th percentile separately for mobile and desktop.

## Product support boundary selected

Under the user's delegation to decide release scope, the supported package boundary is:

- Artifact: private `@maataa/ui` package only. Hemant, MAATAA Desktop shells, Support Center, Brahmini, TLPS/TLP Film applications and demos, Workstation, ALLB, and local Auth/API are excluded from package release and certification claims.
- React and React DOM: `>=18.2.0 <20`; `react-redux`: `>=9.1.0 <10`, as consumer-provided peer dependencies.
- Consumer environments: packed Vite fixtures with React 18.2 and React 19; Next App Router **16.3.8 only**; plain Node 20 SSR import. No wider Next-version support is claimed, and toolchain qualification on minimum Node 20 remains distinct from a Node 20 import smoke test.
- Browser automation: Chromium, Firefox and WebKit on desktop and small/mobile viewports. This does not include a real-device, assistive-technology, or WCAG-conformance claim.
- Native mobile, Tauri/Electron shells and operating-system runtime integrations are out of scope.

This is a narrow, test-bounded support statement. The export and schema freeze already applied in `manifests/STABLE_API.json` and `manifests/CANONICAL_IDS.json` remains limited to that recorded list; other exports stay experimental.

## Security reporting route selected

The selected route is GitHub private vulnerability reporting, conditional on repository eligibility and successful admin activation. GitHub's current documentation says repository owners/admins enable it in repository security settings and that reporters then receive a private reporting form; the documented GitHub.com flow is for public repositories. Therefore this choice is not live evidence: repository visibility/plan eligibility, activation, notifications and on-call monitoring must be verified by an authorized administrator. Under the user's delegation, select these response targets: acknowledge within 3 business days; initial assessment within 7 business days; target mitigation within 30 calendar days for high/critical reports; lower-severity findings are triaged into a planned release; supported versions are the latest prerelease line until GA. The designated owner must record acceptance of these commitments. Do not expose a contact route or claim availability before the route is active and monitored.

## Work completed in this review

- Reconciled saved release evidence with the actual branch, HEAD and dirty worktree.
- Confirmed that the existing product-scope and API-freeze records are chat-based and unsigned, and that the stable API guards already exist.
- Selected measurable performance goals under the user's delegation; device measurements remain pending.
- Selected GitHub private vulnerability reporting as the preferred route; actual activation is blocked by missing valid GitHub authentication and repository-admin verification.
- Did not alter tags, publish, deploy, enable a remote setting, or represent a human/legal/device/pilot approval.
