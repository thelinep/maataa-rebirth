# MAATAA UI: prototype to full product roadmap

**Status: proposed product roadmap.** This plan translates the current registry-rich UI package and demo into a coherent, adoptable product. It complements [`ROADMAP.md`](../release/ROADMAP.md), which tracks enterprise release qualification through GA. Product functionality and release qualification are related, but neither substitutes for the other.

## Product definition

MAATAA UI is an application-agnostic React and TypeScript interface system. A full product means a consumer can discover the supported UI contracts, preview them honestly, compose a real interface from them, adapt it to supported screens and themes, extend it without forking, integrate it into a host application, and upgrade with predictable compatibility. The host application continues to own routing, data, identity, authorization, business workflows, persistence, and provider integrations.

“Full product” does not mean every registry name is a finished application. It means every published record has a truthful maturity state, every claimed runnable capability works through a complete path, and supported records have useful examples and compatibility evidence.

## Current starting point

- The package has a broad atomic UI vocabulary, registries, canonical IDs, composition schema/runtime, and generator/tool/AI-space surface contracts, alongside a local demo and visual composer.
- The `/surface` explorer generates deterministic synthetic specimens for all 500 canonical page records and record-bound specimens for every workspace, layout, device, generator, tool, AI-space, Redux slice, selector, type contract, dataset, scenario, and registry record. Components render their actual export when a public runtime loader exists; catalog contracts and fixtures remain read-only examples.
- Components, registries, and composition still have different maturity levels. A registry count is not a count of complete product experiences.
- The visual composer has a browser-local named composition library with save/open/update/duplicate/delete, bounded revision history and restore, schema-v1 scene validation, and migration from library-v1 and legacy scene arrays. This is a local authoring guarantee only; it does not establish shared/team persistence, production backups, host authorization, or automated consumer upgrades.
- Existing exact-commit release evidence belongs to its recorded commit. Product roadmap work does not inherit that qualification; release checks must be rerun for the release candidate under the existing policy.

## Supported product boundary — decided 8 October 2026

For the MAATAA-owned explorer and composer, the supported catalog scope is all registered records. Each record must resolve to a deterministic preview bound to its canonical identity and source metadata. A preview may be a real package component, a composition specimen, or a read-only metadata/fixture specimen; it must name its type and limitations. Redux records are not mounted by catalog inspection, selector results are not fabricated, type contracts are not presented as runtime validators, synthetic datasets are not business truth, and registries do not claim unrecorded hashes or lifecycle status. This is catalog-preview support, not a claim that every record is a runnable product workflow.

The supported local composition lifecycle is save, reopen, update, duplicate, delete, inspect up to 20 prior revisions, and restore a prior revision as a new revision. The library schema is v2; it reads v1 library documents and legacy arrays of scenes and upgrades them to v2. Composition scenes remain schema v1. Unsupported future library/scene versions, malformed or oversized documents, and unsafe data are rejected. Browser local storage is the only supported persistence adapter in this slice. Package-consumer compatibility ranges, server persistence, cross-device sync, collaborative edits, host-owned migrations, and production recovery guarantees remain outside this scope and require their own evidence.

## Execution snapshot — 8 October 2026

This is a working-tree progress record, not a release or qualification claim.

