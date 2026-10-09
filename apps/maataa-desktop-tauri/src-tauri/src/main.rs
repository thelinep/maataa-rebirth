#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    fs,
    path::{Path, PathBuf},
    sync::{
        atomic::{AtomicU64, Ordering},
        Mutex,
    },
    time::{SystemTime, UNIX_EPOCH},
};
use tauri::{webview::WebviewBuilder, Emitter, Manager, Webview, WebviewUrl, Window};
use url::Url;

mod project_link;

#[cfg(not(target_os = "macos"))]
compile_error!("This feasibility prototype targets native macOS WebKit only.");

struct EmbeddedBrowsers(Mutex<HashMap<String, Webview<tauri::Wry>>>);
struct WorkspaceRegistry(Mutex<()>);

const WORKSPACE_INDEX_VERSION: u8 = 3;
const WORKSPACE_INDEX_FILE: &str = "workspace-index.json";
const WORKSPACE_PROJECTS_UPDATED: &str = "workspace-projects-updated";
const WORKSPACE_EVENTS_LIMIT: usize = 500;

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceProject {
    id: String,
    product: String,
    title: String,
    project_type: String,
    status: String,
    updated_at: u64,
    sample: bool,
    /// v3: link to a shared project record (ID + current version only).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    record: Option<RecordLink>,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct RecordLink {
    record_id: String,
    record_version: u32,
    schema: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceProjectInput {
    id: String,
    product: String,
    title: String,
    project_type: String,
    status: String,
    sample: bool,
    #[serde(default)]
    record: Option<RecordLink>,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceProjectEvent {
    sequence: u64,
    project_id: String,
    product: String,
    action: String,
    source: String,
    recorded_at_unix_ms: u64,
    time_basis: String,
    /// v3: project-record version this event moved the entry to.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    record_version: Option<u32>,
}

#[derive(Debug, Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceIndex {
    version: u8,
    projects: Vec<WorkspaceProject>,
    #[serde(default)]
    events: Vec<WorkspaceProjectEvent>,
}

static NEXT_BROWSER_WINDOW: AtomicU64 = AtomicU64::new(1);
static NEXT_PRODUCT_WINDOW: AtomicU64 = AtomicU64::new(1);

const APP_HEADER_HEIGHT: f64 = 64.0;
const BROWSER_NAV_HEIGHT: f64 = 64.0;
// Child views are positioned from the native frame, including its title bar.
const MACOS_TITLEBAR_HEIGHT: f64 = 32.0;
const BROWSER_VIEW_TOP: f64 = APP_HEADER_HEIGHT + BROWSER_NAV_HEIGHT + MACOS_TITLEBAR_HEIGHT;

fn parse_public_url(input: &str) -> Result<Url, String> {
    let input = input.trim();
    if input.is_empty() || input.len() > 4_096 {
        return Err("Enter a web address under 4,096 characters.".into());
    }
    let explicit_scheme = input.split_once(':').is_some_and(|(scheme, _)| {
        !scheme.is_empty()
            && scheme.chars().enumerate().all(|(index, character)| {
                character.is_ascii_alphabetic()
                    || (index > 0
                        && (character.is_ascii_digit() || matches!(character, '+' | '-' | '.')))
            })
    });
    if explicit_scheme && !input.contains("://") {
        return Err("Use a full HTTP or HTTPS web address.".into());
    }
    let normalized = if input.contains("://") {
        input.to_string()
    } else if input.split_whitespace().count() > 1 || !input.contains('.') {
        format!(
            "https://duckduckgo.com/?q={}",
            url::form_urlencoded::byte_serialize(input.as_bytes()).collect::<String>()
        )
    } else {
        format!("https://{input}")
    };
    let url = Url::parse(&normalized)
        .map_err(|_| "Enter a valid web address or search phrase.".to_string())?;
    if !matches!(url.scheme(), "http" | "https")
        || url.host_str().is_none()
        || !url.username().is_empty()
        || url.password().is_some()
    {
        return Err("Only public HTTP or HTTPS pages are allowed; local files and embedded credentials are blocked.".into());
    }
    Ok(url)
}

fn browser_window_label(label: &str) -> Result<&str, String> {
    label
        .strip_prefix("browser-")
        .filter(|suffix| {
            !suffix.is_empty() && suffix.chars().all(|character| character.is_ascii_digit())
        })
        .ok_or_else(|| "This action is only available in a MAATAA Browser window.".into())
}

fn browser_child_label(parent: &str) -> Result<String, String> {
    browser_window_label(parent)?;
    Ok(format!("external-page-{parent}"))
}

fn product_entry(
    product: &str,
    handoff_from_tlps: bool,
    open_workspace: bool,
) -> Result<(&'static str, &'static str), String> {
    match product {
        "maataa-ui" => Ok(("products/maataa-ui/index.html", "MAATAA UI")),
        "tlps" if open_workspace => Ok(("products/tlps/workspace.html", "TLPS")),
        "tlps" => Ok(("products/tlps/index.html", "TLPS")),
        "tlp-film" if handoff_from_tlps => Ok(("products/tlp-film/handoff.html", "TLP Film")),
        "tlp-film" if open_workspace => Ok(("products/tlp-film/workspace.html", "TLP Film")),
        "tlp-film" => Ok(("products/tlp-film/index.html", "TLP Film")),
        "support-center" => Ok(("products/support-center/index.html", "Support Center")),
        _ => Err("Choose a supported MAATAA app.".into()),
    }
}

fn validate_workspace_project(input: WorkspaceProjectInput) -> Result<WorkspaceProject, String> {
    if let Some(link) = &input.record {
        project_link::validate_link(
            &input.product,
            &input.id,
            &link.record_id,
            link.record_version,
            &link.schema,
        )?;
    } else {
        let expected_id = match input.product.as_str() {
            "tlps" => "tlps:workspace",
            "tlp-film" => "tlp-film:workspace",
            _ => return Err("This product cannot publish to the shared project list.".into()),
        };
        if input.id != expected_id {
            return Err("This project identifier is not available to the selected product.".into());
        }
    }
    let title = input.title.trim();
    if title.is_empty() || title.len() > 120 {
        return Err("Project title must contain 1 to 120 characters.".into());
    }
    let project_type = input.project_type.trim();
    if project_type.len() > 80 {
        return Err("Project type must be 80 characters or fewer.".into());
    }
    if !matches!(input.status.as_str(), "draft" | "example") {
        return Err("Choose a supported local project status.".into());
    }
    let updated_at = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|_| "The system clock is before the Unix epoch.".to_string())?
        .as_millis()
        .min(u64::MAX as u128) as u64;
    Ok(WorkspaceProject {
        id: input.id,
        product: input.product,
        title: title.to_string(),
        project_type: if project_type.is_empty() {
            "Project".into()
        } else {
            project_type.to_string()
        },
        status: input.status,
        updated_at,
        sample: input.sample,
        record: input.record,
    })
}

