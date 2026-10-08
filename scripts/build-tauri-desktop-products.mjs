import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webRoot = path.join(repoRoot, "apps/maataa-desktop-tauri/web");
const productsRoot = path.join(webRoot, "products");
const productBuilds = [
  ["maataa-ui", "demo-dist"],
  ["tlps", "apps/tlps/dist"],
  ["tlp-film", "apps/tlp-film/dist"],
  ["support-center", "support-center-dist"],
];

await rm(productsRoot, { recursive: true, force: true });
await mkdir(productsRoot, { recursive: true });

for (const [name, relativeBuildPath] of productBuilds) {
  const source = path.join(repoRoot, relativeBuildPath);
  await readFile(path.join(source, "index.html"));
  const destination = path.join(productsRoot, name);
  await cp(source, destination, { recursive: true });
  process.stdout.write(`Bundled ${name} from ${relativeBuildPath}\n`);
}

const filmWrapper = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TLP Film handoff</title></head>
<body><p>Opening the local TLPS handoff…</p><script>location.replace('./index.html?from=tlps');</script></body></html>
`;
await writeFile(path.join(productsRoot, "tlp-film", "handoff.html"), filmWrapper);
