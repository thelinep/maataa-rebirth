use serde::Serialize;
use std::sync::Mutex;
use tauri::{
    webview::{PageLoadEvent, WebviewWindowBuilder},
    AppHandle, Manager, State, WebviewUrl,
};
use url::Url;

#[cfg(not(target_os = "macos"))]
compile_error!("MAATAA Browser's first release targets macOS WKWebView only to keep the browser engine non-Chromium.");

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct BrowserEvent {
    kind: String,
    url: String,
    detail: String,
    at: u64,
}

#[derive(Default)]
struct BrowserState {
    events: Mutex<Vec<BrowserEvent>>,
    history: Mutex<Vec<BrowserEvent>>,
}

impl BrowserState {
    fn push(&self, kind: &str, url: String, detail: String) {
        let at = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|duration| duration.as_secs())
            .unwrap_or_default();
        if let Ok(mut events) = self.events.lock() {
            let event = BrowserEvent {
                kind: kind.into(),
                url,
                detail,
                at,
            };
            if kind == "Main page finished" {
                if let Ok(mut history) = self.history.lock() {
                    history.push(event.clone());
                    if history.len() > 500 {
                        history.remove(0);
                    }
                }
            }
            events.push(event);
            if events.len() > 200 {
                let remove_count = events.len() - 200;
                events.drain(0..remove_count);
            }
        }
    }
}

fn parse_web_url(raw: &str) -> Result<Url, String> {
    let value = raw.trim();
    if value.is_empty() || value.len() > 4_096 {
        return Err("Enter a web address under 4,096 characters.".into());
    }
    let has_explicit_scheme = value.contains("://")
        || value.split_once(':').is_some_and(|(scheme, _)| {
            !scheme.is_empty()
                && scheme.chars().enumerate().all(|(index, character)| {
                    character.is_ascii_alphabetic()
                        || (index > 0
                            && (character.is_ascii_digit() || matches!(character, '+' | '-' | '.')))
                })
        });
    let normalized = if has_explicit_scheme {
        value.to_owned()
    } else if value.split_whitespace().count() > 1 || !value.contains('.') {
        format!(
            "https://duckduckgo.com/?q={}",
            url::form_urlencoded::byte_serialize(value.as_bytes()).collect::<String>()
        )
    } else {
        format!("https://{value}")
    };
    let url = Url::parse(&normalized)
        .map_err(|_| "Enter a valid web address or search phrase.".to_string())?;
    if !matches!(url.scheme(), "http" | "https")
        || url.host_str().is_none()
        || !url.username().is_empty()
        || url.password().is_some()
    {
        return Err("For safety, this browser opens public HTTP or HTTPS pages only; embedded credentials and local-file URLs are blocked.".into());
    }
    Ok(url)
}

#[tauri::command]
fn navigate_browser(
    app: AppHandle,
    state: State<'_, BrowserState>,
    raw_url: String,
) -> Result<String, String> {
    let url = parse_web_url(&raw_url)?;
    state.push("Navigation requested", display_url(&url), String::new());
    if let Some(browser) = app.get_webview_window("browser") {
        browser
            .navigate(url.clone())
            .map_err(|error| error.to_string())?;
    } else {
        let app_for_load = app.clone();
        let app_for_telemetry = app.clone();
        let browser = WebviewWindowBuilder::new(&app, "browser", WebviewUrl::External(url.clone()))
            .title("MAATAA Browser · WebKit")
            .inner_size(1180.0, 820.0)
            .min_inner_size(480.0, 420.0)
            .initialization_script(NETWORK_OBSERVER)
            .on_navigation(move |candidate| {
                if candidate.scheme() == "maataa-telemetry" {
                    record_page_telemetry(&app_for_telemetry, candidate);
                    return false;
                }
                matches!(candidate.scheme(), "http" | "https")
            })
            .on_page_load(move |window, payload| {
                let kind = match payload.event() {
                    PageLoadEvent::Started => "Main page started",
                    PageLoadEvent::Finished => "Main page finished",
                };
                app_for_load.state::<BrowserState>().push(
                    kind,
                    display_url(payload.url()),
                    String::new(),
                );
                if let Some(host) = payload.url().host_str() {
                    let title = format!("{host} · MAATAA Browser");
                    let _ = window.set_title(&title);
                }
            })
            .build()
            .map_err(|error| error.to_string())?;
        browser.set_focus().map_err(|error| error.to_string())?;
    }
    Ok(url.to_string())
}

