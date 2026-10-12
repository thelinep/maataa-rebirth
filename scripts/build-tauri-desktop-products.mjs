import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { BUILD_SCHEMA, buildStampPath, productSourceFingerprint } from "./desktop-products-fingerprint.mjs";

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
  // Skip dotfiles (.DS_Store and the like): they are not part of a product.
  await cp(source, destination, { recursive: true, filter: (file) => !path.basename(file).startsWith(".") });
  process.stdout.write(`Bundled ${name} from ${relativeBuildPath}\n`);
}

const tlpsIndexPath = path.join(productsRoot, "tlps", "index.html");
const tlpsIndex = await readFile(tlpsIndexPath, "utf8");
await writeFile(
  path.join(productsRoot, "tlps", "workspace.html"),
  tlpsIndex.replace("<title>TLPS · Planning Workspace</title>", "<title>TLPS · Saved Project</title>"),
);

// Opens TLPS directly in the Idea → Script panel (used for shared project records).
await writeFile(
  path.join(productsRoot, "tlps", "idea-to-script.html"),
  tlpsIndex.replace("<title>TLPS · Planning Workspace</title>", "<title>TLPS · Idea to Script</title>"),
);

const filmWorkspaceWrapper = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TLP Film project</title></head>
<body><p>Opening your local TLP Film project…</p><script>location.replace('./index.html?surface=workspace');</script></body></html>
`;
await writeFile(path.join(productsRoot, "tlp-film", "workspace.html"), filmWorkspaceWrapper);

const filmWrapper = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TLP Film handoff</title></head>
<body><p>Opening the local TLPS handoff…</p><script>location.replace('./index.html?from=tlps');</script></body></html>
`;
await writeFile(path.join(productsRoot, "tlp-film", "handoff.html"), filmWrapper);

// Stamp what these bundles were built from; the desktop e2e suite checks it.
const fingerprint = await productSourceFingerprint();
await writeFile(
  buildStampPath,
  `${JSON.stringify({ schema: BUILD_SCHEMA, ...fingerprint, products: productBuilds.map(([name]) => name), builtAtUnixMs: Date.now(), timeBasis: "host-unix-clock-unverified" }, null, 2)}\n`,
);
process.stdout.write(`Stamped products/BUILD.json (${fingerprint.sourceDigest.slice(0, 19)}…)\n`);
