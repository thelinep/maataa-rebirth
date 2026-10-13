import { createHash } from "node:crypto";
import { mkdir, realpath, lstat, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const targets = new Set(["electron", "tauri"]);
export function productSlug(name) {
  const slug = String(name ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48).replace(/-+$/g, "");
  return slug.length >= 2 ? slug : "new-product";
}

function validateBasics(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Object.assign(new Error("Project details are required."), { status: 400 });
  if (!targets.has(input.target)) throw Object.assign(new Error("Choose Electron or Tauri."), { status: 400 });
  if (typeof input.name !== "string" || !input.name.trim() || input.name.trim().length > 120) throw Object.assign(new Error("Project name must be 1–120 characters."), { status: 400 });
  if (typeof input.idea !== "string" || !input.idea.trim() || input.idea.length > 4_000) throw Object.assign(new Error("Idea must be 1–4,000 characters."), { status: 400 });
  const nodes = Array.isArray(input.nodes) ? input.nodes.slice(0, 80).flatMap(node => {
    if (!node || typeof node !== "object") return [];
    const { label, detail, kind, uiNeed } = node;
    if (typeof label !== "string" || !label.trim() || label.length > 160 || typeof detail !== "string" || detail.length > 800) return [];
    return [{ label: label.trim(), detail: detail.trim(), kind: typeof kind === "string" ? kind.slice(0, 40) : "item", uiNeed: typeof uiNeed === "string" ? uiNeed.slice(0, 40) : "unmapped" }];
  }) : [];
  const unknowns = Array.isArray(input.unknowns) ? input.unknowns.filter(value => typeof value === "string").slice(0, 40).map(value => value.slice(0, 500)) : [];
  const audience = typeof input.audience === "string" ? input.audience.slice(0, 240) : "Not specified yet";
  return { target: input.target, name: input.name.trim(), idea: input.idea.trim(), slug: productSlug(input.name.trim()), audience, nodes, unknowns };
}

function appComponent() {
  return [
    'import { useState } from "react";',
    'import { Button, Input } from "@maataa/ui";',
    'import { product } from "./product";',
    "",
    "export function App() {",
    '  const [task, setTask] = useState("");',
    '  const [saved, setSaved] = useState("");',
    "  return <main className=\"product-shell\"><header><span className=\"brand-mark\">M</span><span>MAATAA PRODUCT</span><span className=\"preview-tag\">LOCAL STARTER</span></header><section className=\"hero\"><p className=\"eyebrow\">YOUR NEW PRODUCT</p><h1>{product.name}</h1><p className=\"idea\">{product.idea}</p><p className=\"audience\">For: {product.audience}</p><section className=\"feature-grid\" aria-label=\"First product areas\">{product.features.map((feature, index) => <article key={index}><span>{feature.kind} · {feature.uiNeed}</span><h2>{feature.label}</h2><p>{feature.detail}</p></article>)}</section>{product.openQuestions.length > 0 && <details className=\"open-questions\"><summary>Questions to resolve</summary><ul>{product.openQuestions.map((question, index) => <li key={index}>{question}</li>)}</ul></details>}<article className=\"workspace\"><h2>First workspace</h2><p>Start with one small task. This starter saves it only in this browser.</p><form onSubmit={event => { event.preventDefault(); if (task.trim()) { localStorage.setItem(\"product.first-task\", task.trim()); setSaved(task.trim()); } }}><label htmlFor=\"first-task\">What should you do first?</label><Input id=\"first-task\" value={task} onChange={event => setTask(event.target.value)} placeholder=\"Write the first task\"/><Button type=\"submit\" variant=\"primary\">Save task</Button></form>{saved && <p role=\"status\" className=\"saved\">Saved on this device: {saved}</p>}</article></section><footer>Built with the shared @maataa/ui package · Sample data only · No account or server is connected</footer></main>;",
    "}",
    "",
  ].join("\n");
}

export function previewProductScaffold(input) {
  const project = validateBasics(input);
  const pkg = {
    name: project.slug, private: true, version: "0.1.0", type: "module",
    scripts: { dev: "vite --host 127.0.0.1 --strictPort", build: "tsc --noEmit && vite build" },
    dependencies: { "@maataa/ui": "file:../..", react: "^19.0.0", "react-dom": "^19.0.0" },
    devDependencies: { "@types/react": "^19.0.0", "@types/react-dom": "^19.0.0", "@vitejs/plugin-react": "^4.3.0", typescript: "^5.8.0", vite: "^6.0.0" },
  };
  const files = [
    { path: "package.json", content: "" },
    { path: "index.html", content: "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"UTF-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\"/><title>" + project.name.replace(/[&<>"']/g, "") + "</title></head><body><div id=\"root\"></div><script type=\"module\" src=\"/src/main.tsx\"></script></body></html>\n" },
    { path: "src/main.tsx", content: 'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport "@maataa/ui/styles.css";\nimport { App } from "./App";\nimport "./style.css";\ncreateRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);\n' },
    { path: "src/product.ts", content: "export const product = " + JSON.stringify({ name: project.name, idea: project.idea, audience: project.audience, features: project.nodes, openQuestions: project.unknowns, source: "reviewed product graph" }, null, 2) + " as const;\n" },
    { path: "src/App.tsx", content: appComponent() },
    { path: "src/style.css", content: ":root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#24211b;background:#f4f1e9}*{box-sizing:border-box}body{margin:0}.product-shell{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto}.product-shell>header{display:flex;align-items:center;gap:12px;padding:18px clamp(18px,5vw,64px);border-bottom:1px solid #ded8ca;font-size:11px;font-weight:750;letter-spacing:.1em}.brand-mark{display:grid;width:34px;height:34px;place-items:center;border:1px solid #b79827;border-radius:50%;color:#8a6c08}.preview-tag{margin-left:auto;padding:7px 10px;border:1px solid #cfc8b8;border-radius:99px;font-size:9px;color:#706a5d}.hero{width:min(920px,100%);margin:auto;padding:clamp(32px,8vw,100px) 24px}.eyebrow{color:#8a6c08;font-size:10px;font-weight:800;letter-spacing:.16em}.hero h1{max-width:760px;margin:12px 0;font-size:clamp(42px,9vw,88px);line-height:.98;letter-spacing:-.055em}.idea,.audience{max-width:700px;color:#625e54;line-height:1.7}.feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:28px}.feature-grid article,.open-questions{padding:17px;border:1px solid #ded8ca;border-radius:12px;background:#fffdf8}.feature-grid article>span{color:#8a6c08;font-size:9px;text-transform:uppercase;letter-spacing:.1em}.feature-grid h2{margin:9px 0;font-size:17px}.feature-grid p{margin:0;color:#625e54;font-size:13px;line-height:1.6}.open-questions{margin-top:12px;color:#625e54}.open-questions summary{cursor:pointer;font-size:13px;font-weight:700}.open-questions li{margin-top:7px}.workspace{max-width:650px;margin-top:24px;padding:24px;border:1px solid #ded8ca;border-radius:14px;background:#fffdf8}.workspace h2{margin:0}.workspace>p{color:#625e54;line-height:1.6}.workspace form{display:grid;gap:12px}.workspace label{font-size:12px;font-weight:700}.workspace .m-button{justify-self:start}.saved{color:#27643b;font-size:12px}.product-shell footer{padding:20px 24px;text-align:center;border-top:1px solid #ded8ca;color:#706a5d;font-size:10px}@media(max-width:600px){.hero{padding-inline:18px}.feature-grid{grid-template-columns:1fr}.workspace{padding:18px}}\n" },
    { path: "vite.config.ts", content: 'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nexport default defineConfig({ plugins:[react()] });\n' },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2022", useDefineForClassFields: true, lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", skipLibCheck: true, moduleResolution: "Bundler", resolveJsonModule: true, noEmit: true, jsx: "react-jsx", strict: true, types: ["vite/client"] }, include: ["src"] }, null, 2) + "\n" },
  ];
  if (project.target === "electron") {
    pkg.main = "desktop/main.cjs";
    pkg.scripts.desktop = "electron .";
    pkg.scripts.package = "pnpm build && electron-builder";
    pkg.devDependencies.electron = "^44.5.1";
    pkg.devDependencies["electron-builder"] = "^26.17.0";
    pkg.build = { appId: "in.maataa." + project.slug, productName: project.name, files: ["dist/**/*", "desktop/**/*", "package.json"], directories: { output: "release" }, mac: { target: ["dmg"] }, win: { target: ["nsis"] }, linux: { target: ["AppImage"] } };
    files.push(
      { path: "desktop/main.cjs", content: 'const { app, BrowserWindow } = require("electron");\nconst path = require("node:path");\nfunction createWindow(){const window=new BrowserWindow({width:1200,height:800,minWidth:360,minHeight:560,show:false,webPreferences:{preload:path.join(__dirname,"preload.cjs"),contextIsolation:true,nodeIntegration:false,sandbox:true}});window.once("ready-to-show",()=>window.show());window.webContents.setWindowOpenHandler(()=>({action:"deny"}));window.loadFile(path.join(__dirname,"../dist/index.html"));}\napp.whenReady().then(createWindow);app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit();});app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});\n' },
      { path: "desktop/preload.cjs", content: 'const { contextBridge } = require("electron");\ncontextBridge.exposeInMainWorld("maataaDesktop",Object.freeze({platform:"electron"}));\n' },
      { path: "README.md", content: readme(project, "Electron", "pnpm desktop", "pnpm package") },
    );
  } else {
    pkg.scripts.dev = "vite --host 127.0.0.1 --port 1420 --strictPort";
    pkg.scripts["desktop:dev"] = "tauri dev";
    pkg.scripts["desktop:build"] = "pnpm build && tauri build";
    pkg.devDependencies["@tauri-apps/cli"] = "^2";
    pkg.dependencies["@tauri-apps/api"] = "^2";
    files.push(
      { path: "src-tauri/Cargo.toml", content: '[package]\nname = "' + project.slug + '"\nversion = "0.1.0"\nedition = "2021"\n\n[build-dependencies]\ntauri-build = { version = "2", features = [] }\n\n[dependencies]\ntauri = { version = "2", features = [] }\n' },
      { path: "src-tauri/build.rs", content: "fn main() { tauri_build::build() }\n" },
      { path: "src-tauri/src/main.rs", content: '#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]\nfn main() { ' + project.slug.replace(/-/g, "_") + '::run(); }\n' },
      { path: "src-tauri/src/lib.rs", content: '#[cfg_attr(mobile, tauri::mobile_entry_point)]\npub fn run() { tauri::Builder::default().run(tauri::generate_context!()).expect("error while running Tauri application"); }\n' },
      { path: "src-tauri/capabilities/default.json", content: JSON.stringify({ $schema: "../gen/schemas/desktop-schema.json", identifier: "default", description: "No extra system permissions are granted by this starter.", windows: ["main"], permissions: ["core:default"] }, null, 2) + "\n" },
      { path: "src-tauri/tauri.conf.json", content: JSON.stringify({ $schema: "https://schema.tauri.app/config/2", productName: project.name, version: "0.1.0", identifier: "in.maataa." + project.slug, build: { beforeDevCommand: "pnpm dev", devUrl: "http://localhost:1420", beforeBuildCommand: "pnpm build", frontendDist: "../dist" }, app: { windows: [{ title: project.name, width: 1200, height: 800, minWidth: 360, minHeight: 560 }], security: { csp: "default-src 'self'; img-src 'self' asset: data:; style-src 'self' 'unsafe-inline';" } }, bundle: { active: true, targets: "all" } }, null, 2) + "\n" },
      { path: "README.md", content: readme(project, "Tauri v2", "pnpm desktop:dev", "pnpm desktop:build") },
    );
  }
  files[0].content = JSON.stringify(pkg, null, 2) + "\n";
  files.push({ path: ".gitignore", content: "node_modules/\ndist/\nrelease/\nsrc-tauri/target/\n" });
  return { ...project, files };
}