fn load_workspace_index(path: &Path) -> Result<WorkspaceIndex, String> {
    if !path.exists() {
        return Ok(WorkspaceIndex {
            version: WORKSPACE_INDEX_VERSION,
            projects: Vec::new(),
            events: Vec::new(),
        });
    }
    let bytes = fs::read(path)
        .map_err(|error| format!("Could not read the local project list: {error}"))?;
    let mut index: WorkspaceIndex = serde_json::from_slice(&bytes)
        .map_err(|error| format!("The local project list is unreadable: {error}"))?;
    if !matches!(index.version, 1 | 2 | WORKSPACE_INDEX_VERSION)
        || index.projects.len() > 100
        || index.events.len() > WORKSPACE_EVENTS_LIMIT
    {
        return Err("The local project list uses an unsupported format.".into());
    }
    // Version 1 stored projects only. Its existing records remain readable;
    // the next successful write upgrades the index and starts the event log.
    index.version = WORKSPACE_INDEX_VERSION;
    Ok(index)
}

fn append_workspace_event(
    index: &mut WorkspaceIndex,
    project_id: &str,
    product: &str,
    action: &str,
) -> Result<(), String> {
    let recorded_at_unix_ms = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|_| "The system clock is before the Unix epoch.".to_string())?
        .as_millis()
        .min(u64::MAX as u128) as u64;
    let sequence = index
        .events
        .last()
        .map_or(1, |event| event.sequence.saturating_add(1));
    index.events.push(WorkspaceProjectEvent {
        sequence,
        project_id: project_id.to_string(),
        product: product.to_string(),
        action: action.to_string(),
        source: "maataa-desktop-local".into(),
        recorded_at_unix_ms,
        time_basis: "host-unix-clock-unverified".into(),
        record_version: None,
    });
    if index.events.len() > WORKSPACE_EVENTS_LIMIT {
        let excess = index.events.len() - WORKSPACE_EVENTS_LIMIT;
        index.events.drain(..excess);
    }
    index.version = WORKSPACE_INDEX_VERSION;
    Ok(())
}

