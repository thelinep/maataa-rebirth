use hyper::service::service_fn;
use hyper_util::rt::{TokioIo, TokioTimer};
use maataa_auth_api::{
    handle, now_unix_ms,
    retention::{prune_backups, RETENTION_DAYS},
    AppState, Store,
};
use std::{
    env,
    error::Error,
    path::{Path, PathBuf},
    sync::Arc,
    time::Duration,
};
#[cfg(unix)]
use tokio::net::{UnixListener, UnixStream};
use tokio::{
    io::{AsyncRead, AsyncWrite},
    net::TcpListener,
    task::JoinSet,
    time::Instant,
};

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
    if args.first().is_some_and(|arg| arg == "purge") && args.len() == 1 {
        let purged = Store::open(&db_path)?.purge_due(now_unix_ms())?;
        eprintln!("purged {} deleted project(s) past the {RETENTION_DAYS}-day window", purged.len());
        return Ok(());
    }
    if args.first().is_some_and(|arg| arg == "prune-backups") {
        if args.len() != 2 {
            return Err("usage: maataa-auth-api prune-backups <private-backup-directory>".into());
        }
        let removed = prune_backups(Path::new(&args[1]), std::time::SystemTime::now())?;
        eprintln!("removed {} backup(s) older than {RETENTION_DAYS} days", removed.len());
        return Ok(());
    }
    if !args.is_empty() {
        return Err(USAGE.into());
    }
    let bootstrap = load_bootstrap_token()?;
    let listener = match tcp_port()? {
        Some(port) => Some((TcpListener::bind(("127.0.0.1", port)).await?, port)),
        None => None,
    };
    #[cfg(unix)]
    let (unix_listener, socket_path) = bind_private_socket()?;
    let store = Store::open(&db_path)?;
    let state = Arc::new(AppState::new(store.clone(), &bootstrap)?);
    // Purge deleted projects whose retention window ended: now, then hourly.
    let purger = tokio::spawn(async move {
        let mut tick = tokio::time::interval(Duration::from_secs(3_600));
        loop {
            tick.tick().await;
            let store = store.clone();
            match tokio::task::spawn_blocking(move || store.purge_due(now_unix_ms())).await {
                Ok(Ok(purged)) if !purged.is_empty() => {
                    eprintln!("purged {} deleted project(s) past the {RETENTION_DAYS}-day window", purged.len())
                }
                Ok(Ok(_)) => {}
                _ => eprintln!("scheduled purge failed; it will retry within the hour"),
            }
        }
    });
    let permits = Arc::new(tokio::sync::Semaphore::new(128));
    let mut connections = JoinSet::new();
    let tcp = listener
        .as_ref()
        .map(|(_, port)| format!("development HTTP proxy on http://127.0.0.1:{port}"))
        .unwrap_or_else(|| "no TCP listener".to_owned());
    #[cfg(unix)]
    eprintln!("MAATAA Auth/API runtime listening on a private Unix socket {}; {tcp}; database {}; maximum 128 concurrent connections; host time unverified",socket_path.display(),db_path);
    #[cfg(not(unix))]
    eprintln!("MAATAA Auth/API runtime listening on {tcp}; database {}; loopback-only; maximum 128 concurrent connections; host time unverified",db_path);
    let listener = listener.map(|(l, _)| l);
    loop {
        tokio::select! {
            _ = tokio::signal::ctrl_c() => break,
            Some(_) = connections.join_next(), if !connections.is_empty() => {},
            permit = Arc::clone(&permits).acquire_owned() => {
                let permit = permit?;
                enum AcceptedStream {
                    Tcp(tokio::net::TcpStream),
                    #[cfg(unix)]
                    Unix(UnixStream),
                }
                #[cfg(unix)]
                let accepted = tokio::select! {
                    _ = tokio::signal::ctrl_c() => break,
                    result = accept_tcp(listener.as_ref()) => AcceptedStream::Tcp(result?.0),
                    result = unix_listener.accept() => AcceptedStream::Unix(result?.0),
                };
                #[cfg(not(unix))]
                let accepted = tokio::select! {
                    _ = tokio::signal::ctrl_c() => break,
                    result = accept_tcp(listener.as_ref()) => AcceptedStream::Tcp(result?.0),
                };
                match accepted {
                    AcceptedStream::Tcp(stream) => spawn_connection(&mut connections, stream, Arc::clone(&state), permit),
                    #[cfg(unix)]
                    AcceptedStream::Unix(stream) => spawn_connection(&mut connections, stream, Arc::clone(&state), permit),
                }
            }
        }
    }

    purger.abort();
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
    #[cfg(unix)]
    if let Err(error) = std::fs::remove_file(&socket_path) {
        eprintln!(
            "could not remove private API socket {}: {error}",
            socket_path.display()
        );
    }
    eprintln!("MAATAA Auth/API runtime shutdown complete");
    Ok(())
}

