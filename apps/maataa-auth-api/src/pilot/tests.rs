use super::*;
fn setup() -> (Store, Identity, Identity, Identity, Identity) {
    let s = Store::in_memory().unwrap();
    for p in ["owner", "editor", "reviewer", "viewer"] {
        s.create_principal(p, p).unwrap();
    }
    let pid = format!("prj:{}", Uuid::new_v4());
    let identity = |p: &str| {
        let t = s
            .issue_token(p, &pid, vec![Scope::ProjectRead, Scope::ProjectWrite], 3600)
            .unwrap();
        s.authenticate(&t.access_token).unwrap()
    };
    let o = identity("owner");
    let e = identity("editor");
    let r = identity("reviewer");
    let v = identity("viewer");
    s.create_project(&o,&json!({"schema":PROJECT_SCHEMA,"projectId":pid,"title":"Team pilot","domain":"film-production","ownerApp":"tlps","currentVersion":0,"versions":[]})).unwrap();
    for (p, r) in [
        ("owner", "owner"),
        ("editor", "editor"),
        ("reviewer", "reviewer"),
        ("viewer", "viewer"),
    ] {
        s.pilot_member(&pid, p, r, true).unwrap();
    }
    (s, o, e, r, v)
}
fn profile(s: &Store, i: &Identity) -> Value {
    s.tlps_create(
        i,
        &i.project_id,
        "profiles",
        "profile",
        &json!({"title":"Film","stage":"idea"}),
    )
    .unwrap()
}
fn payload() -> Value {
    json!({"title":"Prepare","description":"Call the team","status":"open"})
}
#[test]
fn roles_control_normal_entity_writes() {
    let (s, o, e, r, v) = setup();
    for i in [&o, &e] {
        assert!(s
            .tlps_create(
                i,
                &i.project_id,
                "locations",
                &i.principal_id,
                &json!({"name":"Place"})
            )
            .is_ok());
    }
    for i in [&r, &v] {
        assert!(matches!(
            s.tlps_create(
                i,
                &i.project_id,
                "locations",
                &i.principal_id,
                &json!({"name":"Place"})
            ),
            Err(StoreError::Denied)
        ));
        assert!(s.tlps_list(i, &i.project_id, "locations", "", 100).is_ok());
    }
}
#[test]
fn last_owner_cannot_be_removed_or_demoted() {
    let (s, o, _, _, _) = setup();
    for (role, active) in [("owner", false), ("viewer", true)] {
        assert!(matches!(
            s.pilot_member(&o.project_id, "owner", role, active),
            Err(StoreError::Conflict)
        ));
        assert_eq!(s.pilot_session(&o).unwrap()["role"], "owner");
    }
}
#[test]
fn deactivated_member_loses_reads_and_writes_immediately() {
    let (s, o, e, _, _) = setup();
    s.pilot_member(&o.project_id, "editor", "editor", false)
        .unwrap();
    assert!(matches!(s.pilot_session(&e), Err(StoreError::Denied)));
    assert!(matches!(
        s.tlps_list(&e, &e.project_id, "locations", "", 10),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.pilot_save(&e, &Uuid::new_v4().to_string(), "task", 0, &payload()),
        Err(StoreError::Denied)
    ));
}
#[test]
fn managed_stage_cannot_be_written_or_deleted_through_generic_api() {
    let (s, o, _, _, _) = setup();
    assert!(matches!(
        s.tlps_create(
            &o,
            &o.project_id,
            "profiles",
            "bypass",
            &json!({"title":"Film","stage":"release"})
        ),
        Err(StoreError::Denied)
    ));
    let p = profile(&s, &o);
    let id = p["id"].as_str().unwrap();
    assert!(matches!(
        s.tlps_update(
            &o,
            &o.project_id,
            "profiles",
            id,
            1,
            &json!({"title":"Film","stage":"story"})
        ),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_delete(&o, &o.project_id, "profiles", id, 1),
        Err(StoreError::Denied)
    ));
}
#[test]
fn approval_requires_separate_reviewer_and_advances_only_one_stage() {
    let (s, o, e, r, v) = setup();
    let p = profile(&s, &o);
    let id = p["id"].as_str().unwrap();
    for i in [&o, &e, &v] {
        assert!(matches!(
            s.pilot_review(i, id, 1, "approved", "Checked"),
            Err(StoreError::Denied)
        ));
    }
    let receipt = s
        .pilot_review(&r, id, 1, "approved", "Profile checked")
        .unwrap();
    assert_eq!(receipt["stage"], "story");
    let p = s.tlps_read(&o, &o.project_id, "profiles", id).unwrap();
    assert_eq!(p["version"], 2);
    assert!(matches!(
        s.pilot_review(&r, id, 1, "approved", "Again"),
        Err(StoreError::Conflict)
    ));
    assert!(matches!(
        s.pilot_review(&r, id, 2, "approved", "Again"),
        Err(StoreError::Denied)
    ));
}
#[test]
fn returned_review_does_not_advance_or_increment_profile() {
    let (s, o, _, r, _) = setup();
    let p = profile(&s, &o);
    let id = p["id"].as_str().unwrap();
    s.pilot_review(&r, id, 1, "returned", "Missing details")
        .unwrap();
    assert_eq!(
        s.tlps_read(&o, &o.project_id, "profiles", id).unwrap()["version"],
        1
    );
    assert!(matches!(
        s.pilot_review(&r, id, 1, "returned", "duplicate"),
        Err(StoreError::Duplicate)
    ));
}
#[test]
fn stage_approval_is_not_cross_project() {
    let (s, o, _, r, _) = setup();
    let p = profile(&s, &o);
    let mut other = r.clone();
    other.project_id = format!("prj:{}", Uuid::new_v4());
    assert!(s
        .pilot_review(
            &other,
            p["id"].as_str().unwrap(),
            1,
            "approved",
            "Other project"
        )
        .is_err());
}
#[test]
fn all_three_work_item_kinds_persist_and_use_versions() {
    let (s, o, _, _, _) = setup();
    for kind in ["task", "milestone", "ticket"] {
        let id = Uuid::new_v4().to_string();
        assert_eq!(
            s.pilot_save(&o, &id, kind, 0, &payload()).unwrap()["version"],
            1
        );
        assert!(s.pilot_save(&o, &id, kind, 0, &payload()).is_err());
        let mut data = payload();
        data["status"] = json!("done");
        assert_eq!(s.pilot_save(&o, &id, kind, 1, &data).unwrap()["version"], 2);
        assert!(matches!(
            s.pilot_save(&o, &id, kind, 1, &payload()),
            Err(StoreError::Conflict)
        ));
    }
    assert_eq!(
        s.pilot_items(&o).unwrap()["items"]
            .as_array()
            .unwrap()
            .len(),
        3
    );
}
#[test]
fn payloads_reject_authority_claims_invalid_types_and_dates() {
    let (s, o, _, _, _) = setup();
    for data in [
        json!({"title":"Work","description":"Text","status":"approved"}),
        json!({"title":"Work","description":"Text","status":"open","actor":"owner"}),
        json!({"title":"Work","description":"Text","status":"open","dueDate":"2026-02-30"}),
        json!({"title":"Work","description":"Text","status":"open","releaseEnabled":true}),
    ] {
        assert!(matches!(
            s.pilot_save(&o, &Uuid::new_v4().to_string(), "task", 0, &data),
            Err(StoreError::Invalid)
        ));
    }
    for kind in ["payment", "escrow", "task "] {
        assert!(s
            .pilot_save(&o, &Uuid::new_v4().to_string(), kind, 0, &payload())
            .is_err());
    }
}
#[test]
fn team_audit_and_reviews_are_append_only() {
    let (s, o, _, r, _) = setup();
    let p = profile(&s, &o);
    s.pilot_review(&r, p["id"].as_str().unwrap(), 1, "returned", "Improve")
        .unwrap();
    let c = s.system().unwrap();
    for sql in [
        "DELETE FROM tlps_pilot_audit",
        "UPDATE tlps_pilot_audit SET action='forged'",
        "DELETE FROM tlps_pilot_reviews",
        "UPDATE tlps_pilot_reviews SET decision='approved'",
    ] {
        assert!(c.execute(sql, []).is_err());
    }
}
#[test]
fn pilot_schema_checksum_drift_is_rejected() {
    let (s, _, _, _, _) = setup();
    let c = s.system().unwrap();
    c.execute("UPDATE tlps_pilot_migrations SET checksum='modified'", [])
        .unwrap();
    assert!(matches!(migrate(&c), Err(StoreError::Invalid)));
}
#[test]
fn scopes_still_restrict_members() {
    let (s, mut o, _, r, _) = setup();
    let p = profile(&s, &o);
    o.scopes = vec![Scope::ProjectRead];
    assert!(!s.pilot_session(&o).unwrap()["writeEnabled"]
        .as_bool()
        .unwrap());
    assert!(matches!(
        s.pilot_save(&o, &Uuid::new_v4().to_string(), "task", 0, &payload()),
        Err(StoreError::Denied)
    ));
    let mut reviewer = r;
    reviewer.scopes = vec![Scope::ProjectRead];
    assert!(matches!(
        s.pilot_review(&reviewer, p["id"].as_str().unwrap(), 1, "approved", "Check"),
        Err(StoreError::Denied)
    ));
}
