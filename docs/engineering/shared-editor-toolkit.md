# Shared editor toolkit and Brand Studio

## Scope delivered

The first vertical slice connects a source-aware brand board, editable Brand Kit, Theme Studio handoff, real `@maataa/ui` component previews, local review snapshots, and explicit product-assignment drafts. The reusable package surface lives at `@maataa/ui/editor` and currently provides:

- `EditorWorkbenchFrame`, an accessible host-neutral workbench boundary.
- `useEditorHistory` plus pure `createEditorHistory`, `updateEditorHistory`, `undoEditorHistory`, and `redoEditorHistory` operations.
- `parseEditorDocument` and `serializeEditorDocument` for bounded, schema-checked JSON import and portable export.

The demo's typed document and editor are deliberately host-owned. They are not evidence that every editor category in the proposal exists.

## Data and authority boundaries

Branding Studio stores its working document and version snapshots in this browser. A saved version includes board nodes, relationships, and the exact derived Theme Studio theme snapshot. Assignment drafts refer to those version IDs. Import validates the document schema and a 2 MB byte ceiling. The local review state does not write to the five product repositories, approve a brand, or publish a theme.

The board has stable object IDs, keyboard arrow-key movement, and a list/outline alternative to the canvas. Its selected-context checkboxes define which objects are included in a provider request. Suggestions are validated against those objects and their current `before` values; each proposed change is reviewable, and acceptance records provider, model, digest/hash metadata when returned, time, and accepted count. A stale suggestion is discarded and must be regenerated. Provider choice is explicit; failures do not switch providers automatically.

Rights metadata starts as `unknown`; no logo or external asset is supplied as approved. Theme candidates are previewed using actual Button, Badge, and Card components. Loading a candidate into Theme Studio does not apply it globally until the user separately chooses Theme Studio's apply action.

## Provider comparison and limits

The proposal's model table is a capability-based shortlist, not a benchmark. This workspace has a Brahmini runtime adapter for local Ollama and optional Anthropic and Gemini providers. The screen reads the runtime's current configuration and lets the user choose an available provider/model. No provider-specific score or recommendation is claimed. No measured task suite has been run here.

| Provider option | Candidate strengths for these editors | Tradeoff and verification boundary | This slice |
| --- | --- | --- | --- |
| Local Ollama models | Private/offline drafts and bounded structured edits when a model is installed | Hardware, context size, model digest, and per-task quality vary; qualify the exact local model | Brahmini adapter; available only when runtime reports it ready |
| Anthropic models | Long-context writing, review, code and reasoning tasks | Hosted processing and API cost; evaluate the exact configured model and data terms | Brahmini adapter; available only when configured |
| Gemini models | Multimodal review of images and documents plus text tasks | Visual interpretation does not prove exact geometry; evaluate the exact configured model | Brahmini adapter; available only when configured |
| Cloudflare Workers AI catalogue | Potential low-friction summaries, tagging, extraction and routing | Capabilities, structured outputs, and data behavior differ by model; migration and evaluation required | Proposed only; no adapter here |
| Dedicated image-generation provider | Raster concept exploration and creative variants | Generated assets need human review, provenance, rights and production refinement | Proposed only; no image-generation adapter here |

Treat each row as a test candidate, not a winner. The model display name alone is insufficient for reproducibility; record provider, exact model ID, digest when available, prompt hash, and accepted edits. If an adapter cannot provide stable version metadata, record that evidence gap.

Evaluate candidates using the same consented, non-sensitive task fixtures: turn selected brand-board notes into a structured edit, map a palette into valid semantic tokens, review a screenshot, draft a workflow transition, and summarize evidence with source references. Record valid-edit rate, unsupported claims, schema/test pass rate, correction effort, latency, and cost per accepted result. Pin exact model IDs and immutable digests where the provider exposes them. Do not silently retry a rejected output with another provider or treat provider marketing claims as local evaluation results.

## Proposed shared layers

