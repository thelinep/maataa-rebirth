# Source-repository-only material

Some MAATAA working records are kept in the source repository but are not shipped in the `@maataa/ui` package. They are not needed at runtime, and they record local machine paths that do not belong in a published package. Links in the shipped docs that would point to them lead here instead.

To read them, open the source repository checkout (not `node_modules/@maataa/ui`).

## MAATAA ecosystem knowledge graph

Location in the repository: the `knowledge-graph` folder inside `docs`.

- `index.html`: the searchable, vertical ecosystem map (open it in a browser)
- `README.md`: scope and evidence rules for the graph
- `RECOLLECTION.md`: the conversation arc and decision ledger
- `MAATAA_UI_SOURCE_ABSORPTION_2026-10-07.md`: the source absorption report for historical MAATAA UI package copies
- consumer API comparison and migration status reports, archive and extracted-tree audits, inventories (CSV/JSON) and the scripts that produced them

## Product runtime evidence logs

Location in the repository: the `evidence` folder inside `docs/product`.

- `phase5-runtime-evidence-2026-10-09.md`: the Phase 5 runtime evidence summary
- `runtime-evidence-<UTC>.log`: written by `scripts/collect-runtime-evidence.sh`
- `tlps-idea-to-script-<UTC>.log`, `project-context-<UTC>.log`, `tauri-native-smoke-<UTC>.log`, `allb-live-handshake-<UTC>.log`: written by the matching `scripts/run-*.sh` checks

These logs are local run records. Shipped docs cite them by file name.
