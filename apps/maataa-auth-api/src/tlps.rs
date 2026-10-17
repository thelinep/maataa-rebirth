//! Project-scoped TLPS persistence. No payment, investment execution or custody authority.
use super::*;
use rusqlite::Transaction;

const MIGRATION: &str = include_str!("../migrations/tlps-v1.sql");
const CATALOG: &str = include_str!("../migrations/tlps-skus-v1.json");
const WORKSPACES: &str = include_str!("../migrations/tlps-workspaces-v1.json");
pub const VERSION: i64 = 1;
pub const MAX_ENTITY_BYTES: usize = 8_192;
pub const MAX_PROJECT_ENTITIES: i64 = 1_000;
pub const COLLECTIONS: [&str; 12] = [
    "profiles",
    "onboarding",
    "workplace-records",
    "budget-items",
    "crew-assignments",
    "locations",
    "schedule-items",
    "evidence",
    "circles",
    "membership-plans",
    "investment-interests",
    "escrow-reviews",
];
pub const STAGES: [&str; 8] = [
    "idea",
    "story",
    "board",
    "pre",
    "production",
    "post",
    "release",
    "shree",
];
const AREAS: [&str; 20] = [
    "production-os",
    "film-os",
    "campaign-os",
    "atl",
    "btl",
    "ooh-dooh",
    "marketplace",
    "evidence-os",
    "finance-os",
    "investor-hub",
    "event-os",
    "wedding-os",
    "exhibition-spatial",
    "maataa-ai",
    "analytics",
    "core-platform",
    "casting",
    "crew",
    "location",
    "equipment-logistics",
];
const TIME: &str = "host-unix-clock-unverified";

