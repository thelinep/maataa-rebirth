# MAATAA ecosystem recollection

**Reconstructed:** 7 October 2026

**Companion:** [Full vertical interactive mind map](index.html) · [Graph data](maataa-ecosystem.graph.js)

This is an evidence-bounded reconstruction of the accessible MAATAA conversation history and the current working tree. It joins user decisions, implementation surfaces, adjacent project context, and open proof. It is not a full export of all Codex or ChatGPT conversations. The MAATAA checkout is dirty, so “current” means present in the inspected working tree or current source documentation—not released, committed, or enterprise-qualified. Cross-repository statements are historical unless their owning repository was checked in this turn.

## How to read the graph

- **Current evidence** means a source, route, fixture, or document exists in this MAATAA checkout. It does not claim a complete user journey or release acceptance.
- **Historical** means the relationship or result came from an earlier conversation, saved report, or separate repository and must be refreshed before use as current status.
- **Needs proof** marks a route mapping, owner decision, configuration, test, pilot, or release gate that remains unresolved.
- **Boundary** records which system or organization owns authority and real-world outcomes.
- A package export, registry record, catalogue tab, route, rendered frame, screenshot, demo, and accepted workflow are different evidence types. Do not infer one from another.

## Conversation arc

### 1. Define a reusable product, then recover its scope

The starting thread repeatedly returned to the same question: what is MAATAA UI intended to become, and what has actually been built? The user asked for a prototype-to-product roadmap, token estimates, current mind maps, detailed status matrices, full folder and package audits, and a complete list of Redux slices. The product direction that emerged is a host-neutral React UI package with a registry vocabulary for components, atoms, pages, layouts, workspaces, devices, generators, tools, AI spaces, identities, themes, hooks, state, and demo data.

The user then identified a real product defect: many catalogue selections seemed to show the same content. That changed the bar from “the registry contains many records” to “selection must render record-specific data, structure, states, and meaningful actions.” Page specimens and data slices for pages, workspaces, layouts, devices, generators, tools, and AI spaces were requested. Package manifests and screenshot counts are useful inventories, but they cannot substitute for checking each record-to-frame mapping. The conversation also tested an “atoms attach to compounds” model. The stronger resulting path is typed composition: requirements graph → validated canonical schema → TypeScript snapshot, rather than selecting atoms by similar names and calling that a product.

### 2. Move from a catalogue to distinct application journeys

Seven independent end-to-end demos were requested rather than one generic demo with different labels: MAATAA registry explorer, NEVO event command center, NEVO spatial planning, TLPS production, AI evidence command center, mobile device preview, and control plane. Their current source routes and scenarios are listed in the graph. Demo fixtures remain illustrative; they do not create production bookings, payments, authorized model actions, or backend records.

TLPS and NEVO were chosen as structurally different application examples. TLPS exercises production planning and evidence handover. NEVO exercises public event planning, proposal/commercial records, and event operations. The user asked to recover prior NEVO work rather than restart from the visible demo. Separate NEVO history records a legacy static archive with 151 frames, 50 service entries, and 320 detailed service items; that archive was considered a content/taxonomy source, not a production app. Its referenced creative images were incomplete and its forms, auth, tenant controls, and API behavior were prototype-only. Another NEVO creative thread reported a ZIP of 116 banners (50 master and 66 event-subcategory banners) and a planned 220-icon set; the last four sheets, covering 28 icons, remained planned while Adobe authentication was unavailable. These are reported historical outputs, not files verified in this MAATAA checkout. Recheck counts, assets, licensing, and provenance in the owning NEVO workspace before treating them as current.

### 3. Make the shared UI usable and inspectable

The user noticed missing global theme and language controls, then asked where typography, fonts, and colors were configured. This led to global appearance controls and an advanced Theme Studio covering semantic colors, typography, host font stacks, density, borders, surfaces, shadows, motion, reduced motion, and focus. Product copy remains only partly localized even though shell labels include Hindi and English.

Visual and behavior feedback also became concrete: margins and padding looked unbalanced; hooks such as `useOutsideClick` and `useScrollBackToTop` were missing from the discoverable surface; navbar auto-hide and other common behaviors were requested; responsiveness and defects were to be checked across the application. The graph separates hook exports/docs from a dedicated hook demo, and responsive screenshots from physical-device acceptance.

The user asked whether all demos worked, requested Playwright-produced demos/videos, and later requested screenshots for pages, workspaces, layouts, devices, generators, tools, AI spaces, support screens, responsive states, and interaction states. The working tree contains screenshot and Playwright artifacts, but a capture is evidence of one captured state—not proof that every route or state works.

### 4. Turn “idea to product” into a governed authoring workflow

For Brahmini, the user requested a helper across MAATAA support, help, and docs; a workbench able to turn a described idea into a frontend demo/product; working identities rather than symbolic identities; conversations between roles; and multiple providers including local LLMs. The flow was later clarified as:

