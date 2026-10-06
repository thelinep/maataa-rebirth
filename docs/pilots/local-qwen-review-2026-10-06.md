# TLPS and NEVO local Qwen pilot run review

**Run date:** 2026-10-06
**Provider/model:** Local Ollama · `qwen2.5-coder:7b`
**Runtime:** MAATAA Brahmini Workbench on the local demo; provider status returned Ollama connected. Anthropic and Gemini were disconnected.
**Result:** initial runs were partial; repeat runs produced complete generated draft kits, but neither is an accepted pilot, executable demo, or release evidence.

## Run record

| Pilot | Model handoffs observed       | Completion                                                                 | Evidence boundary                                     |
| ----- | ----------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| TLPS  | Brahmini, Shiv, Parvati, Atri | Stopped after four handoffs when the next local model request timed out.   | Partial Product Forge draft only; no final synthesis. |
| NEVO  | Brahmini, Shiv, Gautama       | All three role handoffs returned; final Product Forge synthesis timed out. | Partial Product Forge draft only; no final kit.       |

## Repeat run

**Rerun date:** 2026-10-06. To reduce accumulated prompt context, the Workbench team was reduced to Brahmini, Shiv, Parvati, and Gautama; the prompt required short, unique contributions and a concise final kit. Provider remained Local Ollama · `qwen2.5-coder:7b`.

| Pilot | Rerun result                                                                                                                                         | Review disposition                                                                                                                                                                                                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLPS  | Initial seven-agent retry stopped at the engineering handoff on timeout. A reduced four-agent retry completed all four handoffs and final synthesis. | Generated six-section kit, but weak implementation value: no concrete route map or data contract; starter is a placeholder; repeats approval states, unsupported WCAG claims, and host authority confusion. It remains a draft, not an accepted pilot.                                                            |
| NEVO  | Reduced four-agent run completed all four handoffs and final synthesis.                                                                              | Generated six-section kit, but the React starter is only an empty shell; quote fields use ambiguous numeric money despite requesting currency/versioning; design states accessibility assurances without evidence; “request submitted” risks implying a real mutation. It remains a draft, not an accepted pilot. |

The reruns prove that shorter four-agent chains can reach the Workbench's completed-conversation state in this session. They do not establish that Ollama was warmed before the first request: model residency and load/prompt/generation timings were not recorded. A UI “complete” status means synthesis returned, not that the resulting sections are implementation-ready. No generated code was run, no export file was observed, and no source, pilot, accessibility, security, user, or production acceptance evidence was created. Keep both pilots' measures **NOT_RUN**.

The runtime's Ollama request timeout is 120 seconds. It does not set `keep_alive`, so Ollama's default applies. The original October 6 runs did not expose load, prompt-evaluation, or generation timing and therefore could not distinguish a cold load from slow prompt processing or generation. No pilot-generated code from those initial runs was run or applied to the repository.

## TLPS review

The useful core matches the intended planning surface: an event brief and venue notes, timed call sheet, crew and budget checks, owner preview, rehearsal checklist, evidence metadata, audit display, and JSON handover. The model also repeated the important boundary that the real TLPS host remains authoritative for identity, permissions, approvals, state transitions, bookings, production execution, evidence, and integrations.

The draft needs substantial correction before it can be used as an implementation brief:

- It invents Redux, REST APIs, routes, and backend responsibilities as if decided. None was established by the prompt or verified against a TLPS integration contract.
- It crosses the authority boundary by describing owner approval, approved/ready states, and a JSON handover “for production execution.” In this prototype, these can only be clearly labeled simulated review states and an illustrative export; they must not imply a host approval or production authorization.
- The sample data includes invented people, a stale 2023 event date, a generic venue, a `$5000` budget, and a PDF site plan. Though framed as synthetic, these examples are not a reviewed TLPS fixture set and could be mistaken for product facts if copied forward.
- The React sketch is not a tested starter. It omits working inputs and validation, uses untyped state, and wires the review action ambiguously. It does not implement the promised workflow.
- “WCAG 2.1 compliance” is asserted as an acceptance target but no accessibility behavior was inspected or tested in this model run.

**Disposition:** keep the workflow outline as a draft candidate. Rewrite its data, state names, and actions to make `local demo`, `preview`, and `proposed handover` unmistakably non-authoritative. Confirm real routes, host API, and role rules with the TLPS owner before implementation.

## NEVO review

The useful core captures the bounded lifecycle from public brief to tenant event/operator plan, quote draft, customer offer, customer decision, booking-hold request, and production handoff. It correctly calls out synthetic fixtures and identifies tenant isolation, authorization, and fixture management as unresolved.

The draft still has material boundary and contract defects:

