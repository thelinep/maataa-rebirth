// Static guard for MAATAA Desktop (Tauri) command exposure. Each window kind
// gets only the commands its own pages call; the external page inside a
// browser window gets none. This runs on any host (the Tauri crate itself
// builds only on macOS), and the Tauri build fails on unknown permissions.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "..");
const tauri = path.join(root, "apps/maataa-desktop-tauri/src-tauri");
const read = (file: string) => readFileSync(path.join(root, file), "utf8");

const buildRs = readFileSync(path.join(tauri, "build.rs"), "utf8");
const mainRs = readFileSync(path.join(tauri, "src/main.rs"), "utf8");
const manifest = [...buildRs.slice(buildRs.indexOf("APP_COMMANDS"), buildRs.indexOf("];")).matchAll(/"([a-z_]+)"/g)].map((m) => m[1]);
const handler = [...mainRs.slice(mainRs.indexOf("generate_handler!["), mainRs.indexOf("])", mainRs.indexOf("generate_handler!["))).matchAll(/([a-z_]+)/g)].map((m) => m[1]).filter((name) => name !== "generate_handler");
const declared = [...mainRs.matchAll(/#\[tauri::command\]\s*(?:async\s+)?fn\s+([a-z_]+)/g)].map((m) => m[1]);

interface Capability { identifier: string; windows?: string[]; webviews?: string[]; remote?: unknown; permissions: string[] }
const capabilities: Capability[] = readdirSync(path.join(tauri, "capabilities"))
  .filter((file) => file.endsWith(".json"))
  .map((file) => JSON.parse(readFileSync(path.join(tauri, "capabilities", file), "utf8")));
const byId = Object.fromEntries(capabilities.map((c) => [c.identifier, c]));
const commandsOf = (capability: Capability) =>
  capability.permissions.filter((p) => p.startsWith("allow-")).map((p) => p.slice("allow-".length).replace(/-/g, "_"));
const glob = (pattern: string) => new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
const grantedTo = (label: string) =>
  capabilities.filter((c) => (c.webviews ?? []).some((p) => glob(p).test(label))).flatMap(commandsOf);
const invokedIn = (source: string) =>
  [...source.matchAll(/(?:invoke|invokeDesktop)\(\s*['"]([a-z_]+)['"]/g)].map((m) => m[1]);

describe("MAATAA Desktop command exposure", () => {
  it("declares every command once, in build.rs, the invoke handler and the code", () => {
    expect(new Set(manifest).size).toBe(manifest.length);
    expect([...manifest].sort()).toEqual([...handler].sort());
    expect([...manifest].sort()).toEqual([...declared].sort());
  });

  it("grants only declared commands, by webview label, with no remote origins", () => {
    for (const capability of capabilities) {
      expect(capability.windows ?? [], capability.identifier).toEqual([]);
      expect(capability.remote, capability.identifier).toBeUndefined();
      for (const command of commandsOf(capability)) expect(manifest, `${capability.identifier}: ${command}`).toContain(command);
    }
  });

  it("gives the external page in a browser window nothing", () => {
    expect(grantedTo("external-page-browser-1")).toEqual([]);
    expect(grantedTo("browser-1")).toContain("open_embedded_page");
  });

  it("keeps browser controls out of product windows and the API out of home and browser windows", () => {
    const product = grantedTo("product-tlps-1");
    for (const command of ["open_embedded_page", "close_embedded_page", "browser_control", "validate_address", "list_workspace_projects", "list_workspace_events", "open_browser_window", "read_host_clock_snapshot"]) {
      expect(product, command).not.toContain(command);
    }
    for (const label of ["main", "browser-1"]) {
      for (const command of ["api_connect", "api_request", "upsert_workspace_project", "remove_workspace_project"]) {
        expect(grantedTo(label), `${label}: ${command}`).not.toContain(command);
      }
    }
    expect(byId["desktop-product"]).toBeDefined();
  });

  it("grants every command each window's own pages call", () => {
    const home = invokedIn(read("apps/maataa-desktop-tauri/web/app.js"));
    const browserOnly = ["open_embedded_page", "close_embedded_page", "browser_control"];
    for (const command of home) {
      const window = browserOnly.includes(command) ? "browser-1" : "main";
      expect(grantedTo(window), `${window}: ${command}`).toContain(command);
    }
    const productSources = [
      "apps/shared/maataa-workspace.ts",
      "apps/tlps/src/main.tsx",
      "apps/tlps/src/services/maataaAuthApi.ts",
    ].map(read).join("\n");
    const product = invokedIn(productSources).concat(
      [...productSources.matchAll(/call\("([a-z_]+)"/g)].map((m) => m[1]),
    );
    expect(product).toEqual(expect.arrayContaining(["upsert_workspace_project", "open_product_window", "api_connect", "api_request"]));
    for (const command of product) expect(grantedTo("product-tlps-1"), command).toContain(command);
  });
});
