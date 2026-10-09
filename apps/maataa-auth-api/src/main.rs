use hyper::service::service_fn;
use hyper_util::rt::{TokioIo, TokioTimer};
use maataa_auth_api::{handle, AppState, Store};
use std::{env, error::Error, path::Path, sync::Arc, time::Duration};
use tokio::{net::TcpListener, task::JoinSet, time::Instant};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error + Send + Sync>> {
    let db_path = env::var("MAATAA_AUTH_API_DB")
        .unwrap_or_else(|_| "./data/maataa-auth-api.sqlite3".to_owned());
    if let Some(parent) = Path::new(&db_path).parent() {
        ensure_private_directory(parent)?;
    }
    let args: Vec<String> = env::args().skip(1).collect();
    if args.first().is_some_and(|arg| arg == "backup") {
        if args.len() != 2 {
            return Err("usage: maataa-auth-api backup <new-path-in-private-directory>".into());
        }
        Store::open(&db_path)?.backup_to(Path::new(&args[1]))?;
        eprintln!("verified SQLite backup created at the requested path");
        return Ok(());
    }
    if !args.is_empty() {
        return Err("usage: maataa-auth-api [backup <new-path-in-private-directory>]".into());
    }
    let bootstrap = load_bootstrap_token()?;
    let port = env::var("MAATAA_AUTH_API_PORT")
        .ok()
        .and_then(|v| v.parse::<u16>().ok())
        .unwrap_or(4381);
    let listener = TcpListener::bind(("127.0.0.1", port)).await?;
    let state = Arc::new(AppState::new(Store::open(&db_path)?, &bootstrap)?);
    let permits = Arc::new(tokio::sync::Semaphore::new(128));
    let mut connections = JoinSet::new();
    eprintln!("MAATAA Auth/API runtime listening on http://127.0.0.1:{}; database {}; loopback-only; maximum 128 concurrent connections; host time unverified",port,db_path);
    loop {
        tokio::select! {
            _ = tokio::signal::ctrl_c() => break,
            Some(_) = connections.join_next(), if !connections.is_empty() => {},
            permit = Arc::clone(&permits).acquire_owned() => {
                let permit = permit?;
                let accepted = tokio::select! {
                    _ = tokio::signal::ctrl_c() => break,
                    result = listener.accept() => result?,
                };
                let (stream, _peer) = accepted;
                let state = Arc::clone(&state);
                connections.spawn(async move {
                    let _permit = permit;
                    let service = service_fn(move |req| {
                        let state = Arc::clone(&state);
                        async move { Ok::<_, std::convert::Infallible>(handle(req, (*state).clone()).await) }
                    });
                    let mut builder = hyper::server::conn::http1::Builder::new();
                    builder.timer(TokioTimer::new());
                    match tokio::time::timeout(Duration::from_secs(60), builder.serve_connection(TokioIo::new(stream), service)).await {
                        Ok(Ok(())) => {},
                        Ok(Err(error)) => eprintln!("HTTP connection ended: {error}"),
                        Err(_) => eprintln!("HTTP connection closed at the 60-second deadline"),
                    }
                });
            }
        }
    }

    let drain_deadline = Instant::now() + Duration::from_secs(10);
    while !connections.is_empty() {
        tokio::select! {
            Some(_) = connections.join_next() => {},
            _ = tokio::time::sleep_until(drain_deadline) => {
                connections.abort_all();
                break;
            }
        }
    }
    while connections.join_next().await.is_some() {}
    eprintln!("MAATAA Auth/API runtime shutdown complete");
    Ok(())
}

fn load_bootstrap_token() -> Result<String, Box<dyn Error + Send + Sync>> {
    let env_value = env::var_os("MAATAA_BOOTSTRAP_TOKEN");
    let file_value = env::var_os("MAATAA_BOOTSTRAP_TOKEN_FILE");
    let raw = match (env_value, file_value) {
        (Some(_), Some(_)) => return Err("configure only one bootstrap-token source".into()),
        (Some(value), None) => value
            .into_string()
            .map_err(|_| "bootstrap token must be valid UTF-8")?,
        (None, Some(path)) => return read_bootstrap_token_file(Path::new(&path)),
        (None, None) => {
            return Err(
                "set MAATAA_BOOTSTRAP_TOKEN_FILE (preferred) or MAATAA_BOOTSTRAP_TOKEN".into(),
            )
        }
    };
    validate_bootstrap_token(&raw).map_err(Into::into)
}

fn read_bootstrap_token_file(path: &Path) -> Result<String, Box<dyn Error + Send + Sync>> {
    let metadata = std::fs::metadata(path)?;
    if !metadata.is_file() {
        return Err("bootstrap-token path must be a regular file".into());
    }
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        if metadata.permissions().mode() & 0o077 != 0 {
            return Err("bootstrap-token file must not be accessible by group or others".into());
        }
    }
    validate_bootstrap_token(&std::fs::read_to_string(path)?).map_err(Into::into)
}

fn validate_bootstrap_token(raw: &str) -> Result<String, std::io::Error> {
    let token = raw.trim_end_matches(['\r', '\n']);
    if !(32..=256).contains(&token.len()) || token.trim() != token || token.contains(['\r', '\n']) {
        return Err(std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "bootstrap token must contain 32 to 256 non-whitespace bytes",
        ));
    }
    Ok(token.to_owned())
}

#[cfg(unix)]
fn ensure_private_directory(path: &Path) -> std::io::Result<()> {
    use std::os::unix::fs::{DirBuilderExt, PermissionsExt};
    if !path.exists() {
        std::fs::DirBuilder::new()
            .recursive(true)
            .mode(0o700)
            .create(path)?;
    }
    let permissions = std::fs::metadata(path)?.permissions();
    if permissions.mode() & 0o077 != 0 {
        return Err(std::io::Error::new(
            std::io::ErrorKind::PermissionDenied,
            format!(
                "database directory must be private (mode 0700; observed {:o})",
                permissions.mode() & 0o777
            ),
        ));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bootstrap_token_validation_accepts_secret_with_optional_newline() {
        let secret = "b".repeat(32);
        assert_eq!(validate_bootstrap_token(&secret).unwrap(), secret);
        assert_eq!(
            validate_bootstrap_token(&format!("{secret}\n")).unwrap(),
            secret
        );
    }

    #[test]
    fn bootstrap_token_validation_rejects_short_or_whitespace_values() {
        assert!(validate_bootstrap_token("short").is_err());
        assert!(validate_bootstrap_token(&format!(" {}", "x".repeat(32))).is_err());
        assert!(validate_bootstrap_token(&format!("{}\nmore", "x".repeat(32))).is_err());
    }

    #[cfg(unix)]
    #[test]
    fn bootstrap_token_file_must_be_private() {
        use std::os::unix::fs::PermissionsExt;
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("token");
        std::fs::write(&path, "x".repeat(32)).unwrap();
        std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o644)).unwrap();
        assert!(read_bootstrap_token_file(&path).is_err());
        std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600)).unwrap();
        assert_eq!(read_bootstrap_token_file(&path).unwrap(), "x".repeat(32));
    }
}

#[cfg(not(unix))]
fn ensure_private_directory(path: &Path) -> std::io::Result<()> {
    std::fs::create_dir_all(path)
}
