import fs from "node:fs";
import path from "node:path";

const mainPath = path.resolve("examples/redux-demo/main.tsx");
const backupPath = `${mainPath}.pre-alpha8.5.2-backup`;
if (!fs.existsSync(backupPath)) {
  console.error(`[alpha8.5.2-a11y] Backup not found: ${backupPath}`);
  process.exit(1);
}
fs.copyFileSync(backupPath, mainPath);
console.log(`[alpha8.5.2-a11y] Restored ${mainPath}`);
console.log("Remove examples/redux-demo/a11y-hotfix.ts manually if no older hotfix needs it.");
