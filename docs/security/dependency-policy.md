# Dependency and security baseline

Dependencies require a documented need, license review, maintenance assessment and measured impact. Lockfile changes are reviewed and validated with a frozen installation. The dependency audit includes development tooling; known moderate-or-higher findings block qualification until patched or explicitly assessed by the release owner.

The current Electron packaging advisory and isolated v27 alpha trial are recorded in [the Electron Builder migration report](electron-builder-v27-trial.md). The trial does not change the root dependency or waive the full audit gate.

Vitest and its matching coverage adapter are pinned to patched 4.1.11. A narrow Storybook addon-actions override pins UUID 11.1.1 to address its buffer-bounds advisory while retaining its v4 API. Unit and Storybook qualification are required for these changes.

`pnpm security:baseline` records the audit, a bounded high-confidence secret scan, installed-package license inventory, CycloneDX SBOM, lockfile hash, artifact checksums and Git provenance. It distinguishes generated inventory from manual license approval, and local frozen-tag verification from remote tag protection. An uncommitted tree is explicitly recorded and cannot be release-certified.

Before publishing, the release owner must designate a private vulnerability-reporting channel, triage owner and response commitments; approve licenses; enforce immutable release tags at the repository host; and configure a controlled publisher with artifact provenance. These external governance gates remain NOT_RUN until evidence exists. Never publish a package to establish whether permissions happen to permit it.

License records include the package metadata hash. If that metadata omits a license, an explicit MIT heading in the package's LICENSE file can resolve it, with the file hash recorded as provenance. Other missing or ambiguous declarations remain UNKNOWN. This is inventory extraction and does not constitute legal or distribution approval.

The SBOM follows pnpm's resolved dependency graph rather than every directory in its virtual store. Stale cached versions are excluded. Component references and dependency edges identify active package versions; license provenance remains attached to each component.