| Area                                              | Status                                                                 | Evidence and remaining work                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Product scope                                     | Defined for MAATAA explorer/composer; environment/release acceptance open | The supported catalog specimen and local composition lifecycle are stated above. This implementation is not enterprise release acceptance; browser/build/accessibility and owner gates remain tracked in the release roadmap. |
| Page specimens and pilot data contexts            | Complete for current page registry; pilot slices cover mapped families | All 500 page IDs receive deterministic generic content from a checked family profile and unique canonical ID/ordinal fixture reference. Page Explorer now switches among generic, TLPS, and NEVO contexts. TLPS slices cover production/logistics, schedules, projects, locations, budgets, evidence, handover, and overview/record pages; NEVO slices cover events, booking/commercial, customers, venues/suppliers, run of show, guests, operations, communications, catalog/discovery, handover, and overview pages. Per-page refs are stable and distinct. Tests cover every page in mapped families, product switching, specialized TLPS call-sheet/location routing, and explicit unmapped-family messaging. Data is synthetic only; this does not establish real TLPS/NEVO integration, authentication, availability, approval, dispatch, transactions, or production workflows.                                  |
| Workspace data slices                             | Complete for 647 canonical workspaces                                  | Every workspace resolves through its family profile to a deterministic, record-bound synthetic slice with a unique workspace reference, domain-specific navigation and sample rows, and an explicit boundary. Coverage includes all 58 current workspace groups, including TLPS production, event, guest, finance, evidence, AI, platform, and operations families. Automated checks audit every registry record; desktop/mobile browser checks exercise TLPS, event, and AI workspaces. No live identity, tenant, booking, production, finance, file, API, or model state is implied.                                                                                                                                                                                                                                                                                                                                   |
| Layout data slices                                | Complete for 100 canonical layouts across 18 layout families           | Every layout resolves to a deterministic, record-bound synthetic slice with named composition regions, family-specific sample content, a unique `LY-###` reference, and an explicit non-execution boundary. Automated checks audit all 100 records; browser checks cover app-shell, planning, and spatial layouts on desktop and mobile projects. This demonstrates sample composition content only; it does not establish host data integration, responsive qualification, or operational state.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Device, generator, tool, and AI-space data slices | Complete for 998 canonical records                                     | All 187 devices, 208 generators, 491 tools, and 112 AI spaces now resolve to deterministic record-bound fixtures and stable category-specific references. Device slices include the registry viewport, input, safe-area, and capability facts with a synthetic screen; generator slices show editable local briefs and draft outline shapes; tool slices expose input/output examples with execution disabled; AI-space slices show task/context/output shapes without model or retrieval calls. Tests audit every record and all registered family labels. Device behavior, generated artifacts, tool integrations, and AI outputs remain unqualified.                                                                                                                                                                                                                                                                  |
| Redux state orchestration                         | Complete for the registered demo contract                              | All 26 registered slices mount and all 52 selectors are exported and exercised. Nine demo-domain slices add read-only fixture-backed collection search, facet, selection, and view state for projects, events, vendors, bookings, finance, tasks, production, activity, and evaluations. Seven canonical catalog selectors provide memoized trimmed-text and group filtering. Lifecycle filtering is fail-closed, but the source catalogs do not currently supply lifecycle metadata, so selecting a lifecycle returns no records. Scenario switching synchronizes workspace, page, layout, device, generator, tool, and AI-space selections and clears stale optional selections. Redux remains optional demo/interaction state, not backend authority, authentication, provider execution, or real application data.                                                                                                   |
| Other preview families                            | Complete for supported record-bound specimen scope; runnable maturity varies | Redux slices, selectors, type contracts, datasets, scenarios, and registry records now show selected-record metadata, import/source context, deterministic examples where applicable, and explicit non-execution boundaries. They remain specimens unless separately qualified as runnable. Tests audit all records and browser checks select examples across these families. |
| Composition lifecycle and runnable slices         | Local lifecycle complete for declared scope; consumer upgrade gate partial | Sandbox library v2 supports validated save/open/update/duplicate/delete, retains up to 20 prior versions, restores a selected revision as a new revision, and migrates library v1 and legacy scene arrays. Composition schema v1 remains the only accepted scene schema; unsupported versions and unsafe/oversized data fail closed. Automated tests cover parser, storage, migration, revision restore, and reload. This does not guarantee server/team persistence, package-version compatibility, consumer upgrade, or production recovery. Product Forge and packed Next.js examples remain bounded demos; maintained runnable application slices and consumer upgrade matrix remain open. |
| Idea-to-product intake                            | Implemented locally; owner and runtime integrations remain open        | Product Forge now starts with an eight-step guided intake covering concept, users, journey, data, authority, experience, pilot and review. Drafts save in the current browser; TLPS/NEVO choices are labels only; unanswered fields stay explicitly unknown; provider work is gated until a reviewed brief is applied. Inputs are capped, source notes remain unverified, and synthetic-data/host-authority limits are stated. This improves scope discovery but does not contact owners, verify evidence, configure providers, or execute a pilot. |
| Application pilots                                | TLPS synthetic pilot authorized; host pilot not started; NEVO proposed | Hemant Kumar Dixit is confirmed by user instruction as TLPS operating/pilot authority. The user approved an isolated test-tenant designation, five-person role cohort, synthetic-only data plan, and measurable thresholds in [`the 2026-10-08 charter and rehearsal record`](../pilots/2026-10-08-charters-and-rehearsal.md). `TLPS-PILOT-SANDBOX-01` is not yet provisioned or verified in the TLPS host; participant names and integration/operator/privacy contacts remain needed. Local browser rehearsals passed 18/18 combined checks; after the charter authorization, the TLPS workflow passed 12/12 checks across Chromium, Firefox, and WebKit at desktop/mobile-sized viewports. TLPS exercised local demo state; NEVO coverage is a packed App Router planning slice, not the NEVO host. No real participants, live accounts/tenants, APIs, or records were used. NEVO still needs its application owner, charter approval, tenant and participants. Host authorization, audit, handover and user-acceptance measures remain **NOT_RUN**. Existing local Qwen kits remain **GENERATED KIT / REVIEW REQUIRED**, not pilot evidence; see [`local Qwen review`](../pilots/local-qwen-review-2026-10-06.md).                                                                                                                                                                                                                      |
| Beta/RC/GA acceptance                             | Automated exact-candidate gates pass; release remains blocked          | The latest exact-candidate enterprise run passed all automated categories, including type, unit, browser/accessibility, consumer, security, performance, API, and documentation gates. Manual/external requirements remain open: enterprise pilot acceptance, license approval, screen-reader review, real-device acceptance, runtime performance targets, release-ownership evidence, private security reporting route, remote tag protection, controlled publisher, and API schema freeze. Hemant Kumar Dixit is the designated release approval and private security reporting owner; the private channel and response commitments have not been configured.                                                                                                                                                                                                                                                          |
| MAATAA Workstation validation                     | Blocked by scan cap                                                    | The approved repository scan stopped at 5,000 files and Workstation refused its bounded project copy. Its staged proposal was not validated by Workstation and must not be treated as test evidence.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### Next delivery sequence

