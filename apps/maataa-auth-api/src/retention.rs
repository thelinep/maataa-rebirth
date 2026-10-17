//! Project deletion, purge and the readiness of every migration ledger.
//!
//! Decision recorded 2026-10-18 from the release owner's chat statement (not a
//! signed record): the Auth/API store holds the full TLPS project data, and
//! keeps it until the project owner deletes the project. Deletion locks the
//! project at once (every request for it answers 410) and purges every row
//! [`RETENTION_DAYS`] days later. Until then an administrator can restore it.
//! Verified backups follow the same window (`prune-backups`), so deleted data
//! is gone from the origin within two windows.
use super::*;

pub const RETENTION_DAYS: i64 = 30;
pub const DAY_MS: i64 = 86_400_000;
pub(super) const MIGRATION_V4_CHECKSUM: &str = "maataa-auth-api-schema-v4-retention-2026-10";

/// Schema v4. Runs after the TLPS and pilot ledgers, because it rewrites their
/// append-only delete guards: rows may be removed only while this binary
/// purges that project (`rls_purging`). Without the binary the function is
/// missing and every delete still fails.
pub(super) const MIGRATION_V4: &str = "
CREATE TABLE IF NOT EXISTS project_deletions (
  project_id TEXT PRIMARY KEY, requested_by TEXT NOT NULL,
  requested_at INTEGER NOT NULL, purge_after INTEGER NOT NULL,
  purged_at INTEGER, time_basis TEXT NOT NULL
);
DROP TRIGGER IF EXISTS tlps_events_no_delete;
CREATE TRIGGER tlps_events_no_delete BEFORE DELETE ON tlps_events
  WHEN NOT rls_purging(OLD.project_id) BEGIN SELECT RAISE(ABORT,'append only'); END;
DROP TRIGGER IF EXISTS tlps_pilot_audit_no_delete;
CREATE TRIGGER tlps_pilot_audit_no_delete BEFORE DELETE ON tlps_pilot_audit
  WHEN NOT rls_purging(OLD.project_id) BEGIN SELECT RAISE(ABORT,'append only'); END;
DROP TRIGGER IF EXISTS tlps_pilot_reviews_no_delete;
CREATE TRIGGER tlps_pilot_reviews_no_delete BEFORE DELETE ON tlps_pilot_reviews
  WHEN NOT rls_purging(OLD.project_id) BEGIN SELECT RAISE(ABORT,'append only'); END;
";

/// Every table holding a project's rows, children first so foreign keys hold
/// at each step. `project_deletions` itself keeps the bare tombstone.
pub const PURGE_ORDER: &[&str] = &[
    "tlps_idempotency",
    "tlps_events",
    "tlps_links",
    "tlps_entities",
    "tlps_pilot_audit",
    "tlps_pilot_reviews",
    "tlps_pilot_items",
    "tlps_pilot_members",
    "tlps_pilot_projects",
    "knowledge_assertions",
    "knowledge_relations",
    "knowledge_objects",
    "project_events",
    "access_tokens",
    "projects",
];

/// The three migration ledgers, as a backup or a running store must hold them.
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub struct Ledgers {
    pub core: i64,
    pub tlps: i64,
    pub pilot: i64,
}

/// Verifies every ledger: core at [`SCHEMA_VERSION`] with known checksums,
/// TLPS and pilot exactly at this build's version and checksum.
pub fn verify_ledgers(conn: &Connection) -> Result<Ledgers, StoreError> {
    let core: Vec<(i64, String)> = rows(
        conn,
        "SELECT version,checksum FROM schema_migrations ORDER BY version",
    )?;
    let expected_core: Vec<(i64, String)> = super::core_checksums()
        .iter()
        .map(|(v, c)| (*v, (*c).to_owned()))
        .collect();
    let tlps: Vec<(i64, String)> = rows(
        conn,
        "SELECT version,checksum FROM tlps_schema_migrations ORDER BY version",
    )?;
    let pilot: Vec<(i64, String)> = rows(
        conn,
        "SELECT version,checksum FROM tlps_pilot_migrations ORDER BY version",
    )?;
    if core != expected_core || tlps != vec![tlps::ledger()] || pilot != vec![pilot::ledger()] {
        return Err(StoreError::Invalid);
    }
    Ok(Ledgers {
        core: SCHEMA_VERSION,
        tlps: tlps::VERSION,
        pilot: pilot::VERSION,
    })
}