function readme(project, platform, devCommand, buildCommand) {
  return "# " + project.name + "\n\n" + project.idea + "\n\nThis is a reviewed " + platform + " desktop-app starter built with the shared MAATAA UI package. It has a small responsive workspace and browser-local sample interaction. It does not include sign-in, a server, domain integrations, or production data.\n\n## Run in this MAATAA checkout\n\n1. From the repository root, run `pnpm build` for the shared UI package.\n2. In this project folder, run `pnpm install`. The shared package currently uses the local link `file:../..`.\n3. Build the web surface with `pnpm build`.\n4. Run the desktop shell with `" + devCommand + "`; package it with `" + buildCommand + "`.\n\nThis is an independent app folder in the current checkout. Moving it to another repository requires a published or packed `@maataa/ui` package and updating the local dependency.\n";
}

export function scaffoldDigest(files) {
  return createHash("sha256").update(JSON.stringify(files)).digest("hex");
}

export async function writeProductScaffold(input, generatedAppsDirectory) {
  const project = validateBasics(input);
  if (input.approved !== true) throw Object.assign(new Error("Review the scaffold preview and approve folder creation first."), { status: 428 });
  const preview = previewProductScaffold(project);
  if (typeof input.previewSha256 !== "string" || input.previewSha256 !== scaffoldDigest(preview.files)) throw Object.assign(new Error("The preview changed. Review the current scaffold before creating the folder."), { status: 409 });
  await mkdir(generatedAppsDirectory, { recursive: true });
  const baseStat = await lstat(generatedAppsDirectory);
  if (baseStat.isSymbolicLink() || !baseStat.isDirectory()) throw Object.assign(new Error("The generated-apps location must be a real directory."), { status: 400 });
  const base = await realpath(generatedAppsDirectory);
  const expectedBase = path.join(await realpath(path.dirname(generatedAppsDirectory)), path.basename(generatedAppsDirectory));
  if (base !== expectedBase) throw Object.assign(new Error("The generated-apps folder resolves outside its configured location."), { status: 400 });
  const destination = path.resolve(base, project.slug);
  if (!destination.startsWith(base + path.sep)) throw Object.assign(new Error("Project path is outside generated-apps."), { status: 400 });
  try { await mkdir(destination, { recursive: false, mode: 0o755 }); }
  catch (error) { if (error?.code === "EEXIST") throw Object.assign(new Error("That project folder already exists. Rename the project to create another copy."), { status: 409 }); throw error; }
  try {
    for (const file of preview.files) {
      const filePath = path.resolve(destination, file.path);
      if (!filePath.startsWith(destination + path.sep)) throw new Error("A scaffold path escaped its project folder.");
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, file.content, { encoding: "utf8", flag: "wx", mode: 0o644 });
    }
  } catch (error) { await rm(destination, { recursive: true, force: true }); throw error; }
  return { folder: "generated-apps/" + project.slug, target: project.target, files: preview.files.map(file => file.path) };
}