pub fn capabilities() -> Value {
    json!({"schema":"tlps.api/1","schemaVersion":VERSION,"storage":"sqlite-local","collections":COLLECTIONS,"stages":STAGES,"areas":AREAS,"maxEntityBytes":MAX_ENTITY_BYTES,"maxProjectEntities":MAX_PROJECT_ENTITIES,"financialCapabilities":{"billing":false,"capitalCollection":false,"custody":false,"release":false,"refund":false},"bindingCommitments":false,"escrowBalance":null,"saptdhatuConversion":null})
}
/// The ledger row this build expects: version and checksum of schema, catalogue and workspaces.
pub(super) fn ledger() -> (i64, String) {
    (
        VERSION,
        format!(
            "{:x}",
            Sha256::digest(format!("{MIGRATION}\n{CATALOG}\n{WORKSPACES}").as_bytes())
        ),
    )
}
pub(super) fn migrate(conn: &Connection) -> Result<(), StoreError> {
    let tx = Transaction::new_unchecked(conn, rusqlite::TransactionBehavior::Immediate)
        .map_err(|_| StoreError::Database)?;
    tx.execute_batch("CREATE TABLE IF NOT EXISTS tlps_schema_migrations(version INTEGER PRIMARY KEY, checksum TEXT NOT NULL, applied_at INTEGER NOT NULL);").map_err(|_| StoreError::Database)?;
    let checksum = ledger().1;
    let rows: Vec<(i64, String)> = {
        let mut q = tx
            .prepare("SELECT version,checksum FROM tlps_schema_migrations ORDER BY version")
            .map_err(|_| StoreError::Database)?;
        let rows = q
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|_| StoreError::Database)?;
        rows.collect::<Result<_, _>>()
            .map_err(|_| StoreError::Database)?
    };
    if rows.is_empty() {
        tx.execute_batch(MIGRATION)
            .map_err(|_| StoreError::Database)?;
        let data: Value = serde_json::from_str(CATALOG).map_err(|_| StoreError::Invalid)?;
        for sku in data["records"].as_array().ok_or(StoreError::Invalid)? {
            tx.execute(
                "INSERT INTO tlps_skus(sku,data_json) VALUES(?1,?2)",
                params![
                    sku["sku"].as_str().ok_or(StoreError::Invalid)?,
                    sku.to_string()
                ],
            )
            .map_err(map_sqlite_constraint)?;
        }
        tx.execute(
            "INSERT INTO tlps_schema_migrations VALUES(1,?1,?2)",
            params![checksum, now_unix_ms()],
        )
        .map_err(|_| StoreError::Database)?;
    } else if rows != vec![(VERSION, checksum)] {
        return Err(StoreError::Invalid);
    }
    tx.commit().map_err(|_| StoreError::Database)
}
fn workspace_id(id: &str) -> bool {
    serde_json::from_str::<Vec<String>>(WORKSPACES)
        .ok()
        .is_some_and(|ids| ids.iter().any(|v| v == id))
}
fn valid_id(id: &str) -> bool {
    id.strip_prefix("tlps:")
        .and_then(|v| Uuid::parse_str(v).ok().map(|u| u.to_string() == v))
        .unwrap_or(false)
}
fn text(v: &Value, key: &str, max: usize, required: bool) -> bool {
    match v.get(key) {
        None => !required,
        Some(Value::String(s)) => {
            s.len() <= max && (!required || !s.trim().is_empty()) && !s.chars().any(|c| c == '\0')
        }
        _ => false,
    }
}
fn choice(v: &Value, key: &str, options: &[&str], required: bool) -> bool {
    match v.get(key) {
        None => !required,
        Some(Value::String(s)) => options.contains(&s.as_str()),
        _ => false,
    }
}
fn number(v: &Value, key: &str, min: i64, max: i64) -> bool {
    v.get(key)
        .and_then(Value::as_i64)
        .is_some_and(|n| (min..=max).contains(&n))
}
pub(super) fn date(s: &str) -> bool {
    if s.len() != 10 || s.as_bytes()[4] != b'-' || s.as_bytes()[7] != b'-' {
        return false;
    }
    let parts: Vec<_> = s.split('-').collect();
    if parts.len() != 3 || parts.iter().any(|x| !x.bytes().all(|b| b.is_ascii_digit())) {
        return false;
    }
    let (Ok(y), Ok(m), Ok(d)) = (
        parts[0].parse::<u32>(),
        parts[1].parse::<usize>(),
        parts[2].parse::<u32>(),
    ) else {
        return false;
    };
    let leap = y % 4 == 0 && (y % 100 != 0 || y % 400 == 0);
    let days = [
        31,
        if leap { 29 } else { 28 },
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    (1900..=2200).contains(&y) && (1..=12).contains(&m) && (1..=days[m - 1]).contains(&d)
}
/// Validates exact resource keys; permission/actor/version/capability fields cannot be supplied in data.
pub fn validate(kind: &str, data: &Value) -> Result<(), StoreError> {
    let Some(o) = data.as_object() else {
        return Err(StoreError::Invalid);
    };
    if data.to_string().len() > MAX_ENTITY_BYTES {
        return Err(StoreError::Invalid);
    }
    let allowed: &[&str] = match kind {
        "profiles" => &["title", "stage", "city"],
        "onboarding" => &["audience", "idea", "journey", "automation"],
        "workplace-records" => &["areaId", "workspaceId", "values", "status"],
        "budget-items" => &["label", "quantity", "unitAmountMinor", "currency"],
        "crew-assignments" => &["name", "role", "department", "notes"],
        "locations" => &["name", "city", "notes"],
        "schedule-items" => &["title", "date", "startMinute", "endMinute", "locationId"],
        "evidence" => &["title", "kind", "sourceRef", "sha256"],
        "circles" => &["name", "purpose", "coordinatorReference", "rules"],
        "membership-plans" => &["circleId", "name", "period", "benefits"],
        "investment-interests" => &["circleId", "partyReference", "terms"],
        "escrow-reviews" => &[
            "milestone",
            "condition",
            "evidenceReference",
            "reviewerReference",
            "disputeTerms",
        ],
        _ => return Err(StoreError::Invalid),
    };
    if o.keys().any(|k| !allowed.contains(&k.as_str())) {
        return Err(StoreError::Invalid);
    }
    let ok = match kind {
        "profiles" => {
            text(data, "title", 200, true)
                && choice(data, "stage", &STAGES, true)
                && text(data, "city", 200, false)
        }
        "onboarding" => {
            text(data, "audience", 200, true)
                && text(data, "idea", 2000, true)
                && choice(data, "journey", &["I2S", "I2R", "I2B", "undecided"], true)
                && choice(
                    data,
                    "automation",
                    &["guided", "assisted", "manual", "undecided"],
                    true,
                )
        }
        "workplace-records" => {
            choice(data, "areaId", &AREAS, true)
                && text(data, "workspaceId", 200, true)
                && data["workspaceId"].as_str().is_some_and(|s| {
                    workspace_id(s)
                        && s.bytes().all(|b| {
                            b.is_ascii_uppercase() || b.is_ascii_digit() || b == b'.' || b == b'_'
                        })
                })
                && choice(
                    data,
                    "status",
                    &["draft", "review", "rehearsal", "handover"],
                    true,
                )
                && data["values"].as_object().is_some_and(|v| {
                    !v.is_empty()
                        && v.len() <= 32
                        && v.iter().all(|(k, v)| {
                            !k.trim().is_empty()
                                && k.len() <= 64
                                && !["__proto__", "prototype", "constructor"].contains(&k.as_str())
                                && v.as_str()
                                    .is_some_and(|s| s.len() <= 2048 && !s.contains('\0'))
                        })
                })
        }
        "budget-items" => {
            text(data, "label", 200, true)
                && number(data, "quantity", 1, 100000)
                && number(data, "unitAmountMinor", 0, 1_000_000_000_000)
                && data["quantity"]
                    .as_i64()
                    .zip(data["unitAmountMinor"].as_i64())
                    .and_then(|(a, b)| a.checked_mul(b))
                    .is_some_and(|n| n <= 9_000_000_000_000_000)
                && choice(data, "currency", &["INR"], true)
        }
        "crew-assignments" => {
            text(data, "name", 200, true)
                && text(data, "role", 200, true)
                && text(data, "department", 200, false)
                && text(data, "notes", 2048, false)
        }
        "locations" => {
            text(data, "name", 200, true)
                && text(data, "city", 200, false)
                && text(data, "notes", 2048, false)
        }
        "schedule-items" => {
            text(data, "title", 200, true)
                && data["date"].as_str().is_some_and(date)
                && number(data, "startMinute", 0, 1439)
                && number(data, "endMinute", 1, 1440)
                && data["endMinute"].as_i64() > data["startMinute"].as_i64()
                && (!o.contains_key("locationId")
                    || data["locationId"].as_str().is_some_and(valid_id))
        }
        "evidence" => {
            text(data, "title", 200, true)
                && choice(
                    data,
                    "kind",
                    &["note", "checklist", "document", "image"],
                    true,
                )
                && text(data, "sourceRef", 2048, true)
                && (!o.contains_key("sha256") || data["sha256"].as_str().is_some_and(valid_sha256))
        }
        "circles" => {
            text(data, "name", 200, true)
                && text(data, "purpose", 2048, true)
                && text(data, "coordinatorReference", 200, false)
                && text(data, "rules", 2048, false)
        }
        "membership-plans" => {
            data["circleId"].as_str().is_some_and(valid_id)
                && text(data, "name", 200, true)
                && choice(data, "period", &["undecided", "monthly", "yearly"], true)
                && text(data, "benefits", 2048, true)
        }
        "investment-interests" => {
            data["circleId"].as_str().is_some_and(valid_id)
                && text(data, "partyReference", 200, true)
                && text(data, "terms", 2048, false)
        }
        "escrow-reviews" => {
            text(data, "milestone", 200, true)
                && text(data, "condition", 2048, true)
                && text(data, "evidenceReference", 2048, false)
                && text(data, "reviewerReference", 200, false)
                && text(data, "disputeTerms", 2048, false)
        }
        _ => false,
    };
    if ok {
        Ok(())
    } else {
        Err(StoreError::Invalid)
    }
}
/// Counted write through a policy view (see `rls::execute_counted`).
fn rls_count<P: rusqlite::Params>(conn: &Connection, sql: &str, params: P) -> Result<u64, StoreError> {
    super::rls::execute_counted(conn, sql, params).map_err(map_sqlite_constraint)
}
fn check(
    identity: &Identity,
    pid: &str,
    scope: Scope,
    conn: &Connection,
) -> Result<(), StoreError> {
    super::pilot::authorize(conn, identity, pid, scope.clone())?;
    if !authorized(identity, pid, scope) {
        return Err(StoreError::Denied);
    }
    let owner: Option<String> = conn
        .query_row(
            "SELECT json_extract(record_json,'$.ownerApp') FROM rls_projects WHERE project_id=?1",
            [pid],
            |r| r.get(0),
        )
        .optional()
        .map_err(|_| StoreError::Database)?;
    match owner.as_deref() {
        Some("tlps") => Ok(()),
        Some(_) => Err(StoreError::Denied),
        None => Err(StoreError::Missing),
    }
}
fn links<'a>(kind: &str, data: &'a Value) -> Vec<(&'static str, &'a str, &'static str)> {
    match kind {
        "membership-plans" | "investment-interests" => {
            vec![("circle", data["circleId"].as_str().unwrap_or(""), "circles")]
        }
        "schedule-items" => data["locationId"]
            .as_str()
            .map(|id| vec![("location", id, "locations")])
            .unwrap_or_default(),
        _ => vec![],
    }
}
fn set_links(
    tx: &Transaction<'_>,
    pid: &str,
    id: &str,
    kind: &str,
    data: &Value,
) -> Result<(), StoreError> {
    tx.execute(
        "DELETE FROM rls_tlps_links WHERE project_id=?1 AND source_id=?2",
        params![pid, id],
    )
    .map_err(|_| StoreError::Database)?;
    for (relation, target, target_kind) in links(kind, data) {
        let exists:bool=tx.query_row("SELECT EXISTS(SELECT 1 FROM rls_tlps_entities WHERE project_id=?1 AND entity_id=?2 AND kind=?3 AND deleted=0)",params![pid,target,target_kind],|r|r.get(0)).map_err(|_|StoreError::Database)?;
        if !exists {
            return Err(StoreError::Invalid);
        }
        tx.execute(
            "INSERT INTO rls_tlps_links VALUES(?1,?2,?3,?4)",
            params![pid, id, target, relation],
        )
        .map_err(map_sqlite_constraint)?;
    }
    Ok(())
}
fn envelope(
    pid: &str,
    id: &str,
    kind: &str,
    version: i64,
    data: Value,
    created: i64,
    updated: i64,
) -> Value {
    json!({"id":id,"projectId":pid,"kind":kind,"version":version,"data":data,"createdAt":created,"updatedAt":updated,"timeBasis":TIME})
}
fn row_value(row: &rusqlite::Row<'_>) -> rusqlite::Result<Value> {
    let raw: String = row.get(4)?;
    let data = serde_json::from_str(&raw).map_err(|e| {
        rusqlite::Error::FromSqlConversionFailure(4, rusqlite::types::Type::Text, Box::new(e))
    })?;
    Ok(envelope(
        &row.get::<_, String>(0)?,
        &row.get::<_, String>(1)?,
        &row.get::<_, String>(2)?,
        row.get(3)?,
        data,
        row.get(5)?,
        row.get(6)?,
    ))
}
const SELECT: &str =
    "SELECT project_id,entity_id,kind,version,data_json,created_at,updated_at FROM rls_tlps_entities";
