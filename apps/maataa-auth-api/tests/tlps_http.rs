//! Exercises the compiled HTTP server and real SQLite files with synthetic credentials/data only.
use serde_json::{json, Value};
use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    process::{Child, Command, Stdio},
    thread,
    time::{Duration, Instant},
};
use tempfile::{tempdir, TempDir};
const ADMIN: &str = "tlps-test-bootstrap-secret-not-a-real-key-123456";
struct Server {
    child: Child,
    port: u16,
    _dir: TempDir,
}
impl Drop for Server {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}
impl Server {
    fn new() -> Self {
        let dir = tempdir().unwrap();
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            std::fs::set_permissions(dir.path(), std::fs::Permissions::from_mode(0o700)).unwrap();
        }
        let probe = TcpListener::bind("127.0.0.1:0").unwrap();
        let port = probe.local_addr().unwrap().port();
        drop(probe);
        let child = Command::new(env!("CARGO_BIN_EXE_maataa-auth-api"))
            .env("MAATAA_BOOTSTRAP_TOKEN", ADMIN)
            .env_remove("MAATAA_BOOTSTRAP_TOKEN_FILE")
            .env("MAATAA_AUTH_API_DB", dir.path().join("test.sqlite3"))
            .env("MAATAA_AUTH_API_SOCKET", dir.path().join("test.sock"))
            .env("MAATAA_AUTH_API_PORT", port.to_string())
            .stdout(Stdio::null())
            .stderr(Stdio::inherit())
            .spawn()
            .unwrap();
        let server = Self {
            child,
            port,
            _dir: dir,
        };
        let deadline = Instant::now() + Duration::from_secs(10);
        loop {
            if let Ok(mut stream) = TcpStream::connect(("127.0.0.1", port)) {
                let _ = stream.write_all(
                    b"GET /healthz HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n",
                );
                let _ = stream.set_read_timeout(Some(Duration::from_millis(500)));
                let mut body = String::new();
                let _ = stream.read_to_string(&mut body);
                if body.contains("200 OK") {
                    break;
                }
            }
            assert!(Instant::now() < deadline, "TLPS HTTP fixture did not start");
            thread::sleep(Duration::from_millis(20));
        }
        assert_eq!(
            server
                .call(
                    "POST",
                    "/v1/admin/principals",
                    Some(ADMIN),
                    &[],
                    Some(&json!({"principalId":"tester","displayName":"Synthetic tester"}))
                )
                .0,
            201
        );
        server
    }
    fn raw(
        &self,
        method: &str,
        path: &str,
        token: Option<&str>,
        headers: &[(&str, &str)],
        body: &str,
    ) -> (u16, Value) {
        let mut s = TcpStream::connect(("127.0.0.1", self.port)).unwrap();
        s.set_read_timeout(Some(Duration::from_secs(5))).unwrap();
        let mut request=format!("{method} {path} HTTP/1.1\r\nHost: 127.0.0.1\r\nConnection: close\r\nContent-Length: {}\r\n",body.len());
        if let Some(t) = token {
            request.push_str(&format!("Authorization: Bearer {t}\r\n"));
        }
        for (k, v) in headers {
            request.push_str(&format!("{k}: {v}\r\n"));
        }
        request.push_str("\r\n");
        s.write_all(request.as_bytes()).unwrap();
        s.write_all(body.as_bytes()).unwrap();
        let mut response = String::new();
        if let Err(error) = s.read_to_string(&mut response) {
            assert!(
                error.kind() == std::io::ErrorKind::ConnectionReset && !response.is_empty(),
                "HTTP read failed: {error}"
            );
        }
        let (head, body) = response.split_once("\r\n\r\n").unwrap();
        assert!(head
            .to_ascii_lowercase()
            .contains("cache-control: no-store"));
        assert!(head.to_ascii_lowercase().contains("x-request-id:"));
        let status = head.split_whitespace().nth(1).unwrap().parse().unwrap();
        (status, serde_json::from_str(body).unwrap())
    }
    fn call(
        &self,
        method: &str,
        path: &str,
        token: Option<&str>,
        headers: &[(&str, &str)],
        body: Option<&Value>,
    ) -> (u16, Value) {
        let mut h = headers.to_vec();
        if body.is_some() {
            h.push(("Content-Type", "application/json"));
        }
        self.raw(
            method,
            path,
            token,
            &h,
            &body.map(Value::to_string).unwrap_or_default(),
        )
    }
    fn token(&self, pid: &str, scopes: Value) -> Value {
        let (status, body) = self.call(
            "POST",
            "/v1/admin/tokens",
            Some(ADMIN),
            &[],
            Some(
                &json!({"principalId":"tester","projectId":pid,"scopes":scopes,"ttlSeconds":3600}),
            ),
        );
        assert_eq!(status, 201);
        body
    }
    fn project(&self) -> (String, String) {
        let pid = format!("prj:{}", uuid::Uuid::new_v4());
        let token = self.token(&pid, json!(["project:read", "project:write"]))["access_token"]
            .as_str()
            .unwrap()
            .to_owned();
        let(status,_)=self.call("POST","/v1/projects",Some(&token),&[],Some(&json!({"schema":maataa_auth_api::PROJECT_SCHEMA,"projectId":pid,"title":"Synthetic production","domain":"film-production","ownerApp":"tlps","currentVersion":0,"versions":[]})));
        assert_eq!(status, 201);
        (pid, token)
    }
    fn create(&self, pid: &str, token: &str, kind: &str, data: &Value) -> Value {
        let key = uuid::Uuid::new_v4().to_string();
        let (status, body) = self.call(
            "POST",
            &format!("/v1/tlps/projects/{pid}/{kind}"),
            Some(token),
            &[("Idempotency-Key", &key)],
            Some(&json!({"data":data})),
        );
        assert_eq!(status, 201, "{kind}: {body}");
        body
    }
    fn fixture(&self, pid: &str, token: &str, kind: &str) -> Value {
        match kind {
            "profiles" => json!({"title":"Project","stage":"idea"}),
            "onboarding" => {
                json!({"audience":"producer","idea":"Story","journey":"I2S","automation":"guided"})
            }
            "workplace-records" => {
                json!({"areaId":"production-os","workspaceId":"WORKSPACE.TLPS_PRODUCTION.PRODUCTION","values":{"brief":"Draft"},"status":"draft"})
            }
            "budget-items" => {
                json!({"label":"Estimate","quantity":1,"unitAmountMinor":99900,"currency":"INR"})
            }
            "crew-assignments" => json!({"name":"Reference","role":"Producer"}),
            "locations" => json!({"name":"Place"}),
            "schedule-items" => {
                json!({"title":"Prep","date":"2026-10-17","startMinute":480,"endMinute":720})
            }
            "evidence" => {
                json!({"title":"Checklist","kind":"document","sourceRef":"local:reference"})
            }
            "circles" => json!({"name":"Circle","purpose":"Review proposals"}),
            "membership-plans" | "investment-interests" => {
                let c = self.create(
                    pid,
                    token,
                    "circles",
                    &json!({"name":"Circle","purpose":"Review"}),
                );
                if kind == "membership-plans" {
                    json!({"circleId":c["id"],"name":"Plan","period":"monthly","benefits":"Discussion"})
                } else {
                    json!({"circleId":c["id"],"partyReference":"Participant","terms":"Non-binding"})
                }
            }
            "escrow-reviews" => json!({"milestone":"Prep","condition":"Evidence reviewed"}),
            _ => panic!("unknown fixture"),
        }
    }
}
macro_rules! http_crud{($name:ident,$kind:literal)=>{#[test]fn $name(){let s=Server::new();let(pid,token)=s.project();let data=s.fixture(&pid,&token,$kind);let item=s.create(&pid,&token,$kind,&data);let path=format!("/v1/tlps/projects/{pid}/{}/{}",$kind,item["id"].as_str().unwrap());let(status,read)=s.call("GET",&path,Some(&token),&[],None);assert_eq!(status,200);assert_eq!(read["data"],data);let(status,updated)=s.call("PUT",&path,Some(&token),&[("If-Match","1")],Some(&json!({"data":data})));assert_eq!(status,200);assert_eq!(updated["version"],2);assert_eq!(s.call("PUT",&path,Some(&token),&[("If-Match","1")],Some(&json!({"data":data}))).0,409);assert_eq!(s.call("DELETE",&path,Some(&token),&[("If-Match","2")],None).0,200);assert_eq!(s.call("GET",&path,Some(&token),&[],None).0,404);}};}
http_crud!(http_profiles, "profiles");
http_crud!(http_onboarding, "onboarding");
http_crud!(http_workplaces, "workplace-records");
http_crud!(http_budget, "budget-items");
http_crud!(http_crew, "crew-assignments");
http_crud!(http_locations, "locations");
http_crud!(http_schedule, "schedule-items");
http_crud!(http_evidence, "evidence");
http_crud!(http_circles, "circles");
http_crud!(http_memberships, "membership-plans");
http_crud!(http_interests, "investment-interests");
http_crud!(http_escrow_reviews, "escrow-reviews");
#[test]
fn http_authentication_scope_and_revocation() {
    let s = Server::new();
    let (pid, token) = s.project();
    let path = format!("/v1/tlps/projects/{pid}/locations");
    for t in [None, Some("invalid")] {
        assert_eq!(s.call("GET", &path, t, &[], None).0, 401);
    }
    let reader = s.token(&pid, json!(["project:read"]));
    let r = reader["access_token"].as_str().unwrap();
    assert_eq!(
        s.call(
            "POST",
            &path,
            Some(r),
            &[("Idempotency-Key", "x")],
            Some(&json!({"data":{"name":"Place"}}))
        )
        .0,
        403
    );
    let writer = s.token(&pid, json!(["project:write"]));
    assert_eq!(
        s.call("GET", &path, writer["access_token"].as_str(), &[], None)
            .0,
        403
    );
    let (other, other_token) = s.project();
    assert_ne!(pid, other);
    assert_eq!(s.call("GET", &path, Some(&other_token), &[], None).0, 403);
    let revoke = format!(
        "/v1/admin/tokens/{}/revoke",
        reader["token_id"].as_str().unwrap()
    );
    assert_eq!(s.call("POST", &revoke, Some(ADMIN), &[], None).0, 200);
    assert_eq!(s.call("GET", &path, Some(r), &[], None).0, 401);
    assert_eq!(s.call("GET", &path, Some(&token), &[], None).0, 200);
}
#[test]
fn http_duplicate_create_and_precondition_headers() {
    let s = Server::new();
    let (pid, t) = s.project();
    let path = format!("/v1/tlps/projects/{pid}/locations");
    let body = json!({"data":{"name":"Place"}});
    assert_eq!(s.call("POST", &path, Some(&t), &[], Some(&body)).0, 428);
    let headers = [("Idempotency-Key", "stable")];
    let a = s.call("POST", &path, Some(&t), &headers, Some(&body));
    let b = s.call("POST", &path, Some(&t), &headers, Some(&body));
    assert_eq!(a, b);
    assert_eq!(
        s.call(
            "POST",
            &path,
            Some(&t),
            &headers,
            Some(&json!({"data":{"name":"Other"}}))
        )
        .0,
        409
    );
    let item = format!("{path}/{}", a.1["id"].as_str().unwrap());
    assert_eq!(s.call("PUT", &item, Some(&t), &[], Some(&body)).0, 428);
    assert_eq!(s.call("DELETE", &item, Some(&t), &[], None).0, 428);
}
#[test]
fn http_pagination_encoded_cursors_audit_and_export() {
    let s = Server::new();
    let (pid, t) = s.project();
    let base = format!("/v1/tlps/projects/{pid}");
    for n in 0..3 {
        s.create(&pid, &t, "locations", &json!({"name":format!("Place {n}")}));
    }
    let (status, first) = s.call(
        "GET",
        &format!("{base}/locations?limit=2"),
        Some(&t),
        &[],
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(first["items"].as_array().unwrap().len(), 2);
    let cursor = first["nextCursor"].as_str().unwrap().replace(':', "%3A");
    let (status, next) = s.call(
        "GET",
        &format!("{base}/locations?limit=2&cursor={cursor}"),
        Some(&t),
        &[],
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(next["items"].as_array().unwrap().len(), 1);
    for query in [
        "limit=0",
        "limit=101",
        "limit=1&limit=2",
        "cursor=%ZZ",
        "unknown=1",
    ] {
        assert_eq!(
            s.call(
                "GET",
                &format!("{base}/locations?{query}"),
                Some(&t),
                &[],
                None
            )
            .0,
            400
        );
    }
    let (status, events) = s.call(
        "GET",
        &format!("{base}/events?limit=2"),
        Some(&t),
        &[],
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(events["items"].as_array().unwrap().len(), 2);
    assert!(events["items"][0].get("data").is_none());
    let (status, export) = s.call("GET", &format!("{base}/export"), Some(&t), &[], None);
    assert_eq!(status, 200);
    assert_eq!(export["entities"].as_array().unwrap().len(), 3);
    assert_eq!(export["bindingCommitment"], false);
    assert!(export["escrowBalance"].is_null());
}
#[test]
fn http_bad_json_content_type_unknown_fields_and_size_limits() {
    let s = Server::new();
    let (pid, t) = s.project();
    let path = format!("/v1/tlps/projects/{pid}/locations");
    let h = [
        ("Content-Type", "application/json"),
        ("Idempotency-Key", "x"),
    ];
    assert_eq!(s.raw("POST", &path, Some(&t), &h, "{bad").0, 400);
    assert_eq!(
        s.raw(
            "POST",
            &path,
            Some(&t),
            &[("Content-Type", "text/plain")],
            "{}"
        )
        .0,
        415
    );
    assert_eq!(
        s.call(
            "POST",
            &path,
            Some(&t),
            &[("Idempotency-Key", "x")],
            Some(&json!({"data":{"name":"Place"},"actor":"admin"}))
        )
        .0,
        400
    );
    let huge = json!({"data":{"name":"a".repeat(maataa_auth_api::MAX_BODY_BYTES)}}).to_string();
    assert_eq!(s.raw("POST", &path, Some(&t), &h, &huge).0, 413);
    let large = json!({"data":{"name":"a".repeat(9000)}});
    assert_eq!(
        s.call(
            "POST",
            &path,
            Some(&t),
            &[("Idempotency-Key", "large")],
            Some(&large)
        )
        .0,
        400
    );
}
#[test]
fn http_financial_capabilities_and_routes_cannot_be_promoted() {
    let s = Server::new();
    let (pid, t) = s.project();
    let (status, c) = s.call("GET", "/v1/tlps/capabilities", Some(&t), &[], None);
    assert_eq!(status, 200);
    for value in c["financialCapabilities"].as_object().unwrap().values() {
        assert_eq!(value, false);
    }
    let (status, skus) = s.call("GET", "/v1/tlps/skus", Some(&t), &[], None);
    assert_eq!(status, 200);
    assert_eq!(skus["records"].as_array().unwrap().len(), 26);
    assert_eq!(skus["checkoutEnabled"], false);
    let base = format!("/v1/tlps/projects/{pid}");
    assert_eq!(
        s.call(
            "POST",
            &format!("{base}/escrow-reviews"),
            Some(&t),
            &[("Idempotency-Key", "bad")],
            Some(
                &json!({"data":{"milestone":"Prep","condition":"Reviewed","releaseEnabled":true}})
            )
        )
        .0,
        400
    );
    for op in ["collect-capital", "release", "refund", "charge"] {
        assert_eq!(
            s.call(
                "POST",
                &format!("{base}/{op}"),
                Some(&t),
                &[],
                Some(&json!({}))
            )
            .0,
            404
        );
    }
    assert_eq!(
        s.call("PATCH", &format!("{base}/locations"), Some(&t), &[], None)
            .0,
        405
    );
}
#[test]
fn http_circle_references_and_deletion_conflicts() {
    let s = Server::new();
    let (pid, t) = s.project();
    let (other, other_t) = s.project();
    let foreign = s.create(
        &other,
        &other_t,
        "circles",
        &json!({"name":"Other","purpose":"Private"}),
    );
    let base = format!("/v1/tlps/projects/{pid}");
    let data = json!({"data":{"circleId":foreign["id"],"name":"Plan","period":"monthly","benefits":"Read"}});
    assert_eq!(
        s.call(
            "POST",
            &format!("{base}/membership-plans"),
            Some(&t),
            &[("Idempotency-Key", "foreign")],
            Some(&data)
        )
        .0,
        400
    );
    let c = s.create(
        &pid,
        &t,
        "circles",
        &json!({"name":"Circle","purpose":"Review"}),
    );
    s.create(
        &pid,
        &t,
        "investment-interests",
        &json!({"circleId":c["id"],"partyReference":"Participant"}),
    );
    assert_eq!(
        s.call(
            "DELETE",
            &format!("{base}/circles/{}", c["id"].as_str().unwrap()),
            Some(&t),
            &[("If-Match", "1")],
            None
        )
        .0,
        409
    );
}

#[test]
fn managed_pilot_http_enforces_membership_reviews_and_support_persistence() {
    let s = Server::new();
    let (pid, owner) = s.project();
    assert_eq!(
        s.call(
            "POST",
            "/v1/admin/tlps/memberships",
            Some(&owner),
            &[],
            Some(&json!({"projectId":pid,"principalId":"tester","role":"owner","active":true}))
        )
        .0,
        401
    );
    assert_eq!(
        s.call(
            "POST",
            "/v1/admin/tlps/memberships",
            Some(ADMIN),
            &[],
            Some(&json!({"projectId":pid,"principalId":"tester","role":"owner","active":true}))
        )
        .0,
        200
    );
    assert_eq!(
        s.call(
            "POST",
            "/v1/admin/principals",
            Some(ADMIN),
            &[],
            Some(&json!({"principalId":"reviewer","displayName":"Separate reviewer"}))
        )
        .0,
        201
    );
    let(status,t)=s.call("POST","/v1/admin/tokens",Some(ADMIN),&[],Some(&json!({"principalId":"reviewer","projectId":pid,"scopes":["project:read","project:write"],"ttlSeconds":3600})));
    assert_eq!(status, 201);
    let reviewer = t["access_token"].as_str().unwrap();
    assert_eq!(
        s.call(
            "POST",
            "/v1/admin/tlps/memberships",
            Some(ADMIN),
            &[],
            Some(
                &json!({"projectId":pid,"principalId":"reviewer","role":"reviewer","active":true})
            )
        )
        .0,
        200
    );
    assert_eq!(
        s.call("GET", "/v1/tlps/pilot/session", Some(reviewer), &[], None)
            .1["role"],
        "reviewer"
    );
    let profile = s.create(
        &pid,
        &owner,
        "profiles",
        &json!({"title":"Pilot","stage":"idea"}),
    );
    let review = json!({"profileId":profile["id"],"version":1,"decision":"approved","note":"Profile checked"});
    assert_eq!(
        s.call(
            "POST",
            "/v1/tlps/pilot/review",
            Some(&owner),
            &[],
            Some(&review)
        )
        .0,
        403
    );
    assert_eq!(
        s.call(
            "POST",
            &format!("/v1/tlps/projects/{pid}/locations"),
            Some(reviewer),
            &[("Idempotency-Key", "denied")],
            Some(&json!({"data":{"name":"Place"}}))
        )
        .0,
        403
    );
    assert_eq!(
        s.call(
            "POST",
            "/v1/tlps/pilot/review",
            Some(reviewer),
            &[],
            Some(&review)
        )
        .1["stage"],
        "story"
    );
    assert_eq!(
        s.call(
            "POST",
            "/v1/tlps/pilot/review",
            Some(reviewer),
            &[],
            Some(&review)
        )
        .0,
        409
    );
    let work = json!({"id":uuid::Uuid::new_v4().to_string(),"kind":"ticket","version":0,"data":{"title":"Support request","description":"Investigate schedule","status":"open"}});
    assert_eq!(
        s.call(
            "POST",
            "/v1/tlps/pilot/items",
            Some(&owner),
            &[],
            Some(&work)
        )
        .0,
        200
    );
    assert_eq!(
        s.call("GET", "/v1/tlps/pilot/items", Some(reviewer), &[], None)
            .1["items"]
            .as_array()
            .unwrap()
            .len(),
        1
    );
    assert_eq!(
        s.call(
            "POST",
            "/v1/admin/tlps/memberships",
            Some(ADMIN),
            &[],
            Some(
                &json!({"projectId":pid,"principalId":"reviewer","role":"reviewer","active":false})
            )
        )
        .0,
        200
    );
    assert_eq!(
        s.call("GET", "/v1/tlps/pilot/history", Some(reviewer), &[], None)
            .0,
        403
    );
    assert_eq!(
        s.call(
            "GET",
            &format!("/v1/projects/{pid}"),
            Some(reviewer),
            &[],
            None
        )
        .0,
        403
    );
}
#[test]
fn http_row_level_isolation_across_every_route() {
    // Project B's rows must stay invisible to project A's token on every route,
    // even when A knows B's entity IDs.
    let s = Server::new();
    let (a, a_token) = s.project();
    let (b, b_token) = s.project();
    let kinds = [
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
    let mut b_ids = Vec::new();
    for kind in kinds {
        let data = s.fixture(&b, &b_token, kind);
        let item = s.create(&b, &b_token, kind, &data);
        b_ids.push((kind, item["id"].as_str().unwrap().to_owned()));
    }
    s.create(&a, &a_token, "locations", &json!({"name":"Mine"}));
    let a_auth = Some(a_token.as_str());
    for (kind, id) in &b_ids {
        for pid in [&a, &b] {
            let path = format!("/v1/tlps/projects/{pid}/{kind}/{id}");
            let expected = if pid == &b { 403 } else { 404 };
            assert_eq!(s.call("GET", &path, a_auth, &[], None).0, expected, "GET {path}");
            assert_eq!(
                s.call("PUT", &path, a_auth, &[("If-Match", "1")], Some(&json!({"data":{"name":"x"}}))).0 / 100,
                4,
                "PUT {path}"
            );
            assert_eq!(s.call("DELETE", &path, a_auth, &[("If-Match", "1")], None).0 / 100, 4, "DELETE {path}");
        }
        let (status, list) = s.call("GET", &format!("/v1/tlps/projects/{a}/{kind}"), a_auth, &[], None);
        assert_eq!(status, 200);
        assert!(!list.to_string().contains(id.as_str()), "{kind} list leaked {id}");
    }
    for path in [
        format!("/v1/tlps/projects/{a}/events"),
        format!("/v1/tlps/projects/{a}/export"),
    ] {
        let (status, body) = s.call("GET", &path, a_auth, &[], None);
        assert_eq!(status, 200, "{path}");
        let text = body.to_string();
        assert!(!text.contains(&b), "{path} leaked project B");
        assert!(b_ids.iter().all(|(_, id)| !text.contains(id.as_str())), "{path} leaked B's rows");
    }
    for path in [
        format!("/v1/projects/{b}"),
        format!("/v1/projects/{b}/events"),
        format!("/v1/tlps/projects/{b}/events"),
        format!("/v1/tlps/projects/{b}/export"),
    ] {
        assert_eq!(s.call("GET", &path, a_auth, &[], None).0, 403, "{path}");
    }
    // Pilot routes answer only for the token's own project.
    let (status, _) = s.call("GET", "/v1/tlps/pilot/items", a_auth, &[], None);
    assert_ne!(status, 200);
}
