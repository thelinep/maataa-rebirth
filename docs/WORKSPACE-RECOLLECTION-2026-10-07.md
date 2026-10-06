# Workspace recollection — 7 October 2026

This is a working reconstruction from the project inventory and conversation summaries available to this task, plus the current MAATAA UI checkout. It is not a complete export of every Codex or ChatGPT conversation, and it does not re-qualify any other repository. Cross-project states below are historical until rechecked in their owning repositories.

## Product map

| Workstream | What the conversations describe | Last known boundary or next proof |
| --- | --- | --- |
| **MAATAA UI** — `/Users/vesahe/Downloads/maataa-ui-full-alpha7` | React/TypeScript UI system with registries, page/workspace/layout/device/tool/AI-space specimens, Redux demo slices, Theme Studio, Playground, Sandbox composition, seven independent demo requests, and a Brahmini Workbench. | Product behavior and a local demo are ahead of release acceptance. Current roadmap is [`product-roadmap.md`](product-roadmap.md); enterprise release gates are separately tracked in [`../ROADMAP.md`](../ROADMAP.md). |
| **Brahmini / NOVA** — `/Users/vesahe/Documents/Repos/brahmini` and earlier worktrees | Brahmini was requested as cross-surface help/docs support and an idea-to-frontend-product workbench. Roles can hand work to one another; provider adapters include local Ollama/Qwen and configurable cloud providers. Teach Brahmini stores retrieval notes; it does not fine-tune model weights. NOVA was treated as a UI/interaction reference, not a second AI runtime. | Agent-role handoffs do not prove independent reasoning when roles share one model. Generated output is a reviewable draft, never automatically applied. Verify the current canonical checkout before relying on older results. |
| **TLPS / TLPBTL** — `/Users/vesahe/Documents/tlpbtl` and separate TLPS repositories | Location/planning knowledge, source-listed catalogues, collection and normalization work, plus the MAATAA TLPS demo and pilot proposal. | Local planning data and synthetic demo fixtures do not imply production readiness. A historical KBM validation was `CONTROLLED_PREVIEW`, with zero execution-ready sites; re-run validation in its own repository for a current claim. |
| **NEVO Event OS** — `/Users/vesahe/Documents/Repos/nevo-event-os-3` and alternate checkouts | Event planning, proposals, venue/supplier catalogues, event operations, tenant/auth and release work. NEVO is the structurally different candidate application pilot paired with TLPS. | The MAATAA demo is illustrative: no real booking, contract, hold or payment. NEVO pilot ownership, charter and measures were still open in the last product snapshot. Repository-specific release gates must be checked in the canonical checkout. |
| **MOM / KBM** — `/Users/vesahe/Documents/tlpbtl/mom-location-os` and related evidence | Location and knowledge-base authority, routing and cross-project evidence; distinct from TLPS application behavior. | Keep source authority in the owning MOM/KBM service. A UI specimen or NOVA shell does not become authoritative service behavior. |
| **MAATAA M2 / fused desktop work** | Earlier closeout and a separate isolated desktop/fusion effort were discussed. | Historical closeout is not evidence for this alpha7 tree. Preserve checkout boundaries; do not merge unrelated repository state by assumption. |

## Decisions that carry forward

- MAATAA is application-agnostic UI. A consuming application owns routing, identity, permissions, business data, persistence, APIs and real-world actions.
- The user selected TLPS as the first pilot and named Hemant Kumar Dixit as release approval/private-security-reporting owner. That does not make him the TLPS operating owner or pilot acceptance authority. The private reporting route and response commitments remain unconfigured in the last release record.
- The selected product path is **idea → reviewed requirements/schema → TypeScript snapshot → Sandbox preview**. Requirements should be decomposed into user tasks, data contracts, authority boundaries and acceptance evidence before implementation. The new wizard makes that decomposition explicit while keeping missing facts unknown.
- TLPS and NEVO model-assisted runs were previously reviewed as generated kits with unsupported assumptions and incomplete implementation detail. They are not accepted pilots or release evidence.
- Release qualification is exact-candidate and evidence-bound. An earlier automated enterprise pass did not clear manual pilot, legal/license, screen-reader, real-device, performance-target, publisher, API-freeze, remote-protection or owner-acceptance gates.

## Immediate sequence

1. Fill the guided intake in Product Forge for one explicitly named use case; list supplied evidence and leave unresolved facts blank.
2. Ask the application owner to validate roles, data sources, integrations, decision authority, and pilot measures. The wizard itself does not contact the owner.
3. Configure and qualify the intended model/provider in the local runtime; record its identity and limits. Do not treat agent titles as distinct model capability.
4. Run Product Forge only on the reviewed brief. Review the requirement graph and every quoted source, unknown, inferred node and boundary.
5. Compile the accepted graph to the canonical TypeScript snapshot; build and test it in an isolated consumer, then review generated code before any application integration.
6. Run TLPS and NEVO pilots only after each application's owner approves a charter, users, scope, safe test data, success measures and acceptance record.
7. Re-run the release workflow against the exact final commit; complete manual/external gates with the named owners before describing a beta or GA as accepted.

## Coverage and freshness

The app-provided project inventory was reviewed and relevant MAATAA, Brahmini, TLPS and NEVO conversations were selected from the accessible recent thread list; only a small archived list was available. Prior local-history work also sampled local rollout/session logs, but that sample is not universal conversation history. Private or unavailable chats, other machines, external project systems and changes made after the cited snapshots are not represented here. This note is an index for resuming work, not a source of truth for the other repositories.