1. Name the MAATAA product owner to ratify this implementation scope and agree the React/build, browser, accessibility, and device support matrix.
2. Complete source/export, relationship, and maturity audits for every supported record; the new specimens close the visual coverage gap but do not establish runtime compatibility or runnable maturity.
3. Publish and verify the package-consumer version compatibility matrix. The browser-local v2 lifecycle is implemented, but consumer install/upgrade/re-import and host persistence remain separate gates.
4. Deliver and qualify the bounded core families, then add provider-neutral generator/tool adapters and the safe AI-space shell with explicit denied, failed, unavailable, and timeout states.
5. Complete fresh-consumer onboarding, docs, upgrade checks, and support operations; then run the owner-chartered TLPS and NEVO pilots against exact commits.
6. Promote only after each pilot owner accepts its evidence and the separate Beta/RC/GA release gates pass on the exact candidate. Manual, legal, security, accessibility, and real-device decisions remain owner-reviewed evidence.

Do not assign delivery dates or claim product-ready status until the owners and capacity are agreed. Update this snapshot only when new evidence is recorded, and distinguish working-tree results from exact-commit release evidence.

## Maturity contract for every catalog record

Use one explicit state per record, visible in the catalog, inspector, docs, and generated manifests:

| State                | Meaning                                                                                                | What the user can rely on                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| **Catalogued**       | Stable identity and descriptive metadata exist                                                         | Discover and inspect the record; no visual or runtime behavior is implied   |
| **Structural**       | A package-owned composition primitive or contract exists                                               | Compose it with host-supplied children, adapters, and state                 |
| **Specimen**         | A shared illustrative preview exists                                                                   | Explore appearance only; clearly marked synthetic and non-functional        |
| **Interactive demo** | A bounded, local demo path works                                                                       | Exercise the named local behaviors and constraints stated for that demo     |
| **Runnable**         | A record-specific implementation works through its documented path                                     | Use the documented inputs, states, outputs, and error behavior              |
| **Qualified**        | Runnable behavior passed the declared package, browser, accessibility, performance, and consumer gates | Use only within the recorded version, environments, and compatibility scope |

