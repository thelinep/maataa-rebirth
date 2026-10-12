// Every app command is declared here so it gets an `allow-<command>`
// permission, and each window kind is granted only the commands it uses
// (capabilities/*.json). tests/desktop-capabilities.test.ts checks that this
// list, the invoke handler and the capability files agree.
const APP_COMMANDS: &[&str] = &[
    "open_browser_window",
    "open_product_window",
    "list_workspace_projects",
    "list_workspace_events",
    "upsert_workspace_project",
    "remove_workspace_project",
    "focus_desktop_window",
    "open_embedded_page",
    "close_embedded_page",
    "browser_control",
    "validate_address",
    "read_host_clock_snapshot",
    "api_connect",
    "api_disconnect",
    "api_request",
];

fn main() {
    tauri_build::try_build(
        tauri_build::Attributes::new()
            .app_manifest(tauri_build::AppManifest::new().commands(APP_COMMANDS)),
    )
    .expect("failed to run the Tauri build script");
}
