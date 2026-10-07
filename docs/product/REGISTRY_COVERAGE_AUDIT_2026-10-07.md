# Registry coverage audit — 2026-10-07

The pasted inventory reported 1,577 records, 237 matching wrapper names, 1,340 unmatched names, and 234 wrapper files. I checked those claims against the current checkout instead of treating the pasted snapshot as current.

## Current source result

| Check                                               | Result |
| --------------------------------------------------- | -----: |
| Component registry records                          |  1,577 |
| Records resolving to a source module                |  1,577 |
| Records with a declared package subpath             |  1,577 |
| Records with the expected named export              |  1,577 |
| Runtime component exports                           |  1,571 |
| Type-only exports                                   |      6 |
| Atomic registry entries with direct runtime exports |    238 |
| Coverage failures                                   |      0 |

The six type-only records are `ButtonProps`, `ButtonVariant`, `NavItemData`, `DataColumn`, `ChartPoint`, and `MaataaTheme`. Their registry kind is now `type`, so tools consuming the registry will not mistake them for renderable components.

The five large composition catalogues contain 1,103 records: 188 devices, 101 layouts, 209 generators, 492 tools, and 113 AI spaces. Their direct import paths are present. Most catalogue-specific files intentionally compose shared surfaces such as `DeviceSurface`, `GeneratorSurface`, `ToolSurface`, and `AISpaceSurface`; this audit proves importability and export identity, not that every catalogue entry implements its own domain workflow.

## Verification method

`pnpm registry:coverage` first checks that the TypeScript-generated public API manifest is current, then verifies every registry item against its source file, `package.json` export rule, resolved public subpath, and named export. It also confirms atomic entries resolve to runtime exports and are classified as atoms.

This replaces the stale wrapper-name count with checks against the package consumers actually import. The pasted note's “source ZIP unavailable” limitation does not apply to this checkout: its source tree was available and inspected. Auth, persistence, payments, AI inference, and product business logic remain outside this shared UI package's authority.
