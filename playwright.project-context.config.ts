import { defineConfig } from "@playwright/test";

// MAATAA UI test server port: chosen free by scripts/run-project-context-checks.sh (default 4198).
const uiPort = Number(process.env.PROJECT_CONTEXT_UI_PORT || 4198);

// Same-record handoff checks: TLPS Idea → Script (4196) and MAATAA UI / Brahmini Workbench (4173).
// Synthetic data and mocked Brahmini / Desktop bridges only; no model runs.
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "project-context.spec.ts",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  timeout: 120_000,
  outputDir: "test-results/project-context",
  use: { browserName: "chromium", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: [
    { command: "node node_modules/vite/bin/vite.js --config apps/tlps/vite.config.mjs", url: "http://127.0.0.1:4196", reuseExistingServer: true, timeout: 60_000 },
    // Own port and never reused: a long-running dev server on 4173 can serve stale
    // pre-bundled deps ("504 Outdated Optimize Dep") after new imports were added.
    { command: `node node_modules/vite/bin/vite.js --config examples/redux-demo/vite.config.mjs --port ${uiPort} --strictPort`, url: `http://127.0.0.1:${uiPort}`, reuseExistingServer: false, timeout: 120_000 },
  ],
});
