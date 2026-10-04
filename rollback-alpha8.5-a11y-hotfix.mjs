#!/usr/bin/env node
import { existsSync, copyFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const mainPath = resolve(root, "examples/redux-demo/main.tsx");
const backupPath = `${mainPath}.alpha8.4-backup`;
const hotfixPath = resolve(root, "examples/redux-demo/a11y-hotfix.ts");

if (!existsSync(backupPath)) {
  console.error(`[alpha8.5-a11y] Backup not found: ${backupPath}`);
  process.exit(1);
}
copyFileSync(backupPath, mainPath);
rmSync(backupPath, { force: true });
rmSync(hotfixPath, { force: true });
console.log("[alpha8.5-a11y] Restored alpha8.4 demo entrypoint and removed hotfix module.");
