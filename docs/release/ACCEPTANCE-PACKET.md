# Manual and external acceptance packet

**Prepared:** 2026-10-11 · **Candidate:** `5bc8c7b8e0fff851ec2922709461b1ba488f449a` (`1.0.0-alpha.8.4`; first prepared against `9a18d8f5`) · **Automation:** PASS, release BLOCKED (exit 2) — see [release readiness](RELEASE-READINESS.md).

This packet prepares each manual/external gate for the person who must decide it. **Nothing here is an approval.** Every gate below stays `NOT_RUN` or `BLOCKED` until its record block is filled by the named decider and committed. Prepared facts are drawn from the candidate's evidence pack under `.certification/release-evidence/9a18d8f5…/1791720393081/`.

Scope reminder: these gates cover the `@maataa/ui` package only. `apps/hemant-observatory` and the MAATAA Desktop Hemant clock are outside release claims and certification.

**Review kits (2026-10-12):** [licence review brief](reviews/LICENSE-REVIEW.md) (gate 2), [screen-reader protocol](reviews/SCREEN-READER-REVIEW.md) (gate 3), [real-device protocol](reviews/REAL-DEVICE-REVIEW.md) (gate 4), [pilot readiness](reviews/PILOT-READINESS.md) (gate 6), [release operations](reviews/RELEASE-OPERATIONS.md) (gates 8–11).

| # | Gate (release.json key) | Decider | Prepared here | Status |
| --- | --- | --- | --- | --- |
| 1 | Product scope (supported families, environments, compatibility) | Release owner (Hemant Kumar Dixit) | Scope decision recorded below | **ACCEPTED** (2026-10-11, chat); support matrix still open |
| 2 | `licenseApproval` | Legal / release owner | Dependency licence summary | NOT_RUN |
| 3 | `screenReaderReview` | Accessibility reviewer | Test matrix and script | NOT_RUN |
| 4 | `realDeviceAcceptance` | Device reviewer | Device matrix | NOT_RUN |
| 5 | `runtimePerformanceTargets` | Release owner | Measured values; limits classified | NOT_RUN — targets deferred until reference devices are chosen (2026-10-11) |
| 6 | `enterprisePilots` | TLPS owner + second application owner | Existing charters | NOT_RUN |
| 7 | `apiSchemaFreeze` | Release owner | Stable list accepted and freeze applied (2026-10-12) | **ACCEPTED (chat, unsigned)**; certification dashboard still reports NOT_RUN until a signed record exists |
| 8 | `privateSecurityReporting` | Release/security owner (Hemant Kumar Dixit) | Channel options | BLOCKED |
| 9 | `releaseOwnership` | Release owner (Hemant Kumar Dixit) | Approval record | BLOCKED |
| 10 | `remoteTagProtection` | Repository admin | Commands | NOT_RUN |
| 11 | `controlledPublisher` | Release owner | Prerequisites | BLOCKED |

## 1. Product scope

Proposed for decision (not approved): the private `@maataa/ui` package; React `>=18.2.0 <20`, React-DOM same, react-redux `>=9.1.0 <10`; browsers as exercised by the browser gate (Chromium, Firefox, WebKit; desktop and mobile viewports); ESM consumers qualified by the packed Vite/React and Next fixtures. Excluded: Hemant surfaces, Electron/Tauri shells, Support Center, Brahmini provider behaviour, MAATAA Workstation (validation BLOCKED).

**Release-scope decision (recorded 2026-10-11).** Only the `@maataa/ui` package counts toward this release. Hemant Observatory, the MAATAA Desktop Hemant clock and every other application in this repository (MAATAA Desktop Tauri/Electron shells, Support Center, Brahmini, TLPS and TLP Film demo apps, MAATAA Workstation, ALLB, the local Auth/API prototype, and the demo/example surfaces) are not part of this release and must not be described as released or certified by it. TLPS remains the selected *pilot consumer* of the package (gate 6); that does not bring the TLPS application into release scope.

