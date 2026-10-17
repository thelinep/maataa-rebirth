import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "tlps-connected-pilot.spec.ts",
  fullyParallel: false,
  workers: 1,
  timeout: 180000,
  use: {
    baseURL: "http://127.0.0.1:4184",
    browserName: "chromium",
    headless: true,
    trace: "retain-on-failure",
  },
  reporter: [["list"]],
  outputDir: ".local/tlps-api/browser-results",
});
