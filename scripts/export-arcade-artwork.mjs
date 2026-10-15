import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { chromium } from "@playwright/test";
import ts from "typescript";

const root = fileURLToPath(new URL("..", import.meta.url));
const baseUrl = process.argv[2] || "http://127.0.0.1:4180";
const onlyMissing = process.argv.includes("--only-missing");
const url = new URL(baseUrl);
if (url.protocol !== "http:" || !["127.0.0.1", "localhost"].includes(url.hostname)) throw new Error("Artwork export requires a local preview.");
const output = path.join(root, "examples/support-center/public/artwork");
async function moduleUrl(relative) {
  const source = await fs.readFile(path.join(root, relative), "utf8");
  let code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  if (relative.endsWith("artworkModel.ts")) {
    const dependencies = {
      "@maataa/ui/registries/workspaceRegistry": "src/registries/workspaceRegistry.ts",
      "../../apps/tlps/src/registries/workspaceRegistry": "apps/tlps/src/registries/workspaceRegistry.ts",
      "../redux-demo/workspaceDataSlices": "examples/redux-demo/workspaceDataSlices.ts",
    };
    for (const [specifier, filename] of Object.entries(dependencies)) code = code.replace(JSON.stringify(specifier), JSON.stringify(await moduleUrl(filename)));
  }
  return `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
}
const { ARTWORK_FRAMES, artworkFilename, ARTWORK_WORLDS } = await import(await moduleUrl("examples/support-center/artworkModel.ts"));
await fs.mkdir(path.join(output, "frames"), { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 });
const failures = [], overflows = [];
let index = 0, completed = 0;
try {
  await Promise.all(Array.from({ length: 4 }, async () => {
    const page = await context.newPage();
    while (index < ARTWORK_FRAMES.length) {
      const frame = ARTWORK_FRAMES[index++];
      try {
        if (onlyMissing) {
          try { await fs.access(path.join(output, "frames", artworkFilename(frame))); completed++; continue; } catch { /* Render new entries below. */ }
        }
        await page.goto(`${url.origin}/#/artwork/${encodeURIComponent(frame.id)}`);
        const canvas = page.getByTestId("artwork-frame");
        await canvas.waitFor();
        await page.evaluate(async () => {
          await document.fonts.ready;
          const element = document.querySelector('[data-testid="artwork-frame"]');
          const imageUrl = getComputedStyle(element).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
          if (!imageUrl) throw new Error("Artwork scene is missing");
          const image = new Image(); image.src = imageUrl; await image.decode();
        });
        const fits = await canvas.evaluate((element) => element.scrollHeight <= element.clientHeight && element.scrollWidth <= element.clientWidth);
        if (!fits) overflows.push(frame.id);
        const filename = artworkFilename(frame);
        await canvas.screenshot({ path: path.join(output, "frames", filename), type: "webp", quality: 88, animations: "disabled" });
        await fs.writeFile(path.join(output, "frames", `${filename}.json`), JSON.stringify({ prompt: `Origin: Rendered local Arcade Quest artwork frame ${frame.id}; source: examples/support-center/ArtworkGallery.tsx and artworkModel.ts. Shared scene prompt: ../${frame.world}.webp.json. Synthetic visual concept, not a live workspace.` }, null, 2));
        completed++;
        if (completed % 50 === 0) console.log(`Rendered ${completed}/${ARTWORK_FRAMES.length} frames`);
      } catch (error) { failures.push({ id: frame.id, error: error.message }); }
    }
    await page.close();
  }));
} finally { await browser.close(); }
const manifest = {
  schema: "maataa.arcade-artwork.v1", generatedAt: new Date().toISOString(),
  generator: "Built-in ImageGen scenes + browser-rendered named frames",
  sceneCount: ARTWORK_WORLDS.length, frameCount: ARTWORK_FRAMES.length,
  sourceCounts: Object.fromEntries(["MAATAA", "TLPS", "Support Center"].map((source) => [source, ARTWORK_FRAMES.filter((frame) => frame.source === source).length])),
  dimensions: { width: 1200, height: 720 },
  scope: "Illustrative artwork frames. Eight scene illustrations reused across named workspace frames; no additional live workflows or execution authority are established.",
  frames: ARTWORK_FRAMES.map((frame) => ({ ...frame, file: `frames/${artworkFilename(frame)}`, scene: `${frame.world}.webp` })),
  completed, failures, overflows,
};
await fs.writeFile(path.join(output, "frame-manifest.json"), JSON.stringify(manifest, null, 2));
if (failures.length || overflows.length) { console.log(JSON.stringify({ failures, overflows })); process.exitCode = 1; }
else {
  const scenes = ARTWORK_WORLDS.flatMap((world) => [`${world}.webp`, `${world}.webp.json`]);
  const files = ARTWORK_FRAMES.flatMap((frame) => [`frames/${artworkFilename(frame)}`, `frames/${artworkFilename(frame)}.json`]);
  execFileSync("zip", ["-q", "frame-pack.zip", "frame-manifest.json", "provenance.json", ...scenes, ...files], { cwd: output });
  console.log(JSON.stringify({ completed, sourceCounts: manifest.sourceCounts, zip: path.join(output, "frame-pack.zip") }));
}
