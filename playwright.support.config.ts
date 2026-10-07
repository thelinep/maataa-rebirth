import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "support-center.spec.ts",
  timeout: 45_000,
  fullyParallel: true,
  workers: 2,
  reporter: [["list"]],
  outputDir: "test-results/support-center",
  use: {
    baseURL: "http://127.0.0.1:4178",
    video: { mode: "on" },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "chromium-mobile", use: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 } } },
    { name: "chromium-narrow", use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 720 } } },
  ],
  webServer: {
    command: "node node_modules/vite/bin/vite.js preview --config examples/support-center/vite.config.mjs",
    url: "http://127.0.0.1:4178",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