```
Decision: ACCEPT
Scope: @maataa/ui package only; all applications excluded from release and certification claims
Decider: Hemant Kumar Dixit, release owner
Date: 2026-10-11
Record: stated and confirmed as owner acceptance in the working chat session; this is a chat statement, not a signed record
Not decided by this record: the proposed React/browser/consumer support matrix above; it needs its own owner decision
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

**On-device measurement.** The demo preview has a measure mode for reference devices: run `pnpm demo:build`, then `vite preview --config examples/redux-demo/vite.config.mjs --host 0.0.0.0`, and open `http://<mac-ip>:4173/?measure=1#/playground` on the device (a QR code from `qrencode -t ansiutf8 "http://$(ipconfig getifaddr en0):4173/?measure=1#/playground"` works). Tap **Open dialog**, then **Copy results**. The panel reports demo-ready time, dialog response time (from the tap on Open dialog to the dialog appearing, so the reviewer's own delay is excluded), their sum as the figure comparable to the automated runtime check, LCP, worst interaction (INP), long tasks, JS heap (Chromium only) and JS loaded; unsupported metrics are labelled. Take 5 cold loads (site data cleared) and 5 warm loads per device and record median and worst.

**Device log (preliminary).**

| Class | Device | Chip / RAM | OS / browser | Status |
| --- | --- | --- | --- | --- |
| #2 mid-range Android | Xiaomi model `23090RA98I` | MediaTek Dimensity 7200-Ultra, 8 GB (+4 GB virtual) | Android 15 / HyperOS 2.0.208, Chrome 154 | 2 valid cold samples (below); 3 cold + 5 warm still needed |
| #1 low-capability Android | not yet chosen | — | — | required before targets are set |

Valid cold samples on `#/playground`, Wi-Fi, 2026-10-11 (demo build of `2a5163f3`/`f014a7a5`):

| Time | Ready | LCP | INP | Long tasks | Dialog response | Ready + response |
| --- | --- | --- | --- | --- | --- | --- |
| 10:27 | 1092 ms | 1076 ms | 88 ms | 0 | not captured (earlier build) | — |
| 10:51 | 882 ms | 700 ms | 72 ms | 1 / 53 ms | 15 ms | 897 ms |

Excluded: one 10:49 load with ready 65,513 ms and LCP 65,292 ms (page most likely loaded while hidden or while the server restarted). In that session a later interaction reached INP 232 ms with 4 long tasks totalling 223 ms; the interaction was not identified and should be re-checked. Measure mode only runs with `?measure=1` and sends nothing anywhere.

**Owner decision (recorded 2026-10-11).** The current limits are classified as **technical regression/warning limits** only: passing them shows a change has not made the package slower than before, not that it is fast on every phone and computer. They are not runtime performance targets. Targets will be set only after reference devices are chosen — including a low-capability Android phone — and measured on those devices. The proposal above to adopt the current limits as Beta targets is therefore not accepted.

```
Decision: DEFER targets; keep current limits as regression/warning limits
Decider: Hemant Kumar Dixit, release owner
Date: 2026-10-11
Record: stated in the working chat session; chat statement, not a signed record
Next: choose reference devices (at least one low-capability Android phone), measure on them, then record targets here
Gate status: runtimePerformanceTargets remains NOT_RUN
```

## 6. Enterprise pilots

Charters and rehearsal: [`2026-10-08-charters-and-rehearsal.md`](../pilots/2026-10-08-charters-and-rehearsal.md). TLPS is authorised but not started; integration lead, operator, privacy reviewer and named participants are `TBD`, and tenant `TLPS-PILOT-SANDBOX-01` is not provisioned. The second, structurally different application is unselected (NEVO is a candidate only). Both pilots must run against an integrated build of a qualified candidate commit and be dispositioned by their owners.

## 7. API and schema freeze