const NETWORK_OBSERVER: &str = r#"(() => {
  if (window.__maataaObserverInstalled) return;
  window.__maataaObserverInstalled = true;
  const clean = value => {
    try { const url = new URL(String(value), location.href); if (!/^https?:$/.test(url.protocol)) return ''; url.search = ''; url.hash = ''; return url.href; }
    catch { return ''; }
  };
  const send = (kind, value, method, status, duration) => {
    const url = clean(value);
    if (!url || url.startsWith('maataa-telemetry:')) return;
    const params = new URLSearchParams({kind, url, method: String(method || ''), status: String(status || ''), duration: String(Math.max(0, Math.round(duration || 0)))});
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.src = 'maataa-telemetry://capture?' + params.toString();
    (document.documentElement || document).appendChild(frame);
    setTimeout(() => frame.remove(), 0);
  };
  const originalFetch = window.fetch;
  if (originalFetch) window.fetch = function(input, init) {
    const url = typeof input === 'string' || input instanceof URL ? input : input?.url;
    const method = init?.method || input?.method || 'GET';
    const start = performance.now();
    return originalFetch.apply(this, arguments).then(response => {
      send('fetch', url, method, response.status, performance.now() - start); return response;
    }, error => { send('fetch', url, method, 'failed', performance.now() - start); throw error; });
  };
  const open = XMLHttpRequest.prototype.open, sendXhr = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url) { this.__maataaRequest = {method, url}; return open.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function() {
    const request = this.__maataaRequest || {}, start = performance.now();
    this.addEventListener('loadend', () => send('xhr', request.url, request.method, this.status || 'failed', performance.now() - start), {once:true});
    return sendXhr.apply(this, arguments);
  };
  try { new PerformanceObserver(list => list.getEntries().forEach(entry => {
    if (!['fetch', 'xmlhttprequest'].includes(entry.initiatorType)) send('resource:' + entry.initiatorType, entry.name, 'GET', '', entry.duration);
  })).observe({type:'resource', buffered:true}); } catch {}
})();"#;

fn record_page_telemetry(app: &AppHandle, candidate: &Url) {
    let Some(event) = telemetry_event(candidate) else {
        return;
    };
    app.state::<BrowserState>()
        .push(&event.kind, event.url, event.detail);
}

fn telemetry_event(candidate: &Url) -> Option<BrowserEvent> {
    let Some(query) = candidate.query() else {
        return None;
    };
    let values =
        url::form_urlencoded::parse(query.as_bytes()).collect::<std::collections::HashMap<_, _>>();
    let kind = values
        .get("kind")
        .map(|value| value.as_ref())
        .unwrap_or_default();
    if !matches!(kind, "fetch" | "xhr") && !(kind.starts_with("resource:") && kind.len() <= 40) {
        return None;
    }
    let raw_url = values.get("url")?;
    let url = Url::parse(raw_url).ok()?;
    if !matches!(url.scheme(), "http" | "https")
        || !url.username().is_empty()
        || url.password().is_some()
    {
        return None;
    }
    let method = values
        .get("method")
        .map(|value| value.as_ref())
        .unwrap_or("");
    let method = if matches!(
        method,
        "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
    ) {
        method
    } else {
        ""
    };
    let status = values
        .get("status")
        .map(|value| value.as_ref())
        .unwrap_or("");
    let status = if status == "failed"
        || status
            .parse::<u16>()
            .is_ok_and(|code| (100..=599).contains(&code))
    {
        status
    } else {
        ""
    };
    let duration = values
        .get("duration")
        .and_then(|value| value.parse::<u32>().ok())
        .unwrap_or_default()
        .min(600_000);
    let url = display_url(&url);
    let at = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_secs())
        .unwrap_or_default();
    Some(BrowserEvent {
        kind: kind.to_owned(),
        url,
        detail: format!(
            "{} · {} · {} ms",
            method,
            if status.is_empty() {
                "timing only"
            } else {
                status
            },
            duration
        ),
        at,
    })
}

