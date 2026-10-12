use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine as _};
use http_body_util::{BodyExt, Full};
use hyper::{
    body::{Bytes, Incoming},
    header, Method, Request, Response, StatusCode,
};
use rand::{rngs::OsRng, RngCore};
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use std::{
    sync::{Arc, Mutex},
    time::{SystemTime, UNIX_EPOCH},
};
use subtle::ConstantTimeEq;
use uuid::Uuid;

pub const PROJECT_SCHEMA: &str = "maataa.project-record/1.0.0";
pub const MAX_BODY_BYTES: usize = 1_048_576;
pub const DEFAULT_TOKEN_TTL: i64 = 3_600;
pub const MAX_TOKEN_TTL: i64 = 7_776_000; // 90 days
const MIGRATION_V1_CHECKSUM: &str = "maataa-auth-api-schema-v1-baseline-2026-10";
const MIGRATION_V2_CHECKSUM: &str = "maataa-auth-api-schema-v2-hkdb-metadata-2026-10";
const MIGRATION_V3_CHECKSUM: &str = "maataa-auth-api-schema-v3-unix-ms-2026-10";
/// Stored times below this are legacy Unix seconds (before schema v3); in
/// milliseconds this bound is 1973-03-03, earlier than any MAATAA record.
/// Highest schema migration this build applies and accepts.
pub const SCHEMA_VERSION: i64 = 3;
pub const LEGACY_SECONDS_BELOW: i64 = 100_000_000_000;
const MAX_KNOWLEDGE_FIELD_BYTES: usize = 2_048;

#[derive(Clone, Debug, Serialize)]
pub struct Principal {
    pub principal_id: String,
    pub display_name: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum Scope {
    #[serde(rename = "project:read")]
    ProjectRead,
    #[serde(rename = "project:write")]
    ProjectWrite,
    #[serde(rename = "knowledge:read")]
    KnowledgeRead,
    #[serde(rename = "knowledge:write")]
    KnowledgeWrite,
}

#[derive(Clone, Debug, Serialize)]
pub struct Identity {
    pub principal_id: String,
    pub project_id: String,
    pub scopes: Vec<Scope>,
    pub expires_at: i64,
}

#[derive(Clone, Debug, Serialize)]
pub struct IssuedToken {
    pub token_id: String,
    pub access_token: String,
    pub token_type: &'static str,
    pub principal_id: String,
    pub project_id: String,
    pub scopes: Vec<Scope>,
    pub expires_at: i64,
    pub time_basis: &'static str,
}

#[derive(Debug)]
pub enum StoreError {
    Invalid,
    Duplicate,
    Missing,
    Denied,
    Conflict,
    Database,
}
impl std::fmt::Display for StoreError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(match self {
            Self::Invalid => "invalid service configuration or data",
            Self::Duplicate => "record already exists",
            Self::Missing => "record not found",
            Self::Denied => "access denied",
            Self::Conflict => "version conflict",
            Self::Database => "storage operation failed",
        })
    }
}
impl std::error::Error for StoreError {}

#[derive(Clone)]
pub struct Store(Arc<Mutex<Connection>>);

#[cfg(unix)]
fn validate_private_backup_directory(path: &std::path::Path) -> Result<(), StoreError> {
    use std::os::unix::fs::PermissionsExt;
    let metadata = std::fs::metadata(path).map_err(|_| StoreError::Invalid)?;
    if !metadata.is_dir() || metadata.permissions().mode() & 0o077 != 0 {
        return Err(StoreError::Invalid);
    }
    Ok(())
}

#[cfg(not(unix))]
fn validate_private_backup_directory(_path: &std::path::Path) -> Result<(), StoreError> {
    Err(StoreError::Invalid)
}

#[cfg(unix)]
fn set_owner_only_backup_permissions(path: &std::path::Path) -> Result<(), StoreError> {
    use std::os::unix::fs::PermissionsExt;
    std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o600))
        .map_err(|_| StoreError::Database)
}

#[cfg(not(unix))]
fn set_owner_only_backup_permissions(_path: &std::path::Path) -> Result<(), StoreError> {
    Err(StoreError::Invalid)
}

impl Store {
    pub fn open(path: &str) -> Result<Self, StoreError> {
        let conn = Connection::open(path).map_err(|_| StoreError::Database)?;
        conn.busy_timeout(std::time::Duration::from_secs(5))
            .map_err(|_| StoreError::Database)?;
        conn.pragma_update(None, "foreign_keys", "ON")
            .map_err(|_| StoreError::Database)?;
        conn.pragma_update(None, "journal_mode", "WAL")
            .map_err(|_| StoreError::Database)?;
        Self::initialize(conn)
    }

    pub fn in_memory() -> Result<Self, StoreError> {
        Self::initialize(Connection::open_in_memory().map_err(|_| StoreError::Database)?)
    }

