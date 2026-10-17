//! Row-level security for the shared SQLite store.
//!
//! SQLite has no RLS of its own, so the store builds it from three parts:
//!
//! 1. **Session context.** Every database use opens a [`Session`]: `system`
//!    for migrations, administration and authentication, or `scoped` for one
//!    authenticated request. A scoped session carries the token's project,
//!    principal and the capabilities derived from its scopes and pilot role.
//!    SQL reads them through `rls_project()`, `rls_principal()` and
//!    `rls_can(cap)`. When a session ends the context returns to `Locked`.
//! 2. **Policy views and triggers.** Each project-scoped table `T` has a
//!    per-connection `TEMP VIEW rls_T` that returns only the session
//!    project's rows the session may see, and `INSTEAD OF` triggers that
//!    check the write policy (project, capability, actor) before writing the
//!    base row. Append-only tables get no update or delete trigger, so those
//!    statements fail. The objects are TEMP: they live with this binary, are
//!    recreated on every open, and never enter migration checksums or backups.
//! 3. **Authorizer.** While a scoped session is active, statements may not
//!    touch a protected base table, a system table or the schema directly;
//!    only the `rls_` views (and the triggers behind them) may. A query that
//!    forgets its `WHERE project_id = ?` therefore still sees one project, and
//!    a query that names a base table fails to prepare.
//!
//! The application's own checks stay in place; this layer is the second,
//! independent boundary. Any violation surfaces as `StoreError::Denied`.

use super::{has_scope, Identity, Scope, StoreError};
use rusqlite::{
    functions::FunctionFlags,
    hooks::{AuthAction, AuthContext, Authorization},
    Connection, OptionalExtension,
};
use std::{
    ops::Deref,
    sync::{Arc, Mutex, MutexGuard},
};

/// Prefix of every policy view and trigger; the authorizer trusts it.
pub const PREFIX: &str = "rls_";
/// Message raised by a policy trigger.
pub const DENIED: &str = "rls-denied";

/// What the current session may do. Built only by [`Session`] constructors.
#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub enum Mode {
    /// No session: protected and system tables are unreachable.
    #[default]
    Locked,
    /// Migrations, administration, authentication and backups.
    System,
    /// One authenticated request.
    Request(RequestScope),
    /// Purging one deleted project after its retention window (unrestricted,
    /// and the only mode in which append-only rows of that project may go).
    Purge(String),
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct RequestScope {
    pub project_id: String,
    pub principal_id: String,
    /// Pilot role, when the project is a managed pilot and the principal an active member.
    pub role: Option<String>,
    pub read: bool,
    pub write: bool,
    pub review: bool,
    pub knowledge_read: bool,
    pub knowledge_write: bool,
}

impl RequestScope {
    /// Capabilities from token scopes plus pilot membership. A managed pilot
    /// project requires an active membership for everything; writes need the
    /// owner or editor role and stage reviews the owner or reviewer role.
    pub fn derive(identity: &Identity, managed: bool, role: Option<String>) -> Self {
        let has = |scope: Scope| has_scope(identity, scope);
        let role_is = |allowed: &[&str]| role.as_deref().is_some_and(|r| allowed.contains(&r));
        let member = !managed || role.is_some();
        Self {
            project_id: identity.project_id.clone(),
            principal_id: identity.principal_id.clone(),
            read: member && has(Scope::ProjectRead),
            write: has(Scope::ProjectWrite) && (!managed || role_is(&["owner", "editor"])),
            review: managed && has(Scope::ProjectWrite) && role_is(&["owner", "reviewer"]),
            knowledge_read: member && has(Scope::KnowledgeRead),
            knowledge_write: member && has(Scope::KnowledgeWrite),
            role,
        }
    }

    fn can(&self, capability: &str) -> bool {
        match capability {
            "read" => self.read,
            "write" => self.write,
            "review" => self.review,
            // May see the project's rows at all: needed to check versions before a write.
            "see" => self.read || self.write || self.review,
            "knowledge-read" => self.knowledge_read,
            "knowledge-write" => self.knowledge_write,
            "knowledge-see" => self.knowledge_read || self.knowledge_write,
            _ => false,
        }
    }
}

