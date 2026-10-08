import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "knowledge-graph.spec.ts",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4181", ...devices["Desktop Chrome"] },
  webServer: {
    command: "python3 -m http.server 4181 --directory docs/knowledge-graph",
    url: "http://127.0.0.1:4181",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
