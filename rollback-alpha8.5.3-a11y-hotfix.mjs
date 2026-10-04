import fs from "node:fs";
import path from "node:path";

const mainPath = path.resolve("examples/redux-demo/main.tsx");
const backupPath = `${mainPath}.pre-alpha8.5.3-backup`;

if (!fs.existsSync(backupPath)) {
  console.error(`[alpha8.5.3-a11y] Backup not found: ${backupPath}`);
  process.exit(1);
}
fs.copyFileSync(backupPath, mainPath);
console.log("[alpha8.5.3-a11y] Restored main.tsx to pre-alpha8.5.3 state.");
console.log("[alpha8.5.3-a11y] Note: examples/redux-demo/a11y-hotfix.ts remains on disk; alpha8.5.2 import/call state is restored by the backup.");
