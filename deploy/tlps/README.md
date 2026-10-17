# TLPS Cloudflare pilot operations

Target authorized by user: Cloudflare, `tlps.in`. Existing local Rust/SQLite origin is retained; Cloudflare Tunnel provides ingress. This is a machine-backed pilot, not a Workers/D1 deployment or a high-availability service.

## Start

1. Build UI: `pnpm exec vite build --config examples/redux-demo/vite.config.mjs`.
2. Build API: `cargo build --manifest-path apps/maataa-auth-api/Cargo.toml --offline`.
3. Run API with `MAATAA_AUTH_API_DB`, `MAATAA_AUTH_API_SOCKET`, `MAATAA_AUTH_API_PORT=4381`, and private `MAATAA_BOOTSTRAP_TOKEN_FILE`. Runtime directory must be mode 0700 and token file 0600. Do not expose port 4381 publicly.
4. Run `node scripts/tlps/pilot-origin.mjs`; it binds 127.0.0.1:4184, serves demo-dist and proxies only selected authenticated project routes. Administrative endpoints are blocked.
5. Provision a team with `scripts/tlps/provision-pilot.py --help`. Use separate owner/reviewer principals. Tokens are written to new private files, expire after one hour, and must not be committed or pasted into public documents.
6. Run `cloudflared tunnel --config <private-config> run`. Dedicated pilot credentials/config are private under `.local/tlps-api/runtime/` on the prepared machine.

## DNS cutover and rollback

The observed pre-rollout apex CNAME points at the existing NEVO production tunnel. Do not reuse or modify NEVO tunnel configuration. `python3 scripts/tlps/cloudflare-route.py` performs a read-only inspection and saves a private rollback record. `--apply` changes only the existing apex CNAME to the dedicated TLPS tunnel after acceptance; MX/TXT records remain unchanged. `--rollback --apply` restores the saved apex record. The script refuses unexpected record-identity or target changes.

Validate tunnel ingress before cutover. Verify HTTPS document/assets, unauthenticated API rejection, admin-route rejection, authenticated pilot workflow and absence of server secrets afterward. If those checks fail, restore DNS and stop the new tunnel. A running tunnel alone is not release acceptance.

## Health, backup and recovery

Origin `/healthz` checks the web process; API `/healthz` and `/readyz` check the API separately. The web health endpoint does not imply database readiness. API responses supply request IDs. Keep logs local and do not enable verbose header/token logging. No external alerting or uptime SLA is configured by these scripts.

Create verified SQLite backups with the API binary's `backup <new-private-path>` command and the source DB environment. Backups contain sensitive project records and token hashes; store in owner-only directories and copy off the origin through an approved private channel. Restore to a new file, start against that path, verify migrations/readiness and perform a project read before changing the active database. Do not overwrite a running database file.

A stale Unix socket may remain after abrupt process termination: first prove no service accepts connections before removing only that socket. Restart API, web origin and tunnel. If the origin machine sleeps, loses network or stops, the hosted pilot becomes unavailable; an always-on supervised origin is required before a dependable hosted release.

## Retention and support

Pilot support requests are persisted project work items, visible to authorized project members. There is no external notification queue or support SLA. Owner assignment, incident contact, backup frequency/off-site policy and retention duration require release-owner acceptance. Until that policy exists, do not admit sensitive production data. Tombstones/audit and idempotency receipts currently persist; no automatic purge is claimed.

## Release disposition

Local technical preparation is separate from R3 hosted acceptance. Record exact source/configuration, tests, restore results, public checks and named go/no-go. Public signup, organization administration, uploaded evidence files, financial execution and full mobile-route parity remain excluded. Existing demo navigation can expose local-only surfaces and must retain its scope labels.