fn save_workspace_index(path: &Path, index: &WorkspaceIndex) -> Result<(), String> {
    let parent = path
        .parent()
        .ok_or_else(|| "The local project-list path is unavailable.".to_string())?;
    fs::create_dir_all(parent)
        .map_err(|error| format!("Could not create local app storage: {error}"))?;
    let temporary = path.with_extension("json.tmp");
    let bytes = serde_json::to_vec_pretty(index)
        .map_err(|error| format!("Could not encode the local project list: {error}"))?;
    fs::write(&temporary, bytes)
        .map_err(|error| format!("Could not save the local project list: {error}"))?;
    fs::rename(&temporary, path)
        .map_err(|error| format!("Could not finish saving the local project list: {error}"))
}

fn workspace_index_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    app.path()
        .app_data_dir()
        .map(|directory| directory.join(WORKSPACE_INDEX_FILE))
        .map_err(|error| format!("Local app storage is unavailable: {error}"))
}

fn child_view_size(window: &Window<tauri::Wry>) -> Result<tauri::LogicalSize<f64>, String> {
    let scale = window.scale_factor().map_err(|error| error.to_string())?;
    let inner = window.inner_size().map_err(|error| error.to_string())?;
    Ok(tauri::LogicalSize::new(
        inner.width as f64 / scale,
        (inner.height as f64 / scale - BROWSER_VIEW_TOP).max(240.0),
    ))
}

#[tauri::command]
fn open_browser_window(app: tauri::AppHandle) -> Result<String, String> {
    let id = NEXT_BROWSER_WINDOW.fetch_add(1, Ordering::Relaxed);
    let label = format!("browser-{id}");
    let window =
        tauri::WebviewWindowBuilder::new(&app, label.clone(), WebviewUrl::App("index.html".into()))
            .title(format!("Browser {id} · MAATAA Desktop"))
            .inner_size(1120.0, 780.0)
            .min_inner_size(720.0, 520.0)
            .center()
            .build()
            .map_err(|error| error.to_string())?;
    window.set_focus().map_err(|error| error.to_string())?;
    Ok(label)
}

