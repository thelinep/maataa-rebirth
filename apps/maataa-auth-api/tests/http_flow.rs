use serde_json::{json, Value};
#[cfg(unix)]
use std::os::unix::net::UnixStream;
use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    process::{Child, Command, Stdio},
    thread,
    time::{Duration, Instant},
};
use tempfile::tempdir;

struct Running(Child);
impl Drop for Running {
    fn drop(&mut self) {
        let _ = self.0.kill();
        let _ = self.0.wait();
    }
}

fn request(
    port: u16,
    method: &str,
    path: &str,
    auth: Option<&str>,
    extra: Option<(&str, &str)>,
    body: Option<&Value>,
) -> (u16, Value) {
    let mut stream = TcpStream::connect(("127.0.0.1", port)).unwrap();
    stream
        .set_read_timeout(Some(Duration::from_secs(3)))
        .unwrap();
    let data = body.map(Value::to_string).unwrap_or_default();
    let mut headers=format!("{method} {path} HTTP/1.1\r\nHost: 127.0.0.1\r\nConnection: close\r\nContent-Length: {}\r\n",data.len());
    if body.is_some() {
        headers.push_str("Content-Type: application/json\r\n");
    }
    if let Some(token) = auth {
        headers.push_str(&format!("Authorization: Bearer {token}\r\n"));
    }
    if let Some((name, value)) = extra {
        headers.push_str(&format!("{name}: {value}\r\n"));
    }
    headers.push_str("\r\n");
    stream.write_all(headers.as_bytes()).unwrap();
    stream.write_all(data.as_bytes()).unwrap();
    let mut response = Vec::new();
    stream.read_to_end(&mut response).unwrap();
    let response = String::from_utf8(response).unwrap();
    let (head, body) = response.split_once("\r\n\r\n").unwrap();
    assert!(head
        .lines()
        .any(|line| line.to_ascii_lowercase().starts_with("x-request-id: ")));
    assert!(head
        .lines()
        .any(|line| line.eq_ignore_ascii_case("x-frame-options: DENY")));
    let status = head
        .lines()
        .next()
        .unwrap()
        .split_whitespace()
        .nth(1)
        .unwrap()
        .parse()
        .unwrap();
    (status, serde_json::from_str(body).unwrap_or(Value::Null))
}

