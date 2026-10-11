# API and canonical identity policy

The current package is a private prerelease. Public exports and CSS entry points are EXPERIMENTAL until their reviewed release freeze. JSDoc-deprecated symbols are DEPRECATED. Implementation files outside the package export map are INTERNAL. No API is labelled STABLE merely because it exists or passes a local test.

[`manifests/PUBLIC_API.json`](../manifests/PUBLIC_API.json) resolves actual TypeScript module exports, including wildcard re-exports, aliases, type-only symbols and concrete leaf entry points. `node scripts/api-manifest.mjs --check` refuses stale snapshots. Changes to this file require a reviewer to evaluate import paths, runtime symbols, types, provider and hook contracts, and CSS entry points. Snapshot integrity is a static API check, not release certification.

At the reviewed 1.0 freeze, STABLE contracts follow SemVer: incompatible runtime, type, CSS, schema or import-path changes require a major release; compatible additions require a minor release; compatible fixes require a patch. Prerelease changes must still document migrations. Package versions change in a dedicated qualified release step.

Canonical IDs used in persisted scenes must not be silently renamed or reused. Preserve an existing ID when changing its display name. A replacement requires an explicit old-to-new alias, versioned migration helper, tests against saved scenes and release notes. No aliases are fabricated while there is no actual migration. Removal of a stable ID is a major change. Unknown IDs remain errors; missing relationship evidence remains unverified.

CompositionSpec's schemaVersion changes only for a reviewed schema migration. Legacy scenes enter through explicit migration and canonical validation. Theme names, runtime props, registry record types and layout-region contracts are reviewed as public contracts, even when generated.

After GA, deprecations remain available for at least two minor releases and six months before removal in a major release, except a documented urgent security fix. Breaking-change approval, release ownership and supported-version commitments must be recorded by the release owner before GA. This policy does not establish an approved API freeze or support commitment by itself.

## Beta API freeze (recorded 2026-10-12)

The exports listed in [`manifests/STABLE_API.json`](../manifests/STABLE_API.json) are **STABLE** by the release owner's gate-7 decision; `PUBLIC_API.json` marks them so. `pnpm api:check` (the certification `api` gate) fails when a stable export is removed, deprecated or its signature changes without the list being updated, and when a canonical ID in [`manifests/CANONICAL_IDS.json`](../manifests/CANONICAL_IDS.json) disappears without a migration or retirement record or a retired ID is reused. Updating either file requires a recorded owner decision referenced in the commit. All other exports remain EXPERIMENTAL; the root `@maataa/ui` entry has no stable named exports.
