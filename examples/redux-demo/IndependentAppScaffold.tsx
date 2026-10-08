import * as React from "react";

type Target = "electron" | "tauri";
type ScaffoldFile = { path: string; content: string };
type ScaffoldPreview = {
  target: Target;
  name: string;
  idea: string;
  slug: string;
  files: ScaffoldFile[];
  previewSha256: string;
};

export function IndependentAppScaffold({ name, idea, audience, nodes, unknowns }: { name: string; idea: string; audience: string; nodes: Array<{ kind: string; label: string; detail: string; uiNeed: string }>; unknowns: string[] }) {
  const [target, setTarget] = React.useState<Target>("electron");
  const [preview, setPreview] = React.useState<ScaffoldPreview | null>(null);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [approved, setApproved] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const makePreview = async () => {
    setBusy(true); setMessage(""); setApproved(false); setPreview(null);
    try {
      const response = await fetch("/api/brahmini/scaffold/preview", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ target, name, idea, audience, nodes, unknowns }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not prepare the scaffold preview.");
      setPreview(result as ScaffoldPreview);
      setSelectedFile(result.files?.[0]?.path ?? "");
      setMessage("Preview ready. Inspect the generated files before creating the project folder.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Brahmini local runtime is unavailable.");
    } finally { setBusy(false); }
  };

  const createFolder = async () => {
    if (!preview || !approved) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/brahmini/scaffold/create", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ target: preview.target, name: preview.name, idea: preview.idea, audience, nodes, unknowns, approved: true, previewSha256: preview.previewSha256 }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The local project folder could not be created.");
      setMessage("Created " + result.folder + " · " + result.files.length + " files · no install or build was run.");
      setApproved(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Brahmini local runtime is unavailable.");
    } finally { setBusy(false); }
  };

  const currentFile = preview?.files.find((file) => file.path === selectedFile);
  return <section className="independent-scaffold" aria-labelledby="independent-scaffold-title">
    <div className="brahmini-panel-head"><div><h3 id="independent-scaffold-title">Create a standalone desktop app</h3><p>Choose Electron or Tauri. Brahmini prepares a fixed MAATAA UI starter, shows every file, then creates it locally only after your approval.</p></div></div>
    <div className="scaffold-controls"><label htmlFor="scaffold-target">Desktop platform</label><select id="scaffold-target" value={target} onChange={event => { setTarget(event.target.value as Target); setPreview(null); setApproved(false); setMessage(""); }}><option value="electron">Electron</option><option value="tauri">Tauri v2</option></select><button className="gold-button" type="button" disabled={busy || !name.trim() || !idea.trim()} onClick={() => void makePreview()}>{busy ? "Preparing…" : "Preview app files"}</button></div>
    <ul className="scaffold-safeguards"><li>Uses the shared local @maataa/ui package.</li><li>Uses synthetic local sample state only.</li><li>Does not install dependencies, run commands, or build the app.</li><li>Folder creation is limited to generated-apps/ and never overwrites an existing folder.</li></ul>
    {preview && <div className="scaffold-review"><div className="scaffold-file-list"><strong>{preview.slug} · {preview.files.length} files</strong><label htmlFor="scaffold-file">Inspect a file</label><select id="scaffold-file" value={selectedFile} onChange={event => setSelectedFile(event.target.value)}>{preview.files.map(file => <option key={file.path} value={file.path}>{file.path}</option>)}</select><label className="scaffold-approval"><input type="checkbox" checked={approved} onChange={event => setApproved(event.target.checked)} /><span>I reviewed this file preview and approve creating this local app folder.</span></label><button className="gold-button" type="button" disabled={!approved || busy} onClick={() => void createFolder()}>{busy ? "Creating folder…" : "Create reviewed app folder"}</button></div><pre className="scaffold-file-content" aria-label={selectedFile ? "Preview of " + selectedFile : "Generated file preview"}>{currentFile?.content ?? "Choose a file to inspect its contents."}</pre></div>}
    <p className="scaffold-status" role="status">{message || "The app will be created as a separate project folder. The local MAATAA package link works in this checkout; moving it elsewhere needs a published or packed package."}</p>
  </section>;
}
