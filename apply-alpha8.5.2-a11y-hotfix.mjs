import fs from "node:fs";
import path from "node:path";

const mainPath = path.resolve("examples/redux-demo/main.tsx");
const backupPath = `${mainPath}.pre-alpha8.5.2-backup`;

if (!fs.existsSync(mainPath)) {
  console.error(`[alpha8.5.2-a11y] Missing ${mainPath}`);
  process.exit(1);
}

let source = fs.readFileSync(mainPath, "utf8");
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(mainPath, backupPath);
  console.log(`[alpha8.5.2-a11y] Backup: ${backupPath}`);
}

// Remove alpha8.5/8.5.1 side-effect imports and any previous named import/call.
source = source
  .replace(/^import\s+["']\.\/a11y-hotfix["'];?\s*\n?/gm, "")
  .replace(/^import\s+\{\s*installA11yHotfix\s*\}\s+from\s+["']\.\/a11y-hotfix["'];?\s*\n?/gm, "")
  .replace(/^installA11yHotfix\(\);?\s*\n?/gm, "");

source = `import { installA11yHotfix } from "./a11y-hotfix";\n${source.trimEnd()}\n\ninstallA11yHotfix();\n`;
fs.writeFileSync(mainPath, source);

console.log("[alpha8.5.2-a11y] Installed referenced import + explicit installer call.");
console.log("[alpha8.5.2-a11y] Verify import:");
console.log(fs.readFileSync(mainPath, "utf8").split("\n").slice(0, 4).join("\n"));
console.log("[alpha8.5.2-a11y] Verify call:");
console.log(fs.readFileSync(mainPath, "utf8").split("\n").slice(-5).join("\n"));
