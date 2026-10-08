import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { previewProductScaffold, scaffoldDigest, writeProductScaffold } from "../examples/redux-demo/productScaffold.mjs";

const temporaryDirectories: string[] = [];
afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(directory => rm(directory, { recursive: true, force: true })));
});

describe("reviewed independent app scaffold", () => {
  it("previews complete Electron and Tauri projects with MAATAA UI and safe desktop defaults", () => {
    const input = { name: "Community Tool Library", idea: "Help neighbors lend and repair tools." };
    const electron = previewProductScaffold({ ...input, target: "electron" });
    expect(electron.files.find(file => file.path === "package.json")?.content).toContain('"@types/react"');
    expect(electron.files.find(file => file.path === "package.json")?.content).toContain('"@types/react-dom"');
    expect(electron.files.map(file => file.path)).toContain("desktop/preload.cjs");
    expect(electron.files.find(file => file.path === "desktop/main.cjs")?.content).toContain("contextIsolation:true,nodeIntegration:false,sandbox:true");
    expect(electron.files.find(file => file.path === "package.json")?.content).toContain('"@maataa/ui": "file:../.."');
    expect(electron.files.find(file => file.path === "src/App.tsx")?.content).toContain("Save task");

    const tauri = previewProductScaffold({ ...input, target: "tauri" });
    expect(tauri.files.map(file => file.path)).toContain("src-tauri/capabilities/default.json");
    expect(tauri.files.find(file => file.path === "src-tauri/tauri.conf.json")?.content).toContain("frontendDist");
    expect(tauri.files.find(file => file.path === "src-tauri/capabilities/default.json")?.content).toContain("core:default");
  });

  it("requires approval and exact reviewed preview content, writes only beneath the chosen root, and never overwrites", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "maataa-scaffold-"));
    temporaryDirectories.push(root);
    const generated = path.join(root, "generated-apps");
    const preview = previewProductScaffold({ target: "electron", name: "Safe Project", idea: "A small starter." });
    const request = { target: preview.target, name: preview.name, idea: preview.idea, approved: true, previewSha256: scaffoldDigest(preview.files) };
    const created = await writeProductScaffold(request, generated);
    expect(created.folder).toBe("generated-apps/safe-project");
    expect(await readFile(path.join(generated, "safe-project", "src/product.ts"), "utf8")).toContain("A small starter.");
    await expect(writeProductScaffold(request, generated)).rejects.toMatchObject({ status: 409 });
    await expect(writeProductScaffold({ ...request, previewSha256: "0".repeat(64) }, generated)).rejects.toMatchObject({ status: 409 });
    await expect(writeProductScaffold({ ...request, approved: false }, generated)).rejects.toMatchObject({ status: 428 });
  });

  it("rejects unsupported frameworks, empty ideas, and oversized input", () => {
    expect(() => previewProductScaffold({ target: "shell", name: "Good name", idea: "Some idea" })).toThrow(/Electron or Tauri/);
    expect(() => previewProductScaffold({ target: "electron", name: "Good name", idea: "  " })).toThrow(/Idea must/);
    expect(() => previewProductScaffold({ target: "tauri", name: "Good name", idea: "x".repeat(4_001) })).toThrow(/Idea must/);
  });
});
