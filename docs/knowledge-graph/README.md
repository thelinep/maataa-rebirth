# MAATAA ecosystem knowledge graph

Open [`index.html`](index.html) in a browser for a searchable, vertical map. The current graph has 67 nodes and 83 explicit relationships. Search spans node descriptions and source paths; status filters separate current repository evidence, historical context, unresolved proof, and authority boundaries. Select a node to inspect its source links and explicit relationships. Use **Download graph JSON** to export the rendered graph data. The companion [deep recollection](RECOLLECTION.md) records the conversation arc, decision ledger, project boundaries, and unresolved route investigation.

## Scope and evidence rules

This graph reconstructs the MAATAA UI checkout and the project-history summaries available on 7 October 2026. It is not a verbatim export of every conversation or a live scan of every related repository. TLPS, NEVO, MOM/KBM, and NOVA/Guru project states are marked historical where they come from saved recollection; recheck each owning repository before treating them as current. Repository documentation may itself include older status snapshots, so counts are intentionally not repeated here unless freshly generated. All source paths and graph relationships were checked for existence and referential integrity while this graph was expanded; that structural check does not verify the truth or freshness of every underlying project claim.

The graph's central product chain is **idea → reviewed requirements graph → canonical TypeScript/CompositionSpec snapshot → Sandbox preview → owner-reviewed host integration**. MAATAA owns presentation contracts; the host application owns business data, identity, permissions, persistence, integrations, and real-world actions. Brahmini's role handoffs and model-provider adapters support drafts and retrieval; they do not grant repository write, execution, deployment, or model-training authority.

## Primary evidence

- [Product architecture](../product/ARCHITECTURE.md) and [composition contract](../composition-spec.md)
- [Product roadmap](../product/PRODUCT-ROADMAP.md) and [enterprise release roadmap](../release/ROADMAP.md)
- [Brahmini Workbench boundary](../brahmini-workbench.md) and [AI architecture](../product/AI-ARCHITECTURE.md)
- [TLPS and NEVO pilot structures](../pilots/tlps-nevo-enterprise-pilot-structures.md)
- [Workspace recollection](../WORKSPACE-RECOLLECTION-2026-10-07.md)
- [Conversation arc and decision ledger](RECOLLECTION.md)
- [Drive project catalog and consolidation decisions](DRIVE_PROJECT_CATALOG.md)
- [Exact archive SHA-256 audit](ARCHIVE_HASH_AUDIT_2026-10-07.md) and [full archive hash manifest](archive-hash-manifest-2026-10-07.csv)
- [Extracted folder and media tree comparison](EXTRACTED_TREE_AUDIT_2026-10-07.md), with [root hashes](extracted-tree-root-manifest-2026-10-07.csv), [pair comparison](extracted-tree-pair-comparison-2026-10-07.csv), and [per-file manifest](extracted-tree-file-manifest-2026-10-07.csv)
- [Unified MAATAA UI and domain organization plan](UNIFIED_MAATAA_ECOSYSTEM_PLAN_2026-10-07.md) and [organizer](consolidate-all-maataa-domains.py)
- Source graph model: [`../../examples/redux-demo/productBlueprint.ts`](../../examples/redux-demo/productBlueprint.ts)

Refresh the source references after substantial product or project changes. Do not turn a historical note, generated manifest, screenshot, local provider response, or automated check into pilot or release acceptance evidence.
