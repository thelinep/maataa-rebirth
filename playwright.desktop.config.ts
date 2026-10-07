import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "desktop-shell.spec.ts",
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  outputDir: "test-results/desktop-shell",
  use: {
    baseURL: "http://127.0.0.1:4179",
    viewport: { width: 1440, height: 960 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node examples/support-center/electron/serve.mjs",
    url: "http://127.0.0.1:4179/",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