Inputs: `manifests/PUBLIC_API.json` (`public-api.json` in the pack), `docs/canonical-catalog.json` (`registries.json`), [versioning policy](../versioning-policy.md) and [composition spec](../composition-spec.md). Today every one of the 2,196 entry points and 12,684 exports in `PUBLIC_API.json` is classified `EXPERIMENTAL` ("Pre-GA public APIs remain EXPERIMENTAL until a reviewed freeze").

**Owner direction (recorded 2026-10-11).** For Beta, freeze only the paths that are actually verified and the saved-composition format. Do not treat every current export as a permanent promise; the rest stays `EXPERIMENTAL`. The release owner must accept the concrete list below before the freeze is recorded.

**Proposed Beta-stable list (awaiting owner acceptance).** "Verified" means imported, type-checked, built and rendered by the packed-consumer gate (`package:consumer`) on `9a18d8f5`: Vite + React 19, Vite + React 18.2 (minimum peer), Next App Router, and plain Node 20 SSR import of the packed tarball.

| Import path | Named exports proposed as stable | Verified by |
| --- | --- | --- |
| `@maataa/ui/styles.css` | stylesheet | Vite and Next fixtures |
| `@maataa/ui/actions/Button` | `Button` | Vite and Next fixtures |
| `@maataa/ui/forms/Input` | `Input` | Next fixture |
| `@maataa/ui/surfaces/Card` | `Card` | Next fixture |
| `@maataa/ui/foundation` | `UiProvider` (only) | Next fixture |
| `@maataa/ui/themes` | `ThemeToggle` (only) | Next fixture, theme-control render check |
| `@maataa/ui/composer` | `VisualComposer`, `DEFAULT_COMPOSER_SCENE`, `generateComposerJsx`, `validateCompositionSpec`, type `ComposerScene` | Vite fixture, generated-scene build, Node SSR import |
| `@maataa/ui/runtime` | `CompositionRuntime`, `CanonicalCompositionRuntime` | Vite fixture, Node SSR import |
| `@maataa/ui/typography/Heading`, `…/Text` | `Heading`, `Text` | Owner decision 2026-10-12 (generator components); contract tests only |
| `@maataa/ui/data/DataTable`, `…/Metric` | `DataTable` (with type `DataColumn`), `Metric` | Owner decision 2026-10-12; contract tests only |
| `@maataa/ui/feedback/Badge` | `Badge` | Owner decision 2026-10-12; contract tests only |
| `@maataa/ui/foundation/Divider` | `Divider` | Owner decision 2026-10-12; contract tests only |
| `@maataa/ui/layouts/<Name>` (93 stable + 7 deprecated aliases) and `@maataa/ui/layouts/LayoutPreset` | every non-deprecated layout in `LAYOUT_TYPES`; types `LayoutPresetProps`, `LayoutSlot` | Owner decision 2026-10-12 (all 100 confirmed); contract tests only |
| `@maataa/ui` (root) | module loads without error; **no named exports frozen** | Node 20 and React 18 SSR import |

**Saved-composition format.** `CompositionSpecV1` with `schemaVersion: "1"` as specified in [`composition-spec.md`](../composition-spec.md). The parser already rejects other versions (`src/composer/sceneData.ts`) and `validateCompositionSpec` checks v1 documents.

Everything else, including the other members of the subpaths above, stays `EXPERIMENTAL` for Beta.

Questions for the owner before accepting:
1. **Props:** freezing a component means its current props stay compatible. Accept the props as they are today for these components, or list them first?
2. **Canonical IDs inside saved compositions:** a v1 composition refers to workspace, page, layout and device IDs. Freezing the format only helps if those referenced IDs stay valid. Freeze the IDs too, or freeze the format and promise a migration when an ID changes?
3. **Subpath vs. barrel:** answered 2026-10-11 by the release owner — keep only `@maataa/ui/surfaces/Card`. `Card` from the `@maataa/ui/surfaces` barrel stays `EXPERIMENTAL` (the Vite fixture should move to the subpath import before the freeze).