fn rows(conn: &Connection, sql: &str) -> Result<Vec<(i64, String)>, StoreError> {
    let mut q = conn.prepare(sql).map_err(|_| StoreError::Invalid)?;
    let v = q
        .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
        .map_err(|_| StoreError::Invalid)?
        .collect::<Result<_, _>>()
        .map_err(|_| StoreError::Invalid);
    v
}

/// True while the project is deleted (pending purge or purged).
pub(super) fn deleted(conn: &Connection, project_id: &str) -> Result<bool, StoreError> {
    conn.query_row(
        "SELECT EXISTS(SELECT 1 FROM project_deletions WHERE project_id=?1)",
        [project_id],
        |r| r.get(0),
    )
    .map_err(|_| StoreError::Database)
}

impl Store {
    /// Owner-only. Locks the project now and schedules its purge.
    pub fn request_project_deletion(
        &self,
        identity: &Identity,
        project_id: &str,
    ) -> Result<Value, StoreError> {
        if identity.project_id != project_id || !has_scope(identity, Scope::ProjectWrite) {
            return Err(StoreError::Denied);
        }
        let conn = self.system()?;
        let owner: Option<String> = conn
            .query_row(
                "SELECT owner_principal_id FROM projects WHERE project_id=?1",
                [project_id],
                |r| r.get(0),
            )
            .optional()
            .map_err(|_| StoreError::Database)?;
        let owner = owner.ok_or(StoreError::Missing)?;
        let pilot_owner: bool = conn
            .query_row(
                "SELECT EXISTS(SELECT 1 FROM tlps_pilot_members WHERE project_id=?1 AND principal_id=?2 AND role='owner' AND active=1)",
                [project_id, &identity.principal_id],
                |r| r.get(0),
            )
            .map_err(|_| StoreError::Database)?;
        if owner != identity.principal_id && !pilot_owner {
            return Err(StoreError::Denied);
        }
        let now = now_unix_ms();
        conn.execute(
            "INSERT OR IGNORE INTO project_deletions(project_id,requested_by,requested_at,purge_after,time_basis) VALUES(?1,?2,?3,?4,'host-unix-clock-unverified')",
            params![project_id, identity.principal_id, now, now + RETENTION_DAYS * DAY_MS],
        )
        .map_err(|_| StoreError::Database)?;
        let purge_after: i64 = conn
            .query_row(
                "SELECT purge_after FROM project_deletions WHERE project_id=?1",
                [project_id],
                |r| r.get(0),
            )
            .map_err(|_| StoreError::Database)?;
        Ok(
            json!({"projectId":project_id,"deleted":true,"purgeAfter":purge_after,"retentionDays":RETENTION_DAYS,"timeBasis":"host-unix-clock-unverified"}),
        )
    }

    /// Administrator: undo a deletion that has not been purged yet.
    pub fn restore_project(&self, project_id: &str) -> Result<(), StoreError> {
        let conn = self.system()?;
        let changed = conn
            .execute(
                "DELETE FROM project_deletions WHERE project_id=?1 AND purged_at IS NULL",
                [project_id],
            )
            .map_err(|_| StoreError::Database)?;
        if changed == 0 {
            return Err(StoreError::Missing);
        }
        Ok(())
    }

    /// Removes every row of each deleted project whose retention window ended.
    /// Returns the purged project IDs.
    pub fn purge_due(&self, now: i64) -> Result<Vec<String>, StoreError> {
        let due: Vec<String> = {
            let conn = self.system()?;
            let mut q = conn
                .prepare("SELECT project_id FROM project_deletions WHERE purged_at IS NULL AND purge_after<=?1 ORDER BY project_id")
                .map_err(|_| StoreError::Database)?;
            let v = q
                .query_map([now], |r| r.get(0))
                .map_err(|_| StoreError::Database)?
                .collect::<Result<_, _>>()
                .map_err(|_| StoreError::Database)?;
            v
        };
        for project_id in &due {
            let session = rls::Session::open(
                self.lock()?,
                self.1.clone(),
                rls::Mode::Purge(project_id.clone()),
            )?;
            let tx = session
                .unchecked_transaction()
                .map_err(|_| StoreError::Database)?;
            for table in PURGE_ORDER {
                tx.execute(
                    &format!("DELETE FROM {table} WHERE project_id=?1"),
                    [project_id],
                )
                .map_err(|_| StoreError::Database)?;
            }
            tx.execute(
                "UPDATE project_deletions SET purged_at=?2 WHERE project_id=?1",
                params![project_id, now],
            )
            .map_err(|_| StoreError::Database)?;
            tx.commit().map_err(|_| StoreError::Database)?;
        }
        Ok(due)
    }
}

