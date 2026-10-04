#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const mainPath = resolve(root, "examples/redux-demo/main.tsx");
const hotfixPath = resolve(root, "examples/redux-demo/a11y-hotfix.ts");
const backupPath = `${mainPath}.pre-alpha8.5.1-backup`;
const importLine = 'import "./a11y-hotfix";';

function die(msg) {
  console.error(`[alpha8.5.1-a11y] ${msg}`);
  process.exit(1);
}

if (!existsSync(mainPath)) die(`Missing ${mainPath}. Run from the repo root.`);
if (!existsSync(hotfixPath)) die(`Missing ${hotfixPath}. Unzip the hotfix into the repo first.`);

let source = readFileSync(mainPath, "utf8");

if (!existsSync(backupPath)) {
  copyFileSync(mainPath, backupPath);
  console.log(`[alpha8.5.1-a11y] Backup: ${backupPath}`);
}

// Remove any previous identical side-effect import, then prepend the import.
// ES module imports are evaluated before the rest of main.tsx, which guarantees
// the CSS/observer is installed before the React bootstrap body executes.
source = source
  .split(/\r?\n/)
  .filter((line) => line.trim() !== importLine)
  .join("\n");

writeFileSync(mainPath, `${importLine}\n${source}`, "utf8");
console.log("[alpha8.5.1-a11y] Installed import as first line of examples/redux-demo/main.tsx");
console.log("[alpha8.5.1-a11y] Verify: head -n 3 examples/redux-demo/main.tsx");
