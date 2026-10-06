import fs from "node:fs"; import path from "node:path";
const required=["src/redux/store.ts","src/redux/hooks.ts","src/static-data/index.ts","src/demo/scenarios.ts","src/types/index.ts","DEMO_MANIFEST.json"];
const missing=required.filter(p=>!fs.existsSync(path.resolve(p)));
if(missing.length){console.error("Missing demo files",missing);process.exit(1)}
const manifest=JSON.parse(fs.readFileSync("DEMO_MANIFEST.json","utf8"));
if(manifest.redux.slices!==26 || manifest.scenarios!==7){console.error("Unexpected demo manifest counts",manifest);process.exit(1)}
console.log("Demo validation PASS", {slices:manifest.redux.slices,scenarios:manifest.scenarios,staticDatasets:manifest.staticData.datasets});
