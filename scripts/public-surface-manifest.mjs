import fs from "node:fs";
import crypto from "node:crypto";
const routeFile = fs.readFileSync("src/demo/publicSurface.ts", "utf8");
const appFile = fs.readFileSync("examples/redux-demo/App.tsx", "utf8");
const routes = [...routeFile.matchAll(/path: "([^"]+)"/g)].map((match) => match[1]);
const sections = [...routeFile.matchAll(/id: "PUBLIC_SURFACE\.([A-Z_]+)"/g)].map((match) => match[1]);
const manifest = {
  version: "1.0.0-alpha.8",
  routes,
  sections,
  app: "examples/redux-demo/App.tsx",
  routing: "hash",
  supportTransport: "none-demo-local-only",
  appSha256: crypto.createHash("sha256").update(appFile).digest("hex"),
  sourceSha256: crypto.createHash("sha256").update(routeFile).digest("hex")
};
const raw=JSON.stringify(manifest,null,2)+"\n";
fs.writeFileSync("PUBLIC_SURFACE_MANIFEST.json",raw);
fs.writeFileSync("PUBLIC_SURFACE_MANIFEST.sha256",`${crypto.createHash("sha256").update(raw).digest("hex")}  PUBLIC_SURFACE_MANIFEST.json\n`);
