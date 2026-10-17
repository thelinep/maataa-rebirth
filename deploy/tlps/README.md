# TLPS Cloudflare pilot operations

Target authorized by user: Cloudflare, `tlps.in`. Existing local Rust/SQLite origin is retained; Cloudflare Tunnel provides ingress. This is a machine-backed pilot, not a Workers/D1 deployment or a high-availability service.

## Start

1. Build UI: `pnpm exec vite build --config examples/redux-demo/vite.config.mjs`.
2. Build API: `cargo build --manifest-path apps/maataa-auth-api/Cargo.toml --offline`.
3. Run API with `MAATAA_AUTH_API_DB`, `MAATAA_AUTH_API_SOCKET`, `MAATAA_AUTH_API_PORT=off`, and private `MAATAA_BOOTSTRAP_TOKEN_FILE`. Runtime directory must be mode 0700 and token file 0600. With `off` the API opens no TCP listener; it answers only on the private socket.
4. Run `node scripts/tlps/pilot-origin.mjs` as the same user, with `TLPS_API_SOCKET` set to the same socket. It binds 127.0.0.1:4184, serves demo-dist and forwards only selected authenticated project routes over the socket. Administrative endpoints are blocked. It refuses to start if the socket directory is not owner-only, and refuses a TCP API unless `TLPS_ALLOW_TCP_API=1` (development only). It limits each client address (`CF-Connecting-IP`): burst `TLPS_RATE_BURST` (60), refill `TLPS_RATE_PER_SECOND` (5).
5. Provision a team with `scripts/tlps/provision-pilot.py --help`; it uses the private socket (`--socket`). Use separate owner/reviewer principals. Tokens are written to new private files, expire after one hour, and must not be committed or pasted into public documents.
6. Run `cloudflared tunnel --config <private-config> run`. Dedicated pilot credentials/config are private under `.local/tlps-api/runtime/` on the prepared machine.

## DNS cutover and rollback

The observed pre-rollout apex CNAME points at the existing NEVO production tunnel. Do not reuse or modify NEVO tunnel configuration. `python3 scripts/tlps/cloudflare-route.py` performs a read-only inspection and saves a private rollback record. `--apply` changes only the existing apex CNAME to the dedicated TLPS tunnel after acceptance; MX/TXT records remain unchanged. `--rollback --apply` restores the saved apex record. The script refuses unexpected record-identity or target changes.

Validate tunnel ingress before cutover. Verify HTTPS document/assets, unauthenticated API rejection, admin-route rejection, authenticated pilot workflow and absence of server secrets afterward. If those checks fail, restore DNS and stop the new tunnel. A running tunnel alone is not release acceptance.

## Health, backup and recovery

Origin `/healthz` checks the web process; API `/healthz` and `/readyz` check the API separately. The web health endpoint does not imply database readiness. API responses supply request IDs. Keep logs local and do not enable verbose header/token logging. No external alerting or uptime SLA is configured by these scripts.

Create verified SQLite backups with the API binary's `backup <new-private-path>` command and the source DB environment. Backups contain sensitive project records and token hashes; store in owner-only directories and copy off the origin through an approved private channel. Restore to a new file, start against that path, verify migrations/readiness and perform a project read before changing the active database. Do not overwrite a running database file.

A stale Unix socket may remain after abrupt process termination: first prove no service accepts connections before removing only that socket. Restart API, web origin and tunnel. If the origin machine sleeps, loses network or stops, the hosted pilot becomes unavailable; an always-on supervised origin is required before a dependable hosted release.

## Retention and support

Pilot support requests are persisted project work items, visible to authorized project members. There is no external notification queue or support SLA.

Retention (release-owner decision 2026-10-18, chat statement, not a signed record): the API holds the full project data until the project owner deletes the project (`DELETE /v1/projects/{id}`). The project is locked at once and purged 30 days later, including audit, events and idempotency receipts; the running API purges hourly. Restore inside the window with `POST /v1/admin/projects/{id}/restore` (bootstrap token, over the socket). Name backups `maataa-auth-api-<date>.sqlite3` and run `maataa-auth-api prune-backups <dir>` daily, so a deleted project leaves the origin's backups within another 30 days. Copies taken off the origin need the same window. Owner assignment, incident contact and backup frequency/off-site policy still need release-owner acceptance.

## Release disposition

Local technical preparation is separate from R3 hosted acceptance. Record exact source/configuration, tests, restore results, public checks and named go/no-go. Public signup, organization administration, uploaded evidence files, financial execution and full mobile-route parity remain excluded. Existing demo navigation can expose local-only surfaces and must retain its scope labels.