/// Removes verified backups older than the retention window from a private
/// directory. Only files named `maataa-auth-api-*.sqlite3` are considered.
pub fn prune_backups(
    dir: &std::path::Path,
    now: std::time::SystemTime,
) -> Result<Vec<std::path::PathBuf>, StoreError> {
    super::validate_private_backup_directory(dir)?;
    let window = std::time::Duration::from_millis((RETENTION_DAYS * DAY_MS) as u64);
    let mut removed = Vec::new();
    for entry in std::fs::read_dir(dir).map_err(|_| StoreError::Database)? {
        let entry = entry.map_err(|_| StoreError::Database)?;
        let name = entry.file_name().to_string_lossy().into_owned();
        if !(name.starts_with("maataa-auth-api-") && name.ends_with(".sqlite3")) {
            continue;
        }
        let meta = entry.metadata().map_err(|_| StoreError::Database)?;
        if !meta.is_file() {
            continue;
        }
        let modified = meta.modified().map_err(|_| StoreError::Database)?;
        if now.duration_since(modified).is_ok_and(|age| age > window) {
            std::fs::remove_file(entry.path()).map_err(|_| StoreError::Database)?;
            removed.push(entry.path());
        }
    }
    removed.sort();
    Ok(removed)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn identity(store: &Store, principal: &str, project: &str) -> Identity {
        let _ = store.create_principal(principal, principal);
        let token = store
            .issue_token(
                principal,
                project,
                vec![Scope::ProjectRead, Scope::ProjectWrite],
                3_600,
            )
            .unwrap();
        store.authenticate(&token.access_token).unwrap()
    }

    fn record(project: &str) -> Value {
        json!({"schema":PROJECT_SCHEMA,"projectId":project,"title":"Retention","domain":"film-production","ownerApp":"tlps","currentVersion":0,"versions":[]})
    }

    const P: &str = "prj:11111111-2222-4333-8444-555555555555";
    const Q: &str = "prj:99999999-2222-4333-8444-555555555555";

    #[test]
    fn every_table_with_a_project_column_is_purged() {
        let store = Store::in_memory().unwrap();
        let c = store.system().unwrap();
        let tables: Vec<String> = c
            .prepare(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
            )
            .unwrap()
            .query_map([], |r| r.get(0))
            .unwrap()
            .collect::<Result<_, _>>()
            .unwrap();
        for table in tables {
            let has: bool = c
                .query_row(
                    &format!("SELECT EXISTS(SELECT 1 FROM pragma_table_info('{table}') WHERE name='project_id')"),
                    [],
                    |r| r.get(0),
                )
                .unwrap();
            if has && table != "project_deletions" {
                assert!(
                    PURGE_ORDER.contains(&table.as_str()),
                    "{table} is not purged"
                );
            }
        }
    }

    #[test]
    fn ledgers_are_verified_and_tampering_is_caught() {
        let store = Store::in_memory().unwrap();
        let c = store.system().unwrap();
        assert_eq!(
            verify_ledgers(&c).unwrap(),
            Ledgers {
                core: SCHEMA_VERSION,
                tlps: tlps::VERSION,
                pilot: pilot::VERSION
            }
        );
        c.execute("UPDATE tlps_pilot_migrations SET checksum='tampered'", [])
            .unwrap();
        assert_eq!(verify_ledgers(&c), Err(StoreError::Invalid));
    }

    #[test]
    fn only_the_owner_deletes_and_deletion_locks_then_purges_one_project() {
        let store = Store::in_memory().unwrap();
        let owner = identity(&store, "owner-user", P);
        let other = identity(&store, "other-user", P);
        let elsewhere = identity(&store, "else-user", Q);
        store.create_project(&owner, &record(P)).unwrap();
        store.create_project(&elsewhere, &record(Q)).unwrap();

        assert_eq!(
            store.request_project_deletion(&other, P),
            Err(StoreError::Denied)
        );
        assert_eq!(
            store.request_project_deletion(&owner, Q),
            Err(StoreError::Denied)
        );
        let receipt = store.request_project_deletion(&owner, P).unwrap();
        let purge_after = receipt["purgeAfter"].as_i64().unwrap();
        // Idempotent: a second request keeps the first window.
        assert_eq!(
            store.request_project_deletion(&owner, P).unwrap()["purgeAfter"],
            purge_after
        );

        assert!(matches!(store.scoped(&owner), Err(StoreError::Gone)));
        assert!(store.scoped(&elsewhere).is_ok());

        // Not due yet: nothing is removed.
        assert!(store.purge_due(purge_after - 1).unwrap().is_empty());
        assert_eq!(store.purge_due(purge_after).unwrap(), vec![P.to_owned()]);
        let c = store.system().unwrap();
        for table in PURGE_ORDER {
            let n: i64 = c
                .query_row(
                    &format!("SELECT COUNT(*) FROM {table} WHERE project_id=?1"),
                    [P],
                    |r| r.get(0),
                )
                .unwrap();
            assert_eq!(n, 0, "{table} still holds rows");
        }
        let q: i64 = c
            .query_row(
                "SELECT COUNT(*) FROM projects WHERE project_id=?1",
                [Q],
                |r| r.get(0),
            )
            .unwrap();
        assert_eq!(q, 1);
        drop(c);
        // Purged projects cannot be restored.
        assert_eq!(store.restore_project(P), Err(StoreError::Missing));
    }

    #[test]
    fn restore_reopens_a_pending_deletion() {
        let store = Store::in_memory().unwrap();
        let owner = identity(&store, "owner-user", P);
        store.create_project(&owner, &record(P)).unwrap();
        store.request_project_deletion(&owner, P).unwrap();
        store.restore_project(P).unwrap();
        assert!(store.scoped(&owner).is_ok());
        assert!(store.purge_due(i64::MAX).unwrap().is_empty());
    }

    #[test]
    fn append_only_tables_stay_append_only_outside_a_purge() {
        let store = Store::in_memory().unwrap();
        let c = store.system().unwrap();
        for table in ["tlps_events", "tlps_pilot_audit", "tlps_pilot_reviews"] {
            let trigger: String = c
                .query_row(
                    "SELECT sql FROM sqlite_master WHERE type='trigger' AND name=?1",
                    [format!("{table}_no_delete")],
                    |r| r.get(0),
                )
                .unwrap();
            assert!(trigger.contains("rls_purging(OLD.project_id)"), "{table}");
            assert!(trigger.contains("append only"), "{table}");
        }
    }

    #[test]
    fn a_v3_database_upgrades_to_v4_on_open() {
        let temp = tempfile::NamedTempFile::new().unwrap();
        {
            let store = Store::open(temp.path().to_str().unwrap()).unwrap();
            let c = store.system().unwrap();
            // Roll back to the v3 shape: no deletion ledger, original guards.
            c.execute_batch(
                "DELETE FROM schema_migrations WHERE version=4;
                 DROP TABLE project_deletions;
                 DROP TRIGGER tlps_events_no_delete;
                 CREATE TRIGGER tlps_events_no_delete BEFORE DELETE ON tlps_events BEGIN SELECT RAISE(ABORT,'append only'); END;",
            )
            .unwrap();
        }
        let store = Store::open(temp.path().to_str().unwrap()).unwrap();
        assert_eq!(store.readiness().unwrap().core, 4);
        let c = store.system().unwrap();
        let sql: String = c
            .query_row(
                "SELECT sql FROM sqlite_master WHERE name='tlps_events_no_delete'",
                [],
                |r| r.get(0),
            )
            .unwrap();
        assert!(sql.contains("rls_purging"));
    }

    #[cfg(unix)]
    #[test]
    fn prune_removes_only_expired_named_backups() {
        use std::os::unix::fs::PermissionsExt;
        let dir = tempfile::tempdir().unwrap();
        std::fs::set_permissions(dir.path(), std::fs::Permissions::from_mode(0o700)).unwrap();
        for name in ["maataa-auth-api-old.sqlite3", "notes.sqlite3"] {
            std::fs::write(dir.path().join(name), b"x").unwrap();
        }
        let later = std::time::SystemTime::now()
            + std::time::Duration::from_millis(((RETENTION_DAYS + 1) * DAY_MS) as u64);
        assert!(prune_backups(dir.path(), std::time::SystemTime::now())
            .unwrap()
            .is_empty());
        let removed = prune_backups(dir.path(), later).unwrap();
        assert_eq!(
            removed,
            vec![dir.path().join("maataa-auth-api-old.sqlite3")]
        );
        assert!(dir.path().join("notes.sqlite3").exists());
    }
}