Do not infer maturity from IDs, registry membership, generated documentation, or previews. Never render a `verified`, `grounded`, `canonical`, `available`, or successful-operation claim from placeholder fixture data without marking it as illustrative.

## Product workstreams

### A. Truthful discovery and record contracts

**Outcome:** the catalog accurately separates records, templates, package components, and executable demos.

- Add record metadata for purpose, maturity, owning package module, import path, supported themes, supported device capabilities, preview fixture, and qualification evidence.
- Add typed relationships where a record composes another record: page-to-layout, workspace-to-pages, composition-to-blocks, device-to-capabilities, and tool/generator/AI-space-to-input/output contracts.
- Validate identity uniqueness, relationship integrity, required fields by maturity, and links to source exports in CI.
- Update counts and labels so “catalogued” never reads as “implemented.”
- Provide filters for maturity and compatibility; put limitations and evidence freshness in the inspector.

**Exit gate:** every visible record has an assigned maturity and owner/source; broken relationships and missing required metadata fail the registry check; every record preview says whether it is a specimen, a runnable local example, or a qualified implementation.

### B. Record-specific visual preview and composition

**Outcome:** selection drives a meaningful and truthful example rather than swapping a title on a generic mock.

- Define compact preview specs for layouts, pages, workspaces, devices, generators, tools, and AI spaces. Let specs choose named fixture data and composed children; do not encode business logic in package registries.
- Render page examples from a page identity plus layout, data fixture, action set, and loading/empty/error/permission states.
- Render workspace examples from workspace identity plus page navigation, role context, and host adapter fixture; demonstrate continuity between pages only when state is actually shared.
- Render layouts with their declared region geometry and an actual composition in each supported region.
- Make device selection adapt the same composition using declared viewport, input, orientation, safe-area, and modality capabilities. Device frames alone do not qualify device behavior.
- For every category, add a selected-record assertion: changing the record must change the actual content/configuration described by its spec, not merely the title.
- Keep specimen fixtures synthetic, deterministic, and visibly labeled. Remove hard-coded success, proof, and verification statuses that could be mistaken for actual evidence.

**Exit gate:** each maturity-eligible record resolves to its record-specific preview or a conspicuously labeled shared specimen; test coverage catches accidental reuse of a fixture where a distinct preview is claimed.

### C. Complete composition lifecycle

**Outcome:** a developer can move from selected contract to a reusable, validated, responsive implementation.

- Connect catalog selection to `CompositionSpec` construction with canonical workspace, page, layout, device, region, and component IDs.
- Support adding/removing/reordering blocks, editing allowed props, choosing data/state fixtures, mapping regions, and previewing responsive variants.
- Keep schema validation, compatibility warnings, unknown IDs, unsupported regions, and unsafe prop values visible before preview or code export.
- Add save, reopen, duplicate, version, and migration flows for local compositions; define the storage adapter boundary so hosts can persist without coupling the core package to a database.
- Generate complete consumer examples from validated specs, compile them in isolated Vite and Next.js consumers, and compare runtime output with the generated structure.
- Preserve canonical ID and schema migration policy; do not silently change saved scenes when a display label changes.

**Exit gate:** a composition can be authored, saved, restored, validated, rendered, generated, and re-imported under the same declared identity without losing supported placements or props.

### D. Productize each surface family

**Outcome:** each family has a narrow, useful vertical slice and clear non-goals.

| Family               | First useful vertical slice                                                                                                              | Product boundary                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Components and atoms | Search, render actual export, edit supported props, show states and import example                                                       | Package owns UI behavior; consuming app owns workflow meaning                                               |
| Pages                | Distinct overview, list/detail, and form/review page compositions with fixtures and state variants                                       | Page purpose is a composition recipe, not an API or data model                                              |
| Workspaces           | One cohesive workspace spanning navigation and at least two related pages with shared fixture state                                      | Workspace shell and interactions are package templates; tenant and business state stay in host              |
| Layouts              | Render every supported region with composition-aware responsive behavior                                                                 | Layout declares structure; unsupported region/device pairings remain visible as unsupported                 |
| Devices              | Reuse one composition across representative desktop and phone profiles, including keyboard/touch and safe-area behavior where applicable | Device record declares display/input capabilities; device catalog is not proof of hardware certification    |
| Generators           | Validate inputs, generate a bounded artifact, show preview, error, provenance, and repeatable output                                     | Model/provider execution is opt-in through a host adapter; a static mock is a specimen                      |
| Tools                | Define typed input/output, permission requirement, execution adapter, status, trace and failure states                                   | Package UI never grants authority; host executes and authorizes actions                                     |
| AI spaces            | Show session/context/tool/evaluation structure with deterministic fixture mode and explicit provider state                               | A visual AI-space contract is not an AI agent, model connection, grounded response, or safe tool permission |
| Registries and data  | Inspect real metadata, relationships, versions, lifecycle, and source-backed provenance                                                  | Registry snapshots describe known records; they do not certify runtime compatibility                        |