Owner responses recorded 2026-10-11 (chat): (1) review the props list before accepting — see appendix A; (2) asked for a comparison of freezing IDs versus freezing the format with a migration promise — see appendix B; (3) as above.

```
Decision: ACCEPT LIST / AMEND    Answers to 1–3:
Decider:        Date:
```

After acceptance, the freeze is applied by marking exactly these exports `STABLE` in the API manifest generator and adding a check that a stable export cannot be removed or changed incompatibly without a recorded decision.

**Freeze applied (2026-10-12).** The release owner accepted the stable list in chat. It is recorded in [`manifests/STABLE_API.json`](../../manifests/STABLE_API.json): 126 exports (33 components, functions and types plus 93 layouts), with a signature snapshot of each, and `PUBLIC_API.json` marks exactly these as `STABLE` (7 layout aliases are `DEPRECATED`; everything else stays `EXPERIMENTAL`). Canonical IDs follow option C through [`manifests/CANONICAL_IDS.json`](../../manifests/CANONICAL_IDS.json) (3,096 IDs across workspaces, pages, layouts, devices, components and regions; no migrations or retirements yet). The certification `api` gate now runs `pnpm api:check`, which fails if a stable export is removed, deprecated or changes signature, or if a canonical ID disappears without a migration or retirement record, or a retired ID is reused. Changes require a recorded owner decision, an update of the relevant file, and a reference in the commit.