pub type Shared = Arc<Mutex<Mode>>;

fn current(shared: &Shared) -> Mode {
    shared.lock().map(|m| m.clone()).unwrap_or(Mode::Locked)
}

/// A locked connection with an active RLS context. Resets to `Locked` on drop.
pub struct Session<'a> {
    conn: MutexGuard<'a, Connection>,
    mode: Shared,
}

impl Deref for Session<'_> {
    type Target = Connection;
    fn deref(&self) -> &Connection {
        &self.conn
    }
}

impl Drop for Session<'_> {
    fn drop(&mut self) {
        if let Ok(mut mode) = self.mode.lock() {
            *mode = Mode::Locked;
        }
    }
}

impl<'a> Session<'a> {
    pub fn open(
        conn: MutexGuard<'a, Connection>,
        mode: Shared,
        next: Mode,
    ) -> Result<Self, StoreError> {
        *mode.lock().map_err(|_| StoreError::Database)? = next;
        Ok(Self { conn, mode })
    }

    /// Switch a system session to one request's scope (used after reading membership).
    pub fn narrow(&self, scope: RequestScope) -> Result<(), StoreError> {
        *self.mode.lock().map_err(|_| StoreError::Database)? = Mode::Request(scope);
        Ok(())
    }

    pub fn mode(&self) -> Mode {
        current(&self.mode)
    }
}

/// Managed-pilot flag and active role, read from the base tables in system mode.
pub fn membership(
    conn: &Connection,
    identity: &Identity,
) -> Result<(bool, Option<String>), StoreError> {
    let managed: bool = conn
        .query_row(
            "SELECT EXISTS(SELECT 1 FROM tlps_pilot_projects WHERE project_id=?1)",
            [&identity.project_id],
            |r| r.get(0),
        )
        .map_err(|_| StoreError::Database)?;
    let role: Option<String> = conn
        .query_row(
            "SELECT role FROM tlps_pilot_members WHERE project_id=?1 AND principal_id=?2 AND active=1",
            [&identity.project_id, &identity.principal_id],
            |r| r.get(0),
        )
        .optional()
        .map_err(|_| StoreError::Database)?;
    Ok((managed, role))
}

/// One protected table and its policy, as SQL predicates.
/// `see` is evaluated on the base row; the write predicates on `NEW`/`OLD`.
struct Policy {
    table: &'static str,
    see: &'static str,
    insert: Option<&'static str>,
    update: Option<&'static str>,
    delete: Option<&'static str>,
}

