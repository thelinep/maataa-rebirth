import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else files.push(p);
  }
}
for (const dir of ["src/redux", "src/types", "src/static-data", "src/demo", "src/identity", "src/icons", "src/composer", "src/runtime"]) walk(dir);
files.sort();
const items = files.map((p) => ({
  path: p,
  sha256: crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex"),
}));
const manifest = {
  version: JSON.parse(fs.readFileSync("package.json", "utf8")).version,
  generated: "deterministic-source-manifest",
  redux: { slices: (fs.readFileSync("src/registries/reduxSliceRegistry.ts","utf8").match(/REDUX_SLICE\./g)||[]).length, selectors: (fs.readFileSync("src/registries/reduxSelectorRegistry.ts","utf8").match(/REDUX_SELECTOR\./g)||[]).length, middleware: 3 },
  scenarios: 7,
  staticData: { datasets: 12 },
  types: { modules: (fs.readFileSync("src/registries/typeContractRegistry.ts","utf8").match(/TYPE_CONTRACT\./g)||[]).length },
  files: items,
};
const raw = JSON.stringify(manifest, null, 2) + "\n";
fs.mkdirSync("manifests", { recursive: true });
fs.writeFileSync("manifests/DEMO_MANIFEST.json", raw);
const hash = crypto.createHash("sha256").update(raw).digest("hex");
fs.writeFileSync("manifests/DEMO_MANIFEST.sha256", `${hash}  DEMO_MANIFEST.json\n`);
console.log(hash);
