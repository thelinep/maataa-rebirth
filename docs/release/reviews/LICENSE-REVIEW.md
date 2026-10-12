# Licence review brief (gate 2)

**Prepared:** 2026-10-12 for the legal/licence reviewer · **Candidate:** `5bc8c7b8` (`@maataa/ui` `1.0.0-alpha.8.4`) · **Status:** NOT_RUN — awaiting reviewer.

This brief collects facts for the reviewer. It is not legal advice and not an approval.

## What is distributed

- The package is MIT (`LICENSE`) and currently `private: true`; no registry publication happens until gate 11.
- The packed tarball (`.certification/package/maataa-ui-1.0.0-alpha.8.4.tgz`, 8,755 files) contains `dist/`, `docs/`, `manifests/`, `examples/redux-demo/`, `README.md`, `LICENSE` and `package.json` (the `files` field).
- Runtime dependency: `@reduxjs/toolkit` (MIT) only. React, React-DOM and react-redux are peer dependencies supplied by the consumer.
- The resolved dependency inventory for the candidate (`licenses.json` in the evidence pack) has 591 packages: 587 permissive (MIT 463, ISC 45, Apache-2.0 33, BSD 25, BlueOak 11, other permissive 10).

## The four packages for review

None of them is in the runtime dependency set, and a search of the tarball file list finds no file from any of them.

| Package | Licence | How it enters the repository | Shipped? |
| --- | --- | --- | --- |
| `axe-core` 4.13.0 | MPL-2.0 | Accessibility test tooling via `@axe-core/playwright` and `@storybook/addon-a11y` (dev) | No |
| `@axe-core/playwright` 4.13.0 | MPL-2.0 | Direct devDependency for browser accessibility tests | No |
| `@img/sharp-libvips-darwin-arm64` 1.3.4 | LGPL-3.0-or-later | `sharp` ← `miniflare` ← `wrangler` (dev), a native image library loaded only on macOS arm64 | No |
| `caniuse-lite` 1.0.30001814 | CC-BY-4.0 | Browser-support data via `browserslist` (Babel/Vite build tooling) | No |

## Observation for the owner

`wrangler` was added to the root `devDependencies` by `404ac820` ("prepare Cloudflare Workers runtime") for Hemant Observatory, which is outside this release's scope. It is also declared in `apps/hemant-observatory/package.json`. Removing it from the root `devDependencies` (then `pnpm install` to update the lockfile and a fresh certification run) would remove the LGPL item from the `@maataa/ui` dependency graph entirely. This is an owner decision.

## Questions for the reviewer

1. Is use of MPL-2.0 and LGPL-3.0 tooling during development and testing, without distributing it, acceptable under company policy?
2. Does any notice or attribution obligation arise for `caniuse-lite` (CC-BY-4.0) when its data only influences build output and is not shipped?
3. Is the MIT licence of `@maataa/ui` and its single runtime dependency acceptable for the intended distribution (private first, registry later)?
4. Should the 587 permissive licences be accepted as a class, or listed individually?

```
Decision: APPROVE / APPROVE WITH CONDITIONS / REJECT
Conditions / attribution notes:
Reviewer:        Role:        Date:        Candidate commit:
```
