import path from "node:path";
import { spawnSync } from "node:child_process";

const outputDirectory = path.resolve("artifacts/demo-videos");
const cli = path.resolve("node_modules/@playwright/test/cli.js");
const result = spawnSync(
  process.execPath,
  [cli, "test", "tests/e2e/catalog-videos.spec.ts", "--project=chromium-desktop"],
  {
    stdio: "inherit",
    env: { ...process.env, MAATAA_DEMO_VIDEO_OUTPUT_DIR: outputDirectory },
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
