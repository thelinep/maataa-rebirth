# Electron Builder migration and advisory resolution

**Current disposition: dependency advisory resolved in the working candidate; exact-commit certification is pending.** The supported builder remains on stable v26.17.0. The root dependency graph now overrides `app-builder-lib`'s `@electron/get` v3 requirement to v5.1.0, removing the affected `global-agent -> roarr -> sprintf-js` branch.

## Scope and result

On 2026-10-08, an isolated install of `electron-builder@27.0.0-alpha.9` was run from `.certification/electron-builder-v27-trial`, using Node `v22.22.3`. The root `package.json`, root `pnpm-lock.yaml`, and `examples/support-center/electron-builder.yml` were left unchanged. The isolated lockfile has no `sprintf-js`, `global-agent`, or `roarr` entries, and `pnpm audit` reported zero advisories across 197 development dependencies. The root production audit also passed.

The v27 `migrate-schema` command was first run in dry-run mode, then applied only to the copied config. It removed the redundant `asar: true` setting. The config migration also warned that v27's default macOS entitlements are narrower. The migrated config successfully built the combined MAATAA Desktop app as an unsigned macOS ARM64 directory package. The output contained a 17 MB `app.asar`; the app executable was a Mach-O ARM64 binary. The isolated package build occupied approximately 324 MB.

The package build skipped code signing because this host has no valid Developer ID identity. Consequently, the trial proves dependency-audit improvement and packaging compatibility only. It does not prove signed runtime behavior, notarization, or suitability of the changed macOS entitlements on a distributed build.

An isolated stable-channel trial then used `electron-builder@26.17.0` with the same `@electron/get@5.1.0` override. The combined desktop app packaged successfully for macOS ARM64, and its complete trial dependency audit reported **0 advisories across 219 dependencies**. The root install now uses this stable builder and scoped override. A fresh root audit reported **0 vulnerabilities** across 615 dependencies. The source changes are not yet certified; the full suite and enterprise run must be executed after they are committed.

`@electron/get@5.1.0` requires Node.js `>=22.12.0`. The MAATAA UI package itself retains its Node `>=20` engine declaration, but desktop packaging with this builder override requires Node.js `>=22.12.0`.

## Resolved advisory and prior baseline

Before the override, the root dependency graph resolved:

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

Before the override, `pnpm run security:baseline` exited `1` with `dependencyAudit: FAIL`; `secretScan` and `frozenTag` passed. The advisory has no patched `sprintf-js` release. The stable builder plus `@electron/get` override resolves the audit finding without accepting the v27 alpha or recording a risk waiver.

## Remaining verification

After committing these changes, run the full Vitest suite and `pnpm certify:enterprise` on that exact clean commit. Confirm that the generated security report says `dependencyAudit: PASS` and that the release record identifies the same commit with a clean source-integrity gate. The enterprise report may still remain overall `BLOCKED` on manual governance items such as license approval, pilots, remote tag protection, private security reporting, and a controlled publisher.

References: [v26 to v27 walkthrough](https://www.electron.build/docs/migration/v26-to-v27), [v27 breaking changes](https://www.electron.build/docs/migration/v27-breaking-changes), and [pnpm dependency override settings](https://pnpm.io/settings/dependency-resolution).
