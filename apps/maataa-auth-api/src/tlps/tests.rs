use super::*;
use std::sync::{Arc, Barrier};

fn project(store: &Store, principal: &str) -> Identity {
    let pid = format!("prj:{}", Uuid::new_v4());
    let issued = store
        .issue_token(
            principal,
            &pid,
            vec![Scope::ProjectRead, Scope::ProjectWrite],
            3600,
        )
        .unwrap();
    let identity = store.authenticate(&issued.access_token).unwrap();
    store.create_project(&identity,&json!({"schema":PROJECT_SCHEMA,"projectId":pid,"title":"Test production","domain":"film-production","ownerApp":"tlps","currentVersion":0,"versions":[]})).unwrap();
    identity
}
fn setup() -> (Store, Identity) {
    let store = Store::in_memory().unwrap();
    store.create_principal("owner", "Test owner").unwrap();
    let identity = project(&store, "owner");
    (store, identity)
}
fn create(store: &Store, i: &Identity, kind: &str, data: &Value) -> Value {
    store
        .tlps_create(i, &i.project_id, kind, &Uuid::new_v4().to_string(), data)
        .unwrap()
}
fn circle(store: &Store, i: &Identity) -> Value {
    create(
        store,
        i,
        "circles",
        &json!({"name":"Circle","purpose":"Review proposals"}),
    )
}
fn fixture(kind: &str, store: &Store, i: &Identity) -> Value {
    match kind {
        "profiles" => json!({"title":"Project","stage":"idea","city":"Dehradun"}),
        "onboarding" => {
            json!({"audience":"producer","idea":"An original story","journey":"I2S","automation":"guided"})
        }
        "workplace-records" => {
            json!({"areaId":"production-os","workspaceId":"WORKSPACE.TLPS_PRODUCTION.PRODUCTION","values":{"title":"Brief"},"status":"draft"})
        }
        "budget-items" => {
            json!({"label":"Camera estimate","quantity":2,"unitAmountMinor":12345,"currency":"INR"})
        }
        "crew-assignments" => {
            json!({"name":"Crew reference","role":"Producer","notes":"Planning only"})
        }
        "locations" => json!({"name":"Location reference","city":"Dehradun"}),
        "schedule-items" => {
            json!({"title":"Prep","date":"2028-02-29","startMinute":480,"endMinute":1080})
        }
        "evidence" => {
            json!({"title":"Checklist","kind":"document","sourceRef":"local:checklist","sha256":format!("sha256:{}","a".repeat(64))})
        }
        "circles" => json!({"name":"Circle","purpose":"Discuss projects"}),
        "membership-plans" => {
            json!({"circleId":circle(store,i)["id"],"name":"Membership","period":"undecided","benefits":"Document discussion"})
        }
        "investment-interests" => {
            json!({"circleId":circle(store,i)["id"],"partyReference":"Prospective participant","terms":"Non-binding"})
        }
        "escrow-reviews" => {
            json!({"milestone":"Pre-production","condition":"Documents reviewed","disputeTerms":"Provider and signed terms required"})
        }
        _ => panic!("Unknown fixture"),
    }
}
macro_rules! crud {
    ($name:ident,$kind:literal) => {
        #[test]
        fn $name() {
            let (s, i) = setup();
            let data = fixture($kind, &s, &i);
            let made = create(&s, &i, $kind, &data);
            let id = made["id"].as_str().unwrap();
            assert_eq!(made["version"], 1);
            assert_eq!(made["data"], data);
            assert_eq!(made["projectId"], i.project_id);
            assert!(made["createdAt"].as_i64().unwrap() > LEGACY_SECONDS_BELOW);
            assert_eq!(s.tlps_read(&i, &i.project_id, $kind, id).unwrap(), made);
            let list = s.tlps_list(&i, &i.project_id, $kind, "", 100).unwrap();
            assert!(list["items"]
                .as_array()
                .unwrap()
                .iter()
                .any(|v| v["id"] == id));
            let updated = s
                .tlps_update(&i, &i.project_id, $kind, id, 1, &data)
                .unwrap();
            assert_eq!(updated["version"], 2);
            assert_eq!(updated["createdAt"], made["createdAt"]);
            assert!(matches!(
                s.tlps_update(&i, &i.project_id, $kind, id, 1, &data),
                Err(StoreError::Conflict)
            ));
            assert!(matches!(
                s.tlps_delete(&i, &i.project_id, $kind, id, 1),
                Err(StoreError::Conflict)
            ));
            assert_eq!(
                s.tlps_delete(&i, &i.project_id, $kind, id, 2).unwrap()["version"],
                3
            );
            assert!(matches!(
                s.tlps_read(&i, &i.project_id, $kind, id),
                Err(StoreError::Missing)
            ));
            let events = s.tlps_events(&i, &i.project_id, 0, 100).unwrap();
            let events: Vec<_> = events["items"]
                .as_array()
                .unwrap()
                .iter()
                .filter(|v| v["entityId"] == id)
                .collect();
            assert_eq!(events.len(), 3);
            assert_eq!(events[2]["operation"], "deleted");
        }
    };
}
crud!(profile_roundtrip, "profiles");
crud!(onboarding_roundtrip, "onboarding");
crud!(workplace_roundtrip, "workplace-records");
crud!(budget_roundtrip, "budget-items");
crud!(crew_roundtrip, "crew-assignments");
crud!(location_roundtrip, "locations");
crud!(schedule_roundtrip, "schedule-items");
crud!(evidence_roundtrip, "evidence");
crud!(circle_roundtrip, "circles");
crud!(membership_roundtrip, "membership-plans");
crud!(interest_roundtrip, "investment-interests");
crud!(escrow_roundtrip, "escrow-reviews");

