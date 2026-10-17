//! Bounded administrator-provisioned team pilot. No public signup or financial authority.
use super::*;
use rusqlite::{Transaction, TransactionBehavior};
const SQL: &str = include_str!("../migrations/tlps-pilot-v1.sql");
pub(super) fn migrate(c: &Connection) -> Result<(), StoreError> {
    let tx = Transaction::new_unchecked(c, TransactionBehavior::Immediate)
        .map_err(|_| StoreError::Database)?;
    tx.execute_batch("CREATE TABLE IF NOT EXISTS tlps_pilot_migrations(version INTEGER PRIMARY KEY,checksum TEXT NOT NULL);").map_err(|_|StoreError::Database)?;
    let checksum = format!("{:x}", Sha256::digest(SQL.as_bytes()));
    let rows: Vec<(i64, String)> = {
        let mut q = tx
            .prepare("SELECT version,checksum FROM tlps_pilot_migrations ORDER BY version")
            .map_err(|_| StoreError::Database)?;
        let v = q
            .query_map([], |r| Ok((r.get(0)?, r.get(1)?)))
            .map_err(|_| StoreError::Database)?
            .collect::<Result<_, _>>()
            .map_err(|_| StoreError::Database)?;
        v
    };
    if rows.is_empty() {
        tx.execute_batch(SQL).map_err(|_| StoreError::Database)?;
        tx.execute("INSERT INTO tlps_pilot_migrations VALUES(1,?1)", [checksum])
            .map_err(|_| StoreError::Database)?;
    } else if rows != vec![(1, checksum)] {
        return Err(StoreError::Invalid);
    }
    tx.commit().map_err(|_| StoreError::Database)
}
fn db<T>(v: rusqlite::Result<T>) -> Result<T, StoreError> {
    v.map_err(super::rls::db_error)
}
/// Administrator path (system session): base tables, no request scope.
fn managed_system(c: &Connection, pid: &str) -> Result<bool, StoreError> {
    db(c.query_row(
        "SELECT EXISTS(SELECT 1 FROM tlps_pilot_projects WHERE project_id=?1)",
        [pid],
        |r| r.get(0),
    ))
}
fn log_system(
    c: &Connection,
    pid: &str,
    actor: &str,
    action: &str,
    details: Value,
) -> Result<(), StoreError> {
    db(c.execute("INSERT INTO tlps_pilot_audit(project_id,actor,action,details_json,recorded_at) VALUES(?1,?2,?3,?4,?5)",params![pid,actor,action,details.to_string(),now_unix_ms()]))?;
    Ok(())
}
pub(super) fn managed(c: &Connection, pid: &str) -> Result<bool, StoreError> {
    db(c.query_row(
        "SELECT EXISTS(SELECT 1 FROM rls_tlps_pilot_projects WHERE project_id=?1)",
        [pid],
        |r| r.get(0),
    ))
}
fn role(c: &Connection, i: &Identity) -> Result<String, StoreError> {
    db(c.query_row(
        "SELECT role FROM rls_tlps_pilot_members WHERE project_id=?1 AND principal_id=?2 AND active=1",
        params![i.project_id, i.principal_id],
        |r| r.get::<_, String>(0),
    )
    .optional())?
    .ok_or(StoreError::Denied)
}
pub(super) fn authorize(
    c: &Connection,
    i: &Identity,
    pid: &str,
    scope: Scope,
) -> Result<(), StoreError> {
    if !authorized(i, pid, scope.clone()) {
        return Err(StoreError::Denied);
    }
    if managed(c, pid)? {
        let r = role(c, i)?;
        if scope == Scope::ProjectWrite && !["owner", "editor"].contains(&r.as_str()) {
            return Err(StoreError::Denied);
        }
    }
    Ok(())
}
fn log(
    c: &Connection,
    pid: &str,
    actor: &str,
    action: &str,
    details: Value,
) -> Result<(), StoreError> {
    db(c.execute("INSERT INTO rls_tlps_pilot_audit(project_id,actor,action,details_json,recorded_at) VALUES(?1,?2,?3,?4,?5)",params![pid,actor,action,details.to_string(),now_unix_ms()]))?;
    Ok(())
}
fn text(v: &Value, k: &str, n: usize) -> bool {
    v[k].as_str()
        .is_some_and(|s| !s.trim().is_empty() && s.len() <= n && !s.contains('\0'))
}
impl Store {
    pub fn pilot_member(
        &self,
        pid: &str,
        principal: &str,
        r: &str,
        active: bool,
    ) -> Result<(), StoreError> {
        if !valid_project_id(pid) || !["owner", "editor", "reviewer", "viewer"].contains(&r) {
            return Err(StoreError::Invalid);
        }
        let c = self.system()?;
        let tx = Transaction::new_unchecked(&c, TransactionBehavior::Immediate)
            .map_err(|_| StoreError::Database)?;
        let owner: Option<String> = db(tx
            .query_row(
                "SELECT json_extract(record_json,'$.ownerApp') FROM projects WHERE project_id=?1",
                [pid],
                |r| r.get(0),
            )
            .optional())?;
        if owner.as_deref() != Some("tlps") {
            return Err(StoreError::Missing);
        }
        if !managed_system(&tx, pid)? {
            if r != "owner" || !active {
                return Err(StoreError::Invalid);
            }
            db(tx.execute(
                "INSERT INTO tlps_pilot_projects VALUES(?1,?2)",
                params![pid, now_unix_ms()],
            ))?;
        }
        db(tx.execute("INSERT INTO tlps_pilot_members VALUES(?1,?2,?3,?4) ON CONFLICT(project_id,principal_id) DO UPDATE SET role=excluded.role,active=excluded.active",params![pid,principal,r,active]))?;
        let owners:i64=db(tx.query_row("SELECT COUNT(*) FROM tlps_pilot_members WHERE project_id=?1 AND role='owner' AND active=1",[pid],|r|r.get(0)))?;
        if owners == 0 {
            return Err(StoreError::Conflict);
        }
        log_system(
            &tx,
            pid,
            "bootstrap-admin",
            "membership.changed",
            json!({"principalId":principal,"role":r,"active":active}),
        )?;
        tx.commit().map_err(|_| StoreError::Database)
    }
    pub fn pilot_session(&self, i: &Identity) -> Result<Value, StoreError> {
        let c = self.scoped(i)?;
        if !has_scope(i, Scope::ProjectRead) {
            return Err(StoreError::Denied);
        }
        if !managed(&c, &i.project_id)? {
            return Err(StoreError::Missing);
        }
        let r = role(&c, i)?;
        Ok(
            json!({"projectId":i.project_id,"principalId":i.principal_id,"role":r,"writeEnabled":(["owner","editor"].contains(&r.as_str())&&has_scope(i,Scope::ProjectWrite)),"reviewEnabled":(["owner","reviewer"].contains(&r.as_str())&&has_scope(i,Scope::ProjectWrite)),"provisioning":"administrator-issued-project-tokens"}),
        )
    }
    pub fn pilot_items(&self, i: &Identity) -> Result<Value, StoreError> {
        let c = self.scoped(i)?;
        authorize(&c, i, &i.project_id, Scope::ProjectRead)?;
        role(&c, i)?;
        let mut q=db(c.prepare("SELECT id,kind,version,data_json,created_by,updated_at FROM rls_tlps_pilot_items WHERE project_id=?1 ORDER BY updated_at,id LIMIT 500"))?;
        let items=db(q.query_map([&i.project_id],|r|{let raw:String=r.get(3)?;Ok(json!({"id":r.get::<_,String>(0)?,"kind":r.get::<_,String>(1)?,"version":r.get::<_,i64>(2)?,"data":serde_json::from_str::<Value>(&raw).unwrap_or(Value::Null),"createdBy":r.get::<_,String>(4)?,"updatedAt":r.get::<_,i64>(5)?}))}))?.collect::<Result<Vec<_>,_>>().map_err(|_|StoreError::Database)?;
        Ok(json!({"items":items}))
    }
    pub fn pilot_save(
        &self,
        i: &Identity,
        id: &str,
        kind: &str,
        version: i64,
        data: &Value,
    ) -> Result<Value, StoreError> {
        if !["task", "milestone", "ticket"].contains(&kind)
            || Uuid::parse_str(id)
                .map(|u| u.to_string() != id)
                .unwrap_or(true)
            || version < 0
            || !has_only_keys(data, &["title", "description", "status", "dueDate"])
            || !text(data, "title", 200)
            || !text(data, "description", 2048)
            || !["open", "in-progress", "done", "cancelled"]
                .contains(&data["status"].as_str().unwrap_or(""))
            || data
                .get("dueDate")
                .is_some_and(|d| !d.as_str().is_some_and(super::tlps::date))
        {
            return Err(StoreError::Invalid);
        }
        let c = self.scoped(i)?;
        let tx = Transaction::new_unchecked(&c, TransactionBehavior::Immediate)
            .map_err(|_| StoreError::Database)?;
        authorize(&tx, i, &i.project_id, Scope::ProjectWrite)?;
        role(&tx, i)?;
        if version == 0 {
            let n: i64 = db(tx.query_row(
                "SELECT COUNT(*) FROM rls_tlps_pilot_items WHERE project_id=?1",
                [&i.project_id],
                |r| r.get(0),
            ))?;
            if n >= 500 {
                return Err(StoreError::Conflict);
            }
            tx.execute(
                "INSERT INTO rls_tlps_pilot_items VALUES(?1,?2,?3,1,?4,?5,?6)",
                params![
                    i.project_id,
                    id,
                    kind,
                    data.to_string(),
                    i.principal_id,
                    now_unix_ms()
                ],
            )
            .map_err(map_sqlite_constraint)?;
        } else {
            let changed=db(super::rls::execute_counted(&tx,"UPDATE rls_tlps_pilot_items SET data_json=?1,version=version+1,updated_at=?2 WHERE project_id=?3 AND id=?4 AND kind=?5 AND version=?6",params![data.to_string(),now_unix_ms(),i.project_id,id,kind,version]))?;
            if changed != 1 {
                return Err(StoreError::Conflict);
            }
        }
        log(
            &tx,
            &i.project_id,
            &i.principal_id,
            "item.saved",
            json!({"id":id,"kind":kind,"version":version+1}),
        )?;
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(json!({"id":id,"kind":kind,"version":version+1,"data":data}))
    }
    pub fn pilot_review(
        &self,
        i: &Identity,
        id: &str,
        version: i64,
        decision: &str,
        note: &str,
    ) -> Result<Value, StoreError> {
        if !["approved", "returned"].contains(&decision)
            || !text(&json!({"note":note}), "note", 2048)
            || version < 1
        {
            return Err(StoreError::Invalid);
        }
        let c = self.scoped(i)?;
        let tx = Transaction::new_unchecked(&c, TransactionBehavior::Immediate)
            .map_err(|_| StoreError::Database)?;
        if !authorized(i, &i.project_id, Scope::ProjectWrite)
            || !["owner", "reviewer"].contains(&role(&tx, i)?.as_str())
        {
            return Err(StoreError::Denied);
        }
        let (raw,current):(String,i64)=db(tx.query_row("SELECT data_json,version FROM rls_tlps_entities WHERE project_id=?1 AND entity_id=?2 AND kind='profiles' AND deleted=0",params![i.project_id,id],|r|Ok((r.get(0)?,r.get(1)?))).optional())?.ok_or(StoreError::Missing)?;
        if current != version {
            return Err(StoreError::Conflict);
        }
        let last:String=db(tx.query_row("SELECT actor FROM rls_tlps_events WHERE project_id=?1 AND entity_id=?2 ORDER BY sequence DESC LIMIT 1",params![i.project_id,id],|r|r.get(0)))?;
        if last == i.principal_id {
            return Err(StoreError::Denied);
        }
        let mut data: Value = serde_json::from_str(&raw).map_err(|_| StoreError::Database)?;
        if decision == "approved" {
            let pos = tlps::STAGES
                .iter()
                .position(|s| Some(*s) == data["stage"].as_str())
                .ok_or(StoreError::Invalid)?;
            if pos + 1 == tlps::STAGES.len() {
                return Err(StoreError::Conflict);
            }
            data["stage"] = json!(tlps::STAGES[pos + 1]);
            db(tx.execute("UPDATE rls_tlps_entities SET data_json=?1,version=version+1,updated_at=?2 WHERE project_id=?3 AND entity_id=?4",params![data.to_string(),now_unix_ms(),i.project_id,id]))?;
            tlps::audit(&tx, i, id, "profiles", version + 1, "updated", &data)?;
        }
        let review_id = Uuid::new_v4().to_string();
        tx.execute(
            "INSERT INTO rls_tlps_pilot_reviews VALUES(?1,?2,?3,?4,?5,?6,?7,?8)",
            params![
                review_id,
                i.project_id,
                id,
                version,
                decision,
                note,
                i.principal_id,
                now_unix_ms()
            ],
        )
        .map_err(map_sqlite_constraint)?;
        log(
            &tx,
            &i.project_id,
            &i.principal_id,
            "stage.reviewed",
            json!({"profileId":id,"profileVersion":version,"decision":decision,"note":note}),
        )?;
        tx.commit().map_err(|_| StoreError::Database)?;
        Ok(
            json!({"id":review_id,"decision":decision,"profileVersion":version,"stage":data["stage"]}),
        )
    }
    pub fn pilot_history(&self, i: &Identity) -> Result<Value, StoreError> {
        let c = self.scoped(i)?;
        authorize(&c, i, &i.project_id, Scope::ProjectRead)?;
        role(&c, i)?;
        let mut q=db(c.prepare("SELECT sequence,actor,action,details_json,recorded_at FROM rls_tlps_pilot_audit WHERE project_id=?1 ORDER BY sequence DESC LIMIT 500"))?;
        let rows=db(q.query_map([&i.project_id],|r|Ok(json!({"sequence":r.get::<_,i64>(0)?,"actor":r.get::<_,String>(1)?,"action":r.get::<_,String>(2)?,"details":serde_json::from_str::<Value>(&r.get::<_,String>(3)?).unwrap_or(Value::Null),"recordedAt":r.get::<_,i64>(4)?}))))?.collect::<Result<Vec<_>,_>>().map_err(|_|StoreError::Database)?;
        Ok(json!({"items":rows}))
    }
}
pub(super) async fn route(
    req: Request<Incoming>,
    s: &Store,
    i: &Identity,
) -> Result<Response<Full<Bytes>>, (StatusCode, &'static str)> {
    let path = req.uri().path().to_owned();
    let method = req.method().clone();
    if req.uri().query().is_some() {
        return Err((StatusCode::BAD_REQUEST, "invalid-query"));
    }
    if method == Method::GET {
        let value = match path.as_str() {
            "/v1/tlps/pilot/session" => s.pilot_session(i),
            "/v1/tlps/pilot/items" => s.pilot_items(i),
            "/v1/tlps/pilot/history" => s.pilot_history(i),
            _ => return Err((StatusCode::NOT_FOUND, "not-found")),
        }
        .map_err(map_store_error)?;
        return Ok(json_response(StatusCode::OK, value));
    }
    if method != Method::POST {
        return Err((StatusCode::METHOD_NOT_ALLOWED, "method-not-allowed"));
    }
    if req
        .headers()
        .get(header::CONTENT_TYPE)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.split(';').next())
        != Some("application/json")
    {
        return Err((StatusCode::UNSUPPORTED_MEDIA_TYPE, "json-required"));
    }
    let b = read_json(req.into_body()).await?;
    let value = match path.as_str() {
        "/v1/tlps/pilot/items" if has_only_keys(&b, &["id", "kind", "version", "data"]) => s
            .pilot_save(
                i,
                b["id"].as_str().unwrap_or(""),
                b["kind"].as_str().unwrap_or(""),
                b["version"].as_i64().unwrap_or(-1),
                &b["data"],
            ),
        "/v1/tlps/pilot/review"
            if has_only_keys(&b, &["profileId", "version", "decision", "note"]) =>
        {
            s.pilot_review(
                i,
                b["profileId"].as_str().unwrap_or(""),
                b["version"].as_i64().unwrap_or(-1),
                b["decision"].as_str().unwrap_or(""),
                b["note"].as_str().unwrap_or(""),
            )
        }
        _ => return Err((StatusCode::BAD_REQUEST, "invalid-request")),
    }
    .map_err(map_store_error)?;
    Ok(json_response(StatusCode::OK, value))
}
#[cfg(test)]
mod tests;
