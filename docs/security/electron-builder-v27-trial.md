# Electron Builder v27 migration trial

**Disposition: isolated build trial passed; do not promote the alpha builder yet.** The v26 application toolchain remains in the root manifest and lockfile. The fail-closed full security baseline remains blocked by `GHSA-hp3w-g68c-fv3c` in that current toolchain.

## Scope and result

On 2026-10-08, an isolated install of `electron-builder@27.0.0-alpha.9` was run from `.certification/electron-builder-v27-trial`, using Node `v22.22.3`. The root `package.json`, root `pnpm-lock.yaml`, and `examples/support-center/electron-builder.yml` were left unchanged. The isolated lockfile has no `sprintf-js`, `global-agent`, or `roarr` entries, and `pnpm audit` reported zero advisories across 197 development dependencies. The root production audit also passed.

The v27 `migrate-schema` command was first run in dry-run mode, then applied only to the copied config. It removed the redundant `asar: true` setting. The config migration also warned that v27's default macOS entitlements are narrower. The migrated config successfully built the combined MAATAA Desktop app as an unsigned macOS ARM64 directory package. The output contained a 17 MB `app.asar`; the app executable was a Mach-O ARM64 binary. The isolated package build occupied approximately 324 MB.

The package build skipped code signing because this host has no valid Developer ID identity. Consequently, the trial proves dependency-audit improvement and packaging compatibility only. It does not prove signed runtime behavior, notarization, or suitability of the changed macOS entitlements on a distributed build.

## Current gate

The root dependency graph still resolves:

```text
electron-builder@26.15.3
  -> app-builder-lib@26.15.3
  -> @electron/get@3.1.0
  -> global-agent@3.0.0
  -> roarr@2.15.4
  -> sprintf-js@1.1.3
```

The latest full baseline run found exactly one moderate advisory, `GHSA-hp3w-g68c-fv3c`, with these dependency paths:

```text
.>electron-builder>app-builder-lib>@electron/get>global-agent>roarr>sprintf-js
.>electron-builder>dmg-builder>app-builder-lib>@electron/get>global-agent>roarr>sprintf-js
```

`pnpm run security:baseline` therefore exited `1` with `dependencyAudit: FAIL`; `secretScan` and `frozenTag` passed. The advisory has no patched `sprintf-js` release. The separate isolated v27 pass does not alter this result or waive the root gate.

## Recommendation and decision still required

Keep v26 and the blocking audit intact while v27 is still an alpha. Before adopting v27, evaluate a stable v27 release or record an explicit, scoped release-owner decision to accept the alpha risk. Then repeat the migration on a dedicated branch, run the complete desktop/browser checks, validate the entitlement change under code signing, and regenerate security evidence against the exact clean candidate commit. The release owner is Hemant Kumar Dixit; no risk acceptance is recorded here.

Official migration references: [v26 to v27 walkthrough](https://www.electron.build/docs/migration/v26-to-v27) and [v27 breaking changes](https://www.electron.build/docs/migration/v27-breaking-changes).