Build one maintained vertical slice per family before expanding the catalogue. Add more records only when their metadata, preview, docs, or evidence can be maintained.

### E. Adoption, integration, and operations

**Outcome:** product teams can adopt MAATAA in their own application without confusing package features with host responsibilities.

- Publish a supported integration path and starter example for the declared React/build environments; maintain packed-consumer checks and upgrade tests.
- Provide a guided onboarding that selects a host type, theme, supported device targets, and starter composition, then produces a local preview and clear next steps.
- Document token/theme configuration, RTL and reduced-motion behavior, component composition, accessibility expectations, server rendering, imports, and migrations.
- Provide extension and override recipes that keep app-specific content in the host rather than modifying package source.
- Ship troubleshooting for styling conflicts, server/client boundaries, missing peers, unsupported composition tuples, and generated-code failures.
- Establish issue triage, version support windows, deprecation process, changelog, release notes, and a security-reporting route under release-owner control.

**Exit gate:** a clean consumer can install the pinned package, complete the starter composition, upgrade from the supported prior version, and diagnose unsupported behavior using the published docs and artifacts.

## Sequenced delivery phases

No calendar dates are assigned until engineering capacity and pilot owners are confirmed. The phases are ordered by dependency; each phase requires an explicit acceptance record.

| Phase                                                   | Focus                                                    | Deliverables                                                                                                                                                                                                                   | Completion evidence                                                                                                                     |
| ------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **0 — Make the prototype honest**                       | Inventory actual behavior and retire misleading previews | Maturity fields; catalog/preview distinction; truthful specimen labels; specific status language; owner-reviewed product boundary                                                                                              | Registry audit; screenshot review across target categories; no specimen presented as a real result                                      |
| **1 — Make catalog selection meaningful**               | Record-backed metadata and specific visual examples      | Preview specs and fixtures for pages, workspaces, layouts, devices, generators, tools, and AI spaces; selection-driven content and state variants                                                                              | Per-family selection tests; deterministic fixture hashes; keyboard/mobile review; catalog relationships validate                        |
| **2 — Make composition usable**                         | End-to-end visual composition lifecycle                  | Registry-to-spec mapping; compatibility preview; editable responsive scene; local save/restore/version; generated consumer example                                                                                             | Author/save/reopen/render/export/re-import journey passes; saved-scene migration regression; packed compile                             |
| **3 — Make core families runnable**                     | Useful vertical slices with real, bounded behavior       | Components, page compositions, workspace shell/pages, layouts, device adaptation; explicit interactive demo vs runnable state                                                                                                  | Golden workflow per family; real interaction and error states; accessibility/performance scope recorded                                 |
| **4 — Make generators and tools honest and extensible** | Provider-neutral execution boundaries                    | Typed input/output and host adapters; deterministic no-provider mode; execution, permission, trace, cancellation, failure, and provenance UI                                                                                   | Stub and host-adapter contracts; denied/failed/retried paths; no simulated result labeled as live execution                             |
| **5 — Make AI spaces safely integrable**                | AI shell and capability-boundary productization          | Session/context/evaluation surfaces; model/provider configuration boundary; tool permission previews; redaction and telemetry controls                                                                                         | Deterministic fixture tests; provider absence/failure/timeout paths; prompt/data retention review; tool authority remains host enforced |
| **6 — Make it adoptable**                               | Consumer onboarding and upgrade path                     | Starter compositions, onboarding, docs, migration guides, support workflow, compatibility matrix                                                                                                                               | Fresh consumer install and upgrade; developer task metrics; supported environment evidence and owner review                             |
| **7 — Prove product value in real applications**        | TLPS and a structurally different application pilot      | Execute agreed TLPS and NEVO (or owner-approved alternative) scopes from [`the pilot plan`](../pilots/tlps-nevo-enterprise-pilot-structures.md); collect measured integration, upgrade, accessibility, responsive and DX outcomes | Application owner accepts exact-commit pilot evidence; failed/NOT_RUN measures remain explicit                                          |
| **8 — Promote through release gates**                   | Beta, RC, and GA qualification                           | Complete the remaining steps in [`the enterprise release roadmap`](../release/ROADMAP.md)                                                                                                                                            | Exact-candidate automated and external/manual evidence, API/schema freeze, security reporting and owner approval                        |

