# Manual and external acceptance packet

**Prepared:** 2026-10-11 · **Candidate:** `9a18d8f5806cc1661b3619e8371948f775c2f808` (`1.0.0-alpha.8.4`) · **Automation:** PASS, release BLOCKED (exit 2) — see [release readiness](RELEASE-READINESS.md).

This packet prepares each manual/external gate for the person who must decide it. **Nothing here is an approval.** Every gate below stays `NOT_RUN` or `BLOCKED` until its record block is filled by the named decider and committed. Prepared facts are drawn from the candidate's evidence pack under `.certification/release-evidence/9a18d8f5…/1791720393081/`.

Scope reminder: these gates cover the `@maataa/ui` package only. `apps/hemant-observatory` and the MAATAA Desktop Hemant clock are outside release claims and certification.

| # | Gate (release.json key) | Decider | Prepared here | Status |
| --- | --- | --- | --- | --- |
| 1 | Product scope (supported families, environments, compatibility) | Product-scope owner (unnamed) | Proposed scope below | NOT_RUN |
| 2 | `licenseApproval` | Legal / release owner | Dependency licence summary | NOT_RUN |
| 3 | `screenReaderReview` | Accessibility reviewer | Test matrix and script | NOT_RUN |
| 4 | `realDeviceAcceptance` | Device reviewer | Device matrix | NOT_RUN |
| 5 | `runtimePerformanceTargets` | Release owner | Measured values and proposed targets | NOT_RUN |
| 6 | `enterprisePilots` | TLPS owner + second application owner | Existing charters | NOT_RUN |
| 7 | `apiSchemaFreeze` | Release owner | Pointers to frozen inputs | NOT_RUN |
| 8 | `privateSecurityReporting` | Release/security owner (Hemant Kumar Dixit) | Channel options | BLOCKED |
| 9 | `releaseOwnership` | Release owner (Hemant Kumar Dixit) | Approval record | BLOCKED |
| 10 | `remoteTagProtection` | Repository admin | Commands | NOT_RUN |
| 11 | `controlledPublisher` | Release owner | Prerequisites | BLOCKED |

## 1. Product scope

Proposed for decision (not approved): the private `@maataa/ui` package; React `>=18.2.0 <20`, React-DOM same, react-redux `>=9.1.0 <10`; browsers as exercised by the browser gate (Chromium, Firefox, WebKit; desktop and mobile viewports); ESM consumers qualified by the packed Vite/React and Next fixtures. Excluded: Hemant surfaces, Electron/Tauri shells, Support Center, Brahmini provider behaviour, MAATAA Workstation (validation BLOCKED).

```
Decision: ACCEPT / AMEND / REJECT    Decider:            Date:
Amendments:
```

## 2. Licence approval

Evidence: `licenses.json` lists 591 resolved packages (`reviewStatus: NOT_RUN`). The package itself is MIT and `private: true`. Its only runtime dependency is `@reduxjs/toolkit` (MIT); React, React-DOM and react-redux are peers supplied by the consumer.

| Licence | Count |
| --- | --- |
| MIT | 463 |
| ISC | 45 |
| Apache-2.0 | 33 |
| BSD-2/BSD-3-Clause | 25 |
| BlueOak-1.0.0 | 11 |
| Other permissive (0BSD, MIT-0, CC0, Python-2.0, WTFPL, dual MIT/Apache) | 10 |
| Needs reviewer attention | 4 |

Packages for reviewer attention — all development/build tooling, none in the runtime dependency set:

- `axe-core` 4.13.0 and `@axe-core/playwright` 4.13.0 — MPL-2.0 (accessibility test tooling).
- `@img/sharp-libvips-darwin-arm64` 1.3.4 — LGPL-3.0-or-later (native image library, transitive build tooling).
- `caniuse-lite` 1.0.30001814 — CC-BY-4.0 (browser-support data used at build time).

```
Decision: APPROVE / APPROVE WITH CONDITIONS / REJECT    Reviewer:            Date:
Conditions / attribution notes:
```

## 3. Screen-reader review

Run against the candidate demo preview (`pnpm demo:build` then `vite preview`). Minimum matrix: VoiceOver + Safari (macOS), VoiceOver + Safari (iOS), NVDA + Firefox or Chrome (Windows). Script per public route: page title and landmark navigation; heading order; every interactive control has a name and role; dialogs move focus in and restore it on close; status/validation messages are announced; theme and language controls are operable; no information conveyed by colour alone.