#[tauri::command]
fn open_product_window(
    app: tauri::AppHandle,
    state: tauri::State<'_, WorkspaceRegistry>,
    product: String,
    handoff_from_tlps: Option<bool>,
    open_workspace: Option<bool>,
    record_id: Option<String>,
    record_version: Option<u32>,
) -> Result<String, String> {
    let (entry, title) = match (record_id, record_version) {
        (Some(record_id), Some(record_version)) => {
            // Open on one shared record: Desktop re-checks the ID and version
            // against its own registry so no window starts from a stale base.
            let registered = {
                let _guard = state
                    .0
                    .lock()
                    .map_err(|_| "The shared project list is busy.".to_string())?;
                let index = load_workspace_index(&workspace_index_path(&app)?)?;
                index
                    .projects
                    .iter()
                    .find(|item| item.id == record_id)
                    .and_then(|item| item.record.as_ref())
                    .map(|record| record.record_version)
            };
            project_link::check_registered_context(registered, record_version)?;
            project_link::record_context_entry(&product, &record_id, record_version)?
        }
        (None, None) => {
            let (entry, title) = product_entry(
                &product,
                handoff_from_tlps.unwrap_or(false),
                open_workspace.unwrap_or(false),
            )?;
            (entry.to_string(), title)
        }
        _ => return Err("A project record needs both its ID and version.".into()),
    };
    let id = NEXT_PRODUCT_WINDOW.fetch_add(1, Ordering::Relaxed);
    let label = format!("product-{product}-{id}");
    let window =
        tauri::WebviewWindowBuilder::new(&app, label.clone(), WebviewUrl::App(entry.into()))
            .title(format!("{title} · MAATAA Desktop"))
            .inner_size(1280.0, 860.0)
            .min_inner_size(780.0, 600.0)
            .center()
            .build()
            .map_err(|error| error.to_string())?;
    window.set_focus().map_err(|error| error.to_string())?;
    Ok(label)
}

#[tauri::command]
fn list_workspace_projects(
    app: tauri::AppHandle,
    state: tauri::State<'_, WorkspaceRegistry>,
) -> Result<Vec<WorkspaceProject>, String> {
    let _guard = state
        .0
        .lock()
        .map_err(|_| "The shared project list is busy.".to_string())?;
    let path = workspace_index_path(&app)?;
    let mut index = load_workspace_index(&path)?;
    index
        .projects
        .sort_by(|left, right| right.updated_at.cmp(&left.updated_at));
    Ok(index.projects)
}

#[tauri::command]
fn list_workspace_events(
    app: tauri::AppHandle,
    state: tauri::State<'_, WorkspaceRegistry>,
) -> Result<Vec<WorkspaceProjectEvent>, String> {
    let _guard = state
        .0
        .lock()
        .map_err(|_| "The shared project history is busy.".to_string())?;
    let path = workspace_index_path(&app)?;
    let mut index = load_workspace_index(&path)?;
    index.events.reverse();
    Ok(index.events.into_iter().take(40).collect())
}

#[tauri::command]
fn upsert_workspace_project(
    app: tauri::AppHandle,
    state: tauri::State<'_, WorkspaceRegistry>,
    project: WorkspaceProjectInput,
) -> Result<(), String> {
    let project = validate_workspace_project(project)?;
    let _guard = state
        .0
        .lock()
        .map_err(|_| "The shared project list is busy.".to_string())?;
    let path = workspace_index_path(&app)?;
    let mut index = load_workspace_index(&path)?;
    if let Some(link) = &project.record {
        let existing = index
            .projects
            .iter()
            .find(|item| item.id == project.id)
            .and_then(|item| item.record.as_ref())
            .map(|record| record.record_version);
        if project_link::check_version_transition(existing, link.record_version)?
            == project_link::VersionChange::Unchanged
        {
            // Idempotent replay of the version already registered.
            return Ok(());
        }
    }
    let action = if index.projects.iter().any(|item| item.id == project.id) {
        "project-updated"
    } else {
        "project-created"
    };
    append_workspace_event(&mut index, &project.id, &project.product, action)?;
    if let (Some(link), Some(event)) = (&project.record, index.events.last_mut()) {
        event.record_version = Some(link.record_version);
    }
    if let Some(existing) = index.projects.iter_mut().find(|item| item.id == project.id) {
        *existing = project;
    } else {
        if index.projects.len() >= 100 {
            return Err("The shared project list has reached its local limit.".into());
        }
        index.projects.push(project);
    }
    index.version = WORKSPACE_INDEX_VERSION;
    save_workspace_index(&path, &index)?;
    app.emit(WORKSPACE_PROJECTS_UPDATED, true).map_err(|error| {
        format!("Project saved, but the desktop could not refresh its list: {error}")
    })
}