## Cross-cutting acceptance gates

These gates apply to each phase and each supported record family:

- **Truth:** catalog state matches executable behavior; previews identify fixture data and do not invent evidence or provider state.
- **Compatibility:** canonical IDs, CompositionSpec, package exports, themes, and supported consumer ranges are versioned and migration-tested.
- **Interaction:** meaningful keyboard, focus, pointer/touch, validation, loading, empty, failure, and recovery states are present for runnable paths.
- **Responsive behavior:** the same real composition is checked against declared viewports and device capabilities; phone-shaped chrome alone does not count.
- **Accessibility:** automated scans, keyboard contracts, zoom/reflow checks, and manual assistive-technology review are separate reported evidence.
- **Performance:** agreed interactions are measured on named hardware/browser/network with thresholds set before the run.
- **Security boundary:** package UI does not imply authentication, tenant isolation, permission, payment, legal acceptance, or trusted execution.
- **Consumer quality:** clean install, production build, SSR where supported, type surface, and upgrade path are validated from the packed artifact.
- **Ownership:** each maturity claim and release decision has an owner, evidence path, date, and scope.

## Product scorecard

Maintain this scorecard per release candidate. Set numeric service and performance targets with the application owners before pilots; do not fabricate targets or results in advance.

| Measure                              | Definition                                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Catalog truth coverage               | Records with reviewed maturity, source/export, relationships, preview status, and constraints / all published records   |
| Distinct preview coverage            | Records whose promised preview is driven by that record's composition/data contract / records advertised as previewable |
| Runnable path coverage               | Supported product families with a passing, documented end-to-end task / families advertised as runnable                 |
| Composition completion               | Successful author → validate → save → restore → render → export → re-import runs / attempts                             |
| Upgrade reliability                  | Successful clean installs and upgrades across declared consumer matrix / attempts                                       |
| Extension burden                     | Host adapter/override count and copied/forked package files per pilot                                                   |
| Accessibility and responsive defects | Open severity-ranked issues by surface and tested device; report test scope and excluded cases                          |
| Runtime and authoring speed          | Predeclared interaction latency and developer task time on named environments                                           |
| Pilot outcome                        | Owner-reviewed task success, time, friction, regressions, and decision for each real application                        |

## Dependencies and decision owners

- **Product scope:** MAATAA product owner to be named; approves what is a supported first-party surface versus an ecosystem record.
- **Technical contracts:** MAATAA maintainers; own registries, package exports, composition schema/runtime, examples, and migrations.
- **Host application behavior:** TLPS and NEVO application owners; own domain data, identity, authorization, business workflow, backend, and operational controls.
- **Release acceptance and private security reporting:** Hemant Kumar Dixit is user-designated release owner. Publishing acceptance, private reporting channel, and response commitments remain outstanding until recorded.
- **Accessibility, performance, security, and legal review:** named reviewers per gate; automated package checks do not replace external or manual acceptance.

## Definition of product-ready

MAATAA UI is ready for the agreed product release when the product owner has approved its supported scope; maturity is truthful across all published records; each supported family has a maintained runnable example; composition, save/restore, responsive rendering, generated output, installation, and upgrade paths work within the declared matrix; docs and support routes are usable; the application pilots have owner-accepted exact-commit evidence; and the independent release roadmap's Beta/RC/GA gates are complete.

This is a scope definition and sequence, not a claim that any future phase has been delivered or accepted.