fn read_entity(conn: &Connection, pid: &str, kind: &str, id: &str) -> Result<Value, StoreError> {
    conn.query_row(
        &format!("{SELECT} WHERE project_id=?1 AND kind=?2 AND entity_id=?3 AND deleted=0"),
        params![pid, kind, id],
        row_value,
    )
    .optional()
    .map_err(|_| StoreError::Database)?
    .ok_or(StoreError::Missing)
}
pub(super) fn audit(
    tx: &Transaction<'_>,
    identity: &Identity,
    id: &str,
    kind: &str,
    version: i64,
    operation: &str,
    data: &Value,
) -> Result<(), StoreError> {
    tx.execute("INSERT INTO rls_tlps_events(project_id,entity_id,kind,version,operation,actor,data_digest,recorded_at) VALUES(?1,?2,?3,?4,?5,?6,?7,?8)",params![identity.project_id,id,kind,version,operation,identity.principal_id,digest_json(data)?,now_unix_ms()]).map_err(|_|StoreError::Database)?;
    Ok(())
}
impl Store {
    pub fn tlps_create(
        &self,
        identity: &Identity,
        pid: &str,
        kind: &str,
        key: &str,
        data: &Value,
    ) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectWrite, &conn)?;
        validate(kind, data)?;
        if kind == "profiles" && super::pilot::managed(&conn, pid)? && data["stage"] != "idea" {
            return Err(StoreError::Denied);
        }
        if key.is_empty()
            || key.len() > 128
            || !key
                .bytes()
                .all(|b| b.is_ascii_alphanumeric() || b == b'-' || b == b'_')
        {
            return Err(StoreError::Invalid);
        }
        let tx = Transaction::new_unchecked(&conn, rusqlite::TransactionBehavior::Immediate)
            .map_err(|_| StoreError::Database)?;
        let digest = digest_json(&json!({"kind":kind,"data":data}))?;
        let previous:Option<(String,String)>=tx.query_row("SELECT request_digest,response_json FROM rls_tlps_idempotency WHERE project_id=?1 AND principal_id=?2 AND request_key=?3",params![pid,identity.principal_id,key],|r|Ok((r.get(0)?,r.get(1)?))).optional().map_err(|_|StoreError::Database)?;
        if let Some((old, response)) = previous {
            return if old == digest {
                serde_json::from_str(&response).map_err(|_| StoreError::Database)
            } else {
                Err(StoreError::Conflict)
            };
        }
        let count: i64 = tx
            .query_row(
                "SELECT COUNT(*) FROM rls_tlps_entities WHERE project_id=?1 AND deleted=0",
                [pid],
                |r| r.get(0),
            )
            .map_err(|_| StoreError::Database)?;
        if count >= MAX_PROJECT_ENTITIES {
            return Err(StoreError::Conflict);
        }
        let id = format!("tlps:{}", Uuid::new_v4());
        let now = now_unix_ms();
        tx.execute("INSERT INTO rls_tlps_entities(project_id,entity_id,kind,version,data_json,created_at,updated_at) VALUES(?1,?2,?3,1,?4,?5,?5)",params![pid,id,kind,data.to_string(),now]).map_err(map_sqlite_constraint)?;
        set_links(&tx, pid, &id, kind, data)?;
        audit(&tx, identity, &id, kind, 1, "created", data)?;
        let response = envelope(pid, &id, kind, 1, data.clone(), now, now);
        tx.execute(
            "INSERT INTO rls_tlps_idempotency VALUES(?1,?2,?3,?4,?5)",
            params![
                pid,
                identity.principal_id,
                key,
                digest,
                response.to_string()
            ],
        )
        .map_err(|_| StoreError::Database)?;
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(response)
    }
    pub fn tlps_read(
        &self,
        identity: &Identity,
        pid: &str,
        kind: &str,
        id: &str,
    ) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectRead, &conn)?;
        if !COLLECTIONS.contains(&kind) || !valid_id(id) {
            return Err(StoreError::Invalid);
        }
        read_entity(&conn, pid, kind, id)
    }
    pub fn tlps_list(
        &self,
        identity: &Identity,
        pid: &str,
        kind: &str,
        cursor: &str,
        limit: usize,
    ) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectRead, &conn)?;
        if !COLLECTIONS.contains(&kind)
            || !(1..=100).contains(&limit)
            || (!cursor.is_empty() && !valid_id(cursor))
        {
            return Err(StoreError::Invalid);
        }
        let mut q=conn.prepare(&format!("{SELECT} WHERE project_id=?1 AND kind=?2 AND deleted=0 AND entity_id>?3 ORDER BY entity_id LIMIT ?4")).map_err(|_|StoreError::Database)?;
        let rows = q
            .query_map(params![pid, kind, cursor, limit + 1], row_value)
            .map_err(|_| StoreError::Database)?;
        let mut items: Vec<Value> = rows
            .collect::<Result<_, _>>()
            .map_err(|_| StoreError::Database)?;
        let next = if items.len() > limit {
            items.pop();
            items.last().map(|v| v["id"].clone()).unwrap_or(Value::Null)
        } else {
            Value::Null
        };
        Ok(json!({"items":items,"nextCursor":next}))
    }
    pub fn tlps_update(
        &self,
        identity: &Identity,
        pid: &str,
        kind: &str,
        id: &str,
        expected: i64,
        data: &Value,
    ) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectWrite, &conn)?;
        validate(kind, data)?;
        if kind == "profiles" && super::pilot::managed(&conn, pid)? {
            let old = read_entity(&conn, pid, kind, id)?;
            if old["data"]["stage"] != data["stage"] {
                return Err(StoreError::Denied);
            }
        }
        if !valid_id(id) || expected < 1 || expected == i64::MAX {
            return Err(StoreError::Invalid);
        }
        let tx = Transaction::new_unchecked(&conn, rusqlite::TransactionBehavior::Immediate)
            .map_err(|_| StoreError::Database)?;
        let old = read_entity(&tx, pid, kind, id)?;
        if old["version"].as_i64() != Some(expected) {
            return Err(StoreError::Conflict);
        }
        set_links(&tx, pid, id, kind, data)?;
        let now = now_unix_ms();
        let changed=rls_count(&tx,"UPDATE rls_tlps_entities SET data_json=?1,version=version+1,updated_at=?2 WHERE project_id=?3 AND entity_id=?4 AND kind=?5 AND version=?6 AND deleted=0",params![data.to_string(),now,pid,id,kind,expected])?;
        if changed != 1 {
            return Err(StoreError::Conflict);
        }
        audit(&tx, identity, id, kind, expected + 1, "updated", data)?;
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(envelope(
            pid,
            id,
            kind,
            expected + 1,
            data.clone(),
            old["createdAt"].as_i64().ok_or(StoreError::Database)?,
            now,
        ))
    }
    pub fn tlps_delete(
        &self,
        identity: &Identity,
        pid: &str,
        kind: &str,
        id: &str,
        expected: i64,
    ) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectWrite, &conn)?;
        if kind == "profiles" && super::pilot::managed(&conn, pid)? {
            return Err(StoreError::Denied);
        }
        if !COLLECTIONS.contains(&kind) || !valid_id(id) || expected < 1 || expected == i64::MAX {
            return Err(StoreError::Invalid);
        }
        let tx = Transaction::new_unchecked(&conn, rusqlite::TransactionBehavior::Immediate)
            .map_err(|_| StoreError::Database)?;
        let old = read_entity(&tx, pid, kind, id)?;
        if old["version"].as_i64() != Some(expected) {
            return Err(StoreError::Conflict);
        }
        let referenced: bool = tx
            .query_row(
                "SELECT EXISTS(SELECT 1 FROM rls_tlps_links WHERE project_id=?1 AND target_id=?2)",
                params![pid, id],
                |r| r.get(0),
            )
            .map_err(|_| StoreError::Database)?;
        if referenced {
            return Err(StoreError::Conflict);
        }
        tx.execute(
            "DELETE FROM rls_tlps_links WHERE project_id=?1 AND source_id=?2",
            params![pid, id],
        )
        .map_err(|_| StoreError::Database)?;
        tx.execute("UPDATE rls_tlps_entities SET deleted=1,version=version+1,updated_at=?1 WHERE project_id=?2 AND entity_id=?3 AND version=?4",params![now_unix_ms(),pid,id,expected]).map_err(|_|StoreError::Database)?;
        audit(
            &tx,
            identity,
            id,
            kind,
            expected + 1,
            "deleted",
            &old["data"],
        )?;
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(json!({"id":id,"version":expected+1,"deleted":true}))
    }
    pub fn tlps_events(
        &self,
        identity: &Identity,
        pid: &str,
        after: i64,
        limit: usize,
    ) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectRead, &conn)?;
        if after < 0 || !(1..=100).contains(&limit) {
            return Err(StoreError::Invalid);
        }
        let mut q=conn.prepare("SELECT sequence,entity_id,kind,version,operation,actor,data_digest,recorded_at FROM rls_tlps_events WHERE project_id=?1 AND sequence>?2 ORDER BY sequence LIMIT ?3").map_err(|_|StoreError::Database)?;
        let rows=q.query_map(params![pid,after,limit+1],|r|Ok(json!({"sequence":r.get::<_,i64>(0)?,"entityId":r.get::<_,String>(1)?,"kind":r.get::<_,String>(2)?,"version":r.get::<_,i64>(3)?,"operation":r.get::<_,String>(4)?,"actor":r.get::<_,String>(5)?,"dataDigest":r.get::<_,String>(6)?,"recordedAt":r.get::<_,i64>(7)?,"timeBasis":TIME}))).map_err(|_|StoreError::Database)?;
        let mut items: Vec<Value> = rows
            .collect::<Result<_, _>>()
            .map_err(|_| StoreError::Database)?;
        let next = if items.len() > limit {
            items.pop();
            items
                .last()
                .map(|v| v["sequence"].clone())
                .unwrap_or(Value::Null)
        } else {
            Value::Null
        };
        Ok(json!({"items":items,"nextCursor":next}))
    }
    pub fn tlps_export(&self, identity: &Identity, pid: &str) -> Result<Value, StoreError> {
        let conn = self.scoped(identity)?;
        check(identity, pid, Scope::ProjectRead, &conn)?;
        let mut q = conn
            .prepare(&format!(
                "{SELECT} WHERE project_id=?1 AND deleted=0 ORDER BY kind,entity_id"
            ))
            .map_err(|_| StoreError::Database)?;
        let rows = q
            .query_map([pid], row_value)
            .map_err(|_| StoreError::Database)?;
        let items: Vec<Value> = rows
            .collect::<Result<_, _>>()
            .map_err(|_| StoreError::Database)?;
        Ok(
            json!({"schema":"tlps.project-export/1","projectId":pid,"entities":items,"capabilities":capabilities(),"kind":"planning-record-export","bindingCommitment":false,"escrowBalance":null}),
        )
    }
    pub fn tlps_catalog(&self, identity: &Identity) -> Result<Value, StoreError> {
        if !has_scope(identity, Scope::ProjectRead) {
            return Err(StoreError::Denied);
        }
        let conn = self.scoped(identity)?;
        let mut q = conn
            .prepare("SELECT data_json FROM tlps_skus ORDER BY sku")
            .map_err(|_| StoreError::Database)?;
        let rows = q
            .query_map([], |r| r.get::<_, String>(0))
            .map_err(|_| StoreError::Database)?;
        let records: Vec<Value> = rows
            .map(|r| {
                r.map_err(|_| StoreError::Database)
                    .and_then(|v| serde_json::from_str(&v).map_err(|_| StoreError::Database))
            })
            .collect::<Result<_, _>>()?;
        Ok(json!({"status":"draft","records":records,"checkoutEnabled":false}))
    }
}