- It says tenant authorization and production execution are out of scope, but proposes “Review/Confirm,” “Confirm hold,” and “Confirm production handoff” actions. Use read-only proposed states or simulated transitions with persistent labels; do not present them as bookings or operational commitments.
- `Quote.status` moves from `accepted` to `hold_requested` to `held`, conflating customer acceptance, a hold request, and an authoritative inventory hold. Separate these lifecycles and explicitly label the demo-only state machine.
- The contract uses `Date`, `any`, a bare numeric amount, and a boolean acceptance flag. It omits currency and quote lines/totals, versioning, expiry, and who accepted when. It cannot safely support the deterministic quote and explicit customer acceptance requested.
- The proposed routes are invented and generic; they are not confirmed NEVO routes. The handoff also treats generated test cases/screenshots as deliverables, but no screenshots or tests were produced by this run.
- The QA reviewer recommends client-side React/Redux context as a tenant-isolation strategy. That is unsafe as an authority claim: UI state can select context, but tenant isolation and authorization must be enforced and negatively tested in the NEVO host.
- “Sufficient contrast,” keyboard operation, and ARIA labels are written as assurances/checklist text. They were not evaluated against rendered screens.

**Disposition:** use the lifecycle as a discussion draft only. Keep customer acceptance, hold, and production handoff as separately modeled demo states, with an always-visible synthetic/non-binding label. The NEVO host owner must define real route names, quote math, tenant boundaries, and permitted actions.

## Cross-run quality findings

1. **Handoffs mostly copied earlier text.** Specialists did not produce strongly differentiated research, data, engineering, and evidence contributions. NEVO's governance-oriented quality review repeated the full product brief instead of reviewing each control against evidence.
2. **Synthesis is fragile and output quality remains low.** The initial seven-agent TLPS run timed out at handoff 5; the initial three-agent NEVO run timed out during synthesis. Four-agent retries completed both kits, but the kits still include placeholder code, unsupported claims, and incomplete contracts, as noted above.
3. **Agent input can be silently truncated.** The runtime clips each system prompt to 24,000 characters and each message to 12,000 characters. The Workbench appends complete previous handoffs into one message for each next agent, then passes that message to the runtime. Long chains can therefore lose prompt tail content—including later agent contributions during synthesis—without a warning. The exported draft does not identify truncation or show the exact model input.
4. **Model identity is not reproducible evidence.** The UI records `qwen2.5-coder:7b`, but this run did not record an Ollama model digest, runtime/model versions, prompt hashes, or repeated-trial outputs. Provider connectivity and one successful response do not qualify repeatability.
5. **Timeout cause is not diagnosed.** Without `load_duration`, `prompt_eval_duration`, `eval_duration`, and actual prompt-size records, the 120-second abort cannot be attributed to cold loading, long handoff context, slow token generation, or a combination.
6. **No source-grounded product lookup occurred.** Generated routes, APIs, personas, statuses, dates, amounts, and technology choices must be treated as model proposals, not facts.
7. **Model output did not self-enforce evidence discipline.** It described accessibility and acceptance tests without test results and introduced authoritative-sounding approval/hold language despite explicit scope boundaries.

## Recommended pilot disposition and next gates

| Area                                   | Current disposition                 | Required evidence before acceptance                                                                                                                                                                                                                                     |
| -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLPS Product Forge run                 | **GENERATED KIT / REVIEW REQUIRED** | Improve placeholder starter, route/data contracts, and authority wording; TLPS owner validates workflow and data; actual UI implementation and task run with synthetic records.                                                                                         |
| NEVO Product Forge run                 | **GENERATED KIT / REVIEW REQUIRED** | Replace ambiguous monetary fields and empty starter; NEVO owner validates route and quote contract; tenant/role negative tests in the authoritative host.                                                                                                               |
| Local Qwen provider                    | **CONNECTED / USED**                | This proves local request/response only, not model qualification, repeatability, or product readiness.                                                                                                                                                                  |
| Accessibility and responsiveness       | **NOT_RUN**                         | Rendered pages, keyboard and screen-reader checks, responsive viewport evidence, and defect disposition.                                                                                                                                                                |
| Integration, security, user acceptance | **NOT_RUN**                         | Exact host commits/environments, owner sign-off, server-side authorization tests, and named participant outcomes.                                                                                                                                                       |
| Full Product Forge kits                | **GENERATED, NOT ACCEPTED**         | Bound and summarize handoffs, warn before/after truncation, preserve constraints, retain Ollama timing/token metrics, and handle slow requests with visible timeout/retry controls. Inspect all sections after export before treating generated kits as product briefs. |

Do not count these model runs toward the enterprise pilot milestone. Keep both pilot charters' measures **NOT_RUN** until the named application owners and exact integrated environments produce the evidence described in `tlps-nevo-enterprise-pilot-structures.md`.

## Follow-up controls added on 2026-10-07

