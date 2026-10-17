//! Desktop route to the local MAATAA Auth + API runtime (apps/maataa-auth-api).
//!
//! Product windows never hold the bearer token and never talk to the API
//! directly (the CSP allows IPC only). They ask Desktop, which keeps the token
//! in this process, forwards an allow-list of project routes to the loopback
//! service, and links its own project entry to the API project ID and version
//! it sees in the responses. The API is the version authority; Desktop caches.
//!
//! This module has no Tauri dependency so it is unit-tested on any host.

use serde::{Deserialize, Serialize};
use std::{
    io::{Read, Write},
    os::unix::{
        fs::{FileTypeExt, MetadataExt, PermissionsExt},
        net::UnixStream,
    },
    path::PathBuf,
    time::Duration,
};

use crate::project_link::{is_record_id, MAX_RECORD_VERSION};

/// Same request cap as the service (`MAX_BODY_BYTES`).
pub const MAX_REQUEST_BYTES: usize = 1_048_576;
pub const MAX_RESPONSE_BYTES: usize = 2 * 1_048_576;
const TIMEOUT: Duration = Duration::from_secs(5);

/// What the page receives: the HTTP status and the JSON text, never the token.
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub struct ApiReply {
    pub status: u16,
    pub body: String,
}

/// Desktop's cached view of the API project behind its entry.
#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct ApiLink {
    pub project_id: String,
    pub current_version: u32,
    /// Unix milliseconds, host clock, unverified.
    pub observed_at_unix_ms: u64,
    pub time_basis: String,
}

#[derive(Debug, PartialEq, Eq)]
pub enum LinkChange {
    Unchanged,
    /// First link, or the session now points at a different API project.
    Linked(ApiLink),
    /// Same project; the API reported a different current version.
    VersionObserved(ApiLink),
}

/// Private filesystem endpoint shared with the local Auth/API process.
pub fn configured_socket_path() -> Result<PathBuf, String> {
    let path = match std::env::var_os("MAATAA_AUTH_API_SOCKET") {
        Some(path) => PathBuf::from(path),
        None => {
            let home = std::env::var_os("HOME").ok_or_else(|| {
                "unavailable: HOME is required to locate the private Auth/API socket.".to_string()
            })?;
            PathBuf::from(home)
                .join("Library/Application Support/MAATAA/AuthAPI/maataa-auth-api.sock")
        }
    };
    validate_private_socket_path(&path)?;
    Ok(path)
}

fn validate_private_socket_path(path: &std::path::Path) -> Result<(), String> {
    let refuse =
        || "unavailable: The Auth/API socket is missing or its permissions are unsafe.".to_string();
    let parent = path.parent().ok_or_else(refuse)?;
    let parent_meta = std::fs::symlink_metadata(parent).map_err(|_| refuse())?;
    let socket_meta = std::fs::symlink_metadata(path).map_err(|_| refuse())?;
    let home = std::env::var_os("HOME").ok_or_else(refuse)?;
    let home_meta = std::fs::metadata(home).map_err(|_| refuse())?;
    if !parent_meta.file_type().is_dir()
        || parent_meta.permissions().mode() & 0o077 != 0
        || parent_meta.uid() != home_meta.uid()
        || !socket_meta.file_type().is_socket()
        || socket_meta.permissions().mode() & 0o077 != 0
        || socket_meta.uid() != parent_meta.uid()
    {
        return Err(refuse());
    }
    Ok(())
}

/// Same shape the service issues: `mta_` + URL-safe base64, 40–100 chars.
pub fn validate_token(token: &str) -> Result<(), String> {
    let ok = (40..=100).contains(&token.len())
        && token.starts_with("mta_")
        && token
            .bytes()
            .all(|b| b.is_ascii_alphanumeric() || b == b'_' || b == b'-');
    if ok {
        Ok(())
    } else {
        Err("invalid: This is not a MAATAA project token.".into())
    }
}