    fn initialize(conn: Connection) -> Result<Self, StoreError> {
        conn.execute_batch(
            "PRAGMA foreign_keys=ON;
          CREATE TABLE IF NOT EXISTS schema_migrations (
            version INTEGER PRIMARY KEY, checksum TEXT NOT NULL,
            applied_at INTEGER NOT NULL, time_basis TEXT NOT NULL
          );",
        )
        .map_err(|_| StoreError::Database)?;
        let tx = conn
            .unchecked_transaction()
            .map_err(|_| StoreError::Database)?;
        let current: i64 = tx
            .query_row(
                "SELECT COALESCE(MAX(version),0) FROM schema_migrations",
                [],
                |r| r.get(0),
            )
            .map_err(|_| StoreError::Database)?;
        if current > SCHEMA_VERSION {
            return Err(StoreError::Invalid);
        }
        for (version, checksum) in [
            (1_i64, MIGRATION_V1_CHECKSUM),
            (2_i64, MIGRATION_V2_CHECKSUM),
            (3_i64, MIGRATION_V3_CHECKSUM),
        ] {
            let applied: Option<String> = tx
                .query_row(
                    "SELECT checksum FROM schema_migrations WHERE version=?1",
                    [version],
                    |r| r.get(0),
                )
                .optional()
                .map_err(|_| StoreError::Database)?;
            if let Some(existing) = applied {
                if existing != checksum {
                    return Err(StoreError::Invalid);
                }
                continue;
            }
            match version {
                1 => tx.execute_batch(
            "CREATE TABLE IF NOT EXISTS principals (
            principal_id TEXT PRIMARY KEY, display_name TEXT NOT NULL,
            created_at INTEGER NOT NULL
          );
          CREATE TABLE IF NOT EXISTS access_tokens (
            token_id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE,
            principal_id TEXT NOT NULL REFERENCES principals(principal_id),
            project_id TEXT NOT NULL, scopes_json TEXT NOT NULL,
            created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
            revoked_at INTEGER
          );
          CREATE INDEX IF NOT EXISTS access_tokens_hash_idx ON access_tokens(token_hash);
          CREATE TABLE IF NOT EXISTS projects (
            project_id TEXT PRIMARY KEY, current_version INTEGER NOT NULL,
            record_json TEXT NOT NULL, owner_principal_id TEXT NOT NULL,
            updated_at INTEGER NOT NULL
          );
          CREATE TABLE IF NOT EXISTS project_events (
            event_id TEXT PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(project_id),
            project_version INTEGER NOT NULL, actor TEXT NOT NULL,
            action TEXT NOT NULL, record_digest TEXT NOT NULL,
            recorded_at INTEGER NOT NULL, time_basis TEXT NOT NULL
          );"
                ).map_err(|_| StoreError::Database)?,
                2 => tx.execute_batch(
            "CREATE TABLE IF NOT EXISTS knowledge_objects (
            project_id TEXT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
            object_id TEXT NOT NULL, object_type TEXT NOT NULL, label TEXT NOT NULL,
            summary TEXT NOT NULL, properties_json TEXT NOT NULL,
            provenance_json TEXT NOT NULL, created_by TEXT NOT NULL,
            recorded_at INTEGER NOT NULL, time_basis TEXT NOT NULL,
            PRIMARY KEY(project_id, object_id)
          );
          CREATE INDEX IF NOT EXISTS knowledge_objects_project_type_idx
            ON knowledge_objects(project_id, object_type, recorded_at);
          CREATE TABLE IF NOT EXISTS knowledge_relations (
            project_id TEXT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
            relation_id TEXT NOT NULL, subject_id TEXT NOT NULL, predicate TEXT NOT NULL,
            object_id TEXT NOT NULL, provenance_json TEXT NOT NULL,
            created_by TEXT NOT NULL, recorded_at INTEGER NOT NULL, time_basis TEXT NOT NULL,
            PRIMARY KEY(project_id, relation_id),
            FOREIGN KEY(project_id, subject_id) REFERENCES knowledge_objects(project_id, object_id),
            FOREIGN KEY(project_id, object_id) REFERENCES knowledge_objects(project_id, object_id)
          );
          CREATE INDEX IF NOT EXISTS knowledge_relations_subject_idx
            ON knowledge_relations(project_id, subject_id, predicate);
          CREATE TABLE IF NOT EXISTS knowledge_assertions (
            project_id TEXT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
            assertion_id TEXT NOT NULL, subject_id TEXT NOT NULL, predicate TEXT NOT NULL,
            value_json TEXT NOT NULL, confidence REAL,
            verification_state TEXT NOT NULL CHECK(verification_state IN ('unverified','provisional')),
            provenance_json TEXT NOT NULL, created_by TEXT NOT NULL,
            recorded_at INTEGER NOT NULL, time_basis TEXT NOT NULL,
            PRIMARY KEY(project_id, assertion_id),
            FOREIGN KEY(project_id, subject_id) REFERENCES knowledge_objects(project_id, object_id)
          );
          CREATE INDEX IF NOT EXISTS knowledge_assertions_subject_idx
            ON knowledge_assertions(project_id, subject_id, recorded_at);"
                ).map_err(|_| StoreError::Database)?,
                // v3: one unit for every host time. Earlier rows stored Unix
                // seconds under the same basis label; convert them to ms.
                3 => tx.execute_batch(
            "UPDATE schema_migrations SET applied_at = applied_at * 1000 WHERE applied_at < 100000000000;
          UPDATE principals SET created_at = created_at * 1000 WHERE created_at < 100000000000;
          UPDATE access_tokens SET created_at = created_at * 1000 WHERE created_at < 100000000000;
          UPDATE access_tokens SET expires_at = expires_at * 1000 WHERE expires_at < 100000000000;
          UPDATE access_tokens SET revoked_at = revoked_at * 1000 WHERE revoked_at IS NOT NULL AND revoked_at < 100000000000;
          UPDATE projects SET updated_at = updated_at * 1000 WHERE updated_at < 100000000000;
          UPDATE project_events SET recorded_at = recorded_at * 1000 WHERE recorded_at < 100000000000;
          UPDATE knowledge_objects SET recorded_at = recorded_at * 1000 WHERE recorded_at < 100000000000;
          UPDATE knowledge_relations SET recorded_at = recorded_at * 1000 WHERE recorded_at < 100000000000;
          UPDATE knowledge_assertions SET recorded_at = recorded_at * 1000 WHERE recorded_at < 100000000000;"
                ).map_err(|_| StoreError::Database)?,
                _ => unreachable!(),
            }
            tx.execute("INSERT INTO schema_migrations(version,checksum,applied_at,time_basis) VALUES (?1,?2,?3,'host-unix-clock-unverified')", params![version, checksum, now_unix_ms()]).map_err(|_| StoreError::Database)?;
        }
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(Self(Arc::new(Mutex::new(conn))))
    }

    pub fn schema_version(&self) -> Result<i64, StoreError> {
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        conn.query_row(
            "SELECT COALESCE(MAX(version),0) FROM schema_migrations",
            [],
            |r| r.get(0),
        )
        .map_err(|_| StoreError::Database)
    }

    pub fn backup_to(&self, destination: &std::path::Path) -> Result<(), StoreError> {
        let parent = destination
            .parent()
            .filter(|p| !p.as_os_str().is_empty())
            .unwrap_or(std::path::Path::new("."));
        validate_private_backup_directory(parent)?;
        if destination.exists() {
            return Err(StoreError::Duplicate);
        }
        let name = destination
            .file_name()
            .ok_or(StoreError::Invalid)?
            .to_string_lossy();
        let temporary = parent.join(format!(".{name}.{}.partial", Uuid::new_v4()));
        let result = (|| {
            {
                let conn = self.0.lock().map_err(|_| StoreError::Database)?;
                conn.backup(rusqlite::MAIN_DB, &temporary, None)
                    .map_err(|_| StoreError::Database)?;
            }
            set_owner_only_backup_permissions(&temporary)?;
            {
                let check = Connection::open_with_flags(
                    &temporary,
                    rusqlite::OpenFlags::SQLITE_OPEN_READ_ONLY,
                )
                .map_err(|_| StoreError::Database)?;
                let integrity: String = check
                    .query_row("PRAGMA integrity_check", [], |r| r.get(0))
                    .map_err(|_| StoreError::Database)?;
                let version: i64 = check
                    .query_row(
                        "SELECT COALESCE(MAX(version),0) FROM schema_migrations",
                        [],
                        |r| r.get(0),
                    )
                    .map_err(|_| StoreError::Database)?;
                if integrity != "ok" || version != SCHEMA_VERSION {
                    return Err(StoreError::Invalid);
                }
                check.close().map_err(|_| StoreError::Database)?;
            }
            std::fs::File::open(&temporary)
                .and_then(|file| file.sync_all())
                .map_err(|_| StoreError::Database)?;
            std::fs::hard_link(&temporary, destination).map_err(|error| {
                if error.kind() == std::io::ErrorKind::AlreadyExists {
                    StoreError::Duplicate
                } else {
                    StoreError::Database
                }
            })?;
            Ok(())
        })();
        let _ = std::fs::remove_file(&temporary);
        result
    }

    pub fn create_knowledge_object(
        &self,
        identity: &Identity,
        body: &Value,
    ) -> Result<Value, StoreError> {
        if !has_scope(identity, Scope::KnowledgeWrite) {
            return Err(StoreError::Denied);
        }
        if !valid_knowledge_object(body) {
            return Err(StoreError::Invalid);
        }
        let object_id = body["objectId"].as_str().ok_or(StoreError::Invalid)?;
        let provenance =
            serde_json::to_string(&body["provenance"]).map_err(|_| StoreError::Invalid)?;
        let properties =
            serde_json::to_string(&body["properties"]).map_err(|_| StoreError::Invalid)?;
        let now = now_unix_ms();
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        conn.execute("INSERT INTO knowledge_objects(project_id,object_id,object_type,label,summary,properties_json,provenance_json,created_by,recorded_at,time_basis) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,'host-unix-clock-unverified')", params![identity.project_id, object_id, body["objectType"].as_str(), body["label"].as_str(), body["summary"].as_str(), properties, provenance, identity.principal_id, now]).map_err(map_sqlite_constraint)?;
        Ok(
            json!({"projectId":identity.project_id,"objectId":object_id,"recordedAt":now,"timeBasis":"host-unix-clock-unverified","provenance":body["provenance"]}),
        )
    }

    pub fn list_knowledge_objects(&self, identity: &Identity) -> Result<Vec<Value>, StoreError> {
        if !has_scope(identity, Scope::KnowledgeRead) {
            return Err(StoreError::Denied);
        }
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let mut stmt = conn.prepare("SELECT object_id,object_type,label,summary,properties_json,provenance_json,recorded_at,time_basis FROM knowledge_objects WHERE project_id=?1 ORDER BY recorded_at,object_id LIMIT 500").map_err(|_| StoreError::Database)?;
        let rows = stmt.query_map([&identity.project_id], |r| Ok(json!({"objectId":r.get::<_,String>(0)?,"objectType":r.get::<_,String>(1)?,"label":r.get::<_,String>(2)?,"summary":r.get::<_,String>(3)?,"properties":serde_json::from_str::<Value>(&r.get::<_,String>(4)?).unwrap_or(Value::Null),"provenance":serde_json::from_str::<Value>(&r.get::<_,String>(5)?).unwrap_or(Value::Null),"recordedAt":r.get::<_,i64>(6)?,"timeBasis":r.get::<_,String>(7)?}))).map_err(|_| StoreError::Database)?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|_| StoreError::Database)
    }

    pub fn create_knowledge_relation(
        &self,
        identity: &Identity,
        body: &Value,
    ) -> Result<Value, StoreError> {
        if !has_scope(identity, Scope::KnowledgeWrite) {
            return Err(StoreError::Denied);
        }
        if !valid_knowledge_relation(body) {
            return Err(StoreError::Invalid);
        }
        let now = now_unix_ms();
        let provenance =
            serde_json::to_string(&body["provenance"]).map_err(|_| StoreError::Invalid)?;
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        conn.execute("INSERT INTO knowledge_relations(project_id,relation_id,subject_id,predicate,object_id,provenance_json,created_by,recorded_at,time_basis) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,'host-unix-clock-unverified')", params![identity.project_id, body["relationId"].as_str(), body["subjectId"].as_str(), body["predicate"].as_str(), body["objectId"].as_str(), provenance, identity.principal_id, now]).map_err(map_sqlite_constraint)?;
        Ok(
            json!({"relationId":body["relationId"],"projectId":identity.project_id,"recordedAt":now,"timeBasis":"host-unix-clock-unverified"}),
        )
    }

    pub fn create_knowledge_assertion(
        &self,
        identity: &Identity,
        body: &Value,
    ) -> Result<Value, StoreError> {
        if !has_scope(identity, Scope::KnowledgeWrite) {
            return Err(StoreError::Denied);
        }
        if !valid_knowledge_assertion(body) {
            return Err(StoreError::Invalid);
        }
        let now = now_unix_ms();
        let provenance =
            serde_json::to_string(&body["provenance"]).map_err(|_| StoreError::Invalid)?;
        let value = serde_json::to_string(&body["value"]).map_err(|_| StoreError::Invalid)?;
        let confidence = body.get("confidence").and_then(Value::as_f64);
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        conn.execute("INSERT INTO knowledge_assertions(project_id,assertion_id,subject_id,predicate,value_json,confidence,verification_state,provenance_json,created_by,recorded_at,time_basis) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,'host-unix-clock-unverified')", params![identity.project_id, body["assertionId"].as_str(), body["subjectId"].as_str(), body["predicate"].as_str(), value, confidence, body["verificationState"].as_str(), provenance, identity.principal_id, now]).map_err(map_sqlite_constraint)?;
        Ok(
            json!({"assertionId":body["assertionId"],"projectId":identity.project_id,"verificationState":body["verificationState"],"recordedAt":now,"timeBasis":"host-unix-clock-unverified"}),
        )
    }

    pub fn list_knowledge_assertions(&self, identity: &Identity) -> Result<Vec<Value>, StoreError> {
        if !has_scope(identity, Scope::KnowledgeRead) {
            return Err(StoreError::Denied);
        }
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let mut stmt = conn.prepare("SELECT assertion_id,subject_id,predicate,value_json,confidence,verification_state,provenance_json,recorded_at,time_basis FROM knowledge_assertions WHERE project_id=?1 ORDER BY recorded_at,assertion_id LIMIT 500").map_err(|_| StoreError::Database)?;
        let rows = stmt.query_map([&identity.project_id], |r| Ok(json!({"assertionId":r.get::<_,String>(0)?,"subjectId":r.get::<_,String>(1)?,"predicate":r.get::<_,String>(2)?,"value":serde_json::from_str::<Value>(&r.get::<_,String>(3)?).unwrap_or(Value::Null),"confidence":r.get::<_,Option<f64>>(4)?,"verificationState":r.get::<_,String>(5)?,"provenance":serde_json::from_str::<Value>(&r.get::<_,String>(6)?).unwrap_or(Value::Null),"recordedAt":r.get::<_,i64>(7)?,"timeBasis":r.get::<_,String>(8)?}))).map_err(|_| StoreError::Database)?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|_| StoreError::Database)
    }

    pub fn create_principal(
        &self,
        principal_id: &str,
        display_name: &str,
    ) -> Result<Principal, StoreError> {
        if !valid_principal_id(principal_id)
            || display_name.trim().is_empty()
            || display_name.len() > 100
        {
            return Err(StoreError::Invalid);
        }
        let now = now_unix_ms();
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        match conn.execute(
            "INSERT INTO principals (principal_id, display_name, created_at) VALUES (?1, ?2, ?3)",
            params![principal_id, display_name.trim(), now],
        ) {
            Ok(_) => Ok(Principal {
                principal_id: principal_id.to_owned(),
                display_name: display_name.trim().to_owned(),
            }),
            Err(rusqlite::Error::SqliteFailure(e, _))
                if e.code == rusqlite::ErrorCode::ConstraintViolation =>
            {
                Err(StoreError::Duplicate)
            }
            Err(_) => Err(StoreError::Database),
        }
    }

    pub fn issue_token(
        &self,
        principal_id: &str,
        project_id: &str,
        scopes: Vec<Scope>,
        ttl_seconds: i64,
    ) -> Result<IssuedToken, StoreError> {
        if !valid_principal_id(principal_id)
            || !valid_project_id(project_id)
            || scopes.is_empty()
            || !(60..=MAX_TOKEN_TTL).contains(&ttl_seconds)
        {
            return Err(StoreError::Invalid);
        }
        let mut bytes = [0_u8; 32];
        OsRng
            .try_fill_bytes(&mut bytes)
            .map_err(|_| StoreError::Database)?;
        let access_token = format!("mta_{}", URL_SAFE_NO_PAD.encode(bytes));
        bytes.fill(0);
        let token_hash = hex(&Sha256::digest(access_token.as_bytes()));
        let token_id = Uuid::new_v4().to_string();
        let now = now_unix_ms();
        let expires_at = now.saturating_add(ttl_seconds.saturating_mul(1_000));
        let scopes_json = serde_json::to_string(&scopes).map_err(|_| StoreError::Database)?;
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        conn.execute("INSERT INTO access_tokens (token_id, token_hash, principal_id, project_id, scopes_json, created_at, expires_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)", params![token_id, token_hash, principal_id, project_id, scopes_json, now, expires_at]).map_err(|e| match e { rusqlite::Error::SqliteFailure(ref err, _) if err.code == rusqlite::ErrorCode::ConstraintViolation => StoreError::Missing, _ => StoreError::Database })?;
        Ok(IssuedToken {
            token_id,
            access_token,
            token_type: "Bearer",
            principal_id: principal_id.to_owned(),
            project_id: project_id.to_owned(),
            scopes,
            expires_at,
            time_basis: "host-unix-clock-unverified",
        })
    }

    pub fn authenticate(&self, token: &str) -> Result<Identity, StoreError> {
        if token.len() < 40 || token.len() > 100 || !token.starts_with("mta_") {
            return Err(StoreError::Denied);
        }
        let hash = hex(&Sha256::digest(token.as_bytes()));
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let row: Option<(String, String, String, i64, Option<i64>)> = conn.query_row(
            "SELECT principal_id, project_id, scopes_json, expires_at, revoked_at FROM access_tokens WHERE token_hash=?1",
            [&hash], |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?, r.get(4)?))).optional().map_err(|_| StoreError::Database)?;
        let (principal_id, project_id, scopes_json, expires_at, revoked_at) =
            row.ok_or(StoreError::Denied)?;
        if revoked_at.is_some() || expires_at <= now_unix_ms() {
            return Err(StoreError::Denied);
        }
        let scopes: Vec<Scope> =
            serde_json::from_str(&scopes_json).map_err(|_| StoreError::Database)?;
        Ok(Identity {
            principal_id,
            project_id,
            scopes,
            expires_at,
        })
    }

    pub fn revoke_token(&self, token_id: &str) -> Result<(), StoreError> {
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let changed = conn
            .execute(
                "UPDATE access_tokens SET revoked_at=?1 WHERE token_id=?2 AND revoked_at IS NULL",
                params![now_unix_ms(), token_id],
            )
            .map_err(|_| StoreError::Database)?;
        if changed == 0 {
            return Err(StoreError::Missing);
        }
        Ok(())
    }

    pub fn create_project(&self, identity: &Identity, record: &Value) -> Result<(), StoreError> {
        if !has_scope(identity, Scope::ProjectWrite) {
            return Err(StoreError::Denied);
        }
        if !valid_project_record(record, &identity.project_id) {
            return Err(StoreError::Invalid);
        }
        let now = now_unix_ms();
        let mut record = record.clone();
        stamp_versions(&mut record, None, now)?;
        let digest = digest_json(&record)?;
        let json = serde_json::to_string(&record).map_err(|_| StoreError::Invalid)?;
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let tx = conn
            .unchecked_transaction()
            .map_err(|_| StoreError::Database)?;
        tx.execute("INSERT INTO projects (project_id,current_version,record_json,owner_principal_id,updated_at) VALUES (?1,0,?2,?3,?4)", params![identity.project_id, json, identity.principal_id, now]).map_err(|e| match e { rusqlite::Error::SqliteFailure(ref err, _) if err.code == rusqlite::ErrorCode::ConstraintViolation => StoreError::Duplicate, _ => StoreError::Database })?;
        tx.execute("INSERT INTO project_events (event_id,project_id,project_version,actor,action,record_digest,recorded_at,time_basis) VALUES (?1,?2,0,?3,'project.created',?4,?5,'host-unix-clock-unverified')", params![Uuid::new_v4().to_string(), identity.project_id, identity.principal_id, digest, now]).map_err(|_| StoreError::Database)?;
        tx.commit().map_err(|_| StoreError::Database)
    }

    pub fn read_project(&self, identity: &Identity, project_id: &str) -> Result<Value, StoreError> {
        if !authorized(identity, project_id, Scope::ProjectRead) {
            return Err(StoreError::Denied);
        }
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let value: Option<String> = conn
            .query_row(
                "SELECT record_json FROM projects WHERE project_id=?1",
                [project_id],
                |r| r.get(0),
            )
            .optional()
            .map_err(|_| StoreError::Database)?;
        serde_json::from_str(&value.ok_or(StoreError::Missing)?).map_err(|_| StoreError::Database)
    }

    pub fn update_project(
        &self,
        identity: &Identity,
        project_id: &str,
        expected_version: i64,
        record: &Value,
    ) -> Result<i64, StoreError> {
        if !authorized(identity, project_id, Scope::ProjectWrite) {
            return Err(StoreError::Denied);
        }
        if expected_version < 0 || !valid_project_record(record, project_id) {
            return Err(StoreError::Invalid);
        }
        let new_version = record
            .get("currentVersion")
            .and_then(Value::as_i64)
            .ok_or(StoreError::Invalid)?;
        if expected_version.checked_add(1) != Some(new_version) {
            return Err(StoreError::Invalid);
        }
        let now = now_unix_ms();
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let tx = conn
            .unchecked_transaction()
            .map_err(|_| StoreError::Database)?;
        let stored: Option<(i64, String)> = tx
            .query_row(
                "SELECT current_version, record_json FROM projects WHERE project_id=?1",
                [project_id],
                |r| Ok((r.get(0)?, r.get(1)?)),
            )
            .optional()
            .map_err(|_| StoreError::Database)?;
        let (stored_version, stored_json) = stored.ok_or(StoreError::Missing)?;
        if stored_version != expected_version {
            return Err(StoreError::Conflict);
        }
        let stored_record: Value =
            serde_json::from_str(&stored_json).map_err(|_| StoreError::Database)?;
        let mut record = record.clone();
        stamp_versions(&mut record, Some(&stored_record), now)?;
        let digest = digest_json(&record)?;
        let json = serde_json::to_string(&record).map_err(|_| StoreError::Invalid)?;
        let changed = tx.execute("UPDATE projects SET current_version=?1,record_json=?2,updated_at=?3 WHERE project_id=?4 AND current_version=?5", params![new_version, json, now, project_id, expected_version]).map_err(|_| StoreError::Database)?;
        if changed == 0 {
            return Err(StoreError::Conflict);
        }
        tx.execute("INSERT INTO project_events (event_id,project_id,project_version,actor,action,record_digest,recorded_at,time_basis) VALUES (?1,?2,?3,?4,'project.updated',?5,?6,'host-unix-clock-unverified')", params![Uuid::new_v4().to_string(), project_id, new_version, identity.principal_id, digest, now]).map_err(|_| StoreError::Database)?;
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(new_version)
    }

    pub fn list_events(
        &self,
        identity: &Identity,
        project_id: &str,
    ) -> Result<Vec<Value>, StoreError> {
        if !authorized(identity, project_id, Scope::ProjectRead) {
            return Err(StoreError::Denied);
        }
        let conn = self.0.lock().map_err(|_| StoreError::Database)?;
        let mut stmt = conn.prepare("SELECT event_id,project_version,actor,action,record_digest,recorded_at,time_basis FROM project_events WHERE project_id=?1 ORDER BY project_version,event_id").map_err(|_| StoreError::Database)?;
        let rows = stmt.query_map([project_id], |r| Ok(json!({"eventId":r.get::<_,String>(0)?,"projectVersion":r.get::<_,i64>(1)?,"actor":r.get::<_,String>(2)?,"action":r.get::<_,String>(3)?,"recordDigest":r.get::<_,String>(4)?,"recordedAt":r.get::<_,i64>(5)?,"timeBasis":r.get::<_,String>(6)?}))).map_err(|_| StoreError::Database)?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|_| StoreError::Database)
    }
}

