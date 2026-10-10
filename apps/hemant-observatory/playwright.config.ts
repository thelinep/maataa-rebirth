import { defineConfig } from "@playwright/test";

const requestedPort = process.env.HEMANT_E2E_PORT ?? "4211";
if (!/^\d{4,5}$/.test(requestedPort) || Number(requestedPort) < 1024 || Number(requestedPort) > 65535) {
  throw new Error("HEMANT_E2E_PORT must be an available port from 1024 to 65535");
}
const origin = `http://127.0.0.1:${requestedPort}`;

// Uses the alpha7 checkout's existing @playwright/test install (resolved from
// the parent node_modules). Serves the production build (`next start`), so run
// `next build` and `cargo build` first (scripts/check.sh does both) so
// target/debug/hemant-shell exists. Uses port 4211 so it never collides
// with a dev server you already have running on 4210.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  outputDir: "../../test-results/hemant-observatory",
  use: { browserName: "chromium", baseURL: origin, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${requestedPort}`,
    url: `${origin}/api/methods`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
