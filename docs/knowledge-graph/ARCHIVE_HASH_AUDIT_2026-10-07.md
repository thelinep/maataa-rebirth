# Exact archive hash audit — 7 October 2026

## Result

SHA-256 was computed over every archive file found in the seven scoped local roots below. **701 files totaling 8,936,747,139 bytes (about 8.32 GiB)** were read; there were **0 read errors**. The scan found **115 byte-identical hash groups**, covering **243 extra copies** beyond one retained copy per hash. Retaining one copy per SHA-256 group would make up to **1,177,489,419 bytes (about 1.10 GiB)** redundant by raw archive identity. No files were changed or removed.

The complete per-file inventory, SHA-256, size, duplicate count and group ID are in [`archive-hash-manifest-2026-10-07.csv`](archive-hash-manifest-2026-10-07.csv).

## Scope and method

Roots scanned:

- `/Users/vesahe/Downloads` — 149 archive files, 2,804,143,075 bytes
- `/Users/vesahe/Documents/Repos/nevo-events` — 124 files, 349,149,934 bytes
- `/Users/vesahe/Documents/Repos/nevo-event-os-3` — 4 files, 15,540,017 bytes
- `/Users/vesahe/Documents/Repos/ne-2` — 0 files
- `/Users/vesahe/Documents/Repos/tlpbtl` — 58 files, 236,524,159 bytes
- `/Users/vesahe/Documents/GitHub/maataa-ui` — 2 files, 258,016,301 bytes
- `/Users/vesahe/revenue/live/mom` — 364 files, 5,273,373,653 bytes

Included suffixes: `.zip`, `.tar`, `.tgz`, `.gz`, `.7z`, `.rar`, `.dmg`, and `.pkg`. The scan excluded generated/dependency folders named `node_modules`, `.git`, `.next`, `.cache`, `coverage`, `DerivedData`, `target`, `dist`, `build`, `playwright-report`, and `test-results`. It hashes the archive bytes themselves; two archives with different container metadata but identical extracted files will not count as byte-identical. Conversely, a matching SHA-256 is a strong byte-for-byte identity result, not proof that deleting a copy is safe.

## Duplicate groups by family/path pattern

| Grouping | Hash groups | Extra exact copies | Bytes removable if one retained per hash |
| --- | ---: | ---: | ---: |
| NEVO TPS phase archives | 14 | 102 | 7,784,436 |
| NEVO release/feature packs | 3 | 5 | 2,501,865 |
| Paths containing `maataa` (includes app and browser evidence archives) | 21 | 22 | 153,418,621 |
| MOM video-evidence trace archives | 42 | 42 | 711,310,453 |
| Other scoped project/release evidence | 35 | 72 | 302,474,044 |
| **Total** | **115** | **243** | **1,177,489,419** |

## Confirmed examples

- The TPS phase archives `p0` through `p7` are repeated byte-identically across the six NEVO preview trees and Downloads. Several individual phase ZIPs occur 9–10 times; the same hash values are recorded in the CSV.
- `TPS-V2-NEVO-P0-P7-COMPLETE.zip` has three byte-identical copies. `nevo_complete_application_all_demo_events_projects.zip` also has three byte-identical copies (including `(1)` and `(2)` names).
- `maataa-ui-local-preview-json.zip` is byte-identical across the MOM location-OS checkout, the downloaded MOM demo, and the live MOM checkout.
- 42 MOM video-evidence archive groups pair `reports/video-evidence/latest/traces/` with the dated `2026-06-07T09-13-06Z` run. These may be deliberate “latest” pointers/snapshots; preserve them unless the evidence-retention policy permits pruning.
- Several browser report archives are duplicated between Playwright report data and named test traces. These are test evidence, not disposable build cache.

## Decision

This confirms exact duplicate archive bytes, but does not authorize cleanup. Keep every copy for now. The repeated TPS ZIPs and matching “latest” evidence traces should be checked for references, retention needs, and an approved archive-of-record before any copy is removed. No extracted-folder tree comparison was performed in this archive-file audit; that remains separate from raw ZIP identity.