#[test]
fn permissions_block_readers_and_writers_in_wrong_direction() {
    let (s, i) = setup();
    let data = fixture("locations", &s, &i);
    let record = create(&s, &i, "locations", &data);
    let id = record["id"].as_str().unwrap();
    let mut reader = i.clone();
    reader.scopes = vec![Scope::ProjectRead];
    let mut writer = i.clone();
    writer.scopes = vec![Scope::ProjectWrite];
    assert!(matches!(
        s.tlps_create(&reader, &i.project_id, "locations", "x", &data),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_update(&reader, &i.project_id, "locations", id, 1, &data),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_delete(&reader, &i.project_id, "locations", id, 1),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_read(&writer, &i.project_id, "locations", id),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_list(&writer, &i.project_id, "locations", "", 10),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_export(&writer, &i.project_id),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_events(&writer, &i.project_id, 0, 10),
        Err(StoreError::Denied)
    ));
    assert!(matches!(s.tlps_catalog(&writer), Err(StoreError::Denied)));
}
#[test]
fn project_boundaries_cover_every_operation() {
    let (s, i) = setup();
    let other = project(&s, "owner");
    let data = fixture("locations", &s, &i);
    let record = create(&s, &i, "locations", &data);
    let id = record["id"].as_str().unwrap();
    assert!(matches!(
        s.tlps_read(&other, &i.project_id, "locations", id),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_create(&other, &i.project_id, "locations", "x", &data),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_update(&other, &i.project_id, "locations", id, 1, &data),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_delete(&other, &i.project_id, "locations", id, 1),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_list(&other, &i.project_id, "locations", "", 10),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_events(&other, &i.project_id, 0, 10),
        Err(StoreError::Denied)
    ));
    assert!(matches!(
        s.tlps_export(&other, &i.project_id),
        Err(StoreError::Denied)
    ));
    assert_eq!(
        s.tlps_list(&other, &other.project_id, "locations", "", 10)
            .unwrap()["items"],
        json!([])
    );
}
#[test]
fn missing_and_non_tlps_projects_are_rejected() {
    let (s, i) = setup();
    let mut absent = i.clone();
    absent.project_id = format!("prj:{}", Uuid::new_v4());
    assert!(matches!(
        s.tlps_list(&absent, &absent.project_id, "circles", "", 10),
        Err(StoreError::Missing)
    ));
    {
        let conn = s.0.lock().unwrap();
        conn.execute("UPDATE projects SET record_json=json_set(record_json,'$.ownerApp','maataa') WHERE project_id=?1",[&i.project_id]).unwrap();
    }
    assert!(matches!(
        s.tlps_list(&i, &i.project_id, "circles", "", 10),
        Err(StoreError::Denied)
    ));
}
#[test]
fn idempotency_is_atomic_and_bound_to_principal_project_and_payload() {
    let (s, i) = setup();
    let data = fixture("locations", &s, &i);
    let first = s
        .tlps_create(&i, &i.project_id, "locations", "stable-key", &data)
        .unwrap();
    assert_eq!(
        s.tlps_create(&i, &i.project_id, "locations", "stable-key", &data)
            .unwrap(),
        first
    );
    assert_eq!(
        s.tlps_events(&i, &i.project_id, 0, 100).unwrap()["items"]
            .as_array()
            .unwrap()
            .len(),
        1
    );
    assert!(matches!(
        s.tlps_create(
            &i,
            &i.project_id,
            "locations",
            "stable-key",
            &json!({"name":"Changed"})
        ),
        Err(StoreError::Conflict)
    ));
    let other = project(&s, "owner");
    assert_ne!(
        s.tlps_create(&other, &other.project_id, "locations", "stable-key", &data)
            .unwrap()["id"],
        first["id"]
    );
    s.create_principal("other", "Other").unwrap();
    let issued = s
        .issue_token("other", &i.project_id, vec![Scope::ProjectWrite], 3600)
        .unwrap();
    let second = s.authenticate(&issued.access_token).unwrap();
    assert_ne!(
        s.tlps_create(&second, &i.project_id, "locations", "stable-key", &data)
            .unwrap()["id"],
        first["id"]
    );
}
#[test]
fn failed_reference_write_does_not_consume_request_key_or_leave_rows() {
    let (s, i) = setup();
    let bad = json!({"circleId":format!("tlps:{}",Uuid::new_v4()),"name":"Plan","period":"monthly","benefits":"Read documents"});
    assert!(matches!(
        s.tlps_create(&i, &i.project_id, "membership-plans", "retry-key", &bad),
        Err(StoreError::Invalid)
    ));
    assert_eq!(
        s.tlps_list(&i, &i.project_id, "membership-plans", "", 10)
            .unwrap()["items"],
        json!([])
    );
    let good = fixture("membership-plans", &s, &i);
    assert!(s
        .tlps_create(&i, &i.project_id, "membership-plans", "retry-key", &good)
        .is_ok());
}
#[test]
fn cross_project_and_wrong_kind_circle_links_are_rejected() {
    let (s, i) = setup();
    let other = project(&s, "owner");
    let wrong = circle(&s, &other);
    let loc = create(&s, &i, "locations", &json!({"name":"Place"}));
    for id in [&wrong["id"], &loc["id"]] {
        let data = json!({"circleId":id,"name":"Plan","period":"yearly","benefits":"Review"});
        assert!(matches!(
            s.tlps_create(&i, &i.project_id, "membership-plans", "bad-link", &data),
            Err(StoreError::Invalid)
        ));
    }
}
#[test]
fn referenced_circles_cannot_be_deleted_until_children_are_deleted() {
    let (s, i) = setup();
    let data = fixture("membership-plans", &s, &i);
    let member = create(&s, &i, "membership-plans", &data);
    let cid = data["circleId"].as_str().unwrap();
    assert!(matches!(
        s.tlps_delete(&i, &i.project_id, "circles", cid, 1),
        Err(StoreError::Conflict)
    ));
    s.tlps_delete(
        &i,
        &i.project_id,
        "membership-plans",
        member["id"].as_str().unwrap(),
        1,
    )
    .unwrap();
    assert!(s.tlps_delete(&i, &i.project_id, "circles", cid, 1).is_ok());
}
#[test]
fn schedule_links_require_same_project_active_location() {
    let (s, i) = setup();
    let loc = create(&s, &i, "locations", &json!({"name":"Place"}));
    let mut data = fixture("schedule-items", &s, &i);
    data["locationId"] = loc["id"].clone();
    let schedule = create(&s, &i, "schedule-items", &data);
    assert!(matches!(
        s.tlps_delete(
            &i,
            &i.project_id,
            "locations",
            loc["id"].as_str().unwrap(),
            1
        ),
        Err(StoreError::Conflict)
    ));
    data.as_object_mut().unwrap().remove("locationId");
    s.tlps_update(
        &i,
        &i.project_id,
        "schedule-items",
        schedule["id"].as_str().unwrap(),
        1,
        &data,
    )
    .unwrap();
    s.tlps_delete(
        &i,
        &i.project_id,
        "locations",
        loc["id"].as_str().unwrap(),
        1,
    )
    .unwrap();
    data["locationId"] = loc["id"].clone();
    assert!(s
        .tlps_update(
            &i,
            &i.project_id,
            "schedule-items",
            schedule["id"].as_str().unwrap(),
            2,
            &data
        )
        .is_err());
}
#[test]
fn audit_failure_rolls_back_entity_link_and_idempotency_changes() {
    let (s, i) = setup();
    {
        let c = s.0.lock().unwrap();
        c.execute_batch("CREATE TRIGGER force_audit_failure BEFORE INSERT ON tlps_events BEGIN SELECT RAISE(ABORT,'test failure'); END;").unwrap();
    }
    let data = fixture("locations", &s, &i);
    assert!(matches!(
        s.tlps_create(&i, &i.project_id, "locations", "atomic", &data),
        Err(StoreError::Database)
    ));
    assert_eq!(
        s.tlps_list(&i, &i.project_id, "locations", "", 10).unwrap()["items"],
        json!([])
    );
    let c = s.0.lock().unwrap();
    let keys: i64 = c
        .query_row("SELECT count(*) FROM tlps_idempotency", [], |r| r.get(0))
        .unwrap();
    assert_eq!(keys, 0);
}
#[test]
fn events_are_append_only_and_exclude_record_bodies() {
    let (s, i) = setup();
    let data = json!({"name":"Sensitive reference","purpose":"PRIVATE_PAYLOAD"});
    create(&s, &i, "circles", &data);
    let events = s.tlps_events(&i, &i.project_id, 0, 10).unwrap();
    assert!(!events.to_string().contains("PRIVATE_PAYLOAD"));
    assert_eq!(events["items"][0]["actor"], "owner");
    let c = s.0.lock().unwrap();
    assert!(c.execute("DELETE FROM tlps_events", []).is_err());
    assert!(c
        .execute("UPDATE tlps_events SET actor='other'", [])
        .is_err());
}
#[test]
fn entity_and_event_pagination_do_not_duplicate_or_leak_projects() {
    let (s, i) = setup();
    for n in 0..7 {
        create(&s, &i, "locations", &json!({"name":format!("Place {n}")}));
    }
    let other = project(&s, "owner");
    create(&s, &other, "locations", &json!({"name":"Hidden"}));
    let mut ids = Vec::new();
    let mut cursor = String::new();
    loop {
        let page = s
            .tlps_list(&i, &i.project_id, "locations", &cursor, 2)
            .unwrap();
        ids.extend(
            page["items"]
                .as_array()
                .unwrap()
                .iter()
                .map(|v| v["id"].as_str().unwrap().to_owned()),
        );
        if let Some(next) = page["nextCursor"].as_str() {
            cursor = next.into()
        } else {
            break;
        }
    }
    assert_eq!(ids.len(), 7);
    ids.sort();
    ids.dedup();
    assert_eq!(ids.len(), 7);
    let first = s.tlps_events(&i, &i.project_id, 0, 3).unwrap();
    assert_eq!(first["items"].as_array().unwrap().len(), 3);
    let next = first["nextCursor"].as_i64().unwrap();
    assert_eq!(
        s.tlps_events(&i, &i.project_id, next, 10).unwrap()["items"]
            .as_array()
            .unwrap()
            .len(),
        4
    );
}
#[test]
fn singleton_profiles_and_onboarding_are_unique_but_recreatable_after_tombstone() {
    let (s, i) = setup();
    for kind in ["profiles", "onboarding"] {
        let data = fixture(kind, &s, &i);
        let r = create(&s, &i, kind, &data);
        assert!(matches!(
            s.tlps_create(&i, &i.project_id, kind, "duplicate", &data),
            Err(StoreError::Duplicate)
        ));
        s.tlps_delete(&i, &i.project_id, kind, r["id"].as_str().unwrap(), 1)
            .unwrap();
        assert!(s
            .tlps_create(
                &i,
                &i.project_id,
                kind,
                &format!("replacement-{kind}"),
                &data
            )
            .is_ok());
    }
}
#[test]
fn data_survives_reopening_and_migration_is_idempotent() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("api.sqlite3");
    let path = path.to_str().unwrap();
    let s = Store::open(path).unwrap();
    s.create_principal("owner", "Owner").unwrap();
    let i = project(&s, "owner");
    let r = create(
        &s,
        &i,
        "circles",
        &json!({"name":"Persistent","purpose":"Test"}),
    );
    drop(s);
    let reopened = Store::open(path).unwrap();
    assert_eq!(reopened.schema_version().unwrap(), 3);
    assert_eq!(
        reopened
            .tlps_read(&i, &i.project_id, "circles", r["id"].as_str().unwrap())
            .unwrap(),
        r
    );
    let c = reopened.0.lock().unwrap();
    let count: i64 = c
        .query_row("SELECT count(*) FROM tlps_schema_migrations", [], |r| {
            r.get(0)
        })
        .unwrap();
    assert_eq!(count, 1);
}
#[test]
fn legacy_database_migration_retains_projects_and_other_tables() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("api.sqlite3");
    let path = path.to_str().unwrap();
    let s = Store::open(path).unwrap();
    s.create_principal("owner", "Owner").unwrap();
    let i = project(&s, "owner");
    {
        let c = s.0.lock().unwrap();
        c.execute_batch("DROP TABLE tlps_idempotency;DROP TABLE tlps_events;DROP TABLE tlps_links;DROP TABLE tlps_entities;DROP TABLE tlps_skus;DROP TABLE tlps_schema_migrations;").unwrap();
    }
    drop(s);
    let migrated = Store::open(path).unwrap();
    assert_eq!(
        migrated.read_project(&i, &i.project_id).unwrap()["title"],
        "Test production"
    );
    assert_eq!(
        migrated.tlps_catalog(&i).unwrap()["records"]
            .as_array()
            .unwrap()
            .len(),
        26
    );
}
#[test]
fn altered_or_future_migration_fingerprint_is_rejected() {
    for sql in [
        "UPDATE tlps_schema_migrations SET checksum='modified'",
        "INSERT INTO tlps_schema_migrations VALUES(2,'future',0)",
    ] {
        let (s, _) = setup();
        let c = s.0.lock().unwrap();
        c.execute_batch(sql).unwrap();
        assert!(matches!(migrate(&c), Err(StoreError::Invalid)));
    }
}
#[test]
fn two_database_connections_enforce_one_winner_for_same_version() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("api.sqlite3");
    let path = path.to_str().unwrap();
    let s = Store::open(path).unwrap();
    s.create_principal("owner", "Owner").unwrap();
    let i = project(&s, "owner");
    let record = create(&s, &i, "locations", &json!({"name":"Original"}));
    let other = Store::open(path).unwrap();
    let gate = Arc::new(Barrier::new(2));
    let mut threads = Vec::new();
    for (n, store) in [s, other].into_iter().enumerate() {
        let gate = gate.clone();
        let i = i.clone();
        let id = record["id"].as_str().unwrap().to_owned();
        threads.push(std::thread::spawn(move || {
            gate.wait();
            store.tlps_update(
                &i,
                &i.project_id,
                "locations",
                &id,
                1,
                &json!({"name":format!("Writer {n}")}),
            )
        }));
    }
    let results: Vec<_> = threads.into_iter().map(|t| t.join().unwrap()).collect();
    assert_eq!(results.iter().filter(|r| r.is_ok()).count(), 1);
    assert_eq!(
        results
            .iter()
            .filter(|r| matches!(r, Err(StoreError::Conflict)))
            .count(),
        1
    );
}
#[test]
fn concurrent_identical_creates_share_one_idempotent_response() {
    let (s, i) = setup();
    let gate = Arc::new(Barrier::new(6));
    let threads: Vec<_> = (0..6)
        .map(|_| {
            let s = s.clone();
            let i = i.clone();
            let g = gate.clone();
            std::thread::spawn(move || {
                g.wait();
                s.tlps_create(
                    &i,
                    &i.project_id,
                    "locations",
                    "same-request",
                    &json!({"name":"Place"}),
                )
                .unwrap()
            })
        })
        .collect();
    let rows: Vec<_> = threads.into_iter().map(|t| t.join().unwrap()).collect();
    assert!(rows.iter().all(|r| r["id"] == rows[0]["id"]));
    assert_eq!(
        s.tlps_events(&i, &i.project_id, 0, 10).unwrap()["items"]
            .as_array()
            .unwrap()
            .len(),
        1
    );
}
#[test]
fn database_constraints_prevent_dangling_cross_project_links() {
    let (s, i) = setup();
    let other = project(&s, "owner");
    let a = circle(&s, &i);
    let b = circle(&s, &other);
    let c = s.0.lock().unwrap();
    assert!(c
        .execute(
            "INSERT INTO tlps_links VALUES(?1,?2,?3,'circle')",
            params![i.project_id, a["id"].as_str(), b["id"].as_str()]
        )
        .is_err());
}
#[test]
fn seeded_catalog_stays_draft_and_financial_export_is_inert() {
    let (s, i) = setup();
    let catalog = s.tlps_catalog(&i).unwrap();
    let rows = catalog["records"].as_array().unwrap();
    assert_eq!(rows.len(), 26);
    for row in rows {
        assert_eq!(row["checkoutEnabled"], false);
        assert_eq!(row["commercialStatus"], "draft");
        assert!(row["priceMinor"].is_null());
    }
    let c = s.0.lock().unwrap();
    assert!(c
        .execute(
            "UPDATE tlps_skus SET data_json=json_set(data_json,'$.checkoutEnabled',1)",
            []
        )
        .is_err());
    drop(c);
    let export = s.tlps_export(&i, &i.project_id).unwrap();
    assert_eq!(export["bindingCommitment"], false);
    assert!(export["escrowBalance"].is_null());
    for value in export["capabilities"]["financialCapabilities"]
        .as_object()
        .unwrap()
        .values()
    {
        assert_eq!(value, false);
    }
}
#[test]
fn unknown_capability_actor_and_approval_keys_are_rejected_for_every_collection() {
    let (s, i) = setup();
    for kind in COLLECTIONS {
        let data = fixture(kind, &s, &i);
        for key in [
            "billingEnabled",
            "releaseEnabled",
            "heldBalance",
            "binding",
            "actor",
            "projectId",
            "version",
            "approved",
            "paymentId",
        ] {
            let mut v = data.clone();
            v[key] = json!(true);
            assert!(
                matches!(validate(kind, &v), Err(StoreError::Invalid)),
                "{kind}/{key}"
            );
        }
    }
}
#[test]
fn missing_required_fields_and_wrong_json_types_are_rejected() {
    let (s, i) = setup();
    for kind in COLLECTIONS {
        let data = fixture(kind, &s, &i);
        assert!(validate(kind, &json!(null)).is_err());
        assert!(validate(kind, &json!([])).is_err());
        assert!(validate(kind, &json!({})).is_err());
        for (key, value) in data.as_object().unwrap() {
            let mut bad = data.clone();
            bad[key] = if value.is_number() {
                json!("123")
            } else {
                json!(123)
            };
            assert!(validate(kind, &bad).is_err(), "{kind}/{key}");
        }
    }
}
#[test]
fn oversized_unicode_nul_and_blank_values_are_rejected() {
    for value in [
        " ".to_owned(),
        "x".repeat(201),
        "é".repeat(101),
        "bad\0value".to_owned(),
    ] {
        assert!(validate("locations", &json!({"name":value})).is_err());
    }
    assert!(validate(
        "escrow-reviews",
        &json!({"milestone":"x","condition":"x".repeat(MAX_ENTITY_BYTES)})
    )
    .is_err());
}
#[test]
fn dates_and_time_ranges_validate_calendar_and_order() {
    for day in [
        "2026-02-29",
        "2026-13-01",
        "2026-04-31",
        "2026-01-00",
        "2026-1-01",
        "2026-01-1",
        "1899-01-01",
        "2201-01-01",
        "۲۰۲۶-01-01",
    ] {
        assert!(!date(day), "{day}");
    }
    for day in ["2024-02-29", "2000-02-29", "2100-02-28", "2026-12-31"] {
        assert!(date(day), "{day}");
    }
    for (start, end) in [(60, 60), (60, 59), (-1, 10), (0, 1441)] {
        assert!(validate(
            "schedule-items",
            &json!({"title":"Task","date":"2026-01-01","startMinute":start,"endMinute":end})
        )
        .is_err());
    }
}
#[test]
fn budget_integer_currency_and_overflow_guards() {
    for (qty, amount, currency) in [
        (json!(0), json!(1), "INR"),
        (json!(1.5), json!(1), "INR"),
        (json!(1), json!(-1), "INR"),
        (json!(100000), json!(1_000_000_000_000i64), "INR"),
        (json!(1), json!(1), "Saptdhatu"),
        (json!(1), json!(1), "USD"),
    ] {
        assert!(validate(
            "budget-items",
            &json!({"label":"Estimate","quantity":qty,"unitAmountMinor":amount,"currency":currency})
        )
        .is_err());
    }
}
#[test]
fn workplace_ids_fields_and_prototype_keys_validate() {
    let (s, i) = setup();
    let good = fixture("workplace-records", &s, &i);
    for (field, value) in [
        ("areaId", json!("unknown")),
        ("workspaceId", json!("WORKSPACE.UNKNOWN.INVALID")),
        ("values", json!({"__proto__":"bad"})),
        ("values", json!({"name":{"nested":"bad"}})),
        ("status", json!("paid")),
    ] {
        let mut bad = good.clone();
        bad[field] = value;
        assert!(validate("workplace-records", &bad).is_err());
    }
}
#[test]
fn all_eight_project_stages_are_navigation_values_only() {
    for stage in STAGES {
        assert!(validate("profiles", &json!({"title":"Project","stage":stage})).is_ok());
    }
    assert!(validate(
        "profiles",
        &json!({"title":"Project","stage":"funds-released"})
    )
    .is_err());
}
#[test]
fn invalid_cursor_limits_ids_versions_and_request_keys_are_rejected() {
    let (s, i) = setup();
    let data = json!({"name":"Place"});
    let r = create(&s, &i, "locations", &data);
    let id = r["id"].as_str().unwrap();
    for key in ["", "bad key", "key;DROP TABLE projects;", "é", "a\0b"] {
        assert!(s
            .tlps_create(&i, &i.project_id, "locations", key, &data)
            .is_err());
    }
    for limit in [0, 101, usize::MAX] {
        assert!(s
            .tlps_list(&i, &i.project_id, "locations", "", limit)
            .is_err());
    }
    for cursor in ["' OR 1=1 --", "tlps:bad", "/../projects"] {
        assert!(s
            .tlps_list(&i, &i.project_id, "locations", cursor, 10)
            .is_err());
    }
    for version in [0, -1, i64::MAX] {
        assert!(s
            .tlps_update(&i, &i.project_id, "locations", id, version, &data)
            .is_err());
    }
    assert!(s.tlps_read(&i, &i.project_id, "locations", "bad").is_err());
}
#[test]
fn sql_metacharacters_in_payload_remain_plain_data() {
    let (s, i) = setup();
    let name = "'; DROP TABLE projects; --";
    let r = create(&s, &i, "locations", &json!({"name":name}));
    assert_eq!(r["data"]["name"], name);
    assert!(s.read_project(&i, &i.project_id).is_ok());
}
#[test]
fn query_parser_rejects_ambiguous_or_malformed_pagination() {
    for query in [
        "limit=0",
        "limit=101",
        "limit=x",
        "limit=1&limit=2",
        "unknown=1",
        "cursor=%ZZ",
        "cursor=%FF",
        "noequal",
    ] {
        assert!(pagination(Some(query), false).is_err(), "{query}");
    }
    let id = format!("tlps:{}", Uuid::new_v4());
    let encoded = id.replace(':', "%3A");
    assert_eq!(
        pagination(Some(&format!("cursor={encoded}&limit=2")), false).unwrap(),
        (id, 2)
    );
}

