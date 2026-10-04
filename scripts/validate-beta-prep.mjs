import fs from "node:fs"; import path from "node:path";
const root=process.cwd();
const required=["playwright.config.ts","tests/e2e/surfaces.spec.ts","tests/e2e/accessibility.spec.ts","fixtures/consumer-vite/src/main.tsx","scripts/certify-consumer.mjs","scripts/check-bundle-budgets.mjs","beta/bundle-budgets.json","CERTIFICATION-EVIDENCE.md","BETA-PREP.md"];
const missing=required.filter(f=>!fs.existsSync(path.join(root,f)));
const pkg=JSON.parse(fs.readFileSync(path.join(root,"package.json"),"utf8"));
const scripts=["package:consumer","browser:test","browser:a11y","bundle:check","beta:manifest","beta:validate","certify:beta"].filter(s=>!pkg.scripts?.[s]);
const status=missing.length||scripts.length?"FAIL":"PASS";
console.log(JSON.stringify({status,missing,missingScripts:scripts,version:pkg.version,private:pkg.private},null,2));
if(status!=="PASS")process.exit(1);