#[derive(Clone)]
pub struct AppState {
    store: Store,
    bootstrap_hash: [u8; 32],
}
impl AppState {
    pub fn new(store: Store, bootstrap_token: &str) -> Result<Self, StoreError> {
        if bootstrap_token.len() < 32 || bootstrap_token.len() > 256 {
            return Err(StoreError::Invalid);
        }
        Ok(Self {
            store,
            bootstrap_hash: Sha256::digest(bootstrap_token.as_bytes()).into(),
        })
    }
    fn bootstrap_ok(&self, req: &Request<Incoming>) -> bool {
        let Some(token) = bearer(req) else {
            return false;
        };
        let supplied: [u8; 32] = Sha256::digest(token.as_bytes()).into();
        self.bootstrap_hash.ct_eq(&supplied).unwrap_u8() == 1
    }
}

pub async fn handle(req: Request<Incoming>, state: AppState) -> Response<Full<Bytes>> {
    let request_id = Uuid::new_v4().to_string();
    let response = match route(req, &state).await {
        Ok(r) => r,
        Err((status, code)) => json_response(status, json!({"error": {"code":code}})),
    };
    let mut response = response;
    if let Ok(value) = header::HeaderValue::from_str(&request_id) {
        response.headers_mut().insert("x-request-id", value);
    }
    response
        .headers_mut()
        .insert("x-frame-options", header::HeaderValue::from_static("DENY"));
    response.headers_mut().insert(
        "referrer-policy",
        header::HeaderValue::from_static("no-referrer"),
    );
    response
}

