import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "next-consumer.spec.ts",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: { trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "consumer-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "consumer-mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } },
  ],
});
