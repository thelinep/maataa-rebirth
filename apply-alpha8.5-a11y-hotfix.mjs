#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const mainPath = resolve(root, "examples/redux-demo/main.tsx");
const hotfixPath = resolve(root, "examples/redux-demo/a11y-hotfix.ts");
const backupPath = `${mainPath}.alpha8.4-backup`;
const importLine = 'import "./a11y-hotfix";';

function fail(message) {
  console.error(`[alpha8.5-a11y] ${message}`);
  process.exit(1);
}

if (!existsSync(mainPath)) {
  fail(`Expected ${mainPath}. Run this script from the maataa-ui-full-alpha7 repo root.`);
}
if (!existsSync(hotfixPath)) {
  fail(`Missing ${hotfixPath}. Unzip the hotfix into the repo root first.`);
}

const source = readFileSync(mainPath, "utf8");
if (source.includes(importLine)) {
  console.log("[alpha8.5-a11y] Import already present; nothing to change.");
  process.exit(0);
}

if (!existsSync(backupPath)) {
  copyFileSync(mainPath, backupPath);
  console.log(`[alpha8.5-a11y] Backup: ${backupPath}`);
}

const lines = source.split(/\r?\n/);
let insertAt = 0;
while (insertAt < lines.length) {
  const trimmed = lines[insertAt].trim();
  if (
    trimmed.startsWith("import ") ||
    trimmed.startsWith("import{") ||
    trimmed.startsWith("import\t") ||
    trimmed === ""
  ) {
    insertAt += 1;
    continue;
  }
  break;
}

lines.splice(insertAt, 0, importLine);
writeFileSync(mainPath, lines.join("\n"), "utf8");
console.log("[alpha8.5-a11y] Patched examples/redux-demo/main.tsx");
console.log("[alpha8.5-a11y] Next: pnpm demo:build && pnpm exec playwright test tests/e2e/accessibility.spec.ts --project=chromium-desktop --project=chromium-mobile");
