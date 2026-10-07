import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  // These suites have dedicated configs and their own preview servers. Running
  // them against the MAATAA demo preview produces misleading cross-app failures.
  testIgnore: ["desktop-shell.spec.ts", "support-center.spec.ts", "support-center-screenshots.spec.ts"],
  timeout: 30_000,
  fullyParallel: true,
  workers: 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"] } },
    { name: "firefox-desktop", use: { ...devices["Desktop Firefox"] } },
    { name: "firefox-mobile-viewport", use: { ...devices["Desktop Firefox"], viewport: {width:390,height:844} } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"] } },
    { name: "webkit-mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: { command: "node node_modules/vite/bin/vite.js preview --config examples/redux-demo/vite.config.mjs", url: "http://127.0.0.1:4173", reuseExistingServer: true, timeout: 60_000 },
});
