import fs from "node:fs";
const required=["/","/surface","/playground","/sandbox","/demos","/docs","/help","/support"];
const manifest=JSON.parse(fs.readFileSync("manifests/PUBLIC_SURFACE_MANIFEST.json","utf8"));
const missing=required.filter((route)=>!manifest.routes.includes(route));
const duplicates=manifest.routes.filter((route,index,all)=>all.indexOf(route)!==index);
const files=["examples/redux-demo/index.html","examples/redux-demo/main.tsx","examples/redux-demo/App.tsx","examples/redux-demo/demo.css","examples/redux-demo/vite.config.mjs","src/demo/publicSurface.ts"];
const missingFiles=files.filter((file)=>!fs.existsSync(file));
const surfaceSource=fs.readFileSync("src/demo/publicSurface.ts","utf8");
const pageSource=fs.readFileSync("src/registries/pageRegistry.ts","utf8");
const pageIds=[...surfaceSource.matchAll(/pageTypeId: "([^"]+)"/g)].map((match)=>match[1]);
const missingPageIds=pageIds.filter((id)=>!pageSource.includes(`id: "${id}"`));
if(missing.length||duplicates.length||missingFiles.length||missingPageIds.length){console.error({missing,duplicates,missingFiles,missingPageIds});process.exit(1)}
console.log("Public surface validation PASS",{routes:manifest.routes.length,pageIds:pageIds.length});
