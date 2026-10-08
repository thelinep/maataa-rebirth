#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    collections::HashMap,
    sync::{
        atomic::{AtomicU64, Ordering},
        Mutex,
    },
};
use tauri::{webview::WebviewBuilder, Manager, Webview, WebviewUrl, Window};
use url::Url;

#[cfg(not(target_os = "macos"))]
compile_error!("This feasibility prototype targets native macOS WebKit only.");

struct EmbeddedBrowsers(Mutex<HashMap<String, Webview<tauri::Wry>>>);

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
) -> Result<(&'static str, &'static str), String> {
    match product {
        "maataa-ui" => Ok(("products/maataa-ui/index.html", "MAATAA UI")),
        "tlps" => Ok(("products/tlps/index.html", "TLPS")),
        "tlp-film" if handoff_from_tlps => Ok(("products/tlp-film/handoff.html", "TLP Film")),
        "tlp-film" => Ok(("products/tlp-film/index.html", "TLP Film")),
        "support-center" => Ok(("products/support-center/index.html", "Support Center")),
        _ => Err("Choose a supported MAATAA app.".into()),
    }
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
    product: String,
    handoff_from_tlps: Option<bool>,
) -> Result<String, String> {
    let (entry, title) = product_entry(&product, handoff_from_tlps.unwrap_or(false))?;
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
        .invoke_handler(tauri::generate_handler![
            open_browser_window,
            open_product_window,
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
        browser_child_label, browser_window_label, parse_public_url, product_entry,
        APP_HEADER_HEIGHT, BROWSER_NAV_HEIGHT, BROWSER_VIEW_TOP, MACOS_TITLEBAR_HEIGHT,
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
            product_entry("maataa-ui", false).unwrap().0,
            "products/maataa-ui/index.html"
        );
        assert_eq!(
            product_entry("tlps", false).unwrap().0,
            "products/tlps/index.html"
        );
        assert_eq!(
            product_entry("tlp-film", false).unwrap().0,
            "products/tlp-film/index.html"
        );
        assert_eq!(
            product_entry("tlp-film", true).unwrap().0,
            "products/tlp-film/handoff.html"
        );
        assert_eq!(
            product_entry("support-center", false).unwrap().0,
            "products/support-center/index.html"
        );
        assert!(product_entry("https://example.com", false).is_err());
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
}