```
Decision: ACCEPT LIST (freeze applied)        Decider: Hemant Kumar Dixit, release owner        Date: 2026-10-12 (chat statement, not a signed record)
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

## Appendix A — props and signatures of the proposed stable exports (as of `9a18d8f5`)

| Export | Contract that would be frozen | Notes for the owner |
| --- | --- | --- |
| `Button` | All native `<button>` attributes, plus `variant?: "primary" \| "secondary" \| "ghost" \| "destructive"` (default `primary`), `loading?: boolean` (disables and shows `loadingLabel`), `loadingLabel?: string` (default `"Loading"`); `ref` to the button; `type` defaults to `"button"` | Extending native attributes means every native attribute is part of the contract. |
| `Input` | All native `<input>` attributes; `ref` to the input | No extra props. |
| `Card` (`surfaces/Card`) | All native `<div>` attributes, plus `header?: ReactNode`, `footer?: ReactNode` | Typed as `<div>` attributes but renders `<article>`; decide whether to fix the type or the element before freezing. |
| `UiProvider` | `children`, `theme?: "light" \| "dark" \| "system" \| "high-contrast" \| "oled"` (default `system`), `dir?: "ltr" \| "rtl"` (default `ltr`), `className?` | Other attributes are not passed through. |
| `ThemeToggle` | `label?: string` (accessible name, default `"Toggle theme"`); cycles light → dark → high-contrast → oled → system | Must be inside `UiProvider`; the visible text is the current theme name. |
| `VisualComposer` | `scene: ComposerScene`, `onSceneChange(scene)` required; optional `selectedBlockId`, `canUndo`, `canRedo`, `onSelectBlock(id)`, `onUndo()`, `onRedo()` | Editing behaviour and palette contents are not part of the prop contract. |
| `CompositionRuntime` | `scene: ComposerScene`; optional `header`, `sidebar`, `nav`, `inspector` (ReactNode); optional `validation` override | |
| `CanonicalCompositionRuntime` | Same slots as `CompositionRuntime` (without `validation`), plus `context?: CompositionContext` | `CompositionContext` is not on the list; either add the type or keep `context` experimental. |
| `generateComposerJsx(scene)` | Returns generated JSX source for a scene; throws if the scene fails v1 validation | The exact generated text should not be frozen, only that it is valid JSX for the scene. |
| `validateCompositionSpec(input: unknown)` | Returns `{ accepted: true, spec, validation, errors: [] }` or `{ accepted: false, errors: string[], validation? }` | Error message wording should not be frozen. |
| `DEFAULT_COMPOSER_SCENE` | A valid `ComposerScene` value | Freeze its presence and validity, not its exact contents. |
| `ComposerScene` (type) | `id`, `name`, `workspaceTypeId`, `pageTypeId`, `layoutTypeId`, `deviceId`, `theme`, `density`, `stateMode`, `blocks[]` (`id`, `kind`, `props: Record<string, unknown>`, optional `hidden`, `locked`, `componentId`), `updatedAt`, optional `schemaVersion: "1"`, optional `regions[]` | Block `props` are untyped per kind, so their contents are not contracted. The ID fields are literal unions generated from the registries (see appendix B). |

### Appendix A review (2026-10-12, read from source at `27ff005a`)

Verdict per export: **Freeze** = acceptable as is; **Fix first** = change before freezing, because changing it after the freeze would be a breaking change; **Narrow** = freeze only part of it.

| Export | Verdict | Finding |
| --- | --- | --- |
| `Input` | Freeze | Thin wrapper over `<input>` with ref forwarding. No error/size props; labels come from the consumer. |
| `Button` | **Decided** (2026-10-12): loading keeps native `disabled` (contract-tested); was: Fix first (decision) | `loading` sets native `disabled`, so a focused button loses keyboard focus while loading. Decide now whether loading should use `aria-disabled` instead; switching later changes behaviour. A consumer-supplied `aria-busy` overrides the built-in one. |
| `Card` | **Fixed** (2026-10-12) — now typed `HTMLAttributes<HTMLElement>` and forwards `ref` to the `<article>`; was: Fix first (small) | Props typed as `<div>` attributes but renders `<article>`; retype to `HTMLAttributes<HTMLElement>`. Unlike `Button`/`Input` it does not forward `ref` (adding it later is compatible). |
| `UiProvider` | **Decided and implemented** (2026-10-12): `theme` is now controlled (later changes apply), `defaultTheme` sets the uncontrolled initial theme and `onThemeChange` reports requested changes (contract-tested; the Next consumer fixture now uses `defaultTheme`). The global `<html>` attribute and one-time OS colour-scheme read remain; was: Fix first (decision) | `theme` is passed as the provider's *initial* theme: changing the prop after mount does nothing. There is no controlled mode or change callback. It also writes `data-maataa-theme` on `<html>` (two providers overwrite each other) and reads the OS colour scheme once per render without listening for changes. Freezing the prop name `theme` with initial-only behaviour would lock in a misleading contract. |
| `ThemeToggle` | **Fixed** (2026-10-12) — visible text is now "<label>: <theme>" and is the accessible name (no `aria-label` override); was: Fix first (accessibility) | The visible text is the current theme name (for example "dark") but `aria-label` replaces it with "Toggle theme", so the accessible name does not contain the visible label (WCAG 2.5.3 Label in Name). It throws outside `UiProvider`, and the five-step cycle order is hard-coded. |
| `VisualComposer` | Narrow | Freeze the props only. Its UI text is English-only, and on every edit it stamps `updatedAt` and upgrades the scene to v1; editor layout, palette and behaviour must be stated as not covered. |
| `CompositionRuntime` | Narrow — **decided 2026-10-12: `validation` prop stays `EXPERIMENTAL`** (not part of the stable contract) | The `validation` prop lets the host pass `compatibility.status: "verified"`, which the runtime then displays to users as "Composition: verified" without the package having checked it. Keep `validation` out of the stable contract (experimental or removed). The runtime also always shows a status line and the raw page ID in the default header, and its invalid-scene message is fixed English text. |
| `CanonicalCompositionRuntime` | Narrow | Computes validation itself (the honest path). `context` uses `CompositionContext`, whose fields are loose strings; keep `context` experimental. |
| `generateComposerJsx` | **Decided** (2026-10-12): widen the stable list to every component the generator can emit (see below); was: Narrow | The generated code imports the layout component and the typography/data components for each block kind (`@maataa/ui/layout-atoms/…`, `@maataa/ui/typography/…`, etc.), which are **not** on the stable list, and embeds sample table rows. Freeze the signature and "valid JSX for a valid scene", not the generated imports or text — or widen the stable list to every component the generator emits. |
| `validateCompositionSpec` | Freeze (shape only) | Freeze `accepted`, `errors[]` and `spec` on success; the nested `validation` object and message wording stay unfrozen. |
| `DEFAULT_COMPOSER_SCENE` | Narrow | Presence and validity only. |
| `ComposerScene` | Narrow | The saved format is `CompositionSpecV1` (where `schemaVersion` and `regions` are required), not `ComposerScene` (where they are optional); say so explicitly. Block `props` are untyped. ID fields are literal unions, consistent with option C. |

Coverage: `tests/stable-api.contract.test.tsx` (added 2026-10-12) has contract tests for every proposed stable export and checks each import path against `PUBLIC_API.json` and the package export map. It asserts only what is proposed as frozen; items awaiting an owner decision (Button loading mechanism, UiProvider theme updates after mount, runtime `validation`, `context`, generated code text) are deliberately not asserted.

### Generator components (owner decision 2026-10-12)

`generateComposerJsx` imports one component per block kind and one layout per scene. Making all of them stable adds:

- **Block components (6 new, 3 already listed):** `Heading` and `Text` (`@maataa/ui/typography/…`), `DataTable` and `Metric` (`@maataa/ui/data/…`), `Badge` (`@maataa/ui/feedback/Badge`), `Divider` (`@maataa/ui/foundation/Divider`); `Button`, `Input` and `Card` are already listed.
- **Layouts (100):** every layout in `LAYOUT_TYPES`, each imported from `@maataa/ui/layouts/<Name>`, because a valid scene may select any of them.

None of these 106 exports is exercised by the packed-consumer gate today. **The owner confirmed all 100 layouts on 2026-10-12.** Props review below; contract tests are in `tests/stable-generator.contract.test.tsx`, which also checks that every path the generator can emit is a public export.

| Export | Verdict | Finding |
| --- | --- | --- |
| `Heading` | Freeze | `level` 1–6 (default 2) plus native heading attributes. |
| `Text` | Freeze | `as` = `p` (default), `span` or `div`, plus native attributes. |
| `Badge` | Freeze | `tone` = neutral (default), success, warning, danger, info, plus native `<span>` attributes. |
| `Divider` | Freeze | Native `<hr>` attributes. |
| `Metric` | Narrow | Alias of `Stat` (also exported as `KPI`); only `label`, `value`, `helper`; no `className`, no native attributes, inline styles, no semantic structure. Freeze the three props; `Stat`/`KPI` stay experimental. |
| `DataTable` | **Fixed** (2026-10-12): `caption`, `aria-label`/`aria-labelledby`; `aria-sort` on sortable headers; non-sortable headers are plain text and sort buttons appear only with `onSort`; `selectionLabel` and `selectionHeader`; `DataTableProps` exported. Was: Fix first | No way to give the table an accessible name (no `aria-label`/caption prop and no native-attribute pass-through); sort state is shown visually but not exposed (`aria-sort` missing); non-sortable column headers render as disabled buttons, so screen readers announce every header as a dimmed button; the row checkbox label "Select row N" is fixed English. Props: `data`, `columns` (`id`, `header`, optional `accessor`, `sortable`), `empty`, `selectedIds`, `onSelectionChange`, `sort`, `onSort`. |
| 100 layouts | See layout scrutiny below (was: Freeze, shared contract) | All 100 are thin wrappers over `LayoutPreset` with the same props: native `<div>` attributes plus 23 named slots (`header`, `nav`, `sidebar`, `secondarySidebar`, `rail`, `toolbar`, `main`, `inspector`, `footer`, `hero`, `canvas`, `dock`, `palette`, `stage`, `preview`, `timeline`, `actions`, `properties`, `statusBar`, `bottomNav`, `filters`, `list`, `details`); `main` takes precedence over `children`. Freezing them means freezing `LayoutPresetProps`. Visual arrangement and CSS are not part of the contract. |

### Layout scrutiny (2026-10-12, source at `8cd75b20`)

Sources: `src/layouts/*`, `src/internal/layoutPreset.tsx`, `src/layout-atoms/*` and `src/registries/layoutExecutionMetadata.generated.ts` (grid areas derived from the CSS by `generate-layout-loaders.mjs`).

**What is uniform.** All 100 layouts are one-line wrappers over `LayoutPreset`, each with a unique `preset` name, and every template has CSS. Each renders a root `<div>` and one element per slot that is passed, in a fixed DOM order (header, nav, hero, toolbar, sidebar, secondarySidebar, rail, palette, filters, list, stage, canvas, preview, details, **main (always)**, inspector, properties, timeline, dock, actions, statusBar, footer, bottomNav).

**Findings**

1. **The props type promises more than the layouts place.** Every layout accepts all 23 slots, but on average a layout's CSS places only 5.3 of them (maximum 9). A slot outside a layout's grid areas is still rendered, just not positioned by the template.
2. **16 layouts place no slots at all** (`placementStatus: "fallback-main"`): Dashboard Grid, Card Grid, Bento Grid, Masonry, Analytics, Kanban, Board, Social Feed, Gallery, Magazine, Newspaper, Command Center, Cockpit, Control Room, Operations Wallboard and Profile. They behave as generic containers; the arrangement their names suggest is left to the content.
3. **Three slots are placed by no layout:** `secondarySidebar`, `stage` and `properties`.
4. **Seven pairs are the same layout under two names** (same template): BeforeAfter = Comparison, Builder = PageBuilder, CenteredContainer = SingleColumn, CollapsibleSidebar = SidebarShell, Documentation = KnowledgeBase, ResponsiveThreePane = ThreeColumn, StepperForm = Wizard. Some names promise behaviour that does not exist (`CollapsibleSidebarLayout` does not collapse; `CenteredContainerLayout` is the single-column template).
5. **Landmarks.** Each layout always renders a `<main>`, so a layout nested inside an app shell or another layout produces two `main` landmarks. `header`, `footer` and `statusBar` become page-level banner/contentinfo landmarks; up to seven slots render unlabeled `<aside>` elements and two render unlabeled `<nav>` elements. Slots take only content, so the host cannot label these landmarks.
6. **Reading order.** DOM order is fixed while each template places regions by CSS grid areas, so for some templates the visual order may differ from keyboard and screen-reader order. This must be checked in the screen-reader review (gate 3).
7. `LayoutRoot`'s `inset`, `scroll` and `sticky` flags reach the root at runtime but are not in `LayoutPresetProps`.

**Options before the layouts are frozen**

| | A. Freeze as is | B. Freeze names, narrow the promise | C. Fix first, then freeze |
| --- | --- | --- | --- |
| Promise | All 23 slots on all 100 layouts | Each layout's stable slots = its declared grid areas (published per layout); other slots render but placement is not promised; visual arrangement is not promised; the 16 fallback layouts are documented as containers | As B, plus landmark fixes: optional per-slot labels, a way to render the main slot without `<main>` when nested, and aliases documented as aliases |
| Breaking later? | Any fix to landmarks or slot types is breaking | Landmark changes still breaking | Additive afterwards |
| Work now | None | Generate a per-layout supported-slot table and test it | B plus landmark changes and tests |

**Recommendation:** C. The landmark behaviour (always `<main>`, unlabeled `<aside>`/`<nav>`) is the part that becomes a breaking change once frozen; per-slot labels are additive and can follow.

**Owner decisions (recorded 2026-10-12, chat):** layout option **C**; deprecate one name of each alias pair; fix the four `DataTable` issues. Implemented in the same change:

- **Supported slots per layout** are the declared grid areas in `docs/engineering/layout-audit.json` / `LAYOUT_RUNTIME_CONTRACTS` (`gridRegions`); these are the slots whose placement is promised. Other slots render but their placement is not promised; the 16 `fallback-main` layouts are containers. Visual arrangement and CSS are not part of the contract.
- **Landmarks:** a layout nested inside another layout renders its main slot as a `<div>` instead of a second `<main>`; `mainElement="div"` opts out when the host already has a `<main>`; `slotLabels` gives any slot landmark an accessible name. `inset`, `scroll` and `sticky` are now typed. `LayoutSlot` is exported.
- **Aliases deprecated** (JSDoc `@deprecated`, `DEPRECATED` in `PUBLIC_API.json`), keeping the name that matches the template: `BeforeAfterLayout` → `ComparisonLayout`, `PageBuilderLayout` → `BuilderLayout`, `CenteredContainerLayout` → `SingleColumnLayout`, `CollapsibleSidebarLayout` → `SidebarShellLayout`, `KnowledgeBaseLayout` → `DocumentationLayout`, `ResponsiveThreePaneLayout` → `ThreeColumnLayout`, `StepperFormLayout` → `WizardLayout`. Their canonical layout IDs remain valid (option C rules); `generateComposerJsx` emits the replacement name for them, so generated code never imports a deprecated export. Stable layouts: 93; deprecated: 7.
- Reading order (finding 6) remains for the screen-reader review.


## Appendix B — freezing IDs versus freezing the format

A saved v1 composition refers to six kinds of canonical ID: workspace (647), page (500), layout (100), device (187), component (1,577) and region (85) — about 3,100 IDs in all. In TypeScript the ID fields of `ComposerScene` are literal unions built from the registries, so removing an ID is already a type-breaking change for anyone using the type. [`versioning-policy.md`](../versioning-policy.md) already says IDs in saved scenes must not be silently renamed or reused, a replacement needs an explicit alias, a versioned migration helper and tests, and no alias is invented before a real migration exists. No alias or migration helper exists in code today.

| | A. Freeze all IDs | B. Freeze the format; migrate when an ID changes | C. Freeze the format; ID rules, not an ID list |
| --- | --- | --- | --- |
| What is promised | Every current ID stays valid for all 1.x | v1 shape is fixed; any ID change ships with an alias + migration | v1 shape is fixed; IDs are never reused or silently renamed; removal or rename only with alias + migration + tests; removal is a major change |
| Safety for saved compositions | Highest | Depends on each migration being written | High for the rules; same as B for actual changes |
| Freedom to clean up registries | None without a major release | Full, at the cost of writing migrations | Additions free; renames and removals cost a migration |
| Fits "freeze only verified things"? | No — locks ~3,100 IDs, almost none exercised by consumers | Yes | Yes |
| Work needed before Beta | Mark all IDs stable; add a removal check | Build the alias/migration helper and its tests | Add a check that no ID is removed or reused without a recorded migration; build the helper only when the first change is needed |

**Recommendation:** C. It matches the policy already written, keeps saved compositions safe from silent breakage, and does not turn ~3,100 mostly unverified IDs into a permanent promise.

**Owner decision on IDs (recorded 2026-10-12, chat): C** — freeze the v1 format; canonical IDs are governed by rules, not frozen as a list. IDs are never reused or silently renamed; a rename or removal requires an explicit alias, a versioned migration helper, tests against saved compositions and release notes; removal is a major change. Before the freeze is applied, add a check that fails when an ID is removed or reused without a recorded migration.

```
ID decision: C        Decider: Hemant Kumar Dixit, release owner        Date: 2026-10-12 (chat statement, not a signed record)
Props list (appendix A): PENDING — owner to accept or amend, including the four open points
```
