import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "desktop-tauri-trial.spec.ts",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4180", ...devices["Desktop Chrome"] },
  webServer: {
    command: "python3 -m http.server 4180 --directory apps/maataa-desktop-tauri/web",
    url: "http://127.0.0.1:4180",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
