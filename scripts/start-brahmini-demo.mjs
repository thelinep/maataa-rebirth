import { spawn } from "node:child_process";

const preview = process.argv.includes("--preview");
const viteArgs = [
  "exec",
  "vite",
  ...(preview ? ["preview"] : []),
  "--config",
  "examples/redux-demo/vite.config.mjs",
];
const children = [
  spawn(process.execPath, ["examples/redux-demo/brahmini-runtime.mjs"], {
    stdio: "inherit",
    env: process.env,
  }),
  spawn(process.platform === "win32" ? "pnpm.cmd" : "pnpm", viteArgs, {
    stdio: "inherit",
    env: process.env,
  }),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children)
    if (child.exitCode === null) child.kill("SIGTERM");
  process.exitCode = code;
}
for (const child of children)
  child.on("error", (error) => {
    process.stderr.write(
      `Could not start the MAATAA demo process: ${error.message}\n`,
    );
    stop(1);
  });
for (const child of children)
  child.on("exit", (code) => {
    if (!stopping) stop(code || 0);
  });
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
