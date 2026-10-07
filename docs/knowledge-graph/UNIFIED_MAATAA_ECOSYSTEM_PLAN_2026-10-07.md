# Unified MAATAA UI hub and domain connections

Status: executed. **41 folders** were organized into the hub and four domain families, and **17 links** connect the canonical package pointer, source repositories, and domain collections. All 17 new links resolve. The 32 earlier audited trees were checked again: 31 remain byte/path identical; 15 absolute workspace links in the M2.4.1 snapshot were rebased to its new location. Six unrelated historical dependency/legacy links still point to missing targets. See the [current organized inventory](organized-ecosystem-inventory-2026-10-07.csv).

## Consolidation decision

Use the active `/Users/vesahe/Downloads/maataa-ui-full-alpha7` checkout as the canonical shared React package pointer: `@maataa/ui` 1.0.0-alpha.8.4, observed HEAD `eef053ff`. It had 153 changed paths at inventory time, so preserve it in place and treat the hub as a pointer to the active working tree, not a release certificate.

Keep older package generations separate by version; do not flatten files or merge unrelated Git histories. Their package sources have now also been absorbed into this canonical repository under [`packages/absorbed-maataa-sources/`](../../packages/absorbed-maataa-sources/), with per-file hashes and original Git-state observations. The hub snapshots remain recovery copies. Exact duplicates are recorded as aliases rather than duplicated again. See the [source absorption report](MAATAA_UI_SOURCE_ABSORPTION_2026-10-07.md) for the generation-by-generation ownership boundary.

## Domain layout

The 41 folder moves from the existing `Documents/all` collection and MAATAA candidate trees group material under:

- `domains/nevo/`: NEVO icon/hero assets, NEVO project snapshots, and TPS-V2 production workflow generations.
- `domains/tlps/`: release/app scaffolds, route revisions, creative/mobile assets, and a pointer to the TLPS location/KBM source repository.
- `domains/mom/`: both MOM release bundles and a pointer to the live MOM repository.
- `domains/allb/`: generated/cinematic/brand-board assets and a pointer to the live ALLB repository.

`MAATAA_UI/domains/{nevo,tlps,mom,allb}` links back to these shared domain folders. The hub also links to the active MAATAA checkout, related independent MAATAA repositories, and current NEVO/TLPS/MOM/ALLB source repositories. The resulting `ecosystem.json` records which integrations already exist and which need package migration.

## Runtime integration boundary

The collected projects are not all consumer apps. The M2 0.4.1 TLPS preview already imports `@maataa/ui` from its own 0.4.1 workspace. The NEVO repository contains a separate vendored `@maataa/ui` 0.1.0 package. Other selected directories include static previews, asset sets, and TPS-V2 prototypes without a declared `@maataa/ui` dependency. The central registry makes these sources discoverable, but does not silently change their runtime dependencies. Migrate each real consumer in its owning repository after package-import, theme, route, and interaction checks.

## Execution and validation

The organizer script has a dry-run mode and checks all source folders, destination collisions, and link targets before any changes. It uses same-volume renames, preserves the source folder names inside their category, and rolls back completed moves if an operation fails. After execution, verify every symlink and folder location, then compare moved audit roots against the pre-move SHA-256 manifest.

- Organizer: [consolidate-all-maataa-domains.py](consolidate-all-maataa-domains.py)
- Moved-snapshot symlink repair: [fix-relocated-m2-symlinks.py](fix-relocated-m2-symlinks.py)
- Earlier extracted-tree evidence: [EXTRACTED_TREE_AUDIT_2026-10-07.md](EXTRACTED_TREE_AUDIT_2026-10-07.md)