fn decode_cursor(raw: &str) -> Result<String, (StatusCode, &'static str)> {
    let mut bytes = Vec::new();
    let mut iter = raw.bytes();
    while let Some(b) = iter.next() {
        if b == b'%' {
            let h = iter
                .next()
                .and_then(|b| (b as char).to_digit(16))
                .ok_or((StatusCode::BAD_REQUEST, "invalid-query"))?;
            let l = iter
                .next()
                .and_then(|b| (b as char).to_digit(16))
                .ok_or((StatusCode::BAD_REQUEST, "invalid-query"))?;
            bytes.push((h * 16 + l) as u8);
        } else {
            bytes.push(b);
        }
    }
    String::from_utf8(bytes).map_err(|_| (StatusCode::BAD_REQUEST, "invalid-query"))
}
fn expected_version(value: &str) -> Option<i64> {
    let digits = if value.starts_with('"') && value.ends_with('"') && value.len() >= 3 {
        &value[1..value.len() - 1]
    } else {
        value
    };
    if digits.is_empty() || !digits.bytes().all(|b| b.is_ascii_digit()) {
        return None;
    }
    digits.parse::<i64>().ok().filter(|v| *v > 0)
}
fn pagination(
    query: Option<&str>,
    events: bool,
) -> Result<(String, usize), (StatusCode, &'static str)> {
    let mut cursor = String::new();
    let mut limit = 50;
    let mut seen = std::collections::HashSet::new();
    for part in query.unwrap_or("").split('&').filter(|s| !s.is_empty()) {
        let (key, value) = part
            .split_once('=')
            .ok_or((StatusCode::BAD_REQUEST, "invalid-query"))?;
        if !seen.insert(key) {
            return Err((StatusCode::BAD_REQUEST, "invalid-query"));
        }
        match key {
            "limit" => {
                limit = value
                    .parse()
                    .map_err(|_| (StatusCode::BAD_REQUEST, "invalid-query"))?
            }
            "cursor" if !events => cursor = decode_cursor(value)?,
            "after" if events => cursor = decode_cursor(value)?,
            _ => return Err((StatusCode::BAD_REQUEST, "invalid-query")),
        }
    }
    if !(1..=100).contains(&limit) {
        return Err((StatusCode::BAD_REQUEST, "invalid-query"));
    }
    Ok((cursor, limit))
}
pub(super) async fn route(
    req: Request<Incoming>,
    store: &Store,
    identity: &Identity,
) -> Result<Response<Full<Bytes>>, (StatusCode, &'static str)> {
    let method = req.method().clone();
    let path = req.uri().path().to_owned();
    if matches!(method, Method::POST | Method::PUT)
        && req
            .headers()
            .get(header::CONTENT_TYPE)
            .and_then(|v| v.to_str().ok())
            .and_then(|s| s.split(';').next())
            .map(str::trim)
            != Some("application/json")
    {
        return Err((StatusCode::UNSUPPORTED_MEDIA_TYPE, "json-required"));
    }
    if req.uri().query().is_some()
        && (method != Method::GET
            || path.ends_with("/capabilities")
            || path.ends_with("/skus")
            || path.ends_with("/export")
            || path.split('/').count() == 7)
    {
        return Err((StatusCode::BAD_REQUEST, "invalid-query"));
    }
    if method == Method::GET && path == "/v1/tlps/capabilities" {
        if !has_scope(identity, Scope::ProjectRead) {
            return Err((StatusCode::FORBIDDEN, "forbidden"));
        }
        return Ok(json_response(StatusCode::OK, capabilities()));
    }
    if method == Method::GET && path == "/v1/tlps/skus" {
        return Ok(json_response(
            StatusCode::OK,
            store.tlps_catalog(identity).map_err(map_store_error)?,
        ));
    }
    let parts: Vec<_> = path.split('/').collect();
    if parts.len() < 6 || parts[1..4] != ["v1", "tlps", "projects"] || !valid_project_id(parts[4]) {
        return Err((StatusCode::NOT_FOUND, "not-found"));
    }
    let pid = parts[4];
    let kind = parts[5];
    if parts.len() == 6 && method == Method::GET {
        if kind == "export" {
            return Ok(json_response(
                StatusCode::OK,
                store.tlps_export(identity, pid).map_err(map_store_error)?,
            ));
        }
        if kind == "events" {
            let (cursor, limit) = pagination(req.uri().query(), true)?;
            let after = if cursor.is_empty() {
                0
            } else {
                cursor
                    .parse::<i64>()
                    .map_err(|_| (StatusCode::BAD_REQUEST, "invalid-query"))?
            };
            return Ok(json_response(
                StatusCode::OK,
                store
                    .tlps_events(identity, pid, after, limit)
                    .map_err(map_store_error)?,
            ));
        }
        if !COLLECTIONS.contains(&kind) {
            return Err((StatusCode::NOT_FOUND, "not-found"));
        }
        let (cursor, limit) = pagination(req.uri().query(), false)?;
        return Ok(json_response(
            StatusCode::OK,
            store
                .tlps_list(identity, pid, kind, &cursor, limit)
                .map_err(map_store_error)?,
        ));
    }
    if !COLLECTIONS.contains(&kind) || !(6..=7).contains(&parts.len()) {
        return Err((StatusCode::NOT_FOUND, "not-found"));
    }
    if parts.len() == 7 && method == Method::GET {
        return Ok(json_response(
            StatusCode::OK,
            store
                .tlps_read(identity, pid, kind, parts[6])
                .map_err(map_store_error)?,
        ));
    }
    if (parts.len() == 6 && method != Method::POST)
        || (parts.len() == 7 && method != Method::PUT && method != Method::DELETE)
    {
        return Err((StatusCode::METHOD_NOT_ALLOWED, "method-not-allowed"));
    }
    if !authorized(identity, pid, Scope::ProjectWrite) {
        return Err((StatusCode::FORBIDDEN, "forbidden"));
    }
    if parts.len() == 7 {
        let expected = req
            .headers()
            .get("if-match")
            .and_then(|h| h.to_str().ok())
            .and_then(expected_version)
            .ok_or((StatusCode::PRECONDITION_REQUIRED, "if-match-required"))?;
        if method == Method::DELETE {
            return Ok(json_response(
                StatusCode::OK,
                store
                    .tlps_delete(identity, pid, kind, parts[6], expected)
                    .map_err(map_store_error)?,
            ));
        }
        let body = read_json(req.into_body()).await?;
        if !has_only_keys(&body, &["data"]) || body.get("data").is_none() {
            return Err((StatusCode::BAD_REQUEST, "invalid-request"));
        }
        return Ok(json_response(
            StatusCode::OK,
            store
                .tlps_update(identity, pid, kind, parts[6], expected, &body["data"])
                .map_err(map_store_error)?,
        ));
    }
    let key = req
        .headers()
        .get("idempotency-key")
        .and_then(|v| v.to_str().ok())
        .filter(|s| !s.is_empty())
        .ok_or((
            StatusCode::PRECONDITION_REQUIRED,
            "idempotency-key-required",
        ))?
        .to_owned();
    let body = read_json(req.into_body()).await?;
    if !has_only_keys(&body, &["data"]) || body.get("data").is_none() {
        return Err((StatusCode::BAD_REQUEST, "invalid-request"));
    }
    Ok(json_response(
        StatusCode::CREATED,
        store
            .tlps_create(identity, pid, kind, &key, &body["data"])
            .map_err(map_store_error)?,
    ))
}

#[cfg(test)]
mod tests;