async fn route(
    req: Request<Incoming>,
    state: &AppState,
) -> Result<Response<Full<Bytes>>, (StatusCode, &'static str)> {
    let method = req.method().clone();
    let path = req.uri().path().to_owned();
    if method == Method::GET && path == "/healthz" {
        return Ok(json_response(
            StatusCode::OK,
            json!({"status":"ok","service":"maataa-auth-api","apiVersion":"v1","storage":"sqlite-local","timeBasis":"host-unix-clock-unverified"}),
        ));
    }
    if method == Method::GET && path == "/readyz" {
        let version = state.store.schema_version().map_err(map_store_error)?;
        return if version == SCHEMA_VERSION {
            Ok(json_response(
                StatusCode::OK,
                json!({"status":"ready","service":"maataa-auth-api","schemaVersion":version}),
            ))
        } else {
            Ok(json_response(
                StatusCode::SERVICE_UNAVAILABLE,
                json!({"status":"not-ready","service":"maataa-auth-api"}),
            ))
        };
    }

    if path == "/v1/admin/principals" && method == Method::POST {
        if !state.bootstrap_ok(&req) {
            return Err((StatusCode::UNAUTHORIZED, "unauthorized"));
        }
        let body = read_json(req.into_body()).await?;
        let id = body
            .get("principalId")
            .and_then(Value::as_str)
            .ok_or((StatusCode::BAD_REQUEST, "invalid-request"))?;
        let name = body
            .get("displayName")
            .and_then(Value::as_str)
            .ok_or((StatusCode::BAD_REQUEST, "invalid-request"))?;
        let principal = state
            .store
            .create_principal(id, name)
            .map_err(map_store_error)?;
        return Ok(json_response(
            StatusCode::CREATED,
            serde_json::to_value(principal).unwrap_or(Value::Null),
        ));
    }

    if path == "/v1/admin/tokens" && method == Method::POST {
        if !state.bootstrap_ok(&req) {
            return Err((StatusCode::UNAUTHORIZED, "unauthorized"));
        }
        let body = read_json(req.into_body()).await?;
        let principal = body
            .get("principalId")
            .and_then(Value::as_str)
            .ok_or((StatusCode::BAD_REQUEST, "invalid-request"))?;
        let project = body
            .get("projectId")
            .and_then(Value::as_str)
            .ok_or((StatusCode::BAD_REQUEST, "invalid-request"))?;
        let ttl = body
            .get("ttlSeconds")
            .and_then(Value::as_i64)
            .unwrap_or(DEFAULT_TOKEN_TTL);
        let scopes = parse_scopes(body.get("scopes"))
            .map_err(|_| (StatusCode::BAD_REQUEST, "invalid-scopes"))?;
        let token = state
            .store
            .issue_token(principal, project, scopes, ttl)
            .map_err(map_store_error)?;
        return Ok(json_response(
            StatusCode::CREATED,
            serde_json::to_value(token).unwrap_or(Value::Null),
        ));
    }

    if method == Method::POST && path.starts_with("/v1/admin/tokens/") && path.ends_with("/revoke")
    {
        if !state.bootstrap_ok(&req) {
            return Err((StatusCode::UNAUTHORIZED, "unauthorized"));
        }
        let token_id = path
            .trim_start_matches("/v1/admin/tokens/")
            .trim_end_matches("/revoke")
            .trim_end_matches('/');
        state
            .store
            .revoke_token(token_id)
            .map_err(map_store_error)?;
        return Ok(json_response(
            StatusCode::OK,
            json!({"revoked":true,"tokenId":token_id}),
        ));
    }

    let token = bearer(&req).ok_or((StatusCode::UNAUTHORIZED, "unauthorized"))?;
    let identity = state
        .store
        .authenticate(token)
        .map_err(|error| match error {
            StoreError::Denied => (StatusCode::UNAUTHORIZED, "unauthorized"),
            other => map_store_error(other),
        })?;
    if method == Method::GET && path == "/v1/auth/whoami" {
        return Ok(json_response(
            StatusCode::OK,
            serde_json::to_value(identity).unwrap_or(Value::Null),
        ));
    }
    if path == "/v1/knowledge/objects" {
        if method == Method::POST {
            let body = read_json(req.into_body()).await?;
            let created = state
                .store
                .create_knowledge_object(&identity, &body)
                .map_err(map_store_error)?;
            return Ok(json_response(StatusCode::CREATED, created));
        }
        if method == Method::GET {
            let objects = state
                .store
                .list_knowledge_objects(&identity)
                .map_err(map_store_error)?;
            return Ok(json_response(
                StatusCode::OK,
                json!({"objects":objects,"limit":500}),
            ));
        }
    }
    if path == "/v1/knowledge/relations" && method == Method::POST {
        let body = read_json(req.into_body()).await?;
        let created = state
            .store
            .create_knowledge_relation(&identity, &body)
            .map_err(map_store_error)?;
        return Ok(json_response(StatusCode::CREATED, created));
    }
    if path == "/v1/knowledge/assertions" {
        if method == Method::POST {
            let body = read_json(req.into_body()).await?;
            let created = state
                .store
                .create_knowledge_assertion(&identity, &body)
                .map_err(map_store_error)?;
            return Ok(json_response(StatusCode::CREATED, created));
        }
        if method == Method::GET {
            let assertions = state
                .store
                .list_knowledge_assertions(&identity)
                .map_err(map_store_error)?;
            return Ok(json_response(
                StatusCode::OK,
                json!({"assertions":assertions,"limit":500}),
            ));
        }
    }
    if method == Method::POST && path == "/v1/projects" {
        let body = read_json(req.into_body()).await?;
        state
            .store
            .create_project(&identity, &body)
            .map_err(map_store_error)?;
        return Ok(json_response(
            StatusCode::CREATED,
            json!({"projectId":identity.project_id,"currentVersion":0,"timeBasis":"host-unix-clock-unverified"}),
        ));
    }
    if let Some(project_id) = path.strip_prefix("/v1/projects/") {
        if let Some(id) = project_id.strip_suffix("/events") {
            if method == Method::GET {
                let events = state
                    .store
                    .list_events(&identity, id)
                    .map_err(map_store_error)?;
                return Ok(json_response(StatusCode::OK, json!({"events":events})));
            }
        } else if method == Method::GET {
            let record = state
                .store
                .read_project(&identity, project_id)
                .map_err(map_store_error)?;
            return Ok(json_response(StatusCode::OK, record));
        } else if method == Method::PUT {
            let expected = req
                .headers()
                .get("if-match")
                .and_then(|v| v.to_str().ok())
                .and_then(|s| s.trim_matches('"').parse::<i64>().ok())
                .ok_or((StatusCode::PRECONDITION_REQUIRED, "if-match-required"))?;
            let body = read_json(req.into_body()).await?;
            let version = state
                .store
                .update_project(&identity, project_id, expected, &body)
                .map_err(map_store_error)?;
            return Ok(json_response(
                StatusCode::OK,
                json!({"projectId":project_id,"currentVersion":version,"timeBasis":"host-unix-clock-unverified"}),
            ));
        }
    }
    Err((StatusCode::NOT_FOUND, "not-found"))
}

