# Dependency and security baseline

Dependencies require a documented need, license review, maintenance assessment and measured impact. Lockfile changes are reviewed and validated with a frozen installation. The dependency audit includes development tooling; known moderate-or-higher findings block qualification until patched or explicitly assessed by the release owner.

Vitest and its matching coverage adapter are pinned to patched 4.1.11. A narrow Storybook addon-actions override pins UUID 11.1.1 to address its buffer-bounds advisory while retaining its v4 API. Unit and Storybook qualification are required for these changes.

`pnpm security:baseline` records the audit, a bounded high-confidence secret scan, installed-package license inventory, CycloneDX SBOM, lockfile hash, artifact checksums and Git provenance. It distinguishes generated inventory from manual license approval, and local frozen-tag verification from remote tag protection. An uncommitted tree is explicitly recorded and cannot be release-certified.

Before publishing, the release owner must designate a private vulnerability-reporting channel, triage owner and response commitments; approve licenses; enforce immutable release tags at the repository host; and configure a controlled publisher with artifact provenance. These external governance gates remain NOT_RUN until evidence exists. Never publish a package to establish whether permissions happen to permit it.
