# Release operations: gates 8–11

**Prepared:** 2026-10-12 · **Candidate:** `5bc8c7b8` · Repository: `thelinep/maataa-rebirth` (remote `origin`). Each item needs the release owner or a repository admin; nothing here has been configured.

## Gate 8 — private security reporting

Choose one intake route and commit to response times before any public release.

| Option | Notes |
| --- | --- |
| GitHub private vulnerability reporting on the repository | Reports arrive as private advisories. Check that the feature is available for this repository and plan, and enable it under repository Security settings. |
| Dedicated mailbox (e.g. a security@ address on a domain you control) | Must be monitored by named people; do not publish an unmonitored address. |

Proposed commitments (owner to accept or change): acknowledge within 3 business days; initial assessment within 7 days; fix or mitigation target 30 days for high/critical, next minor release otherwise; supported versions = latest prerelease line until GA.

A draft policy is in [`../drafts/SECURITY.draft.md`](../drafts/SECURITY.draft.md). Copy it to the repository root as `SECURITY.md` only after the route is live and monitored.

```
Route:        Monitored by:        Commitments accepted:        Date:
```

## Gate 9 — release owner approval

The owner records a disposition for a specific candidate after gates 1–8 are filled.

```
Candidate commit:        Evidence pack:        Gates reviewed:
Disposition: APPROVE FOR BETA / HOLD (reason)        Owner: Hemant Kumar Dixit        Date:
```

## Gate 10 — remote tag protection

The local tags `maataa-ui-alpha8.5.3` and `maataa-ui-alpha8.6` are not on the remote yet. With admin rights, from the Mac:

```bash
git push origin maataa-ui-alpha8.5.3 maataa-ui-alpha8.6

gh api -X POST repos/thelinep/maataa-rebirth/rulesets --input - <<'JSON'
{
  "name": "Protect MAATAA UI release tags",
  "target": "tag",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/tags/maataa-ui-*"], "exclude": [] } },
  "rules": [ { "type": "deletion" }, { "type": "non_fast_forward" }, { "type": "update" } ]
}
JSON

gh api repos/thelinep/maataa-rebirth/rulesets   # record the result
```

Rulesets on private repositories may require a paid GitHub plan; if the call is refused, record that and choose another control. After it is active, check that deleting or moving a protected tag is refused, and record the evidence here.

## Gate 11 — controlled publisher

Today `package.json` has `"private": true` and no registry is configured. Before publishing:

1. Decide the registry: a private registry (for example GitHub Packages, scoped to `@maataa`) or the public npm registry.
2. Publish only from CI, never from a laptop, using an exact qualified commit and its tag.
3. Attach provenance where the registry supports it (npm provenance from GitHub Actions needs `id-token: write`; check npm's current requirements for the repository's visibility).
4. Record the tarball sha256 from certification and compare it with what was published.

A draft workflow is in [`../drafts/publish.draft.yml`](../drafts/publish.draft.yml). It is not active (it is not under `.github/workflows/`).

The dedicated release step (version and tag decision) comes after gates 1–10 are accepted.