async fn read_json(body: Incoming) -> Result<Value, (StatusCode, &'static str)> {
    let mut body = body;
    let mut bytes = Vec::new();
    while let Some(frame) = body.frame().await {
        let frame = frame.map_err(|_| (StatusCode::BAD_REQUEST, "invalid-body"))?;
        if let Ok(data) = frame.into_data() {
            if bytes.len().saturating_add(data.len()) > MAX_BODY_BYTES {
                return Err((StatusCode::PAYLOAD_TOO_LARGE, "payload-too-large"));
            }
            bytes.extend_from_slice(&data);
        }
    }
    serde_json::from_slice(&bytes).map_err(|_| (StatusCode::BAD_REQUEST, "invalid-json"))
}
fn json_response(status: StatusCode, value: Value) -> Response<Full<Bytes>> {
    let body = serde_json::to_vec(&value).unwrap_or_else(|_| b"{}".to_vec());
    let mut response = Response::new(Full::new(Bytes::from(body)));
    *response.status_mut() = status;
    response.headers_mut().insert(
        header::CONTENT_TYPE,
        header::HeaderValue::from_static("application/json; charset=utf-8"),
    );
    response.headers_mut().insert(
        header::CACHE_CONTROL,
        header::HeaderValue::from_static("no-store"),
    );
    response.headers_mut().insert(
        header::X_CONTENT_TYPE_OPTIONS,
        header::HeaderValue::from_static("nosniff"),
    );
    response
}
fn bearer(req: &Request<Incoming>) -> Option<&str> {
    req.headers()
        .get(header::AUTHORIZATION)?
        .to_str()
        .ok()?
        .strip_prefix("Bearer ")
}
fn map_store_error(e: StoreError) -> (StatusCode, &'static str) {
    match e {
        StoreError::Invalid => (StatusCode::BAD_REQUEST, "invalid-request"),
        StoreError::Duplicate => (StatusCode::CONFLICT, "already-exists"),
        StoreError::Missing => (StatusCode::NOT_FOUND, "not-found"),
        StoreError::Denied => (StatusCode::FORBIDDEN, "forbidden"),
        StoreError::Conflict => (StatusCode::CONFLICT, "version-conflict"),
        StoreError::Database => (StatusCode::INTERNAL_SERVER_ERROR, "storage-error"),
    }
}
fn parse_scopes(value: Option<&Value>) -> Result<Vec<Scope>, ()> {
    let values = value.and_then(Value::as_array).ok_or(())?;
    if values.is_empty() || values.len() > 4 {
        return Err(());
    }
    let mut scopes = Vec::new();
    for value in values {
        let s = value.as_str().ok_or(())?;
        let scope = match s {
            "project:read" => Scope::ProjectRead,
            "project:write" => Scope::ProjectWrite,
            "knowledge:read" => Scope::KnowledgeRead,
            "knowledge:write" => Scope::KnowledgeWrite,
            _ => return Err(()),
        };
        if scopes.contains(&scope) {
            return Err(());
        }
        scopes.push(scope);
    }
    Ok(scopes)
}
fn has_scope(identity: &Identity, scope: Scope) -> bool {
    identity.scopes.contains(&scope)
}
fn authorized(identity: &Identity, project_id: &str, scope: Scope) -> bool {
    identity.project_id == project_id && has_scope(identity, scope)
}
fn map_sqlite_constraint(error: rusqlite::Error) -> StoreError {
    match error {
        rusqlite::Error::SqliteFailure(ref err, _)
            if err.code == rusqlite::ErrorCode::ConstraintViolation =>
        {
            match err.extended_code {
                rusqlite::ffi::SQLITE_CONSTRAINT_PRIMARYKEY
                | rusqlite::ffi::SQLITE_CONSTRAINT_UNIQUE => StoreError::Duplicate,
                _ => StoreError::Invalid,
            }
        }
        _ => StoreError::Database,
    }
}
fn bounded_string(value: &Value, max: usize) -> bool {
    value
        .as_str()
        .is_some_and(|s| !s.trim().is_empty() && s.len() <= max)
}
fn valid_provenance(value: &Value) -> bool {
    has_only_keys(
        value,
        &[
            "sourceRef",
            "sourceKind",
            "sourceDigest",
            "methodId",
            "methodVersion",
        ],
    ) && value
        .get("sourceRef")
        .is_some_and(|v| bounded_string(v, MAX_KNOWLEDGE_FIELD_BYTES))
        && matches!(
            value.get("sourceKind").and_then(Value::as_str),
            Some(
                "user-input"
                    | "published-reference"
                    | "instrument-reading"
                    | "calculation"
                    | "imported"
            )
        )
        && value
            .get("sourceDigest")
            .is_some_and(|v| v.is_null() || v.as_str().is_some_and(valid_sha256))
        && value
            .get("methodId")
            .and_then(Value::as_str)
            .is_some_and(valid_safe_id)
        && value
            .get("methodVersion")
            .is_some_and(|v| bounded_string(v, 100))
}
fn valid_knowledge_object(value: &Value) -> bool {
    has_only_keys(
        value,
        &[
            "objectId",
            "objectType",
            "label",
            "summary",
            "properties",
            "provenance",
        ],
    ) && value
        .get("objectId")
        .and_then(Value::as_str)
        .is_some_and(valid_safe_id)
        && matches!(
            value.get("objectType").and_then(Value::as_str),
            Some(
                "entity"
                    | "observation"
                    | "event"
                    | "method"
                    | "source"
                    | "artifact-reference"
                    | "domain-object"
            )
        )
        && value.get("label").is_some_and(|v| bounded_string(v, 160))
        && value
            .get("summary")
            .is_some_and(|v| bounded_string(v, MAX_KNOWLEDGE_FIELD_BYTES))
        && value.get("properties").is_some_and(|v| {
            v.as_object().is_some_and(|map| {
                map.len() <= 24
                    && map.iter().all(|(key, value)| {
                        valid_safe_id(key)
                            && match value {
                                Value::String(s) => s.len() <= 512,
                                Value::Bool(_) | Value::Number(_) | Value::Null => true,
                                Value::Array(_) | Value::Object(_) => false,
                            }
                    })
            })
        })
        && value.get("provenance").is_some_and(valid_provenance)
}
fn valid_knowledge_relation(value: &Value) -> bool {
    has_only_keys(
        value,
        &[
            "relationId",
            "subjectId",
            "predicate",
            "objectId",
            "provenance",
        ],
    ) && ["relationId", "subjectId", "predicate", "objectId"]
        .iter()
        .all(|k| {
            value
                .get(*k)
                .and_then(Value::as_str)
                .is_some_and(valid_safe_id)
        })
        && value.get("provenance").is_some_and(valid_provenance)
}
fn valid_knowledge_assertion(value: &Value) -> bool {
    has_only_keys(
        value,
        &[
            "assertionId",
            "subjectId",
            "predicate",
            "value",
            "confidence",
            "verificationState",
            "provenance",
        ],
    ) && ["assertionId", "subjectId", "predicate"].iter().all(|k| {
        value
            .get(*k)
            .and_then(Value::as_str)
            .is_some_and(valid_safe_id)
    }) && value.get("value").is_some_and(|v| match v {
        Value::String(s) => !s.trim().is_empty() && s.len() <= MAX_KNOWLEDGE_FIELD_BYTES,
        Value::Bool(_) | Value::Number(_) => true,
        Value::Null | Value::Array(_) | Value::Object(_) => false,
    }) && value
        .get("confidence")
        .is_some_and(|v| v.is_null() || v.as_f64().is_some_and(|n| (0.0..=1.0).contains(&n)))
        && matches!(
            value.get("verificationState").and_then(Value::as_str),
            Some("unverified" | "provisional")
        )
        && value.get("provenance").is_some_and(valid_provenance)
}
fn valid_principal_id(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 80
        && s.bytes()
            .all(|c| c.is_ascii_alphanumeric() || b"._:@-".contains(&c))
}
fn valid_project_id(s: &str) -> bool {
    let Some(id) = s.strip_prefix("prj:") else {
        return false;
    };
    Uuid::parse_str(id).is_ok() && id == id.to_ascii_lowercase()
}
fn valid_project_record(v: &Value, expected_id: &str) -> bool {
    has_only_keys(
        v,
        &[
            "schema",
            "projectId",
            "title",
            "domain",
            "ownerApp",
            "currentVersion",
            "versions",
        ],
    ) && v.get("schema").and_then(Value::as_str) == Some(PROJECT_SCHEMA)
        && v.get("projectId").and_then(Value::as_str) == Some(expected_id)
        && valid_project_id(expected_id)
        && v.get("title")
            .and_then(Value::as_str)
            .is_some_and(|s| !s.trim().is_empty() && s.len() <= 120)
        && matches!(
            v.get("domain").and_then(Value::as_str),
            Some("film-production" | "event")
        )
        && matches!(
            v.get("ownerApp").and_then(Value::as_str),
            Some("tlps" | "tlp-film" | "nevo")
        )
        && v.get("currentVersion")
            .and_then(Value::as_i64)
            .is_some_and(|n| (0..=200).contains(&n))
        && v.get("versions")
            .and_then(Value::as_array)
            .zip(v.get("currentVersion").and_then(Value::as_u64))
            .is_some_and(|(versions, current)| {
                versions.len() <= 200
                    && versions.len() as u64 == current
                    && versions
                        .iter()
                        .enumerate()
                        .all(|(i, version)| valid_version(version, i + 1))
            })
}
fn has_only_keys(v: &Value, allowed: &[&str]) -> bool {
    v.as_object()
        .is_some_and(|object| object.keys().all(|key| allowed.contains(&key.as_str())))
}
fn valid_version(v: &Value, index: usize) -> bool {
    has_only_keys(
        v,
        &[
            "version",
            "baseVersion",
            "summary",
            "artifacts",
            "checks",
            "approval",
            "recordedAt",
            "timeBasis",
        ],
    ) && v.get("version").and_then(Value::as_u64) == Some(index as u64)
        && (if index == 1 {
            v.get("baseVersion").is_some_and(Value::is_null)
        } else {
            v.get("baseVersion").and_then(Value::as_u64) == Some((index - 1) as u64)
        })
        && v.get("summary")
            .and_then(Value::as_str)
            .is_some_and(|s| !s.trim().is_empty() && s.len() <= 280)
        && v.get("recordedAt")
            .and_then(Value::as_i64)
            .is_some_and(|n| n >= 0)
        && v.get("timeBasis").and_then(Value::as_str) == Some("host-unix-clock-unverified")
        && v.get("approval").is_some_and(|a| {
            has_only_keys(a, &["decidedBy", "proposalDigest"])
                && a.get("decidedBy").and_then(Value::as_str) == Some("local-user")
                && a.get("proposalDigest")
                    .and_then(Value::as_str)
                    .is_some_and(valid_sha256)
        })
        && v.get("artifacts")
            .and_then(Value::as_array)
            .is_some_and(|items| items.len() <= 50 && items.iter().all(valid_artifact_ref))
        && v.get("checks")
            .and_then(Value::as_array)
            .is_some_and(|items| items.len() <= 100 && items.iter().all(valid_check))
}
fn valid_sha256(s: &str) -> bool {
    s.strip_prefix("sha256:").is_some_and(|hex| {
        hex.len() == 64
            && hex
                .bytes()
                .all(|b| b.is_ascii_hexdigit() && !b.is_ascii_uppercase())
    })
}
fn valid_artifact_ref(v: &Value) -> bool {
    has_only_keys(
        v,
        &["artifactId", "kind", "storage", "sha256", "bytes", "origin"],
    ) && v
        .get("artifactId")
        .and_then(Value::as_str)
        .is_some_and(valid_safe_id)
        && matches!(
            v.get("kind").and_then(Value::as_str),
            Some(
                "idea"
                    | "script-draft"
                    | "budget"
                    | "schedule"
                    | "cast-list"
                    | "location-list"
                    | "video"
                    | "image"
                    | "audio"
                    | "document"
            )
        )
        && v.get("storage").is_some_and(|s| {
            has_only_keys(s, &["app", "localKey"])
                && matches!(
                    s.get("app").and_then(Value::as_str),
                    Some(
                        "maataa-desktop" | "brahmini" | "tlps" | "tlp-film" | "maataa-workstation"
                    )
                )
                && s.get("localKey")
                    .and_then(Value::as_str)
                    .is_some_and(valid_local_key)
        })
        && v.get("sha256")
            .and_then(Value::as_str)
            .is_some_and(valid_sha256)
        && v.get("bytes").and_then(Value::as_u64).is_some()
        && v.get("origin").is_some_and(|o| {
            has_only_keys(o, &["kind", "models"])
                && matches!(
                    o.get("kind").and_then(Value::as_str),
                    Some(
                        "user-input"
                            | "provider-draft"
                            | "synthetic-demo"
                            | "deterministic-tool"
                            | "imported"
                    )
                )
                && o.get("models")
                    .and_then(Value::as_array)
                    .is_some_and(|models| models.len() <= 20 && models.iter().all(valid_model_use))
        })
}
fn valid_model_use(v: &Value) -> bool {
    has_only_keys(
        v,
        &[
            "modelId",
            "version",
            "digest",
            "role",
            "runtime",
            "qualification",
        ],
    ) && v
        .get("modelId")
        .and_then(Value::as_str)
        .is_some_and(valid_safe_id)
        && v.get("version")
            .is_some_and(|x| x.is_null() || x.as_str().is_some_and(|s| s.len() <= 120))
        && v.get("digest")
            .is_some_and(|x| x.is_null() || x.as_str().is_some_and(|s| s.len() <= 160))
        && matches!(
            v.get("role").and_then(Value::as_str),
            Some(
                "chat"
                    | "planner"
                    | "code"
                    | "text-encoder"
                    | "video-generator"
                    | "image-generator"
                    | "voice"
                    | "transcription"
                    | "evaluator"
            )
        )
        && v.get("runtime")
            .and_then(Value::as_str)
            .is_some_and(valid_safe_id)
        && v.get("qualification").is_some_and(|q| {
            q.as_str() == Some("unqualified")
                || (has_only_keys(q, &["evaluationId", "passed"])
                    && q.get("evaluationId")
                        .and_then(Value::as_str)
                        .is_some_and(valid_safe_id)
                    && q.get("passed").and_then(Value::as_bool).is_some())
        })
}
fn valid_check(v: &Value) -> bool {
    has_only_keys(
        v,
        &["checkId", "artifactId", "evaluator", "passed", "notes"],
    ) && v
        .get("checkId")
        .and_then(Value::as_str)
        .is_some_and(valid_safe_id)
        && v.get("artifactId")
            .and_then(Value::as_str)
            .is_some_and(valid_safe_id)
        && v.get("evaluator").and_then(Value::as_str).is_some_and(|s| {
            s.len() <= 110
                && (s.starts_with("deterministic:") || s.starts_with("model:"))
                && s.contains('@')
        })
        && v.get("passed").and_then(Value::as_bool).is_some()
        && v.get("notes")
            .and_then(Value::as_array)
            .is_some_and(|notes| {
                notes.len() <= 20
                    && notes
                        .iter()
                        .all(|n| n.as_str().is_some_and(|s| s.len() <= 280))
            })
}
fn valid_safe_id(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 120
        && s.bytes()
            .all(|b| b.is_ascii_alphanumeric() || b"._:/@+-".contains(&b))
}
fn valid_local_key(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 160
        && !s.contains("://")
        && !s.split('/').any(|part| part == "..")
        && s.bytes()
            .all(|b| b.is_ascii_alphanumeric() || b"._:/-".contains(&b))
}
fn digest_json(v: &Value) -> Result<String, StoreError> {
    let bytes = serde_json::to_vec(v).map_err(|_| StoreError::Invalid)?;
    Ok(format!("sha256:{}", hex(&Sha256::digest(bytes))))
}
fn hex(bytes: &[u8]) -> String {
    const H: &[u8; 16] = b"0123456789abcdef";
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        s.push(H[(b >> 4) as usize] as char);
        s.push(H[(b & 15) as usize] as char);
    }
    s
}
/// The server, not the client, records when a version was accepted: versions
/// already stored must be unchanged (their stored time is kept) and every new
/// version gets `now` in Unix milliseconds. Client-sent `recordedAt` is ignored.
fn stamp_versions(record: &mut Value, stored: Option<&Value>, now: i64) -> Result<(), StoreError> {
    let stored_versions: &[Value] = stored
        .and_then(|value| value.get("versions"))
        .and_then(Value::as_array)
        .map_or(&[], Vec::as_slice);
    let versions = record
        .get_mut("versions")
        .and_then(Value::as_array_mut)
        .ok_or(StoreError::Invalid)?;
    if versions.len() < stored_versions.len() {
        return Err(StoreError::Invalid);
    }
    for (index, version) in versions.iter_mut().enumerate() {
        let recorded_at = match stored_versions.get(index) {
            Some(previous) => {
                let without_time = |value: &Value| {
                    let mut copy = value.clone();
                    if let Some(object) = copy.as_object_mut() {
                        object.remove("recordedAt");
                    }
                    copy
                };
                if without_time(previous) != without_time(version) {
                    return Err(StoreError::Invalid);
                }
                previous.get("recordedAt").cloned().unwrap_or(Value::Null)
            }
            None => json!(now),
        };
        version
            .as_object_mut()
            .ok_or(StoreError::Invalid)?
            .insert("recordedAt".into(), recorded_at);
    }
    Ok(())
}
/// Host wall clock in Unix **milliseconds**. Every stored time tagged
/// `host-unix-clock-unverified` uses this unit (schema v3 onward).
fn now_unix_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| i64::try_from(d.as_millis()).unwrap_or(i64::MAX))
        .unwrap_or(0)
}

