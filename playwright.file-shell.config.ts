import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "desktop-shell-file.spec.ts",
  timeout: 30_000,
  workers: 1,
  reporter: [["list"]],
  outputDir: "test-results/desktop-shell-file",
  use: { viewport: { width: 1440, height: 960 }, screenshot: "only-on-failure" },
});