const USAGE: &str = "usage: maataa-auth-api [backup <new-path-in-private-directory> | purge | prune-backups <private-backup-directory>]";

/// `MAATAA_AUTH_API_PORT`: a loopback port for the development HTTP proxy
/// (default 4381), or `off` for none. Hosted origins run with `off` and reach
/// the API only through the private Unix socket.
fn tcp_port() -> Result<Option<u16>, Box<dyn Error + Send + Sync>> {
    match env::var("MAATAA_AUTH_API_PORT") {
        Err(_) => Ok(Some(4381)),
        Ok(value) if value == "off" => {
            if cfg!(unix) {
                Ok(None)
            } else {
                Err("MAATAA_AUTH_API_PORT=off needs the Unix socket, which this platform lacks".into())
            }
        }
        Ok(value) => value
            .parse::<u16>()
            .ok()
            .filter(|port| *port != 0)
            .map(Some)
            .ok_or_else(|| "MAATAA_AUTH_API_PORT must be a port number or off".into()),
    }
}

/// Accepts on the TCP listener, or waits forever when there is none.
async fn accept_tcp(
    listener: Option<&TcpListener>,
) -> std::io::Result<(tokio::net::TcpStream, std::net::SocketAddr)> {
    match listener {
        Some(listener) => listener.accept().await,
        None => std::future::pending().await,
    }
}

fn spawn_connection<S>(
    connections: &mut JoinSet<()>,
    stream: S,
    state: Arc<AppState>,
    permit: tokio::sync::OwnedSemaphorePermit,
) where
    S: AsyncRead + AsyncWrite + Unpin + Send + 'static,
{
    connections.spawn(async move {
        let _permit = permit;
        let service = service_fn(move |req| {
            let state = Arc::clone(&state);
            async move { Ok::<_, std::convert::Infallible>(handle(req, (*state).clone()).await) }
        });
        let mut builder = hyper::server::conn::http1::Builder::new();
        builder.timer(TokioTimer::new());
        match tokio::time::timeout(
            Duration::from_secs(60),
            builder.serve_connection(TokioIo::new(stream), service),
        )
        .await
        {
            Ok(Ok(())) => {}
            Ok(Err(error)) => eprintln!("HTTP connection ended: {error}"),
            Err(_) => eprintln!("HTTP connection closed at the 60-second deadline"),
        }
    });
}

#[cfg(unix)]
fn bind_private_socket() -> Result<(UnixListener, PathBuf), Box<dyn Error + Send + Sync>> {
    use std::os::unix::fs::{FileTypeExt, PermissionsExt};
    let path = configured_socket_path()?;
    let parent = path
        .parent()
        .ok_or("socket path needs a parent directory")?;
    ensure_private_socket_directory(parent)?;
    match std::fs::symlink_metadata(&path) {
        Ok(metadata) if metadata.file_type().is_socket() => {
            return Err(format!("private API socket already exists; verify no service is running, then remove stale socket {}", path.display()).into());
        }
        Ok(_) => {
            return Err(format!("refusing to replace non-socket at {}", path.display()).into())
        }
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => {}
        Err(error) => return Err(error.into()),
    }
    let listener = UnixListener::bind(&path)?;
    if let Err(error) = std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600)) {
        let _ = std::fs::remove_file(&path);
        return Err(error.into());
    }
    Ok((listener, path))
}

#[cfg(unix)]
fn configured_socket_path() -> Result<PathBuf, Box<dyn Error + Send + Sync>> {
    if let Some(path) = env::var_os("MAATAA_AUTH_API_SOCKET") {
        return Ok(PathBuf::from(path));
    }
    let home =
        env::var_os("HOME").ok_or("HOME is required to locate the private Auth/API socket")?;
    Ok(PathBuf::from(home).join("Library/Application Support/MAATAA/AuthAPI/maataa-auth-api.sock"))
}

#[cfg(unix)]
fn ensure_private_socket_directory(path: &Path) -> std::io::Result<()> {
    use std::os::unix::fs::{MetadataExt, PermissionsExt};
    ensure_private_directory(path)?;
    let metadata = std::fs::symlink_metadata(path)?;
    let home = env::var_os("HOME")
        .ok_or_else(|| std::io::Error::other("HOME is required for private IPC"))?;
    let home_metadata = std::fs::metadata(home)?;
    if !metadata.file_type().is_dir()
        || metadata.permissions().mode() & 0o077 != 0
        || metadata.uid() != home_metadata.uid()
    {
        return Err(std::io::Error::new(
            std::io::ErrorKind::PermissionDenied,
            "API socket parent must be a real owner-only directory owned by the current user",
        ));
    }
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