#[tauri::command]
fn remove_workspace_project(
    app: tauri::AppHandle,
    state: tauri::State<'_, WorkspaceRegistry>,
    product: String,
) -> Result<(), String> {
    let id = match product.as_str() {
        "tlps" => "tlps:workspace",
        "tlp-film" => "tlp-film:workspace",
        _ => return Err("This product cannot remove a shared project entry.".into()),
    };
    let _guard = state
        .0
        .lock()
        .map_err(|_| "The shared project list is busy.".to_string())?;
    let path = workspace_index_path(&app)?;
    let mut index = load_workspace_index(&path)?;
    if index.projects.iter().any(|item| item.id == id) {
        append_workspace_event(&mut index, id, &product, "project-removed")?;
    }
    index.projects.retain(|item| item.id != id);
    index.version = WORKSPACE_INDEX_VERSION;
    save_workspace_index(&path, &index)?;
    app.emit(WORKSPACE_PROJECTS_UPDATED, true).map_err(|error| {
        format!("Project removed, but the desktop could not refresh its list: {error}")
    })
}

#[tauri::command]
fn focus_desktop_window(app: tauri::AppHandle) -> Result<(), String> {
    let window = app
        .get_webview_window("main")
        .ok_or("MAATAA Desktop home is unavailable.")?;
    window.show().map_err(|error| error.to_string())?;
    window.set_focus().map_err(|error| error.to_string())
}

#[tauri::command]
fn open_embedded_page(
    app: tauri::AppHandle,
    state: tauri::State<'_, EmbeddedBrowsers>,
    window_label: String,
    address: String,
) -> Result<String, String> {
    let child_label = browser_child_label(&window_label)?;
    let url = parse_public_url(&address)?;
    let window = app
        .get_window(&window_label)
        .ok_or("Browser window is unavailable.")?;
    let mut current = state
        .0
        .lock()
        .map_err(|_| "Browser state is unavailable.")?;
    if let Some(webview) = current.remove(&window_label) {
        webview.close().map_err(|error| error.to_string())?;
    }
    let builder = WebviewBuilder::new(child_label, WebviewUrl::External(url.clone()))
        .on_navigation(|candidate| matches!(candidate.scheme(), "http" | "https"));
    let position = tauri::LogicalPosition::new(0.0, BROWSER_VIEW_TOP);
    let size = child_view_size(&window)?;
    let webview = window
        .add_child(builder, position, size)
        .map_err(|error| error.to_string())?;
    current.insert(window_label, webview);
    Ok(url.to_string())
}