#[cfg(test)]
mod tests {
    use super::*;
    fn id() -> String {
        format!("prj:{}", Uuid::new_v4())
    }
    fn record(project: &str, version: i64) -> Value {
        let versions = (0..version).map(|n| json!({
            "version": n + 1,
            "baseVersion": if n == 0 { Value::Null } else { json!(n) },
            "summary": "Synthetic approved update",
            "artifacts": [],
            "checks": [],
            "approval": {"decidedBy":"local-user","proposalDigest":format!("sha256:{}","0".repeat(64))},
            "recordedAt": 1,
            "timeBasis": "host-unix-clock-unverified"
        })).collect::<Vec<_>>();
        json!({"schema":PROJECT_SCHEMA,"projectId":project,"title":"Synthetic rehearsal","domain":"film-production","ownerApp":"tlps","currentVersion":version,"versions":versions})
    }
    fn setup(scopes: Vec<Scope>) -> (Store, Identity) {
        let s = Store::in_memory().unwrap();
        s.create_principal("test-user", "Synthetic User").unwrap();
        let t = s.issue_token("test-user", &id(), scopes, 3600).unwrap();
        let i = s.authenticate(&t.access_token).unwrap();
        (s, i)
    }
    fn provenance() -> Value {
        json!({"sourceRef":"fixture:synthetic-observation","sourceKind":"instrument-reading","sourceDigest":null,"methodId":"method:demo-v1","methodVersion":"1.0"})
    }
    fn knowledge_object(id: &str) -> Value {
        json!({"objectId":id,"objectType":"entity","label":"Synthetic observatory","summary":"A test-only fixture.","properties":{"frame":"heliocentric","sample":true},"provenance":provenance()})
    }
    fn create_project_fixture(store: &Store, identity: &Identity) {
        let project = record(&identity.project_id, 0);
        store.create_project(identity, &project).unwrap();
    }
    #[test]
    fn tokens_are_project_scoped_and_never_store_plaintext() {
        let s = Store::in_memory().unwrap();
        s.create_principal("person-1", "Person").unwrap();
        let p = id();
        let issued = s
            .issue_token("person-1", &p, vec![Scope::ProjectRead], 3600)
            .unwrap();
        let i = s.authenticate(&issued.access_token).unwrap();
        assert_eq!(i.project_id, p);
        let conn = s.0.lock().unwrap();
        let stored: String = conn
            .query_row(
                "SELECT token_hash FROM access_tokens WHERE token_id=?1",
                [issued.token_id],
                |r| r.get(0),
            )
            .unwrap();
        assert_ne!(stored, issued.access_token);
        assert_eq!(stored.len(), 64);
    }
    #[test]
    fn invalid_and_expired_credentials_fail_closed() {
        let s = Store::in_memory().unwrap();
        assert!(matches!(
            s.authenticate("mta_invalid_token"),
            Err(StoreError::Denied)
        ));
        s.create_principal("person-1", "Person").unwrap();
        assert!(matches!(
            s.issue_token("person-1", &id(), vec![Scope::ProjectRead], 59),
            Err(StoreError::Invalid)
        ));
    }
    #[test]
    fn revocation_disables_previously_valid_token() {
        let s = Store::in_memory().unwrap();
        s.create_principal("person-1", "Person").unwrap();
        let t = s
            .issue_token("person-1", &id(), vec![Scope::ProjectRead], 3600)
            .unwrap();
        s.authenticate(&t.access_token).unwrap();
        s.revoke_token(&t.token_id).unwrap();
        assert!(matches!(
            s.authenticate(&t.access_token),
            Err(StoreError::Denied)
        ));
    }
    #[test]
    fn project_access_is_scoped_by_project_and_permission() {
        let (s, i) = setup(vec![Scope::ProjectRead]);
        let other = id();
        assert!(matches!(
            s.read_project(&i, &other),
            Err(StoreError::Denied)
        ));
        assert!(!authorized(&i, &i.project_id, Scope::ProjectWrite));
    }
    #[test]
    fn read_only_identity_cannot_create_or_update_records() {
        let (s, i) = setup(vec![Scope::ProjectRead]);
        let p = i.project_id.clone();
        assert!(matches!(
            s.create_project(&i, &record(&p, 0)),
            Err(StoreError::Denied)
        ));
        assert!(matches!(
            s.update_project(&i, &p, 0, &record(&p, 1)),
            Err(StoreError::Denied)
        ));
    }
    #[test]
    fn create_update_event_and_stale_write_are_atomic() {
        let (s, i) = setup(vec![Scope::ProjectRead, Scope::ProjectWrite]);
        let p = i.project_id.clone();
        s.create_project(&i, &record(&p, 0)).unwrap();
        assert_eq!(s.update_project(&i, &p, 0, &record(&p, 1)).unwrap(), 1);
        assert!(matches!(
            s.update_project(&i, &p, 0, &record(&p, 1)),
            Err(StoreError::Conflict)
        ));
        let events = s.list_events(&i, &p).unwrap();
        assert_eq!(events.len(), 2);
        assert_eq!(events[1]["timeBasis"], "host-unix-clock-unverified");
    }
    #[test]
    fn server_records_version_time_in_ms_and_keeps_history_immutable() {
        let (s, i) = setup(vec![Scope::ProjectRead, Scope::ProjectWrite]);
        let p = i.project_id.clone();
        s.create_project(&i, &record(&p, 0)).unwrap();
        let before = now_unix_ms();
        s.update_project(&i, &p, 0, &record(&p, 1)).unwrap();
        let stored = s.read_project(&i, &p).unwrap();
        let v1_time = stored["versions"][0]["recordedAt"].as_i64().unwrap();
        // The client sent recordedAt: 1; the server stamped its own ms time.
        assert!(v1_time >= before && v1_time >= LEGACY_SECONDS_BELOW);
        // v2 keeps v1's stored time even though the client re-sent 1.
        s.update_project(&i, &p, 1, &record(&p, 2)).unwrap();
        let stored = s.read_project(&i, &p).unwrap();
        assert_eq!(
            stored["versions"][0]["recordedAt"].as_i64().unwrap(),
            v1_time
        );
        assert!(stored["versions"][1]["recordedAt"].as_i64().unwrap() >= v1_time);
        // Rewriting an accepted version is refused.
        let mut rewritten = record(&p, 3);
        rewritten["versions"][0]["summary"] = json!("Changed history");
        assert!(matches!(
            s.update_project(&i, &p, 2, &rewritten),
            Err(StoreError::Invalid)
        ));
        let events = s.list_events(&i, &p).unwrap();
        assert!(events
            .iter()
            .all(|e| e["recordedAt"].as_i64().unwrap() >= LEGACY_SECONDS_BELOW));
    }
    #[test]
    fn token_expiry_is_stored_in_ms() {
        let s = Store::in_memory().unwrap();
        s.create_principal("person-1", "Person").unwrap();
        let before = now_unix_ms();
        let t = s
            .issue_token("person-1", &id(), vec![Scope::ProjectRead], 3600)
            .unwrap();
        assert!(t.expires_at >= before + 3_600_000);
        assert!(t.expires_at <= now_unix_ms() + 3_600_000);
        assert!(s.authenticate(&t.access_token).is_ok());
    }
    #[test]
    fn migration_v3_converts_legacy_second_times_to_ms() {
        let temp = tempfile::NamedTempFile::new().unwrap();
        let conn = Connection::open(temp.path()).unwrap();
        // A v2 database written by the seconds-based build.
        conn.execute_batch("CREATE TABLE schema_migrations (version INTEGER PRIMARY KEY, checksum TEXT NOT NULL, applied_at INTEGER NOT NULL, time_basis TEXT NOT NULL);").unwrap();
        drop(conn);
        {
            let conn = Connection::open(temp.path()).unwrap();
            // Apply v1+v2 with the real migration bodies, then mark them as seconds.
            let store = Store::initialize(conn).unwrap();
            let c = store.0.lock().unwrap();
            c.execute("DELETE FROM schema_migrations WHERE version=3", [])
                .unwrap();
            c.execute("UPDATE schema_migrations SET applied_at=1791000000", [])
                .unwrap();
            c.execute(
                "INSERT INTO principals VALUES('person-1','Person',1791000000)",
                [],
            )
            .unwrap();
            c.execute("INSERT INTO access_tokens VALUES('t1','h1','person-1','prj:00000000-0000-4000-8000-000000000000','[]',1791000000,1791003600,NULL)", []).unwrap();
            c.execute("INSERT INTO projects VALUES('prj:00000000-0000-4000-8000-000000000000',0,'{}','person-1',1791000000)", []).unwrap();
            c.execute("INSERT INTO project_events VALUES('e1','prj:00000000-0000-4000-8000-000000000000',0,'person-1','project.created','d',1791000000,'host-unix-clock-unverified')", []).unwrap();
        }
        let migrated = Store::initialize(Connection::open(temp.path()).unwrap()).unwrap();
        assert_eq!(migrated.schema_version().unwrap(), 3);
        let c = migrated.0.lock().unwrap();
        let get = |sql: &str| -> i64 { c.query_row(sql, [], |r| r.get(0)).unwrap() };
        assert_eq!(get("SELECT created_at FROM principals"), 1_791_000_000_000);
        assert_eq!(
            get("SELECT expires_at FROM access_tokens"),
            1_791_003_600_000
        );
        assert_eq!(get("SELECT updated_at FROM projects"), 1_791_000_000_000);
        assert_eq!(
            get("SELECT recorded_at FROM project_events"),
            1_791_000_000_000
        );
        assert_eq!(
            get("SELECT MIN(applied_at) FROM schema_migrations"),
            1_791_000_000_000
        );
    }
    #[test]
    fn record_id_and_schema_are_checked() {
        let (s, i) = setup(vec![Scope::ProjectWrite]);
        assert!(matches!(
            s.create_project(&i, &record("prj:00000000-0000-0000-0000-000000000000", 0)),
            Err(StoreError::Invalid)
        ));
        let mut bad = record(&i.project_id, 0);
        bad["schema"] = json!("other");
        assert!(matches!(
            s.create_project(&i, &bad),
            Err(StoreError::Invalid)
        ));
    }
    #[test]
    fn domain_content_fields_are_rejected_from_central_store_records() {
        let (s, i) = setup(vec![Scope::ProjectWrite]);
        let mut unsafe_record = record(&i.project_id, 0);
        unsafe_record["scriptBody"] = json!("must remain in TLPS");
        assert!(matches!(
            s.create_project(&i, &unsafe_record),
            Err(StoreError::Invalid)
        ));
    }
    #[test]
    fn migrations_are_versioned_and_checksum_verified() {
        let s = Store::in_memory().unwrap();
        assert_eq!(s.schema_version().unwrap(), 3);
        let conn = s.0.lock().unwrap();
        let count: i64 = conn
            .query_row("SELECT COUNT(*) FROM schema_migrations", [], |r| r.get(0))
            .unwrap();
        assert_eq!(count, 3);
        drop(conn);
        // A changed migration fingerprint is a closed failure on reopen.
        let temp = tempfile::NamedTempFile::new().unwrap();
        let connection = Connection::open(temp.path()).unwrap();
        Store::initialize(connection).unwrap();
        let tampered = Connection::open(temp.path()).unwrap();
        tampered
            .execute(
                "UPDATE schema_migrations SET checksum='tampered' WHERE version=2",
                [],
            )
            .unwrap();
        assert!(matches!(
            Store::initialize(tampered),
            Err(StoreError::Invalid)
        ));
    }
    #[test]
    fn migration_preserves_legacy_project_data() {
        let temp = tempfile::NamedTempFile::new().unwrap();
        let conn = Connection::open(temp.path()).unwrap();
        conn.execute_batch("CREATE TABLE projects(project_id TEXT PRIMARY KEY,current_version INTEGER NOT NULL,record_json TEXT NOT NULL,owner_principal_id TEXT NOT NULL,updated_at INTEGER NOT NULL);").unwrap();
        conn.execute(
            "INSERT INTO projects VALUES('legacy',0,'{}','legacy-owner',1)",
            [],
        )
        .unwrap();
        let migrated = Store::initialize(conn).unwrap();
        assert_eq!(migrated.schema_version().unwrap(), 3);
        let conn = migrated.0.lock().unwrap();
        let owner: String = conn
            .query_row(
                "SELECT owner_principal_id FROM projects WHERE project_id='legacy'",
                [],
                |r| r.get(0),
            )
            .unwrap();
        assert_eq!(owner, "legacy-owner");
    }
    #[test]
    fn sqlite_backup_is_integrity_checked_private_and_never_overwritten() {
        let store = Store::in_memory().unwrap();
        store
            .create_principal("backup-user", "Backup User")
            .unwrap();
        let project_id = id();
        let token = store
            .issue_token("backup-user", &project_id, vec![Scope::ProjectRead], 3600)
            .unwrap();
        let directory = tempfile::tempdir().unwrap();
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            std::fs::set_permissions(directory.path(), std::fs::Permissions::from_mode(0o700))
                .unwrap();
        }
        let destination = directory.path().join("snapshot.sqlite3");
        store.backup_to(&destination).unwrap();
        let restored = Store::open(destination.to_str().unwrap()).unwrap();
        assert_eq!(
            restored
                .authenticate(&token.access_token)
                .unwrap()
                .project_id,
            project_id
        );
        assert!(matches!(
            store.backup_to(&destination),
            Err(StoreError::Duplicate)
        ));
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            assert_eq!(
                std::fs::metadata(destination).unwrap().permissions().mode() & 0o777,
                0o600
            );
        }
    }
    #[test]
    fn knowledge_records_require_scope_and_keep_provenance_project_scoped() {
        let (s, i) = setup(vec![
            Scope::ProjectRead,
            Scope::ProjectWrite,
            Scope::KnowledgeRead,
            Scope::KnowledgeWrite,
        ]);
        create_project_fixture(&s, &i);
        let created = s
            .create_knowledge_object(&i, &knowledge_object("entity:observatory"))
            .unwrap();
        assert_eq!(created["timeBasis"], "host-unix-clock-unverified");
        let objects = s.list_knowledge_objects(&i).unwrap();
        assert_eq!(objects.len(), 1);
        assert_eq!(objects[0]["provenance"]["methodId"], "method:demo-v1");
        let assertion = json!({"assertionId":"assertion:position","subjectId":"entity:observatory","predicate":"state.position","value":"simulation-only","confidence":0.5,"verificationState":"provisional","provenance":provenance()});
        s.create_knowledge_assertion(&i, &assertion).unwrap();
        assert_eq!(s.list_knowledge_assertions(&i).unwrap().len(), 1);
        let relation = json!({"relationId":"relation:linked","subjectId":"entity:observatory","predicate":"observes","objectId":"entity:observatory","provenance":provenance()});
        s.create_knowledge_relation(&i, &relation).unwrap();
        let (read_only_store, read_only) = setup(vec![Scope::KnowledgeRead]);
        assert!(matches!(
            read_only_store.create_knowledge_object(&read_only, &knowledge_object("entity:x")),
            Err(StoreError::Denied)
        ));
        assert!(matches!(
            s.list_knowledge_objects(&Identity {
                scopes: vec![Scope::ProjectRead],
                ..i.clone()
            }),
            Err(StoreError::Denied)
        ));
    }
    #[test]
    fn knowledge_rejects_unproven_verified_state_and_orphan_relations() {
        let (s, i) = setup(vec![
            Scope::ProjectRead,
            Scope::ProjectWrite,
            Scope::KnowledgeRead,
            Scope::KnowledgeWrite,
        ]);
        create_project_fixture(&s, &i);
        let mut bad = json!({"assertionId":"assertion:position","subjectId":"entity:unknown","predicate":"state.position","value":"claimed","confidence":1.0,"verificationState":"verified","provenance":provenance()});
        assert!(matches!(
            s.create_knowledge_assertion(&i, &bad),
            Err(StoreError::Invalid)
        ));
        bad["verificationState"] = json!("provisional");
        assert!(matches!(
            s.create_knowledge_assertion(&i, &bad),
            Err(StoreError::Invalid)
        ));
        let mut object = knowledge_object("entity:observatory");
        object["scriptBody"] = json!("not metadata");
        assert!(matches!(
            s.create_knowledge_object(&i, &object),
            Err(StoreError::Invalid)
        ));
    }
}