/// The only routes a product window may reach through Desktop. Admin routes,
/// knowledge routes and anything else are refused before any network call.
pub fn validate_route(
    method: &str,
    path: &str,
    body: Option<&str>,
    if_match: Option<u32>,
) -> Result<(), String> {
    let refuse =
        || Err::<(), String>("invalid: MAATAA Desktop does not forward this request.".into());
    if body.is_some_and(|text| text.len() > MAX_REQUEST_BYTES) {
        return refuse();
    }
    let project = path.strip_prefix("/v1/projects/");
    match (method, path, project) {
        ("POST", "/v1/projects", _) if body.is_some() && if_match.is_none() => Ok(()),
        ("GET", _, Some(rest)) if body.is_none() && if_match.is_none() => {
            let id = rest.strip_suffix("/events").unwrap_or(rest);
            if is_record_id(id) {
                Ok(())
            } else {
                refuse()
            }
        }
        ("PUT", _, Some(id))
            if is_record_id(id)
                && body.is_some()
                && if_match.is_some_and(|v| v <= MAX_RECORD_VERSION) =>
        {
            Ok(())
        }
        _ => refuse(),
    }
}

/// The project ID a successful response speaks for, and its current version.
pub fn observed_project(method: &str, path: &str, reply: &ApiReply) -> Option<(String, u32)> {
    if !(200..=299).contains(&reply.status) || path.ends_with("/events") {
        return None;
    }
    if !(method == "GET" || method == "PUT" || (method == "POST" && path == "/v1/projects")) {
        return None;
    }
    let value: serde_json::Value = serde_json::from_str(&reply.body).ok()?;
    let project_id = value.get("projectId")?.as_str()?;
    let version = u32::try_from(value.get("currentVersion")?.as_u64()?).ok()?;
    if !is_record_id(project_id) || version > MAX_RECORD_VERSION {
        return None;
    }
    if let Some(id) = path.strip_prefix("/v1/projects/") {
        if id != project_id {
            return None;
        }
    }
    Some((project_id.to_string(), version))
}

/// The API is the authority: Desktop's cached link follows whatever it reports.
pub fn next_link(
    existing: Option<&ApiLink>,
    project_id: &str,
    version: u32,
    now_unix_ms: u64,
) -> LinkChange {
    let link = ApiLink {
        project_id: project_id.to_string(),
        current_version: version,
        observed_at_unix_ms: now_unix_ms,
        time_basis: "host-unix-clock-unverified".into(),
    };
    match existing {
        Some(current) if current.project_id == project_id && current.current_version == version => {
            LinkChange::Unchanged
        }
        Some(current) if current.project_id == project_id => LinkChange::VersionObserved(link),
        _ => LinkChange::Linked(link),
    }
}

/// `projectId` from a 200 `/v1/auth/whoami` reply.
pub fn whoami_project(reply: &ApiReply) -> Option<String> {
    if reply.status != 200 {
        return None;
    }
    let value: serde_json::Value = serde_json::from_str(&reply.body).ok()?;
    let id = value.get("project_id")?.as_str()?;
    is_record_id(id).then(|| id.to_string())
}

/// One HTTP/1.1 request over the private Unix socket. Inputs are validated by the caller.
pub fn send(
    method: &str,
    path: &str,
    token: &str,
    body: Option<&str>,
    if_match: Option<u32>,
) -> Result<ApiReply, String> {
    let socket_path = configured_socket_path()?;
    send_to(&socket_path, method, path, token, body, if_match)
}