#[tauri::command]
fn close_embedded_page(
    state: tauri::State<'_, EmbeddedBrowsers>,
    window_label: String,
) -> Result<(), String> {
    browser_window_label(&window_label)?;
    if let Some(webview) = state
        .0
        .lock()
        .map_err(|_| "Browser state is unavailable.")?
        .remove(&window_label)
    {
        webview.close().map_err(|error| error.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn browser_control(
    state: tauri::State<'_, EmbeddedBrowsers>,
    window_label: String,
    action: String,
) -> Result<(), String> {
    browser_window_label(&window_label)?;
    let state = state
        .0
        .lock()
        .map_err(|_| "Browser state is unavailable.")?;
    let webview = state.get(&window_label).ok_or("Open a page first.")?;
    let script = match action.as_str() {
        "back" => "history.back()",
        "forward" => "history.forward()",
        "reload" => "location.reload()",
        _ => return Err("Unsupported browser action.".into()),
    };
    webview.eval(script).map_err(|error| error.to_string())
}

#[tauri::command]
fn validate_address(address: String) -> Result<String, String> {
    parse_public_url(&address).map(|url| url.to_string())
}

fn main() {
    tauri::Builder::default()
        .manage(EmbeddedBrowsers(Mutex::new(HashMap::new())))
        .manage(WorkspaceRegistry(Mutex::new(())))
        .invoke_handler(tauri::generate_handler![
            open_browser_window,
            open_product_window,
            list_workspace_projects,
            list_workspace_events,
            upsert_workspace_project,
            remove_workspace_project,
            focus_desktop_window,
            open_embedded_page,
            close_embedded_page,
            browser_control,
            validate_address
        ])
        .on_window_event(|window, event| {
            if !window.label().starts_with("browser-") {
                return;
            }
            if let Some(state) = window.try_state::<EmbeddedBrowsers>() {
                match event {
                    tauri::WindowEvent::Resized(physical_size) => {
                        if let (Ok(scale), Ok(mut current)) =
                            (window.scale_factor(), state.0.lock())
                        {
                            if let Some(webview) = current.get_mut(window.label()) {
                                let size = tauri::LogicalSize::new(
                                    physical_size.width as f64 / scale,
                                    (physical_size.height as f64 / scale - BROWSER_VIEW_TOP)
                                        .max(240.0),
                                );
                                let _ = webview.set_size(size);
                            }
                        }
                    }
                    tauri::WindowEvent::Destroyed => {
                        if let Ok(mut current) = state.0.lock() {
                            current.remove(window.label());
                        }
                    }
                    _ => {}
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("MAATAA Desktop Tauri prototype failed to start");
}

#[cfg(test)]
mod tests {
    use super::{
        append_workspace_event, browser_child_label, browser_window_label, load_workspace_index,
        parse_public_url, product_entry, save_workspace_index, validate_workspace_project,
        RecordLink, WorkspaceIndex, WorkspaceProjectInput, APP_HEADER_HEIGHT, BROWSER_NAV_HEIGHT,
        BROWSER_VIEW_TOP, MACOS_TITLEBAR_HEIGHT, WORKSPACE_INDEX_VERSION,
    };
    use std::{
        fs,
        path::PathBuf,
        time::{SystemTime, UNIX_EPOCH},
    };

    #[test]
    fn browser_windows_have_independent_native_view_regions() {
        assert_eq!(APP_HEADER_HEIGHT, 64.0);
        assert_eq!(BROWSER_NAV_HEIGHT, 64.0);
        assert_eq!(MACOS_TITLEBAR_HEIGHT, 32.0);
        assert_eq!(BROWSER_VIEW_TOP, 160.0);
        assert_ne!(
            browser_child_label("browser-1").unwrap(),
            browser_child_label("browser-2").unwrap()
        );
    }

    #[test]
    fn launcher_only_opens_bundled_product_entries() {
        assert_eq!(
            product_entry("maataa-ui", false, false).unwrap().0,
            "products/maataa-ui/index.html"
        );
        assert_eq!(
            product_entry("tlps", false, false).unwrap().0,
            "products/tlps/index.html"
        );
        assert_eq!(
            product_entry("tlps", false, true).unwrap().0,
            "products/tlps/workspace.html"
        );
        assert_eq!(
            product_entry("tlp-film", false, false).unwrap().0,
            "products/tlp-film/index.html"
        );
        assert_eq!(
            product_entry("tlp-film", true, true).unwrap().0,
            "products/tlp-film/handoff.html"
        );
        assert_eq!(
            product_entry("tlp-film", false, true).unwrap().0,
            "products/tlp-film/workspace.html"
        );
        assert_eq!(
            product_entry("support-center", false, false).unwrap().0,
            "products/support-center/index.html"
        );
        assert!(product_entry("https://example.com", false, false).is_err());
    }

    #[test]
    fn browser_child_labels_only_accept_app_created_windows() {
        assert_eq!(browser_window_label("browser-42").unwrap(), "42");
        for label in ["main", "browser-", "browser-abc", "browser-1-child"] {
            assert!(browser_child_label(label).is_err(), "accepted {label}");
        }
    }

    #[test]
    fn accepts_public_web_addresses_and_searches() {
        assert_eq!(
            parse_public_url("example.com").unwrap().as_str(),
            "https://example.com/"
        );
        assert!(parse_public_url("https://example.com/docs").is_ok());
        let search = parse_public_url("MAATAA desktop").unwrap();
        assert!(search
            .query_pairs()
            .any(|(key, value)| key == "q" && value == "MAATAA desktop"));
    }

    #[test]
    fn rejects_local_and_credential_bearing_targets() {
        for value in [
            "file:///etc/passwd",
            "javascript:alert(1)",
            "https://user:secret@example.com",
            "",
        ] {
            assert!(parse_public_url(value).is_err(), "accepted {value}");
        }
    }

    #[test]
    fn shared_project_entries_accept_only_bounded_local_product_metadata() {
        let project = validate_workspace_project(WorkspaceProjectInput {
            id: "tlps:workspace".into(),
            product: "tlps".into(),
            title: "  Mountain Light  ".into(),
            project_type: "Feature Film".into(),
            status: "draft".into(),
            sample: false,
            record: None,
        })
        .unwrap();
        assert_eq!(project.title, "Mountain Light");
        assert_eq!(project.project_type, "Feature Film");
        assert!(project.updated_at > 0);
        assert!(validate_workspace_project(WorkspaceProjectInput {
            id: "tlps:other".into(),
            product: "tlps".into(),
            title: "Plan".into(),
            project_type: "Feature Film".into(),
            status: "draft".into(),
            sample: false,
            record: None,
        })
        .is_err());
        assert!(validate_workspace_project(WorkspaceProjectInput {
            id: "tlps:workspace".into(),
            product: "tlps".into(),
            title: "  ".into(),
            project_type: "Feature Film".into(),
            status: "draft".into(),
            sample: false,
            record: None,
        })
        .is_err());
    }

    #[test]
    fn shared_project_index_round_trips_through_local_file_storage() {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_nanos();
        let directory = std::env::temp_dir().join(format!("maataa-workspace-{nonce}"));
        let path: PathBuf = directory.join("workspace-index.json");
        let index = WorkspaceIndex {
            version: WORKSPACE_INDEX_VERSION,
            projects: Vec::new(),
            events: Vec::new(),
        };
        save_workspace_index(&path, &index).unwrap();
        let loaded = load_workspace_index(&path).unwrap();
        assert_eq!(loaded.version, WORKSPACE_INDEX_VERSION);
        assert!(loaded.projects.is_empty());
        fs::remove_dir_all(directory).unwrap();
    }

    #[test]
    fn upgrades_project_only_index_and_records_ordered_local_activity() {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_nanos();
        let directory = std::env::temp_dir().join(format!("maataa-workspace-v1-{nonce}"));
        fs::create_dir_all(&directory).unwrap();
        let path = directory.join("workspace-index.json");
        fs::write(&path, r#"{"version":1,"projects":[],"events":[]}"#).unwrap();

        let mut index = load_workspace_index(&path).unwrap();
        assert_eq!(index.version, WORKSPACE_INDEX_VERSION);
        assert!(index.events.is_empty());
        append_workspace_event(&mut index, "tlps:workspace", "tlps", "project-created").unwrap();
        append_workspace_event(&mut index, "tlps:workspace", "tlps", "project-updated").unwrap();

        assert_eq!(index.events[0].sequence, 1);
        assert_eq!(index.events[1].sequence, 2);
        assert_eq!(index.events[0].action, "project-created");
        assert_eq!(index.events[1].action, "project-updated");
        assert_eq!(index.events[0].source, "maataa-desktop-local");
        assert_eq!(index.events[0].time_basis, "host-unix-clock-unverified");
        assert!(index.events[0].recorded_at_unix_ms > 0);
        fs::remove_dir_all(directory).unwrap();
    }

    #[test]
    fn caps_project_activity_history_at_the_local_retention_limit() {
        let mut index = WorkspaceIndex {
            version: WORKSPACE_INDEX_VERSION,
            projects: Vec::new(),
            events: Vec::new(),
        };
        for _ in 0..=super::WORKSPACE_EVENTS_LIMIT {
            append_workspace_event(&mut index, "tlps:workspace", "tlps", "project-updated")
                .unwrap();
        }
        assert_eq!(index.events.len(), super::WORKSPACE_EVENTS_LIMIT);
        assert_eq!(index.events.first().unwrap().sequence, 2);
        assert_eq!(index.events.last().unwrap().sequence, 501);
    }

    const RECORD_ID: &str = "prj:11111111-2222-4333-8444-555555555555";

    fn record_input(version: u32) -> WorkspaceProjectInput {
        WorkspaceProjectInput {
            id: RECORD_ID.into(),
            product: "tlps".into(),
            title: "Synthetic Idea to Script".into(),
            project_type: "Idea to Script".into(),
            status: "draft".into(),
            sample: false,
            record: Some(RecordLink {
                record_id: RECORD_ID.into(),
                record_version: version,
                schema: "maataa.project-record/1.0.0".into(),
            }),
        }
    }

    #[test]
    fn record_linked_entries_require_a_valid_tlps_record_id() {
        let project = validate_workspace_project(record_input(2)).unwrap();
        assert_eq!(project.id, RECORD_ID);
        assert_eq!(project.record.as_ref().unwrap().record_version, 2);
        let mut wrong_id = record_input(1);
        wrong_id.id = "tlps:workspace".into();
        assert!(validate_workspace_project(wrong_id).is_err());
        let mut film = record_input(1);
        film.product = "tlp-film".into();
        assert!(validate_workspace_project(film).is_err());
        assert!(validate_workspace_project(record_input(0)).is_err());
        // Legacy entries still cannot use a record-style ID without a link.
        let mut unlinked = record_input(1);
        unlinked.record = None;
        assert!(validate_workspace_project(unlinked).is_err());
    }

    #[test]
    fn v2_index_loads_and_v3_round_trips_record_links_and_event_versions() {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_nanos();
        let directory = std::env::temp_dir().join(format!("maataa-workspace-v3-{nonce}"));
        fs::create_dir_all(&directory).unwrap();
        let path = directory.join("workspace-index.json");
        fs::write(
            &path,
            r#"{"version":2,"projects":[{"id":"tlps:workspace","product":"tlps","title":"Plan","projectType":"Short Film","status":"draft","updatedAt":5,"sample":false}],"events":[{"sequence":1,"projectId":"tlps:workspace","product":"tlps","action":"project-created","source":"maataa-desktop-local","recordedAtUnixMs":5,"timeBasis":"host-unix-clock-unverified"}]}"#,
        )
        .unwrap();
        let mut index = load_workspace_index(&path).unwrap();
        assert_eq!(index.version, WORKSPACE_INDEX_VERSION);
        assert!(index.projects[0].record.is_none());
        index
            .projects
            .push(validate_workspace_project(record_input(1)).unwrap());
        append_workspace_event(&mut index, RECORD_ID, "tlps", "project-created").unwrap();
        index.events.last_mut().unwrap().record_version = Some(1);
        save_workspace_index(&path, &index).unwrap();
        let raw = fs::read_to_string(&path).unwrap();
        assert!(raw.contains("\"recordVersion\": 1"));
        assert!(raw.contains("\"recordId\": \"prj:11111111-2222-4333-8444-555555555555\""));
        let reloaded = load_workspace_index(&path).unwrap();
        assert_eq!(reloaded.projects.len(), 2);
        assert_eq!(reloaded.projects[0].title, "Plan");
        assert_eq!(reloaded.events[1].sequence, 2);
        assert_eq!(reloaded.events[0].record_version, None);
        fs::remove_dir_all(directory).unwrap();
    }
}