#[test]
fn local_auth_and_project_api_round_trip_enforces_scope_version_and_revocation() {
    let temp = tempdir().unwrap();
    let probe = TcpListener::bind("127.0.0.1:0").unwrap();
    let port = probe.local_addr().unwrap().port();
    drop(probe);
    let private_data = temp.path().join("private-data");
    std::fs::create_dir(&private_data).unwrap();
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&private_data, std::fs::Permissions::from_mode(0o700)).unwrap();
    }
    let root = "test-bootstrap-token-secret-32-bytes-min";
    let secret_file = private_data.join("bootstrap-token");
    std::fs::write(&secret_file, root).unwrap();
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&secret_file, std::fs::Permissions::from_mode(0o600)).unwrap();
    }
    let db = private_data.join("service.sqlite3");
    let socket = private_data.join("auth-api.sock");
    let child = Command::new(env!("CARGO_BIN_EXE_maataa-auth-api"))
        .env("MAATAA_BOOTSTRAP_TOKEN_FILE", &secret_file)
        .env_remove("MAATAA_BOOTSTRAP_TOKEN")
        .env("MAATAA_AUTH_API_DB", &db)
        .env("MAATAA_AUTH_API_PORT", port.to_string())
        .env("MAATAA_AUTH_API_SOCKET", &socket)
        .stdout(Stdio::null())
        .stderr(Stdio::inherit())
        .spawn()
        .unwrap();
    let _running = Running(child);
    let deadline = Instant::now() + Duration::from_secs(5);
    loop {
        if let Ok(mut stream) = TcpStream::connect(("127.0.0.1", port)) {
            let _ = stream.write_all(
                b"GET /healthz HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n",
            );
            let mut buf = String::new();
            let _ = stream.read_to_string(&mut buf);
            if buf.contains("200 OK") {
                break;
            }
        }
        assert!(Instant::now() < deadline, "service did not start");
        thread::sleep(Duration::from_millis(20));
    }
    #[cfg(unix)]
    {
        use std::os::unix::fs::{FileTypeExt, PermissionsExt};
        let metadata = std::fs::symlink_metadata(&socket).unwrap();
        assert!(metadata.file_type().is_socket());
        assert_eq!(metadata.permissions().mode() & 0o777, 0o600);
        let mut stream = UnixStream::connect(&socket).unwrap();
        stream
            .write_all(b"GET /healthz HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n")
            .unwrap();
        let mut response = String::new();
        stream.read_to_string(&mut response).unwrap();
        assert!(response.contains("200 OK"));
    }
    let (status, readiness) = request(port, "GET", "/readyz", None, None, None);
    assert_eq!(status, 200);
    assert_eq!(readiness["schemaVersion"], 3);
    let (status, _) = request(
        port,
        "POST",
        "/v1/admin/principals",
        Some(root),
        None,
        Some(&json!({"principalId":"tester","displayName":"Test User"})),
    );
    assert_eq!(status, 201);
    let project = format!("prj:{}", uuid::Uuid::new_v4());
    let (status, token) = request(
        port,
        "POST",
        "/v1/admin/tokens",
        Some(root),
        None,
        Some(
            &json!({"principalId":"tester","projectId":project,"scopes":["project:read","project:write","knowledge:read","knowledge:write"],"ttlSeconds":3600}),
        ),
    );
    assert_eq!(status, 201);
    let access = token["access_token"].as_str().unwrap();
    let token_id = token["token_id"].as_str().unwrap().to_owned();
    let (status, who) = request(port, "GET", "/v1/auth/whoami", Some(access), None, None);
    assert_eq!(status, 200);
    assert_eq!(who["project_id"], project);
    assert_eq!(who["scopes"][0], "project:read");
    let initial = json!({"schema":"maataa.project-record/1.0.0","projectId":project,"title":"Synthetic test","domain":"film-production","ownerApp":"tlps","currentVersion":0,"versions":[]});
    let (status, _) = request(
        port,
        "POST",
        "/v1/projects",
        Some(access),
        None,
        Some(&initial),
    );
    assert_eq!(status, 201);
    let provenance = json!({"sourceRef":"fixture:synthetic-observation","sourceKind":"instrument-reading","sourceDigest":null,"methodId":"method:demo-v1","methodVersion":"1.0"});
    let object = json!({"objectId":"entity:observatory","objectType":"entity","label":"Synthetic observatory","summary":"Test-only knowledge object.","properties":{"frame":"heliocentric"},"provenance":provenance});
    let (status, saved_object) = request(
        port,
        "POST",
        "/v1/knowledge/objects",
        Some(access),
        None,
        Some(&object),
    );
    assert_eq!(status, 201);
    assert_eq!(saved_object["timeBasis"], "host-unix-clock-unverified");
    let (status, objects) = request(
        port,
        "GET",
        "/v1/knowledge/objects",
        Some(access),
        None,
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(
        objects["objects"][0]["provenance"]["methodId"],
        "method:demo-v1"
    );
    let assertion = json!({"assertionId":"assertion:position","subjectId":"entity:observatory","predicate":"state.position","value":"simulation-only","confidence":0.25,"verificationState":"provisional","provenance":provenance});
    let (status, _) = request(
        port,
        "POST",
        "/v1/knowledge/assertions",
        Some(access),
        None,
        Some(&assertion),
    );
    assert_eq!(status, 201);
    let (status, assertions) = request(
        port,
        "GET",
        "/v1/knowledge/assertions",
        Some(access),
        None,
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(
        assertions["assertions"][0]["verificationState"],
        "provisional"
    );
    let relation = json!({"relationId":"relation:observes","subjectId":"entity:observatory","predicate":"observes","objectId":"entity:observatory","provenance":provenance});
    let (status, _) = request(
        port,
        "POST",
        "/v1/knowledge/relations",
        Some(access),
        None,
        Some(&relation),
    );
    assert_eq!(status, 201);
    let (status, loaded) = request(
        port,
        "GET",
        &format!("/v1/projects/{project}"),
        Some(access),
        None,
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(loaded["currentVersion"], 0);
    let next = json!({"schema":"maataa.project-record/1.0.0","projectId":project,"title":"Synthetic test","domain":"film-production","ownerApp":"tlps","currentVersion":1,"versions":[{"version":1,"baseVersion":null,"summary":"Synthetic approved test change","artifacts":[],"checks":[],"approval":{"decidedBy":"local-user","proposalDigest":format!("sha256:{}","0".repeat(64))},"recordedAt":1,"timeBasis":"host-unix-clock-unverified"}]});
    let (status, _) = request(
        port,
        "PUT",
        &format!("/v1/projects/{project}"),
        Some(access),
        Some(("If-Match", "0")),
        Some(&next),
    );
    assert_eq!(status, 200);
    let (status, _) = request(
        port,
        "PUT",
        &format!("/v1/projects/{project}"),
        Some(access),
        Some(("If-Match", "0")),
        Some(&next),
    );
    assert_eq!(status, 409);
    // The server stamps version times itself, in Unix milliseconds.
    let (status, stored) = request(
        port,
        "GET",
        &format!("/v1/projects/{project}"),
        Some(access),
        None,
        None,
    );
    assert_eq!(status, 200);
    assert!(stored["versions"][0]["recordedAt"].as_i64().unwrap() >= 100_000_000_000);
    let (status, events) = request(
        port,
        "GET",
        &format!("/v1/projects/{project}/events"),
        Some(access),
        None,
        None,
    );
    assert_eq!(status, 200);
    assert_eq!(events["events"].as_array().unwrap().len(), 2);

    // Exercise authorization at the HTTP boundary, not only through Store unit
    // tests. A read-only credential may inspect its own project/knowledge, but
    // must not write or cross the project boundary.
    let (status, read_only) = request(
        port,
        "POST",
        "/v1/admin/tokens",
        Some(root),
        None,
        Some(
            &json!({"principalId":"tester","projectId":project,"scopes":["project:read","knowledge:read"],"ttlSeconds":3600}),
        ),
    );
    assert_eq!(status, 201);
    let read_only_access = read_only["access_token"].as_str().unwrap();
    let (status, _) = request(
        port,
        "GET",
        &format!("/v1/projects/{project}"),
        Some(read_only_access),
        None,
        None,
    );
    assert_eq!(status, 200);
    let (status, _) = request(
        port,
        "GET",
        &format!("/v1/projects/prj:{}", uuid::Uuid::new_v4()),
        Some(read_only_access),
        None,
        None,
    );
    assert_eq!(status, 403);
    let (status, _) = request(
        port,
        "PUT",
        &format!("/v1/projects/{project}"),
        Some(read_only_access),
        Some(("If-Match", "1")),
        Some(&next),
    );
    assert_eq!(status, 403);
    let (status, _) = request(
        port,
        "POST",
        "/v1/knowledge/objects",
        Some(read_only_access),
        None,
        Some(
            &json!({"objectId":"entity:read-only-write-attempt","objectType":"entity","label":"Denied","summary":"Must not persist.","properties":{},"provenance":provenance}),
        ),
    );
    assert_eq!(status, 403);

    // A write-only knowledge credential must not gain read access by reaching
    // the list route with a valid project-scoped bearer token.
    let (status, write_only) = request(
        port,
        "POST",
        "/v1/admin/tokens",
        Some(root),
        None,
        Some(
            &json!({"principalId":"tester","projectId":project,"scopes":["knowledge:write"],"ttlSeconds":3600}),
        ),
    );
    assert_eq!(status, 201);
    let write_only_access = write_only["access_token"].as_str().unwrap();
    let (status, _) = request(
        port,
        "POST",
        "/v1/knowledge/objects",
        Some(write_only_access),
        None,
        Some(
            &json!({"objectId":"entity:write-only","objectType":"entity","label":"Write-only fixture","summary":"Synthetic test fixture.","properties":{},"provenance":provenance}),
        ),
    );
    assert_eq!(status, 201);
    let (status, _) = request(
        port,
        "GET",
        "/v1/knowledge/objects",
        Some(write_only_access),
        None,
        None,
    );
    assert_eq!(status, 403);

    let (status, _) = request(port, "GET", "/v1/auth/whoami", None, None, None);
    assert_eq!(status, 401);

    let (status, _) = request(
        port,
        "POST",
        &format!("/v1/admin/tokens/{token_id}/revoke"),
        Some(root),
        None,
        None,
    );
    assert_eq!(status, 200);
    let (status, _) = request(port, "GET", "/v1/auth/whoami", Some(access), None, None);
    assert_eq!(status, 401);
}
