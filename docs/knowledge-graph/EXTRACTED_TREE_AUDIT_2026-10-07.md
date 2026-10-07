# Extracted folder and media tree comparison — 7 October 2026

## Result

I compared **32 selected MAATAA, NEVO, TLPS, TPS-V2, MOM, and ALLB extracted/package folders**: 45,565 included entries (44,470 regular files and 1,095 symlinks) totaling 1,072,327,022 bytes (about 1.00 GiB). SHA-256 was computed for every regular file; symlinks are identified by their link targets. Tree identity is path-sensitive: matching entries must have the same relative path, type, size, and content hash or link target. `.git` directories, `.DS_Store` files, and empty directories were omitted; no other content was filtered. There were no read/hash errors.

After the comparison, 41 folders were grouped under `/Users/vesahe/Documents/all/MAATAA_UI` and `/Users/vesahe/Documents/all/domains`; 32 were part of this hash audit and 9 additional MAATAA sources were brought into the hub. The root and per-file manifests show current locations. Thirty-one audited folder hashes are unchanged. In the M2.4.1 snapshot, 15 absolute workspace symlinks were rebased to the same moved packages/apps; its current tree hash records that path repair. Six historical dependency/legacy symlinks remain dangling and are listed in the hub README. The [organized inventory](organized-ecosystem-inventory-2026-10-07.csv) records pre-move and current hashes. See the [unified ecosystem map](UNIFIED_MAATAA_ECOSYSTEM_PLAN_2026-10-07.md).

The scan found **4 exact duplicate folder pairs**, **7 complete smaller-tree subsets**, and other related content overlap. “Exact” here means identical included file trees under the exclusions above. This comparison is separate from the [archive-file hash audit](ARCHIVE_HASH_AUDIT_2026-10-07.md), which compares archive files themselves.

## Exact duplicate folder pairs

| Folder pair | Included files per folder | Result |
| --- | ---: | --- |
| `tps-v2-p0-p7-complete` ↔ `tps-v2-p0-p7-complete 2` | 32 | Exact tree match |
| `tps-v2-p5-real-components` ↔ `tps-v2-p5-real-components 2` | 40 | Exact tree match |
| `mom_release_bundle` ↔ `mom_release_bundle 2` | 41 | Exact tree match |
| `ferty9_tlps_route_with_BTL_coverage` ↔ `ferty9_tlps_route_with_BTL_coverage (1)` | 4 | Exact tree match |

These are redundant copies by content, but this report does not choose which copy is canonical or remove either one.

## Complete subsets and near-duplicates

- `tps-v2-p0-p7` contains all 32 files from each `tps-v2-p0-p7-complete` folder and adds only `package-lock.json`. The two `complete` folders are exact duplicates of one another.
- `tps-v2-p7-booking-contracting-final` is fully contained in `tps-v2-p0-p7` (21 of 21 files) and in either `complete` folder (21 of 21).
- `tps-v2-p5-event-marketplace` is fully contained in each `tps-v2-p5-real-components` folder (21 of 21); the latter contains 19 additional files.
- `tps-v2-p6-pricing-final` shares 10 of its 11 files with each P0–P7 bundle; it is related, not an exact copy.
- `tps-v2-p2-event-intelligence` and `tps-v2-p3-production-scene-composer` share 197 same-path, same-hash files out of 199 and 207 respectively. Their tree hashes differ; keep them as distinct phase snapshots.
- The two Ferty9 TLPS folders are exact copies of each other, while `tlps_in_release_code_ready` and `tlps_launch_scaffold` are not exact copies. The scaffold shares only one same-path file with the larger folder.

## Media findings

- `NEVO_EOS_ICONS_LIGHT_DARK` and `NEVO_EVENTS_ICON_FULL_PLATFORM_SET` have **71 unique identical file contents** despite different relative paths. Their folder trees are not equal and have no path-matched files. This is reuse across differently organized icon packages, not evidence that one whole package duplicates the other.
- `allb-28-cinematic-assets-final` and `allb-28-generated-assets-complete` share **434 same-path, same-hash files**. Their trees are not equal: each has unique files, and several same-path artwork files, manifests, and app assets differ. Preserve both as related creative generations unless an owner designates a canonical package.
- No exact whole-tree duplicate was found among the other selected NEVO icon/hero packages, ALLB brand-board extraction, TLPS media folders, or the MAATAA M2 closeout tree. This conclusion applies only to these scanned directories.

## Scope and evidence limits

The scan intentionally compares selected top-level extracted folders visible in Downloads: TPS-V2 P0/P2/P3/P5/P6/P7/P10 snapshots; TLPS code/scaffold and Ferty9 route folders; MOM bundles; NEVO icon and hero-media packages; ALLB extracted/generated/cinematic packs; TLPS creative/mobile assets; and the MAATAA M2 closeout. It does not claim a complete inventory of every mounted drive or every nested snapshot. The folder previously referred to as `nevo_full_application_maataa_shree_snapshots` and the individual `nevo_full`/`nevo_maataa_edit` roots were not present at the searched Downloads locations, so they are not included. The folder named `nevo-event-os 3` contains just one 142-byte file in this scan and is not treated as a full NEVO repository snapshot.

Hashes establish byte identity, not project ownership, freshness, buildability, legal rights, or release readiness. No files were moved or deleted.

## Audit artifacts

- [Reproducible comparison script](compare-extracted-trees.py)
- [Root inventory and tree SHA-256 values](extracted-tree-root-manifest-2026-10-07.csv)
- [Pair-by-pair tree comparison](extracted-tree-pair-comparison-2026-10-07.csv)
- [Per-file SHA-256 manifest](extracted-tree-file-manifest-2026-10-07.csv)
- [Shared content hashes across folders](extracted-tree-shared-content-2026-10-07.csv)
- [Post-consolidation inventory of 41 folders](organized-ecosystem-inventory-2026-10-07.csv)
