# Local SQLite backup and restore drill

**Scope:** prototype-only recovery proof for the local Auth/API SQLite store. This is not an offsite backup, encrypted-backup, PostgreSQL recovery, failover, or production RPO/RTO qualification.

## Automated drill

From this directory, run:

```sh
cargo test --offline sqlite_backup_is_integrity_checked_private_and_never_overwritten
```

The test creates an isolated temporary SQLite store, writes a principal and project-scoped token, creates the backup in a private temporary directory, reopens the backup, authenticates with the restored token, verifies that an existing destination cannot be overwritten, and checks Unix file mode `0600`.

## Local CLI dry run

Use only a disposable directory. The backup destination must be a new path in a directory owned by the current user with mode `0700` or stricter. The command creates/opens the selected source database and refuses to overwrite the backup destination.

```sh
umask 077
mkdir -p /tmp/maataa-auth-api-drill/data /tmp/maataa-auth-api-drill/backups
chmod 700 /tmp/maataa-auth-api-drill /tmp/maataa-auth-api-drill/data /tmp/maataa-auth-api-drill/backups
MAATAA_AUTH_API_DB=/tmp/maataa-auth-api-drill/data/source.sqlite3 cargo run --offline -- backup /tmp/maataa-auth-api-drill/backups/snapshot.sqlite3
```

The binary checks SQLite integrity and the expected schema before reporting success. For an isolated restore/authentication proof, use the automated test above; do not start the loopback HTTP service with production data for this drill.

## Production gates still open

- Select the production database topology and owner-controlled backup destination.
- Define encryption, key custody, rotation, backup cadence and retention.
- Set approved RPO/RTO and test restore from an independently stored backup.
- Test database loss, corruption, operator access, rollback and audit evidence.
- Repeat on the exact release revision and attach the run log.
