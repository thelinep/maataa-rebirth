# Accepted risks

## AR-001: Local home path in git history

A local macOS home-directory path (the account's home folder under `Users`) appears in historical commits under `docs/knowledge-graph/` and `docs/product/evidence/`. These directories are excluded from the published tarball (see `fix/privacy-leak`, commit 3a9eedb) but remain in git history.

The same path also appears in the repository (not the tarball) outside those two directories:

- At the tip of `fix/privacy-leak`, in 29 more files: `apps/hemant-observatory/` (22 evidence logs and `CLAUDE-NEXT-PHASES-PROMPT.md`), `apps/shared/contracts/workstation-mapping.ts`, `archives/maataa-ui-source-snapshots/manifest.json`, and four scripts (`scripts/absorb-maataa-ui-copies.py`, `scripts/collect-runtime-evidence.sh`, `scripts/compare-maataa-ui-active-consumers.mjs`, `scripts/run-allb-live-handshake.sh`).
- In history only, in earlier versions of the seven shipped docs that 3a9eedb sanitised, and in `packages/absorbed-maataa-sources/manifest.json`.

Impact: only if the repository itself is made public. The published tarball is protected by `scripts/check-privacy.mjs` in `prepack`.

Mitigation if needed:

1. `git filter-repo --path docs/knowledge-graph --path docs/product/evidence --invert-paths` removes the two excluded directories from all history.
2. That alone leaves the path in the files listed above. Also run `git filter-repo --replace-text <expressions-file>`, with an expressions file kept outside the repository that maps the home-directory prefix to `~`. This rewrites the path in every remaining file and in all history.
3. Force-push. This rewrites history and requires coordination with all clones.

Status: accepted. Review before any public release of the repo.