/// Every project-scoped table. A table missing here is unreachable from requests.
const POLICIES: &[Policy] = &[
    Policy {
        table: "projects",
        see: "rls_can('see') OR rls_can('knowledge-see')",
        insert: Some("rls_can('write') AND NEW.owner_principal_id = rls_principal()"),
        update: Some("rls_can('write') AND NEW.owner_principal_id = OLD.owner_principal_id"),
        delete: None,
    },
    Policy {
        table: "project_events",
        see: "rls_can('see')",
        insert: Some("rls_can('write') AND NEW.actor = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "knowledge_objects",
        see: "rls_can('knowledge-see')",
        insert: Some("rls_can('knowledge-write') AND NEW.created_by = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "knowledge_relations",
        see: "rls_can('knowledge-see')",
        insert: Some("rls_can('knowledge-write') AND NEW.created_by = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "knowledge_assertions",
        see: "rls_can('knowledge-see')",
        insert: Some("rls_can('knowledge-write') AND NEW.created_by = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "tlps_entities",
        see: "rls_can('see')",
        insert: Some("rls_can('write')"),
        // Reviewers may only advance a profile's stage; everything else needs write.
        update: Some(
            "(rls_can('write') OR (rls_can('review') AND OLD.kind = 'profiles' AND NEW.kind = 'profiles' AND NEW.deleted = OLD.deleted)) AND NEW.entity_id = OLD.entity_id",
        ),
        delete: None,
    },
    Policy {
        table: "tlps_links",
        see: "rls_can('see')",
        insert: Some("rls_can('write')"),
        update: None,
        delete: Some("rls_can('write')"),
    },
    Policy {
        table: "tlps_events",
        see: "rls_can('see')",
        insert: Some("(rls_can('write') OR rls_can('review')) AND NEW.actor = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "tlps_idempotency",
        // Idempotency receipts are private to the principal that made the request.
        see: "rls_can('see') AND principal_id = rls_principal()",
        insert: Some("rls_can('write') AND NEW.principal_id = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "tlps_pilot_projects",
        see: "1",
        insert: None,
        update: None,
        delete: None,
    },
    Policy {
        table: "tlps_pilot_members",
        // A principal can see its own membership; members can see the team.
        see: "principal_id = rls_principal() OR rls_can('read')",
        insert: None,
        update: None,
        delete: None,
    },
    Policy {
        table: "tlps_pilot_items",
        see: "rls_can('see')",
        insert: Some("rls_can('write') AND NEW.created_by = rls_principal()"),
        update: Some("rls_can('write') AND NEW.id = OLD.id AND NEW.created_by = OLD.created_by"),
        delete: None,
    },
    Policy {
        table: "tlps_pilot_reviews",
        see: "rls_can('see')",
        insert: Some("rls_can('review') AND NEW.actor = rls_principal()"),
        update: None,
        delete: None,
    },
    Policy {
        table: "tlps_pilot_audit",
        see: "rls_can('see')",
        insert: Some("(rls_can('write') OR rls_can('review')) AND NEW.actor = rls_principal()"),
        update: None,
        delete: None,
    },
];

/// Tables a request may read directly (global reference data, read-only).
const PUBLIC_READ: &[&str] = &["tlps_skus"];

pub fn protected_tables() -> impl Iterator<Item = &'static str> {
    POLICIES.iter().map(|p| p.table)
}

pub fn view(table: &str) -> String {
    format!("{PREFIX}{table}")
}

/// Registers the context functions and the authorizer on a new connection.
pub fn install(conn: &Connection, shared: &Shared) -> rusqlite::Result<()> {
    let flags = FunctionFlags::SQLITE_UTF8;
    let s = shared.clone();
    conn.create_scalar_function("rls_project", 0, flags, move |_| {
        Ok(match current(&s) {
            Mode::Request(scope) => Some(scope.project_id),
            _ => None,
        })
    })?;
    let s = shared.clone();
    conn.create_scalar_function("rls_principal", 0, flags, move |_| {
        Ok(match current(&s) {
            Mode::Request(scope) => Some(scope.principal_id),
            _ => None,
        })
    })?;
    let s = shared.clone();
    conn.create_scalar_function("rls_can", 1, flags, move |ctx| {
        let capability: String = ctx.get(0)?;
        Ok(match current(&s) {
            Mode::Request(scope) => scope.can(&capability),
            _ => false,
        })
    })?;
    let s = shared.clone();
    conn.create_scalar_function("rls_purging", 1, flags, move |ctx| {
        let project: Option<String> = ctx.get(0)?;
        Ok(matches!((current(&s), project), (Mode::Purge(p), Some(q)) if p == q))
    })?;
    let s = shared.clone();
    let protected: Vec<&'static str> = protected_tables().collect();
    conn.authorizer(Some(move |ctx: AuthContext<'_>| {
        authorize(&current(&s), &protected, &ctx)
    }));
    Ok(())
}

fn authorize(mode: &Mode, protected: &[&str], ctx: &AuthContext<'_>) -> Authorization {
    use Authorization::{Allow, Deny};
    let via_policy = ctx.accessor.is_some_and(|a| a.starts_with(PREFIX));
    let policy_object = |name: &str| name.starts_with(PREFIX) && ctx.database_name == Some("temp");
    match mode {
        Mode::System | Mode::Purge(_) => Allow,
        Mode::Locked => match ctx.action {
            AuthAction::Select | AuthAction::Function { .. } | AuthAction::Transaction { .. } => {
                Allow
            }
            _ => Deny,
        },
        Mode::Request(_) => match ctx.action {
            AuthAction::Select
            | AuthAction::Function { .. }
            | AuthAction::Transaction { .. }
            | AuthAction::Savepoint { .. }
            | AuthAction::Recursive => Allow,
            AuthAction::Read { table_name, .. } => {
                // Policy views and triggers are trusted code: their reads include
                // foreign-key checks against parent tables such as `principals`.
                if policy_object(table_name) || via_policy || PUBLIC_READ.contains(&table_name) {
                    Allow
                } else {
                    Deny
                }
            }
            AuthAction::Insert { table_name }
            | AuthAction::Update { table_name, .. }
            | AuthAction::Delete { table_name } => {
                if policy_object(table_name) || via_policy && protected.contains(&table_name) {
                    Allow
                } else {
                    Deny
                }
            }
            // Schema changes, pragmas, ATTACH and everything else.
            _ => Deny,
        },
    }
}

/// Creates the TEMP policy views and triggers. Run in system mode after migrations.
pub fn create_policies(conn: &Connection) -> rusqlite::Result<()> {
    let mut sql = String::new();
    for policy in POLICIES {
        let columns = table_columns(conn, policy.table)?;
        if columns.is_empty() {
            return Err(rusqlite::Error::InvalidQuery);
        }
        let names: Vec<&str> = columns.iter().map(|c| c.name.as_str()).collect();
        let keys: Vec<&str> = columns
            .iter()
            .filter(|c| c.primary_key)
            .map(|c| c.name.as_str())
            .collect();
        let t = policy.table;
        let v = view(t);
        sql.push_str(&format!(
            "DROP VIEW IF EXISTS temp.{v};\nCREATE TEMP VIEW {v} AS SELECT {} FROM {t} WHERE project_id = rls_project() AND ({});\n",
            names.join(","),
            policy.see,
        ));
        if let Some(rule) = policy.insert {
            // AUTOINCREMENT keys are assigned by SQLite; columns with defaults keep them.
            let insertable: Vec<&Column> = columns.iter().filter(|c| !c.autoincrement).collect();
            let values: Vec<String> = insertable
                .iter()
                .map(|c| match &c.default {
                    Some(d) => format!("COALESCE(NEW.{}, {d})", c.name),
                    None => format!("NEW.{}", c.name),
                })
                .collect();
            sql.push_str(&format!(
                "CREATE TEMP TRIGGER {v}_insert INSTEAD OF INSERT ON {v} BEGIN SELECT RAISE(ABORT,'{DENIED}') WHERE COALESCE(NOT (NEW.project_id = rls_project() AND ({rule})), 1); INSERT INTO {t}({}) VALUES({}); END;\n",
                insertable.iter().map(|c| c.name.as_str()).collect::<Vec<_>>().join(","),
                values.join(","),
            ));
        }
        let key_match = keys
            .iter()
            .map(|k| format!("{k} = OLD.{k}"))
            .collect::<Vec<_>>()
            .join(" AND ");
        if let Some(rule) = policy.update {
            let sets: Vec<String> = names
                .iter()
                .filter(|n| !keys.contains(n))
                .map(|n| format!("{n} = NEW.{n}"))
                .collect();
            sql.push_str(&format!(
                "CREATE TEMP TRIGGER {v}_update INSTEAD OF UPDATE ON {v} BEGIN SELECT RAISE(ABORT,'{DENIED}') WHERE COALESCE(NOT (NEW.project_id = OLD.project_id AND OLD.project_id = rls_project() AND ({rule})), 1); UPDATE {t} SET {} WHERE {key_match}; END;\n",
                sets.join(","),
            ));
        }
        if let Some(rule) = policy.delete {
            sql.push_str(&format!(
                "CREATE TEMP TRIGGER {v}_delete INSTEAD OF DELETE ON {v} BEGIN SELECT RAISE(ABORT,'{DENIED}') WHERE COALESCE(NOT (OLD.project_id = rls_project() AND ({rule})), 1); DELETE FROM {t} WHERE {key_match}; END;\n",
            ));
        }
    }
    conn.execute_batch(&sql)
}

struct Column {
    name: String,
    primary_key: bool,
    autoincrement: bool,
    default: Option<String>,
}

fn table_columns(conn: &Connection, table: &str) -> rusqlite::Result<Vec<Column>> {
    let autoincrement_table: bool = conn
        .query_row(
            "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name=?1 AND sql LIKE '%AUTOINCREMENT%')",
            [table],
            |r| r.get(0),
        )?;
    let mut statement = conn.prepare(&format!("PRAGMA main.table_info({table})"))?;
    let rows = statement.query_map([], |r| {
        let name: String = r.get(1)?;
        let default: Option<String> = r.get(4)?;
        let pk: i64 = r.get(5)?;
        Ok((name, default, pk))
    })?;
    let mut columns = Vec::new();
    for row in rows {
        let (name, default, pk) = row?;
        columns.push(Column {
            autoincrement: autoincrement_table && pk == 1,
            primary_key: pk > 0,
            name,
            default,
        });
    }
    Ok(columns)
}

/// Rows changed by the last statement, counting writes made by policy triggers.
/// `Connection::changes` reports 0 for a view, so callers use the total delta.
pub fn execute_counted<P: rusqlite::Params>(
    conn: &Connection,
    sql: &str,
    params: P,
) -> rusqlite::Result<u64> {
    let before = conn.total_changes();
    conn.execute(sql, params)?;
    Ok(conn.total_changes().saturating_sub(before))
}

/// Maps SQLite errors, turning policy and authorizer refusals into `Denied`.
pub fn db_error(error: rusqlite::Error) -> StoreError {
    db_error_ref(&error)
}

pub fn db_error_ref(error: &rusqlite::Error) -> StoreError {
    match error {
        rusqlite::Error::SqliteFailure(failure, message) => {
            if failure.code == rusqlite::ErrorCode::AuthorizationForStatementDenied
                || message.as_deref().is_some_and(|m| m.contains(DENIED))
            {
                StoreError::Denied
            } else {
                StoreError::Database
            }
        }
        _ => StoreError::Database,
    }
}
#[cfg(test)]
mod tests {
    use super::super::*;
    use super::*;

    fn token(store: &Store, principal: &str, pid: &str, scopes: Vec<Scope>) -> Identity {
        let t = store.issue_token(principal, pid, scopes, 3600).unwrap();
        store.authenticate(&t.access_token).unwrap()
    }
    fn rw() -> Vec<Scope> {
        vec![Scope::ProjectRead, Scope::ProjectWrite]
    }
    /// Two TLPS projects with one entity each, plus a second principal on project A.
    fn two_projects() -> (Store, Identity, Identity, Identity) {
        let store = Store::in_memory().unwrap();
        for p in ["alice", "bob", "carol"] {
            store.create_principal(p, p).unwrap();
        }
        let a = format!("prj:{}", Uuid::new_v4());
        let b = format!("prj:{}", Uuid::new_v4());
        let alice = token(&store, "alice", &a, rw());
        let bob = token(&store, "bob", &b, rw());
        let carol = token(&store, "carol", &a, rw());
        for (i, pid) in [(&alice, &a), (&bob, &b)] {
            store.create_project(i, &json!({"schema":PROJECT_SCHEMA,"projectId":pid,"title":"T","domain":"film-production","ownerApp":"tlps","currentVersion":0,"versions":[]})).unwrap();
            store
                .tlps_create(
                    i,
                    pid,
                    "circles",
                    &Uuid::new_v4().to_string(),
                    &json!({"name":"Circle","purpose":"Plan"}),
                )
                .unwrap();
        }
        (store, alice, bob, carol)
    }
    fn denied<T: std::fmt::Debug>(r: rusqlite::Result<T>) {
        match r {
            Err(e) => assert!(
                matches!(db_error(e), StoreError::Denied),
                "not a policy refusal"
            ),
            Ok(v) => panic!("allowed: {v:?}"),
        }
    }
    fn count(c: &Connection, sql: &str) -> i64 {
        c.query_row(sql, [], |r| r.get(0)).unwrap()
    }

    #[test]
    fn a_query_without_a_project_filter_still_sees_one_project() {
        let (store, alice, bob, _) = two_projects();
        let c = store.system().unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM tlps_entities"), 2);
        drop(c);
        let c = store.scoped(&alice).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_entities"), 1);
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_projects"), 1);
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_events"), 1);
        let other: i64 = c
            .query_row(
                "SELECT COUNT(*) FROM rls_tlps_entities WHERE project_id=?1",
                [&bob.project_id],
                |r| r.get(0),
            )
            .unwrap();
        assert_eq!(other, 0);
    }

    #[test]
    fn requests_cannot_name_base_or_system_tables_or_change_the_schema() {
        let (store, alice, _, _) = two_projects();
        let c = store.scoped(&alice).unwrap();
        for sql in [
            "SELECT COUNT(*) FROM tlps_entities",
            "SELECT COUNT(*) FROM projects",
            "SELECT COUNT(*) FROM access_tokens",
            "SELECT COUNT(*) FROM principals",
            "SELECT COUNT(*) FROM schema_migrations",
            "SELECT COUNT(*) FROM sqlite_master",
        ] {
            denied(c.query_row(sql, [], |r| r.get::<_, i64>(0)));
        }
        for sql in [
            "UPDATE tlps_entities SET version=version",
            "DELETE FROM tlps_links",
            "CREATE TABLE leak(x)",
            "CREATE TEMP VIEW rls_leak AS SELECT 1",
            "DROP VIEW rls_tlps_entities",
            "ATTACH DATABASE ':memory:' AS other",
            "PRAGMA foreign_keys=OFF",
        ] {
            denied(c.execute_batch(sql));
        }
        // Reference data stays readable.
        assert!(count(&c, "SELECT COUNT(*) FROM tlps_skus") > 0);
    }

    #[test]
    fn writes_cannot_cross_projects_move_rows_or_spoof_the_actor() {
        let (store, alice, bob, _) = two_projects();
        let c = store.scoped(&alice).unwrap();
        denied(c.execute(
            "INSERT INTO rls_tlps_entities(project_id,entity_id,kind,version,data_json,created_at,updated_at) VALUES(?1,'tlps:x','circles',1,'{}',1,1)",
            [&bob.project_id],
        ));
        denied(c.execute(
            "UPDATE rls_tlps_entities SET project_id=?1",
            [&bob.project_id],
        ));
        let id: String = c
            .query_row("SELECT entity_id FROM rls_tlps_entities", [], |r| r.get(0))
            .unwrap();
        denied(c.execute(
            "INSERT INTO rls_tlps_events(project_id,entity_id,kind,version,operation,actor,data_digest,recorded_at) VALUES(?1,?2,'circles',2,'updated','bob','d',1)",
            [&alice.project_id, &id],
        ));
        denied(c.execute(
            "INSERT INTO rls_project_events(event_id,project_id,project_version,actor,action,record_digest,recorded_at,time_basis) VALUES('e',?1,0,'bob','project.updated','d',1,'x')",
            [&alice.project_id],
        ));
        // Bob's rows are untouched.
        drop(c);
        let c = store.scoped(&bob).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_entities"), 1);
    }

    #[test]
    fn append_only_tables_refuse_updates_and_deletes_through_policy_views() {
        let (store, alice, _, _) = two_projects();
        let c = store.scoped(&alice).unwrap();
        for sql in [
            "UPDATE rls_tlps_events SET actor='alice'",
            "DELETE FROM rls_tlps_events",
            "UPDATE rls_project_events SET action='x'",
            "DELETE FROM rls_project_events",
            "DELETE FROM rls_tlps_entities",
            "DELETE FROM rls_projects",
        ] {
            assert!(c.execute_batch(sql).is_err(), "{sql} was allowed");
        }
    }

    #[test]
    fn read_only_tokens_cannot_write_and_receipts_are_private_to_their_principal() {
        let (store, alice, _, carol) = two_projects();
        let c = store.scoped(&alice).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_idempotency"), 1);
        drop(c);
        // Carol is on the same project but did not make Alice's request.
        let c = store.scoped(&carol).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_idempotency"), 0);
        drop(c);
        let reader = token(&store, "carol", &alice.project_id, vec![Scope::ProjectRead]);
        let c = store.scoped(&reader).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_entities"), 1);
        denied(c.execute("UPDATE rls_tlps_entities SET version=version+1", []));
        denied(c.execute(
            "INSERT INTO rls_tlps_links VALUES(?1,'a','b','circle')",
            [&reader.project_id],
        ));
    }

    #[test]
    fn pilot_roles_are_enforced_in_the_database() {
        let (store, alice, _, carol) = two_projects();
        let pid = alice.project_id.clone();
        store.pilot_member(&pid, "alice", "owner", true).unwrap();
        store.create_principal("dave", "dave").unwrap();
        store.pilot_member(&pid, "carol", "viewer", true).unwrap();
        // Non-member with a valid project token: sees nothing, writes nothing.
        let dave = token(&store, "dave", &pid, rw());
        let c = store.scoped(&dave).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_entities"), 0);
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_projects"), 0);
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_pilot_members"), 0);
        drop(c);
        // Viewer: reads, cannot write.
        let c = store.scoped(&carol).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_entities"), 1);
        denied(c.execute("UPDATE rls_tlps_entities SET version=version+1", []));
        denied(c.execute(
            "INSERT INTO rls_tlps_pilot_items VALUES(?1,'i','task',1,'{}','carol',1)",
            [&pid],
        ));
        drop(c);
        // Reviewer: may update profiles only, never other kinds.
        store.pilot_member(&pid, "carol", "reviewer", true).unwrap();
        let c = store.scoped(&carol).unwrap();
        denied(c.execute(
            "UPDATE rls_tlps_entities SET version=version+1 WHERE kind='circles'",
            [],
        ));
        drop(c);
        // Deactivation takes effect on the next request.
        store
            .pilot_member(&pid, "carol", "reviewer", false)
            .unwrap();
        let c = store.scoped(&carol).unwrap();
        assert_eq!(count(&c, "SELECT COUNT(*) FROM rls_tlps_entities"), 0);
    }

    #[test]
    fn sessions_end_locked_and_unscoped_connections_see_nothing() {
        let (store, alice, _, _) = two_projects();
        drop(store.scoped(&alice).unwrap());
        assert_eq!(*store.1.lock().unwrap(), Mode::Locked);
        let raw = store.0.lock().unwrap();
        for sql in [
            "SELECT COUNT(*) FROM tlps_entities",
            "SELECT COUNT(*) FROM rls_tlps_entities",
        ] {
            denied(raw.query_row(sql, [], |r| r.get::<_, i64>(0)));
        }
    }

    #[test]
    fn every_table_with_a_project_column_has_a_policy() {
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
        let covered: Vec<&str> = protected_tables().collect();
        for table in tables {
            let has_project: bool = c
                .query_row(
                    &format!("SELECT EXISTS(SELECT 1 FROM pragma_table_info('{table}') WHERE name='project_id')"),
                    [],
                    |r| r.get(0),
                )
                .unwrap();
            // access_tokens names a project but is credential data, and project_deletions is the
            // retention ledger; both are reachable only by the system session.
            if has_project && table != "access_tokens" && table != "project_deletions" {
                assert!(
                    covered.contains(&table.as_str()),
                    "{table} has project_id but no RLS policy"
                );
            }
        }
    }
}