| Layer | Owns | This slice |
| --- | --- | --- |
| `@maataa/ui` | Accessible host-neutral editor frame and controls | Frame, history, JSON helpers exported |
| Editor engine | Typed document, commands, validation, undo/redo | Generic history and JSON helpers; brand document/editor remain demo-owned |
| AI adapter | Context selection, provider calls, provenance, evaluations | Uses the existing Brahmini local runtime; no new provider adapter |
| Host application | Workspace permissions, durable storage, collaboration, approvals | Browser-local storage; no shared authorization or collaboration service |
| Brand/theme registry | Approved immutable versions and domain bindings | Local review snapshots and draft assignments only |

## Remaining work before treating this as a shared product capability

1. Extract the brand document schema, node commands, and validation into a separately versioned engine package or domain adapter; keep Brand Kit concepts out of generic UI exports.
2. Add a durable host persistence interface, migration/recovery policy, and multi-tab or concurrent-edit conflict behavior. Current autosave is browser-local and last-writer-wins.
3. Define real host permission checks and an approval registry before domain assignments can move beyond local drafts.
4. Add a reusable AI proposal contract with source references, per-field diffs, cancellation, request size limits, provider retention disclosures, and a recorded evaluation suite.
5. Build the next typed editors (document, workflow, graph, evidence, assets, timeline, spatial, and page/UI) one at a time with domain validation and accessible non-canvas alternatives.
6. Re-run package consumer import checks in MAATAA Workstation, Siddham, TLPS, NEVO, and InvestorHub before claiming cross-product adoption.

## Verification for this change

Fresh checks on 2026-10-08:

- `pnpm build`, `pnpm typecheck`, and the full unit suite passed: 297 tests across 40 files.
- The live Qwen UI scenario passed in Chromium. The larger app suite completed 385/390 checks in one run; Playwright could not save five failure artifacts after the disk filled. Each of those five exact tests passed when rerun alone in its target browser.
- The packed consumer certification passed for Vite React 18/19 and the Next.js App Router, including two Next desktop/mobile journey tests.
- Demo build/validation, Support Center build/typecheck, screenshot galleries, and Support Center browser coverage passed. Support browser results were 33 passed and 6 configured skips; screenshot capture tests passed in the targeted reruns.
- API/registry coverage, docs validation, bundle budgets, and beta preparation validation passed. Beta validation still reports the package as private.
- Security baseline: secret scan and SBOM passed, frozen baseline tag matched; dependency audit failed on one moderate `sprintf-js@1.1.3` advisory in the development-only Electron packaging dependency tree. The advisory lists no patched release. License review, remote tag protection, and publisher ownership were not run.
- `pnpm certify:enterprise` stopped at its clean-tree guard because this checkout contains uncommitted changes. No exact-commit enterprise certification was produced.

## Local provider verification (2026-10-08)

The local `qwen2.5-coder:7b` model was called through the Brahmini runtime and through the Branding Studio browser flow. The UI flow produced a structured suggestion, required explicit review before applying it, and saved the Ollama model digest and prompt hash with the accepted change. This confirms one local end-to-end path; it is not a multi-trial model qualification or a provider benchmark.

The runtime now accepts `ANTHROPIC_API_KEY` and `GEMINI_API_KEY` from the ignored root `.env` as server-side fallbacks. The dedicated ignored `.env.brahmini.local` file and process environment retain precedence. Only those two cloud keys are read from root `.env`; values are never sent to the browser. Gemini reports configured in the runtime, but no Gemini generation was run. Anthropic is not configured in this environment.

## Release gates still outside this checkout

- A cloud provider smoke request requires explicit approval for the project-derived payload and destination; configuration status alone is not a generation test.
- The dependency audit currently blocks the security baseline: `sprintf-js@1.1.3` is pulled through the Electron packaging toolchain; upstream currently lists no patched version. Do not silently waive this gate.
- Product repositories for Siddham, TLPS, NEVO, and InvestorHub are not mounted in this checkout, so their package imports, permissions, routes, and workflows cannot be switched or certified here.
- Durable cross-host persistence, authenticated owner approval, concurrent-edit conflict handling, and publish/rollback need a real host service and identity boundary. The demo's browser storage and assignment drafts do not provide those authorities.
- No user identities or approval rosters were supplied for all five products. Do not represent a local button click as a verified owner approval.
