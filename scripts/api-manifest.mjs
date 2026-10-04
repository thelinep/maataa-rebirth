import { createHash } from "node:crypto";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const categories = ["foundation","typography","actions","forms","navigation","surfaces","feedback","data","visualization","maps","mobile","device-atoms","devices","device-groups","themes","atomic","layout-atoms","layouts","page-atoms","pages","workspace-atoms","workspaces","registry-atoms","registry-ui","registries","page-groups","workspace-groups","layout-groups","generator-atoms","generators","generator-groups","tool-atoms","tools","tool-groups","ai-space-atoms","ai-spaces","ai-space-groups","types","redux","static-data","demo","identity","icons","composer","runtime"];
const exportsList = [];
async function indexFile(category) {
  for (const name of ["index.tsx", "index.ts"]) {
    const file = path.join(root, "src", category, name);
    try { await access(file); return file; } catch {}
  }
  throw new Error(`Missing public index for ${category}`);
}
for (const category of categories) {
  const file = await indexFile(category);
  const source = await readFile(file, "utf8");
  const names = new Set();
  for (const match of source.matchAll(/export\s+(?:const|function|class|type|interface)\s+([A-Za-z_$][\w$]*)/g)) names.add(match[1]);
  for (const match of source.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of match[1].split(",")) {
      const cleaned = part.trim().replace(/^type\s+/, "");
      const name = cleaned.split(/\s+as\s+/).at(-1)?.trim();
      if (name) names.add(name);
    }
  }
  for (const match of source.matchAll(/export\s+\*\s+from\s+["']\.\/([^"']+)["']/g)) names.add(match[1]);
  for (const name of [...names].sort()) exportsList.push({ name, subpath: `./${category}`, kind: /^[A-Z]/.test(name) ? "component-or-type" : "api" });
}
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const manifest = { schemaVersion: "1.0.0", package: pkg.name, version: pkg.version, generatedFrom: "src category public exports", exports: exportsList };
const pretty = JSON.stringify(manifest, null, 2) + "\n";
await writeFile(path.join(root, "PUBLIC_API.json"), pretty);
const hash = createHash("sha256").update(pretty).digest("hex");
await writeFile(path.join(root, "PUBLIC_API.sha256"), `${hash}  PUBLIC_API.json\n`);
console.log(`${exportsList.length} public declarations · ${hash}`);
