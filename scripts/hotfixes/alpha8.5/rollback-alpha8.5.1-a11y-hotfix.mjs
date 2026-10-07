#!/usr/bin/env node
import { existsSync, copyFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const main = resolve(process.cwd(), "examples/redux-demo/main.tsx");
const backup = `${main}.pre-alpha8.5.1-backup`;
const hotfix = resolve(process.cwd(), "examples/redux-demo/a11y-hotfix.ts");

if (!existsSync(backup)) {
  console.error(`[alpha8.5.1-a11y] Backup not found: ${backup}`);
  process.exit(1);
}
copyFileSync(backup, main);
if (existsSync(hotfix)) unlinkSync(hotfix);
console.log("[alpha8.5.1-a11y] Rolled back main.tsx and removed a11y-hotfix.ts");