fn send_to(
    socket_path: &std::path::Path,
    method: &str,
    route: &str,
    token: &str,
    body: Option<&str>,
    if_match: Option<u32>,
) -> Result<ApiReply, String> {
    let mut stream = UnixStream::connect(socket_path).map_err(|_| {
        "unavailable: The MAATAA Auth API is not running on this computer.".to_string()
    })?;
    stream.set_read_timeout(Some(TIMEOUT)).ok();
    stream.set_write_timeout(Some(TIMEOUT)).ok();
    let mut request = format!(
        "{method} {route} HTTP/1.1\r\nHost: localhost\r\nAuthorization: Bearer {token}\r\nAccept: application/json\r\nConnection: close\r\n"
    );
    if let Some(version) = if_match {
        request.push_str(&format!("If-Match: \"{version}\"\r\n"));
    }
    match body {
        Some(text) => request.push_str(&format!(
            "Content-Type: application/json\r\nContent-Length: {}\r\n\r\n{text}",
            text.len()
        )),
        None => request.push_str("Content-Length: 0\r\n\r\n"),
    }
    stream
        .write_all(request.as_bytes())
        .map_err(|_| "unavailable: The request could not be sent.".to_string())?;
    let mut raw = Vec::new();
    stream
        .take((MAX_RESPONSE_BYTES + 16_384) as u64)
        .read_to_end(&mut raw)
        .map_err(|_| "unavailable: The MAATAA Auth API did not answer in time.".to_string())?;
    parse_response(&raw)
}

pub fn parse_response(raw: &[u8]) -> Result<ApiReply, String> {
    let bad = || "unavailable: The MAATAA Auth API sent an unreadable response.".to_string();
    let split = raw
        .windows(4)
        .position(|w| w == b"\r\n\r\n")
        .ok_or_else(bad)?;
    let head = std::str::from_utf8(&raw[..split]).map_err(|_| bad())?;
    let mut lines = head.split("\r\n");
    let status = lines
        .next()
        .and_then(|line| line.split(' ').nth(1))
        .and_then(|code| code.parse::<u16>().ok())
        .filter(|code| (100..=599).contains(code))
        .ok_or_else(bad)?;
    let mut length: Option<usize> = None;
    let mut chunked = false;
    for line in lines {
        let Some((name, value)) = line.split_once(':') else {
            continue;
        };
        let value = value.trim();
        if name.eq_ignore_ascii_case("content-length") {
            length = Some(value.parse().map_err(|_| bad())?);
        } else if name.eq_ignore_ascii_case("transfer-encoding") {
            chunked = value.eq_ignore_ascii_case("chunked");
        }
    }
    let rest = &raw[split + 4..];
    let body = if chunked {
        decode_chunked(rest).ok_or_else(bad)?
    } else {
        match length {
            Some(n) if n <= rest.len() => rest[..n].to_vec(),
            Some(_) => return Err(bad()),
            None => rest.to_vec(),
        }
    };
    if body.len() > MAX_RESPONSE_BYTES {
        return Err(bad());
    }
    let body = String::from_utf8(body).map_err(|_| bad())?;
    Ok(ApiReply { status, body })
}

