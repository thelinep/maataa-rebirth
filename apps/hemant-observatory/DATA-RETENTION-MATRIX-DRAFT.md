# Data retention and deletion matrix — draft

**Status:** inventory draft only. No retention duration, deletion schedule, customer policy, or legal basis has been approved. Do not treat this as an operational retention policy.

| Data class | Current or intended handling | Retention decision | Deletion/export evidence still needed |
| --- | --- | --- | --- |
| Static application code and artwork | Versioned source/build assets; third-party artwork may have separate rights | Owner/licence dependent; no public archive policy selected | Source and asset licence, release revision, removal process |
| Imported science files | User-selected file is parsed in-browser; raw bytes are not saved by the MAG importer | User/session lifetime; confirm browser memory lifecycle | Test reload/navigation and verify no raw bytes in browser storage/network |
| Imported science metadata | User-requested local browser record may be retained | User-controlled until sync/storage architecture is chosen | Export/delete tests and storage key inventory |
| Computed science results and fixtures | Versioned, provenance-bearing local/API outputs and test fixtures | Per dataset rights and reproducibility need | Source/version/hash, allowed redistribution, delete or replace procedure |
| Telemetry snapshots | Caller-supplied records; no hardware connection | No central persistence defined | Verify no upload/log persistence; define retention before adding a backend |
| Account/session/security events | Production Auth/API service is not deployed | Policy and jurisdiction decision required | Secret-free audit schema, access controls, retention and deletion tests |
| User accounts, credentials, keys | Passkey login/key custody are not implemented in this app | Policy and jurisdiction decision required | Credential revocation, key rotation, account deletion and backup-expiry evidence |
| Operational logs and metrics | Production alerting/central observability not established | Minimize content; duration requires owner and jurisdiction decisions | Redaction tests, retention config, access audit and deletion evidence |
| Backups | Local SQLite backup path exists in the separate Auth/API prototype; this app has no production database | Backup cadence and expiry remain undecided | Restore drill, integrity evidence, access log, expiry/deletion test |

## Decisions intentionally left open

- Retention periods by data class, including any scientific archive or embargo.
- Jurisdiction, controller/processor roles, customer policy, and any legal hold requirements.
- Whether local browser metadata ever syncs to a shared service.
- Backup cadence, encryption/key custody, expiry, RPO and RTO for a selected deployment.

## Next atomic checks

1. Confirm actual browser storage keys and prove raw MAG bytes are absent after import/reload.
2. Inventory server-side stores after the production topology is selected.
3. Have the data owner review durations and deletion obligations per class.
4. Implement enforcement only after the policy and storage boundaries are approved.