The MAATAA demo now caps prior agent handoffs and keeps complete responses visible for review. Overlong idea or working-context requests are blocked in Product Forge before provider dispatch. The local runtime rejects over-limit inputs instead of silently slicing prompt text or conversation history; it returns elapsed time, Ollama load/prompt/generation timing and token counts when the service supplies them, the Ollama model digest when available, and a SHA-256 trace of the exact system/message input. The Workbench shows model digest prefixes, elapsed time, and an input-trace indicator for responses with runtime metadata.

These controls improve observability and prevent the specific silent-truncation failure mode; they do not establish model qualification, deterministic output, or semantic quality.

## Current-runtime rerun — 2026-10-07

Both pilots were rerun through the Workbench using this checkout's runtime from commit `67ce58021eec7aaa27d2a14aae3372fb91207ae6`, isolated on loopback port 4176. The preview at port 4173 was routed to that runtime. All seven selected roles (Brahmini, Shiv, Parvati, Atri, Bharadvaja, Gautama, and Vashistha) and the Brahmini synthesis role used Local Ollama `qwen2.5-coder:7b`; cloud providers were disconnected. The same full team was used for each pilot. The prompts explicitly constrained outputs to synthetic, local, non-authoritative proposals and prohibited inventing host contracts.

| Pilot | Workbench result                                                                                   | Runtime evidence                                                                                                                                                                             | Disposition                                                                                                                                                                                                 |
| ----- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLPS  | 7 agent handoffs plus synthesis completed; 8/8 runtime responses returned HTTP 200 in about 6m10s. | Model digest `dae161e27b0e90dd1856c8bb3209201fd6736d8eb66298e75ed87571486f4364`; 8 unique prompt hashes; 8,834 completion tokens; per-request elapsed 30–63s; Ollama-reported load 55–101ms. | **GENERATED KIT / REVIEW REQUIRED.** The model completed the chain, but its starter is a generic draft and its synthesis contains unsupported facts and unverified accessibility claims.                    |
| NEVO  | 7 agent handoffs plus synthesis completed; 8/8 runtime responses returned HTTP 200 in about 6m36s. | Same model digest; 8 unique prompt hashes; 9,627 completion tokens; per-request elapsed 32–85s; Ollama-reported load 53–86ms.                                                                | **GENERATED KIT / REVIEW REQUIRED.** The model preserved the non-binding boundary in parts of the synthesis but introduced invented roles, stale sample dates, and an incomplete quote/hold implementation. |

The full visible Workbench outputs and compact runtime traces are preserved in [`the generated-run evidence folder`](generated-runs/2026-10-07-qwen25-coder-7b/). The records include each role's output, model digest, prompt SHA-256, request-size counts, token counts, and Ollama timing fields. They are explicitly labeled unaccepted generated drafts. No generated code was exported, compiled, or run, and no output was applied as implementation.

No separate model warm-up request was performed. The first pilot calls reported 101ms and 86ms of Ollama load time and all 16 pilot calls completed below the runtime's 120-second request limit. Because the model may have been resident from earlier local use, this does not prove a true cold-start result; a cold-versus-warm qualification trial would need a controlled unload and repeatable measurements.

### Rerun review

- **TLPS:** The synthesis respects the local, synthetic, non-authoritative boundary in the brief, but expands TLPS to “Time-Limited Production Planning” without evidence, invents a final acknowledgment step, and emits generic routes rather than verified host routes. Its sample starter still includes a historical 2023 date and invented crew, uses a default `MaataaUI` import instead of the package's named exports, and leaves the handover as `console.log`. It asserts keyboard and screen-reader requirements without test evidence. Earlier handoffs repeat the same product brief, so the seven role labels did not produce seven clearly independent contributions.
- **NEVO:** The synthesis keeps the demo non-binding in several sections, but invents a “Mark (Content Specialist)” agent that was not selected, assumes login and an existing hold process, and supplies 2023 records with a bare numeric quote amount that has no currency. The starter is mostly placeholder handlers and comments; event selection and workspace/quote creation do not implement the promised journey. Accessibility is stated as a feature without rendered or manual test evidence.
- **Across both:** The model chain is sequential, not a set of independent models or a qualified provider ensemble. All roles used the same local model digest. Completion means the model returned a synthesis, not that its product claims are accurate or its code is usable. The exact prompts and response traces improve reproducibility, but one run per pilot does not qualify repeatability or domain quality.

Both outputs remain discussion drafts only. TLPS still needs the application operating owner, participants, verified host routes/contracts, synthetic fixture approval, and task-based owner acceptance. NEVO still needs a named application owner, charter, verified quote/currency rules, tenant and authorization boundaries, and host acceptance. Accessibility, integration, security, user, real-device, and production measures remain **NOT_RUN** for both pilots.
