# TLPS inventories and MAATAA Atomic Table extraction comparison

Date: 2026-10-17  
Scope: compare the three supplied TLPS JSON snapshots with the supplied MAATAA Atomic Table mobile reconstruction archive, and prepare a traceable integration handoff. This review reads the archive as data; it does not execute its code or merge it into the application.

## Result

The TLPS exports are internally consistent on route inventory and schema-table references. The routes-and-frames file is a compact duplicate view of the pages inventory, despite its `1.0.0-proposed` version label and a v1.2.0 filename. The schema export is a proposed fresh-database baseline, not evidence of an introspected or connected database.

The Atomic Table archive is a standalone eight-screen mobile UI reconstruction from two raster boards. It does not appear to be part of the TLPS screen taxonomy or schema: the TLPS catalog is centered on film production, crew, investor, event and related operating systems, while Atomic Table models chemistry/scientific exploration. No Atomic Table or periodic-table implementation references were found in the inspected `apps`, `examples` and `docs` source trees. Prepare it as a separately scoped MAATAA product/workspace, with a later explicit decision about navigation or hosting, rather than silently inserting its concepts into TLPS routes or tables.

## Source integrity

| Input | Bytes | SHA-256 | Declared identity |
|---|---:|---|---|
| `TLPS_All_Pages_English_v1.2.0.json` | 908,310 | `9edd4ae9d6f4c5fe7fed6860c3ac9bfc7155c459468fb73c43a05edd6e9941b9` | All Pages English Specification Snapshot, version 1.2.0 |
| `TLPS_All_Routes_and_Frames_English_v1.2.0.json` | 305,222 | `c7a092e4d11e8d67129356563a290f5be8b65a5845081d387cb8ff1b958238e7` | Full mobile routes and frames snapshot, version 1.0.0-proposed |
| `TLPS_Schema_Grouped_English_v1.2.0.json` | 709,228 | `48e869187356636f253bac76baeef0a8ff12431f150729d53d7a90cfbf21801f` | TLPS schema 1.2.0-proposed |
| `MAATAA_Atomic_Table_Mobile_Extraction (1).zip` | 5,343,379 | `5a86379d0649f71a532606a769d5a92b55953964cc68e0ac869c21d791af9d5d` | `maataa-atomic-mobile-extraction` 0.1.0 reconstruction |

The three TLPS artifacts all state snapshot date `2026-10-17`. Both route artifacts say canonical paths are proposed and the mobile prototype switches screens using client-side keys rather than URL routing. Treat the inventories as specification evidence, not a claim that each route is live.

## TLPS consistency comparison

| Check | Pages vs Routes | Finding |
|---|---|---|
| Route records | 228 vs 228 | Exact `page_id`/`route_id` match for all 228; no duplicates or missing IDs |
| Route-defining fields | name/title, canonical path/path, coverage, route group, prototype key, template | Zero mismatches across all 228 records |
| Coverage | 53 `prototype_page`, 130 `prototype_generic`, 45 `planned_required` | Counts and labels match; 45 routes remain explicitly planned |
| Frame taxonomy | 6 shell frames; 6 operating systems / 61 OS frames; 10 role workspaces; 6 overlay/system frames; 12 aliases | Shared counts and definitions in both route exports |
| Common UI states | 9 | Loading, empty, error, offline, forbidden, not-found, conflict, success and destructive confirmation are specified as required |
| Schema table references | 169 across 18 domain groups | Exact group/table-name match between pages inventory and schema export |

The pages JSON is the richer specification: its 228 records include purpose, mobile layout, sections, actions, fields, related tables, common states, accessibility and source-route fields. The routes JSON retains the shared route identity and frame-card view, but does not include those richer per-page details. Keep the pages JSON as the route-specification source and use routes-and-frames as a presentation/export view.

### Schema boundary

The grouped schema declares `proposed fresh-database baseline; no connected database introspected`, SQLite/libSQL-compatible dialect, 169 tables, 18 groups, 279 explicit indexes and 42 triggers, with zero views. Its embedded source SQL SHA-256 is `8b4e26a94827932d1b3f6c21f656cbd5242f0c8cd7cca0c3e99abfa0d79db03c`. These figures describe the supplied baseline only; no SQL source or live database was supplied for independent validation. Seed counts are present for eight catalogs/permission tables and should be treated as proposed fixture counts.

## Atomic Table archive inventory and limits

The archive contains 19 files: README, asset manifest, type catalog, `dataframes.json`, two 1536×1024 board PNGs, one SVG icon sprite, one asset note, package/TypeScript/Vite setup, reconstructed React/Three.js source, a periodic-elements JSON file and one reconstruction test file.

Its eight screen concepts are Explore, 3D Atom, Atoms & Compounds, Scientific Helper, All Labs, Evidence & History, People & Roles, and Profile & Settings. The periodic-elements file contains 118 element identities and marks Hindi labels `review-needed`. The archive itself says the mockup text and sample data are illustrative, the people/roles are UI examples, the reaction is a board demonstration, and detailed scientific properties must be sourced and verified. The 3D scene is procedural geometry; the supplied PNG boards contain no original source layers or embedded data/code. Icons are reconstructed glyphs/SVG, not original extracted artwork.

The archive's package manifest uses `latest` dependency tags and requires a network install. For reproducibility, pin dependency versions and lockfile before adopting it into a maintained build. No install, build or test was run as part of this comparison.

## Prepared integration handoff

1. **Preserve the boundary:** treat Atomic Table as a separate scientific product/workspace within the MAATAA ecosystem. Do not map its chemistry fields into TLPS film-production tables or count these screens among the 228 TLPS routes.
2. **Choose the delivery surface:** decide whether this remains a standalone mobile prototype or becomes a separately routed MAATAA app. If integrated later, reserve a product-level entry and namespaced route family such as `/science/atomic-table/*`; do not add routes until an owner and hosting/navigation boundary are selected.
3. **Keep fixture data separated:** only the 118 core identities are supplied in the periodic table file. Preserve their per-record provenance and localization review state. Do not promote the screenshot-transcribed compounds, crystal labels, reactions, sample profiles or historical entries as verified data.
4. **Adopt its evidence model deliberately:** the reconstruction defines useful provenance vocabulary for sources, methods, people, dates and evidence status. Review it against MAATAA's existing governance and data contracts before creating persistence; it is a prototype contract, not an authoritative schema.
5. **Make the prototype reproducible:** replace `latest` ranges with reviewed exact versions, add a lockfile, then run type-check/build/tests in an isolated branch or worktree after integration scope is approved.
6. **Review assets and UX:** preserve both supplied boards as references; identify the reconstructed SVG/glyphs as new assets; review mobile accessibility, localization (especially Hindi labels), and image/asset licensing before publication.
7. **Gate scientific release:** require primary-source citations and review for any physical property, structural/CIF record, measured/computed value, solver result or historical claim. Keep schematic rendering clearly labeled and avoid implying a simulation where none exists.

## Suggested ownership of artifacts

- **TLPS route truth for this snapshot:** pages JSON for detailed page definitions; routes JSON for compact route/frame views.
- **TLPS database design candidate:** grouped schema JSON, pending source-SQL and target-database validation.
- **MAATAA Atomic Table UI concept:** zip reconstruction and its two board PNGs, pending product-boundary and provenance review.
- **Not established by these files:** current production routes, deployed UI parity, live schema, scientific validation, production payment/identity/access control, or release readiness.