fn decode_chunked(mut data: &[u8]) -> Option<Vec<u8>> {
    let mut out = Vec::new();
    loop {
        let end = data.windows(2).position(|w| w == b"\r\n")?;
        let size_text = std::str::from_utf8(&data[..end]).ok()?;
        let size = usize::from_str_radix(size_text.split(';').next()?.trim(), 16).ok()?;
        data = &data[end + 2..];
        if size == 0 {
            return Some(out);
        }
        if data.len() < size + 2 || out.len() + size > MAX_RESPONSE_BYTES {
            return None;
        }
        out.extend_from_slice(&data[..size]);
        data = &data[size + 2..];
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::os::unix::{fs::PermissionsExt, net::UnixListener};

    const ID: &str = "prj:11111111-2222-4333-8444-555555555555";
    const OTHER: &str = "prj:99999999-2222-4333-8444-555555555555";

    fn reply(status: u16, body: &str) -> ApiReply {
        ApiReply {
            status,
            body: body.into(),
        }
    }

    #[test]
    fn tokens_must_look_like_service_tokens() {
        assert!(validate_token(&format!("mta_{}", "A".repeat(43))).is_ok());
        for bad in [
            "",
            "mta_short",
            &format!("xyz_{}", "A".repeat(43)),
            &format!("mta_{}\r\nX-Evil: 1", "A".repeat(40)),
            &format!("mta_{}", "A".repeat(120)),
        ] {
            assert!(validate_token(bad).is_err(), "accepted {bad:?}");
        }
    }

    #[test]
    fn only_project_routes_are_forwarded() {
        let body = Some("{}");
        assert!(validate_route("POST", "/v1/projects", body, None).is_ok());
        assert!(validate_route("GET", &format!("/v1/projects/{ID}"), None, None).is_ok());
        assert!(validate_route("GET", &format!("/v1/projects/{ID}/events"), None, None).is_ok());
        assert!(validate_route("PUT", &format!("/v1/projects/{ID}"), body, Some(1)).is_ok());
        for (method, path, body, if_match) in [
            ("POST", "/v1/admin/tokens", body, None),
            ("POST", "/v1/admin/principals", body, None),
            ("GET", "/v1/knowledge/objects", None, None),
            ("GET", "/v1/auth/whoami", None, None),
            ("DELETE", "/v1/projects/x", None, None),
            ("PUT", &format!("/v1/projects/{ID}") as &str, body, None),
            (
                "PUT",
                &format!("/v1/projects/{ID}/events") as &str,
                body,
                Some(1),
            ),
            ("GET", "/v1/projects/../admin/tokens", None, None),
            ("GET", "/v1/projects/prj:NOT-A-UUID", None, None),
            ("GET", &format!("/v1/projects/{ID}") as &str, body, None),
            ("POST", "/v1/projects", None, None),
        ] {
            assert!(
                validate_route(method, path, body, if_match).is_err(),
                "forwarded {method} {path}"
            );
        }
        let huge = "x".repeat(MAX_REQUEST_BYTES + 1);
        assert!(validate_route("POST", "/v1/projects", Some(&huge), None).is_err());
    }

    #[test]
    fn observes_project_versions_only_from_matching_successes() {
        let body = format!(r#"{{"projectId":"{ID}","currentVersion":3}}"#);
        let path = format!("/v1/projects/{ID}");
        assert_eq!(
            observed_project("GET", &path, &reply(200, &body)),
            Some((ID.to_string(), 3))
        );
        assert_eq!(
            observed_project("PUT", &path, &reply(200, &body)),
            Some((ID.to_string(), 3))
        );
        assert_eq!(
            observed_project("POST", "/v1/projects", &reply(201, &body)),
            Some((ID.to_string(), 3))
        );
        assert_eq!(observed_project("GET", &path, &reply(409, &body)), None);
        assert_eq!(
            observed_project("GET", &format!("/v1/projects/{OTHER}"), &reply(200, &body)),
            None
        );
        assert_eq!(
            observed_project("GET", &format!("{path}/events"), &reply(200, &body)),
            None
        );
        assert_eq!(
            observed_project("GET", &path, &reply(200, "not json")),
            None
        );
    }

    #[test]
    fn the_api_version_is_the_authority_for_the_cached_link() {
        let first = match next_link(None, ID, 0, 10) {
            LinkChange::Linked(link) => link,
            other => panic!("{other:?}"),
        };
        assert_eq!(first.time_basis, "host-unix-clock-unverified");
        assert_eq!(next_link(Some(&first), ID, 0, 20), LinkChange::Unchanged);
        assert!(matches!(
            next_link(Some(&first), ID, 3, 30),
            LinkChange::VersionObserved(ApiLink {
                current_version: 3,
                ..
            })
        ));
        // A lower version is still the API's answer (e.g. a restored backup).
        let at_three = ApiLink {
            current_version: 3,
            ..first.clone()
        };
        assert!(matches!(
            next_link(Some(&at_three), ID, 2, 40),
            LinkChange::VersionObserved(_)
        ));
        assert!(matches!(
            next_link(Some(&at_three), OTHER, 1, 50),
            LinkChange::Linked(_)
        ));
    }

    #[test]
    fn parses_content_length_and_chunked_responses() {
        let raw = b"HTTP/1.1 201 Created\r\ncontent-type: application/json\r\ncontent-length: 2\r\n\r\n{}";
        assert_eq!(parse_response(raw).unwrap(), reply(201, "{}"));
        let chunked = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n4\r\n{\"a\"\r\n3\r\n:1}\r\n0\r\n\r\n";
        assert_eq!(parse_response(chunked).unwrap(), reply(200, "{\"a\":1}"));
        assert!(parse_response(b"garbage").is_err());
        assert!(parse_response(b"HTTP/1.1 200 OK\r\ncontent-length: 10\r\n\r\n{}").is_err());
    }

    #[test]
    fn whoami_yields_the_session_project() {
        let body =
            format!(r#"{{"principal_id":"p","project_id":"{ID}","scopes":[],"expires_at":1}}"#);
        assert_eq!(whoami_project(&reply(200, &body)), Some(ID.into()));
        assert_eq!(whoami_project(&reply(401, &body)), None);
    }

    #[test]
    fn unreachable_service_fails_closed() {
        let path = std::env::temp_dir().join(format!(
            "maataa-test-missing-socket-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        let error = send_to(&path, "GET", "/v1/auth/whoami", "mta_x", None, None).unwrap_err();
        assert!(error.starts_with("unavailable"));
    }

    #[test]
    fn private_socket_requires_owner_only_directory_and_socket() {
        let directory = std::path::PathBuf::from("/tmp").join(format!(
            "mta-perm-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        std::fs::create_dir(&directory).unwrap();
        std::fs::set_permissions(&directory, std::fs::Permissions::from_mode(0o700)).unwrap();
        let path = directory.join("api.sock");
        let listener = UnixListener::bind(&path).unwrap();
        std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600)).unwrap();
        assert!(validate_private_socket_path(&path).is_ok());

        std::fs::set_permissions(&directory, std::fs::Permissions::from_mode(0o755)).unwrap();
        assert!(validate_private_socket_path(&path).is_err());
        drop(listener);
        std::fs::remove_dir_all(directory).unwrap();
    }

    #[test]
    fn desktop_http_exchange_runs_through_the_private_socket() {
        use std::{
            io::{Read, Write},
            os::unix::fs::PermissionsExt,
        };
        let directory = std::path::PathBuf::from("/tmp").join(format!(
            "mta-http-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        std::fs::create_dir(&directory).unwrap();
        std::fs::set_permissions(&directory, std::fs::Permissions::from_mode(0o700)).unwrap();
        let path = directory.join("api.sock");
        let listener = UnixListener::bind(&path).unwrap();
        std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600)).unwrap();
        let server = std::thread::spawn(move || {
            let (mut stream, _) = listener.accept().unwrap();
            let mut request = Vec::new();
            let mut chunk = [0_u8; 512];
            while !request.windows(4).any(|window| window == b"\r\n\r\n") {
                let read = stream.read(&mut chunk).unwrap();
                assert!(read > 0, "client closed before completing HTTP headers");
                request.extend_from_slice(&chunk[..read]);
            }
            let request = String::from_utf8(request).unwrap();
            assert!(request.contains("GET /v1/auth/whoami HTTP/1.1"));
            assert!(request.contains("Authorization: Bearer test-token"));
            stream
                .write_all(b"HTTP/1.1 200 OK\r\nContent-Length: 2\r\nConnection: close\r\n\r\n{}")
                .unwrap();
        });

        let response = send_to(&path, "GET", "/v1/auth/whoami", "test-token", None, None).unwrap();
        assert_eq!(response, reply(200, "{}"));
        server.join().unwrap();
        std::fs::remove_dir_all(directory).unwrap();
    }
}