fn display_url(url: &Url) -> String {
    let mut safe = url.clone();
    safe.set_query(None);
    safe.set_fragment(None);
    let _ = safe.set_username("");
    let _ = safe.set_password(None);
    safe.to_string()
}

#[tauri::command]
fn browser_control(app: AppHandle, action: String) -> Result<(), String> {
    let browser = app
        .get_webview_window("browser")
        .ok_or("Open a page first.")?;
    let script = match action.as_str() {
        "back" => "history.back()",
        "forward" => "history.forward()",
        "reload" => "location.reload()",
        "home" => "location.href = 'https://www.duckduckgo.com/'",
        _ => return Err("Unsupported browser action.".into()),
    };
    browser.eval(script).map_err(|error| error.to_string())
}

#[tauri::command]
fn open_browser_inspector(app: AppHandle) -> Result<(), String> {
    let browser = app
        .get_webview_window("browser")
        .ok_or("Open a page first.")?;
    #[cfg(debug_assertions)]
    {
        browser.open_devtools();
        Ok(())
    }
    #[cfg(not(debug_assertions))]
    {
        let _ = browser;
        Err("The native Web Inspector is available only in development builds.".into())
    }
}

#[tauri::command]
fn browser_events(state: State<'_, BrowserState>) -> Vec<BrowserEvent> {
    state
        .events
        .lock()
        .map(|events| events.clone())
        .unwrap_or_default()
}

#[tauri::command]
fn browser_history(state: State<'_, BrowserState>) -> Vec<BrowserEvent> {
    state
        .history
        .lock()
        .map(|history| history.clone())
        .unwrap_or_default()
}

#[tauri::command]
fn clear_browser_events(state: State<'_, BrowserState>) {
    if let Ok(mut events) = state.events.lock() {
        events.clear();
    }
    if let Ok(mut history) = state.history.lock() {
        history.clear();
    }
}

pub fn run() {
    tauri::Builder::default()
        .manage(BrowserState::default())
        .invoke_handler(tauri::generate_handler![
            navigate_browser,
            browser_control,
            open_browser_inspector,
            browser_events,
            browser_history,
            clear_browser_events
        ])
        .run(tauri::generate_context!())
        .expect("MAATAA Browser failed to start");
}

#[cfg(test)]
mod tests {
    use super::parse_web_url;
    use url::Url;

    #[test]
    fn accepts_web_urls_and_searches() {
        assert_eq!(
            parse_web_url("example.com").unwrap().as_str(),
            "https://example.com/"
        );
        let search = parse_web_url("MAATAA desktop browser").unwrap();
        assert!(search
            .query_pairs()
            .any(|(key, value)| key == "q" && value == "MAATAA desktop browser"));
        assert!(parse_web_url("https://example.com/path").is_ok());
    }

    #[test]
    fn refuses_local_or_credential_bearing_urls() {
        assert!(parse_web_url("file:///etc/passwd").is_err());
        assert!(parse_web_url("javascript:alert(1)").is_err());
        assert!(parse_web_url("https://user:secret@example.com").is_err());
        assert!(parse_web_url("").is_err());
    }

    #[test]
    fn telemetry_keeps_metadata_but_removes_query_and_fragment() {
        let telemetry = Url::parse("maataa-telemetry://capture?kind=fetch&url=https%3A%2F%2Fexample.com%2Fapi%3Ftoken%3Dsecret%23part&method=POST&status=201&duration=17").unwrap();
        let event = super::telemetry_event(&telemetry).unwrap();
        assert_eq!(event.kind, "fetch");
        assert_eq!(event.url, "https://example.com/api");
        assert_eq!(event.detail, "POST · 201 · 17 ms");
        assert!(super::telemetry_event(
            &Url::parse("maataa-telemetry://capture?kind=fetch&url=file%3A%2F%2F%2Fetc%2Fpasswd")
                .unwrap()
        )
        .is_none());
    }
}