#[test]
fn project_quota_has_no_partial_write_and_idempotent_replay_still_works() {
    let (s, i) = setup();
    let data = json!({"name":"Reference"});
    let original = s
        .tlps_create(&i, &i.project_id, "locations", "original", &data)
        .unwrap();
    {
        let c = s.0.lock().unwrap();
        for n in 1..MAX_PROJECT_ENTITIES {
            c.execute("INSERT INTO tlps_entities(project_id,entity_id,kind,version,data_json,created_at,updated_at) VALUES(?1,?2,'locations',1,'{\"name\":\"Quota fixture\"}',0,0)",params![i.project_id,format!("tlps:{}",Uuid::new_v4())]).unwrap();
            assert!(n < MAX_PROJECT_ENTITIES);
        }
    }
    assert!(matches!(
        s.tlps_create(&i, &i.project_id, "locations", "overflow", &data),
        Err(StoreError::Conflict)
    ));
    assert_eq!(
        s.tlps_create(&i, &i.project_id, "locations", "original", &data)
            .unwrap(),
        original
    );
    assert_eq!(
        s.tlps_export(&i, &i.project_id).unwrap()["entities"]
            .as_array()
            .unwrap()
            .len(),
        1000
    );
}
#[test]
fn failed_update_restores_old_payload_links_version_and_events() {
    let (s, i) = setup();
    let data = fixture("membership-plans", &s, &i);
    let original = create(&s, &i, "membership-plans", &data);
    let id = original["id"].as_str().unwrap();
    let mut bad = data.clone();
    bad["circleId"] = json!(format!("tlps:{}", Uuid::new_v4()));
    assert!(s
        .tlps_update(&i, &i.project_id, "membership-plans", id, 1, &bad)
        .is_err());
    assert_eq!(
        s.tlps_read(&i, &i.project_id, "membership-plans", id)
            .unwrap(),
        original
    );
    assert!(matches!(
        s.tlps_delete(
            &i,
            &i.project_id,
            "circles",
            data["circleId"].as_str().unwrap(),
            1
        ),
        Err(StoreError::Conflict)
    ));
    let events = s.tlps_events(&i, &i.project_id, 0, 100).unwrap();
    assert_eq!(events["items"].as_array().unwrap().len(), 2);
}
#[test]
fn successful_token_revocation_cannot_be_bypassed_at_authentication() {
    let (s, i) = setup();
    let token = s
        .issue_token("owner", &i.project_id, vec![Scope::ProjectRead], 3600)
        .unwrap();
    assert!(s.authenticate(&token.access_token).is_ok());
    s.revoke_token(&token.token_id).unwrap();
    assert!(matches!(
        s.authenticate(&token.access_token),
        Err(StoreError::Denied)
    ));
}
#[cfg(unix)]
#[test]
fn backup_restore_includes_tlps_entities_catalog_links_and_audit() {
    use std::os::unix::fs::PermissionsExt;
    let dir = tempfile::tempdir().unwrap();
    std::fs::set_permissions(dir.path(), std::fs::Permissions::from_mode(0o700)).unwrap();
    let (s, i) = setup();
    let data = fixture("membership-plans", &s, &i);
    let record = create(&s, &i, "membership-plans", &data);
    let backup = dir.path().join("backup.sqlite3");
    s.backup_to(&backup).unwrap();
    let restored = Store::open(backup.to_str().unwrap()).unwrap();
    assert_eq!(
        restored
            .tlps_read(
                &i,
                &i.project_id,
                "membership-plans",
                record["id"].as_str().unwrap()
            )
            .unwrap(),
        record
    );
    assert_eq!(
        restored.tlps_catalog(&i).unwrap()["records"]
            .as_array()
            .unwrap()
            .len(),
        26
    );
    assert!(matches!(
        restored.tlps_delete(
            &i,
            &i.project_id,
            "circles",
            data["circleId"].as_str().unwrap(),
            1
        ),
        Err(StoreError::Conflict)
    ));
    assert_eq!(
        restored.tlps_events(&i, &i.project_id, 0, 10).unwrap()["items"]
            .as_array()
            .unwrap()
            .len(),
        2
    );
}

#[test]
fn version_preconditions_are_single_positive_integers() {
    for v in ["1", "42", "\"2\""] {
        assert!(expected_version(v).is_some());
    }
    for v in [
        "",
        "0",
        "-1",
        "+1",
        "1.0",
        "1,2",
        "*",
        "W/\"1\"",
        "\"1",
        "1\"",
        "\"\"1\"\"",
        "9223372036854775808",
    ] {
        assert!(expected_version(v).is_none(), "{v}");
    }
}
#[test]
fn catalog_database_constraints_reject_missing_or_wrong_type_flags() {
    let (s, _) = setup();
    let c = s.0.lock().unwrap();
    for field in [
        "commercialStatus",
        "checkoutEnabled",
        "fulfillmentEnabled",
        "priceMinor",
    ] {
        assert!(c
            .execute(
                "UPDATE tlps_skus SET data_json=json_remove(data_json,?1)",
                [format!("$.{field}")]
            )
            .is_err());
    }
    assert!(c
        .execute(
            "UPDATE tlps_skus SET data_json=json_set(data_json,'$.checkoutEnabled',0)",
            []
        )
        .is_err());
}