```
Screen reader / browser / OS:        Reviewer:        Date:        Commit:
Routes reviewed:
Findings (severity, route, element):
Disposition: PASS / PASS WITH ISSUES / FAIL
```

## 4. Representative real-device review

Automation covers emulated viewports only. Minimum physical set: one current iPhone (Safari), one mid-range Android (Chrome), one tablet, one macOS laptop and one Windows laptop. Check layout at default and 200% text size, touch target size, orientation change, no horizontal scroll, and keyboard use on laptops.

```
Device / OS / browser:        Reviewer:        Date:        Commit:
Findings:
Disposition: PASS / PASS WITH ISSUES / FAIL
```

## 5. Runtime performance targets

The current numbers are machine-checked **regression limits**, not approved targets. Measured on the candidate (macOS arm64 developer machine, 3 trials × 2 widths per engine):

| Metric | Measured | Current limit |
| --- | --- | --- |
| Navigation to verified interaction, worst sample | 365 ms (Firefox); Chromium 161 ms, WebKit 256 ms | 1000 ms |
| Route JavaScript | 1,418,370 bytes | 2,000,000 bytes |
| Chromium heap | 6.2 MB | 32 MiB |
| Registry cold import | 4.3 ms | 100 ms |
| Initial JS / gzip | 965,596 / 172,142 bytes | 1,060,000 / 190,000 bytes |
| Composer JS / largest async chunk | 97,790 / 290,046 bytes | 108,000 / 393,000 bytes |

Not yet measured: time-to-interactive and memory on representative hardware (`performance.json` marks them `NOT_RUN`). Proposal for decision: adopt the current limits as Beta targets on named reference hardware, and add a low-end Android measurement before RC.

```
Decision: ADOPT / AMEND    Reference hardware and browsers:        Decider:        Date:
```

## 6. Enterprise pilots

Charters and rehearsal: [`2026-10-08-charters-and-rehearsal.md`](../pilots/2026-10-08-charters-and-rehearsal.md). TLPS is authorised but not started; integration lead, operator, privacy reviewer and named participants are `TBD`, and tenant `TLPS-PILOT-SANDBOX-01` is not provisioned. The second, structurally different application is unselected (NEVO is a candidate only). Both pilots must run against an integrated build of a qualified candidate commit and be dispositioned by their owners.

## 7. API and schema freeze

Inputs to review: `manifests/PUBLIC_API*.json` (`public-api.json` in the pack), `docs/canonical-catalog.json` (`registries.json`), [versioning policy](../versioning-policy.md) and [composition spec](../composition-spec.md). Freeze means the decider accepts these exports, canonical IDs, schemas and migration commitments as the Beta contract.

```
Decision: FREEZE / DEFER    Decider:        Date:        Exceptions:
```

## 8. Private security reporting

Required before RC: a private intake route and stated response commitments. Options: GitHub private vulnerability reporting on the repository host (needs the repository to be public or the feature enabled), or a dedicated monitored mailbox. Once chosen, add a root `SECURITY.md` naming the route, supported versions and response times. No route exists today; do not publish one until it is monitored.

```
Route:        Acknowledge within:        Fix/advisory target:        Owner:        Date:
```

## 9. Release ownership

Hemant Kumar Dixit is the designated release owner. Designation is not approval. The owner records disposition of this candidate after gates 1–8 are filled.

```
Candidate:        Disposition: APPROVE FOR BETA / HOLD        Owner:        Date:
```

## 10. Remote tag protection

As of the 2026-10-11 fetch, `origin` (`thelinep/maataa-rebirth`) has one branch and **no tags**; the local tags `maataa-ui-alpha8.5.3` and `maataa-ui-alpha8.6` are unpublished. With repository admin rights, push the existing tags unchanged, then add a tag ruleset (block deletion and force updates for `maataa-ui-*`) and record it:

```bash
git push origin maataa-ui-alpha8.5.3 maataa-ui-alpha8.6
gh api repos/thelinep/maataa-rebirth/rulesets   # record the active tag ruleset
```

## 11. Controlled publisher

The package is `private: true` and no registry, publisher identity or provenance attestation is configured. Prerequisites: gates 1–10 accepted; a dedicated release step that decides the version and tag; a publisher with provenance (for example CI with npm provenance) — recorded with the run that publishes.
