import { defineConfig } from "@playwright/test";

const live = process.env.BRAHMINI_LIVE === "1";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "tlps-idea-to-script.spec.ts",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  timeout: live ? 300_000 : 30_000,
  outputDir: "test-results/tlps-idea-to-script",
  use: { browserName: "chromium", baseURL: "http://127.0.0.1:4196", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: [
    { command: "node node_modules/vite/bin/vite.js --config apps/tlps/vite.config.mjs", url: "http://127.0.0.1:4196", reuseExistingServer: true, timeout: 60_000 },
    ...(live ? [{ command: "node examples/redux-demo/brahmini-runtime.mjs", url: "http://127.0.0.1:4175/api/brahmini/status", reuseExistingServer: true, timeout: 30_000 }] : []),
  ],
});