**Idea → evidence-linked requirements graph → reviewed schema → TypeScript/CompositionSpec snapshot → Sandbox preview → human-reviewed application integration.**

Requirements are decomposed into users, tasks, records, states, workflow edges, data contracts, authorities, acceptance criteria, evidence, and unknowns. Unknown facts stay unknown. Generated source remains a draft; it is not automatically written into the repository or run against a live service.

Provider adapters and task-role handoffs do not make roles independent models. Historical local Qwen runs are not current, digest-pinned model qualification. “Teach Brahmini” refers to retrieval notes; it does not fine-tune model weights. Training/tensor qualification requires a separate governed dataset and model-evaluation pipeline.

### 5. Build support and desktop distribution surfaces

The user requested a standalone Support Center with complete help, support, FAQs, application screens, searchable package details, TLPS routes, responsive/state screenshot sets, and then one Electron application containing both MAATAA UI and Support Center. The current tree contains the Support Center, package index, screenshot gallery, local handoff flow, and Electron shell source. Historical packaging reports describe an unsigned local build; that does not establish a signed/notarized release or a connected support service.

### 6. Select the consumer and pilot path

The user explicitly chose to keep `@maataa/ui` as the shared React package and prove it in a small Next.js App Router consumer. The target proof is package imports, theming, one public page, and one interactive workflow; this is a consumer integration experiment, not a migration of the UI package to Next.js. Rust was discussed for comparison, but no Rust rewrite was selected.

The user selected TLPS as the first pilot and provided “Hemant Kumar Dixit” in the earlier release-owner question. The saved recollection assigns that name to MAATAA release approval/private security reporting, but does not treat it as proof of TLPS operational ownership or pilot acceptance. Pilot owners, charters, measures, data access, and acceptance records still need confirmation in the owning applications. A named release approver is also not an approval record; the private security reporting route and response commitments need current configuration.

### 7. Keep earlier workspaces and claims separate

MAATAA M2 closeout, the fused Electron desktop experiment, the alpha7/alpha8 checkout, NEVO, TLPS/TLPBTL, MOM/KBM, and Brahmini/NOVA have distinct repositories and evidence. A saved PASS, test count, route screenshot, provider response, or pilot proposal from one tree does not qualify another. Exact commit, branch, tree state, runtime, and acceptance scope must travel with every release claim.

## Decision ledger

| Decision or request | Recollected outcome | Remaining proof |
| --- | --- | --- |
| Keep the shared package in React | `@maataa/ui` remains the package; use a small Next.js App Router consumer first | Re-run consumer qualification on the exact clean candidate and supported environment matrix |
| Start with a concrete pilot | TLPS selected first; NEVO is a structurally different candidate | Confirm application owners, charter, participants, safe data, integrations, success measures, and acceptance |
| Use the current TLPS planning flow as its demo baseline | Keep unverified claims out; distinguish synthetic fixtures from operational evidence | Verify each claim and record against TLPS-owned sources |
| Make a full product from an idea | Idea → requirements/schema → TypeScript snapshot → preview | Human review of assumptions, identity/permissions, data contracts, code output, and acceptance |
| Use multiple model providers and local LLM | Local Ollama/Qwen and optional cloud adapters are in scope | Confirm live configuration without exposing secrets; qualify immutable model/provider identity separately |
| Give identities working agent roles | Specialist handoffs are a workflow over assigned providers | Do not infer independent reasoning or grant repository/service authority from role labels |
| Package product and help together | MAATAA UI and Support Center have an Electron shell | Signed/notarized distribution and clean-install acceptance remain separate release gates |
| Run all tests and inspect screenshots | Test and browser artifacts exist in the working tree/history | Re-run against exact current tree; report skips, setup limits, and external gates separately |

## Current graph conclusions

1. MAATAA is the shared presentation and authoring layer; the host application owns domain authority.
2. The strongest product path is not “idea directly to UI.” It is idea → evidence and unknowns → schema → canonical TypeScript snapshot → preview → owner review.
3. Registries improve discoverability, while product completeness depends on unique rendered frames, real interactions, error/loading/empty states, responsive behavior, consumer integration, and accepted outcomes.
4. TLPS and NEVO are candidate integration contexts, not validated pilots merely because demo flows exist.
5. The biggest recurring process cost is rediscovering state across conversations and repositories. Durable, source-linked records and exact acceptance evidence are the closure mechanism.

## Coverage limits

The historical conversation audit available to this work used 357 locally retained Codex rollout records dated 6 April–3 October 2026, plus a recent 50-task Codex/ChatGPT listing and three archived tasks surfaced at that time. Rollout records may include retries or agent work; the app listing is a recent window. This is not a complete export of ChatGPT history, other devices, external project systems, or every repository. This reconstruction reuses that method and accessible project records; it does not claim universal coverage. The user-provided active route `#/mobile/033/projects-portfolio` was not found in the MAATAA `examples/redux-demo/App.tsx` route table inspected here; its owning application/router is unresolved, so the route is recorded as an investigation item rather than a missing or completed frame.
