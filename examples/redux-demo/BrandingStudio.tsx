import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { EditorWorkbenchFrame, parseEditorDocument, serializeEditorDocument, useEditorHistory } from "@maataa/ui/editor";
import { Badge } from "@maataa/ui/feedback/Badge";
import { Card } from "@maataa/ui/surfaces/Card";
import {
  applyAcceptedBrandSuggestions,
  BRAND_DOMAINS,
  BRAND_NODE_KINDS,
  BRANDING_STORAGE_KEY,
  createInitialBrandingDocument,
  parseBrandSuggestions,
  validateBrandDocument,
  type BrandDomainId,
  type BrandNode,
  type BrandNodeKind,
  type BrandSuggestion,
  type BrandingDocumentV1,
} from "./brandingStudioModel";
import { DEFAULT_STUDIO_THEME, themeToCssVariables, type StudioTheme } from "./themeStudioModel";
import "./branding-studio.css";
import { readStoredValue, writeStoredValue } from "@maataa/ui/compounds";

type Stage = "board" | "kit" | "theme" | "review";
type ProviderId = "ollama" | "anthropic" | "gemini";
type Provider = { id: ProviderId; label: string; configured: boolean; models: Array<{ id: string; label: string }>; message: string };
type ProviderResult = { text: string; provider: ProviderId; model: string; modelDigest?: string; promptSha256?: string };
type SuggestionDraft = { summary: string; changes: BrandSuggestion[]; provider: string; model: string; modelDigest?: string; promptSha256?: string };
const STAGES: Array<{ id: Stage; label: string; detail: string }> = [
  { id: "board", label: "Brand board", detail: "Map the direction and its evidence." },
  { id: "kit", label: "Brand Kit", detail: "Edit identity references, palette, and type." },
  { id: "theme", label: "Theme preview", detail: "Hand semantic values to Theme Studio." },
  { id: "review", label: "Review & assign", detail: "Save a version and draft product assignments." },
];
const COLORS = ["canvas", "surface", "elevated", "text", "muted", "border", "primary", "primaryText", "secondary", "success", "warning", "danger", "info", "focus"] as const;
const clamp = (number: number, min: number, max: number) => Math.min(max, Math.max(min, number));
const makeId = (prefix: string) => `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

function readDocument(): BrandingDocumentV1 {
  // Storage may be blocked or hold an older invalid draft; both fall through to the default.
  const stored = readStoredValue<BrandingDocumentV1 | null>(BRANDING_STORAGE_KEY, (raw) => (validateBrandDocument(raw) ? raw : null), null);
  if (stored) return stored;
  return createInitialBrandingDocument();
}

function downloadJson(name: string, value: unknown) {
  const blob = new Blob([serializeEditorDocument(value)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function cardTheme(document: BrandingDocumentV1): StudioTheme {
  const palette = document.nodes.find(node => node.kind === "palette")?.colors ?? {};
  const typography = document.nodes.find(node => node.kind === "typography")?.fontFamily;
  return {
    ...DEFAULT_STUDIO_THEME,
    name: `${document.name} · candidate`,
    colors: { ...DEFAULT_STUDIO_THEME.colors, ...palette },
    typography: { ...DEFAULT_STUDIO_THEME.typography, ...(typography ? { bodyFont: typography, headingFont: typography } : {}) },
  };
}

function parseJsonResponse(text: string): { summary: string; suggestions: unknown[] } {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const data: unknown = JSON.parse(cleaned);
  if (!data || typeof data !== "object" || !Array.isArray((data as { suggestions?: unknown }).suggestions)) throw new Error("The model reply must be JSON with a suggestions array.");
  const summary = (data as { summary?: unknown }).summary;
  return { summary: typeof summary === "string" ? summary.slice(0, 1200) : "Review the proposed changes below.", suggestions: (data as { suggestions: unknown[] }).suggestions };
}

export function BrandingStudio({ navigate }: { navigate: (path: string) => void }) {
  const history = useEditorHistory<BrandingDocumentV1>(readDocument);
  const document = history.value;
  const [stage, setStage] = React.useState<Stage>("board");
  const [selectedId, setSelectedId] = React.useState("brand-thesis");
  const [selectedContext, setSelectedContext] = React.useState<string[]>([]);
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [providerId, setProviderId] = React.useState<ProviderId>("ollama");
  const [modelId, setModelId] = React.useState("");
  const [providerMessage, setProviderMessage] = React.useState("Checking the Brahmini provider runtime…");
  const [providerBusy, setProviderBusy] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [suggestion, setSuggestion] = React.useState<SuggestionDraft | null>(null);
  const [acceptedRows, setAcceptedRows] = React.useState<number[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [notice, setNotice] = React.useState("Draft autosaves on this device.");
  const [versionName, setVersionName] = React.useState("Brand Kit review 1");
  const [assignmentSelection, setAssignmentSelection] = React.useState<BrandDomainId[]>([]);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [livePositions, setLivePositions] = React.useState<Record<string, { x: number; y: number }>>({});
  const [importError, setImportError] = React.useState("");
  const boardRef = React.useRef<HTMLDivElement>(null);
  const importRef = React.useRef<HTMLInputElement>(null);
  const selected = document.nodes.find(node => node.id === selectedId) ?? document.nodes[0];
  const selectedProviders = providers.find(provider => provider.id === providerId);
  const selectedModel = selectedProviders?.models.find(item => item.id === modelId)?.id ?? selectedProviders?.models[0]?.id ?? "";
  const variables = React.useMemo(() => themeToCssVariables(cardTheme(document)) as React.CSSProperties, [document]);

  const commit = React.useCallback((edit: (current: BrandingDocumentV1) => BrandingDocumentV1) => {
    history.update(current => {
      const next = edit(current);
      return next === current ? current : { ...next, updatedAt: new Date().toISOString() };
    });
    setNotice("Saved on this device");
  // eslint-disable-next-line react-hooks/exhaustive-deps -- depends on the stable history.update function, not the history object, so the callback stays stable across edits
  }, [history.update]);

  React.useEffect(() => {
    if (!writeStoredValue(BRANDING_STORAGE_KEY, serializeEditorDocument(document))) setNotice("Browser storage is unavailable. Export the JSON draft to keep a copy.");
  }, [document]);

  const refreshProviders = React.useCallback(async () => {
    setProviderBusy(true);
    try {
      const response = await fetch("/api/brahmini/status", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !Array.isArray(data.providers)) throw new Error(data.error || "Provider status response is unavailable.");
      setProviders(data.providers);
      const configured = data.providers.filter((item: Provider) => item.configured);
      setProviderMessage(configured.length ? `${configured.map((item: Provider) => item.label).join(", ")} ready. Choose a provider explicitly; no fallback is automatic.` : "No provider is configured. Start the local Brahmini runtime or configure an existing provider there.");
    } catch {
      setProviders([]);
      setProviderMessage("Brahmini runtime is offline. Start `pnpm brahmini:dev` to check Ollama, Anthropic, or Gemini status.");
    } finally { setProviderBusy(false); }
  }, []);

  React.useEffect(() => { void refreshProviders(); }, [refreshProviders]);

  const undo = () => { history.undo(); setNotice("Last board edit undone"); };
  const redo = () => { history.redo(); setNotice("Board edit restored"); };
  const updateNode = (id: string, patch: Partial<BrandNode>) => commit(current => ({ ...current, nodes: current.nodes.map(node => node.id === id ? { ...node, ...patch } : node) }));
  const addNode = (kind: BrandNodeKind) => {
    const detail = BRAND_NODE_KINDS.find(item => item.id === kind)!;
    const node: BrandNode = { id: makeId(kind), kind, title: `${detail.label} · draft`, content: "Add source-backed details. Keep assumptions and unapproved assets clearly labeled.", x: 8 + Math.random() * 48, y: 20 + Math.random() * 55, source: "User-authored local draft", rights: "unknown", ...(kind === "palette" ? { colors: { ...DEFAULT_STUDIO_THEME.colors } } : {}), ...(kind === "typography" ? { fontFamily: DEFAULT_STUDIO_THEME.typography.bodyFont } : {}) };
    commit(current => ({ ...current, nodes: [...current.nodes, node] }));
    setSelectedId(node.id);
    setStage("kit");
  };
  const deleteNode = (id: string) => {
    commit(current => ({ ...current, nodes: current.nodes.filter(node => node.id !== id), edges: current.edges.filter(edge => edge.from !== id && edge.to !== id) }));
    setSelectedId(document.nodes.find(node => node.id !== id)?.id ?? "");
  };
  const addConnection = (to: string) => {
    if (!selected || selected.id === to || document.edges.some(edge => edge.from === selected.id && edge.to === to)) return;
    commit(current => ({ ...current, edges: [...current.edges, { id: makeId("edge"), from: selected.id, to, label: "related" }] }));
  };
  const updatePosition = (id: string, x: number, y: number) => commit(current => ({ ...current, nodes: current.nodes.map(node => node.id === id ? { ...node, x: clamp(x, 0, 74), y: clamp(y, 0, 78) } : node) }));
  const onPointerMove = (event: React.PointerEvent) => {
    if (!draggingId || !boardRef.current) return;
    const bounds = boardRef.current.getBoundingClientRect();
    setLivePositions(current => ({ ...current, [draggingId]: { x: clamp((event.clientX - bounds.left) / bounds.width * 100, 0, 74), y: clamp((event.clientY - bounds.top) / bounds.height * 100, 0, 78) } }));
  };
  const onPointerUp = () => {
    if (!draggingId) return;
    const position = livePositions[draggingId];
    if (position) updatePosition(draggingId, position.x, position.y);
    setDraggingId(null);
    setLivePositions({});
  };
  const saveVersion = () => {
    const id = makeId("brand-v");
    const snapshot = { id, name: versionName.trim() || "Brand Kit draft", createdAt: new Date().toISOString(), nodes: structuredClone(document.nodes), edges: structuredClone(document.edges), theme: structuredClone(cardTheme(document)), themeVersionId: `${id}:theme`, status: "local-draft" as const };
    commit(current => ({ ...current, versions: [...current.versions, snapshot] }));
    setNotice(`Saved ${snapshot.name} as a local immutable snapshot`);
  };
  const restoreVersion = (id: string) => {
    const version = document.versions.find(item => item.id === id);
    if (!version) return;
    commit(current => ({ ...current, nodes: structuredClone(version.nodes), edges: structuredClone(version.edges) }));
    setNotice(`Restored ${version.name} into the editable draft`);
  };
  const createAssignments = () => {
    const version = document.versions.at(-1);
    if (!version || assignmentSelection.length === 0) return;
    commit(current => ({ ...current, assignments: current.assignments.map(item => assignmentSelection.includes(item.domain) ? { domain: item.domain, brandVersionId: version.id, themeVersionId: version.themeVersionId, status: "draft" } : item) }));
    setNotice(`Created local assignment drafts for ${assignmentSelection.length} product(s). Nothing was published.`);
  };
  const openThemeStudio = () => {
    if (writeStoredValue("maataa.branding-studio.theme-handoff.v1", { schemaVersion: "maataa.brand-theme-handoff.v1", theme: cardTheme(document), sourceDocumentId: document.id, sourceUpdatedAt: document.updatedAt })) navigate("/theme-studio");
    else setNotice("Could not prepare the Theme Studio handoff. Export the board and try again.");
  };
  const importDocument = async (file?: File) => {
    if (!file) return;
    setImportError("");
    try {
      const parsed = parseEditorDocument(await file.text(), validateBrandDocument);
      history.update(parsed); setSelectedId(parsed.nodes[0]?.id ?? ""); setNotice("Imported a validated local project draft");
    } catch (error) { setImportError(error instanceof Error ? error.message : "Could not read this file."); }
  };

  const generateDraft = async () => {
    if (!prompt.trim() || !selectedContext.length || !selectedProviders?.configured || !selectedModel) return;
    const contextNodes = document.nodes.filter(node => selectedContext.includes(node.id)).map(({ id, kind, title, content, source, rights, colors, fontFamily }) => ({ id, kind, title, content, source, rights, ...(colors ? { colors } : {}), ...(fontFamily ? { fontFamily } : {}) }));
    setBusy(true); setSuggestion(null); setAcceptedRows([]); setNotice("Sending only your selected context to the chosen provider…");
    try {
      const system = "You are Brahmini, the MAATAA brand-system assistant. Return only JSON with shape {\"summary\":string,\"suggestions\":[{\"nodeId\":string,\"field\":\"title\"|\"content\",\"before\":string,\"after\":string,\"reason\":string}]}. Suggest edits only for supplied node IDs and fields. Preserve asset rights and provenance. Do not claim approval, publication, or verification. Never invent logo files or brand facts. A human will review every change.";
      const response = await fetch("/api/brahmini/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ provider: providerId, model: selectedModel, system, messages: [{ role: "user", content: `${prompt.trim()}\n\nUser-selected board context (JSON):\n${JSON.stringify(contextNodes)}` }] }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || `Provider request failed (${response.status}).`);
      if (typeof result.text !== "string" || !result.text.trim()) throw new Error("The provider returned no text.");
      const decoded = parseJsonResponse(result.text);
      const changes = parseBrandSuggestions(JSON.stringify({ suggestions: decoded.suggestions }), document.nodes, selectedContext);
      const metadata = result as ProviderResult;
      setSuggestion({ summary: decoded.summary, changes, provider: metadata.provider, model: metadata.model, modelDigest: metadata.modelDigest, promptSha256: metadata.promptSha256 });
      setAcceptedRows(changes.map((_, index) => index));
      setNotice(changes.length ? "AI suggestions are drafts. Review each change before accepting." : "The model returned no changes.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not generate an AI draft."); }
    finally { setBusy(false); }
  };
  const acceptSuggestions = () => {
    if (!suggestion || acceptedRows.length === 0) return;
    const accepted = suggestion.changes.filter((_, index) => acceptedRows.includes(index));
    const stale = accepted.some(change => document.nodes.find(node => node.id === change.nodeId)?.[change.field] !== change.before);
    if (stale) {
      setSuggestion(null);
      setNotice("The source changed after these suggestions were generated. Review the current text and request a fresh suggestion.");
      return;
    }
    commit(current => ({ ...current, nodes: applyAcceptedBrandSuggestions(current.nodes, accepted, selectedContext), acceptedAiChanges: [...current.acceptedAiChanges, { provider: suggestion.provider, model: suggestion.model, modelDigest: suggestion.modelDigest, promptSha256: suggestion.promptSha256, acceptedAt: new Date().toISOString(), changeCount: accepted.length }] }));
    setSuggestion(null); setNotice(`Accepted ${accepted.length} reviewed suggestion(s); model and prompt provenance saved.`);
  };
  const toggleAssignment = (id: BrandDomainId) => setAssignmentSelection(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const kindLabel = (kind: BrandNodeKind) => BRAND_NODE_KINDS.find(item => item.id === kind)?.label ?? kind;
  const positions = (node: BrandNode) => livePositions[node.id] ?? node;

  return <section className="page-section branding-studio" style={variables}>
    <header className="branding-heading"><div><h1>Branding Studio</h1><p>Build a source-aware Brand Kit, pass semantic candidates to Theme Studio, and prepare local review and assignment drafts.</p></div><div className="branding-heading-actions"><span role="status" className="branding-save-state">{notice}</span><button className="studio-secondary-action" type="button" onClick={undo} disabled={!history.canUndo} aria-label="Undo last board edit">Undo</button><button className="studio-secondary-action" type="button" onClick={redo} disabled={!history.canRedo} aria-label="Redo board edit">Redo</button><button className="studio-secondary-action" type="button" onClick={() => downloadJson("maataa-branding-project.json", document)}>Export JSON</button><button className="studio-secondary-action" type="button" onClick={() => importRef.current?.click()}>Import JSON</button><input ref={importRef} hidden type="file" accept="application/json,.json" onChange={event => { void importDocument(event.target.files?.[0]); event.currentTarget.value = ""; }}/>{importError && <span className="branding-import-error" role="alert">{importError}</span>}</div></header>

    <nav className="branding-stage-nav" aria-label="Branding workflow stages">{STAGES.map((item, index) => <button key={item.id} type="button" data-active={stage === item.id} aria-current={stage === item.id ? "step" : undefined} onClick={() => setStage(item.id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.detail}</small></button>)}</nav>

    {stage === "board" && <EditorWorkbenchFrame label="Brand board editor" className="branding-workbench">
      <aside className="branding-outline"><div className="branding-panel-title"><h2>Board objects</h2><span>{document.nodes.length}</span></div><p>Choose a card to inspect it. Drag its grip or use its keyboard controls to move it.</p><ul>{document.nodes.map(node => <li key={node.id}><label className="branding-outline-row"><button type="button" className="branding-select-node" data-active={selected?.id === node.id} onClick={() => setSelectedId(node.id)}><span>{kindLabel(node.kind)}</span><strong>{node.title}</strong></button><input aria-label={`Include ${node.title} in AI context`} type="checkbox" checked={selectedContext.includes(node.id)} onChange={() => setSelectedContext(current => current.includes(node.id) ? current.filter(id => id !== node.id) : [...current, node.id])}/></label></li>)}</ul><div className="branding-add-tools"><strong>Add object</strong>{BRAND_NODE_KINDS.map(item => <button key={item.id} type="button" onClick={() => addNode(item.id)}>Add {item.label}</button>)}</div><button type="button" className="branding-ai-link" onClick={() => setStage("review")}>Ask Brahmini about selected context</button></aside>
      <div className="branding-board-column"><div className="branding-board-toolbar"><div><h2>{document.name}</h2><span>{document.nodes.length} objects · {document.edges.length} relationships · local draft</span></div><div className="branding-board-tools"><button type="button" onClick={() => { const next = document.nodes.find(node => node.id !== selected?.id); if (next) addConnection(next.id); }} disabled={!selected || document.nodes.length < 2}>Connect to next object</button><button type="button" onClick={() => setStage("kit")}>Edit Brand Kit</button></div></div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keeps the whiteboard region keyboard-reachable; removing tabIndex would change focus order */}
        <div className="branding-board" role="region" tabIndex={0} ref={boardRef} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} aria-label="Brand strategy whiteboard">
          <svg className="branding-connectors" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">{document.edges.map(edge => { const a = document.nodes.find(node => node.id === edge.from), b = document.nodes.find(node => node.id === edge.to); if (!a || !b) return null; const p = positions(a), q = positions(b); return <g key={edge.id}><path d={`M ${p.x * 10 + 120} ${p.y * 6 + 54} C ${p.x * 10 + 300} ${p.y * 6 + 54}, ${q.x * 10 - 60} ${q.y * 6 + 54}, ${q.x * 10 + 120} ${q.y * 6 + 54}`}/><text x={(p.x + q.x) * 5 + 120} y={(p.y + q.y) * 3 + 54}>{edge.label}</text></g>; })}</svg>
          {document.nodes.map(node => { const p = positions(node); return <article key={node.id} className="branding-board-node" data-selected={selected?.id === node.id} style={{ left: `${p.x}%`, top: `${p.y}%` }}><button type="button" className="branding-node-grip" aria-label={`Move ${node.title}`} onClick={() => setSelectedId(node.id)} onPointerDown={event => { if (event.button !== 0) return; setSelectedId(node.id); setDraggingId(node.id); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={onPointerUp} onKeyDown={event => { if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return; event.preventDefault(); const [dx, dy] = event.key === "ArrowLeft" ? [-3, 0] : event.key === "ArrowRight" ? [3, 0] : event.key === "ArrowUp" ? [0, -4] : [0, 4]; updatePosition(node.id, node.x + dx, node.y + dy); }} title="Drag to move. Use arrow keys to nudge."><span className="branding-grip-dots" aria-hidden="true"/></button><button type="button" className="branding-node-body" onClick={() => { setSelectedId(node.id); setStage("kit"); }}><small>{kindLabel(node.kind)}</small><strong>{node.title}</strong><span>{node.content}</span>{node.kind === "palette" && <i className="branding-swatches" aria-label="Unapproved sample palette">{COLORS.slice(0, 8).map(color => <i key={color} title={`${color}: ${node.colors?.[color] ?? "unset"}`} style={{ backgroundColor: node.colors?.[color] ?? "transparent" }}/>)}</i>}{node.kind === "asset-reference" && <em>Source and rights review required</em>}</button></article>; })}
          {document.nodes.length === 0 && <div className="branding-empty-board"><h3>Start your board</h3><p>Add an identity reference, palette candidate, or principle to build the first version.</p><button className="gold-button" type="button" onClick={() => addNode("thesis")}>Add brand thesis</button></div>}
        </div><div className="branding-board-foot"><span>Canvas position saves with the object. Pan the board on small screens; the list outline is an alternative.</span><button type="button" onClick={() => setStage("review")}>Continue to review</button></div>
      </div>
      <aside className="branding-inspector"><div className="branding-panel-title"><h2>Inspector</h2><Badge tone={selected?.rights === "verified" ? "success" : "warning"}>{selected?.rights ?? "no selection"}</Badge></div>{selected ? <>
        <label>Object title<input value={selected.title} onChange={event => updateNode(selected.id, { title: event.target.value })}/></label><label>Details<textarea rows={6} value={selected.content} onChange={event => updateNode(selected.id, { content: event.target.value })}/></label><label>Source / provenance<input value={selected.source} onChange={event => updateNode(selected.id, { source: event.target.value })}/></label><label>Asset-rights status<select value={selected.rights} onChange={event => updateNode(selected.id, { rights: event.target.value as BrandNode["rights"] })}><option value="unknown">Unknown · review required</option><option value="provided">Owner provided · verify terms</option><option value="verified">Verified by owner</option></select></label>
        {selected.kind === "palette" && <fieldset className="branding-color-editor"><legend>Semantic palette · candidate</legend>{COLORS.map(key => { const value = selected.colors?.[key] ?? "#000000"; return <label key={key}><span><i style={{ background: /^#[\da-f]{6}$/i.test(value) ? value : "transparent" }}/>{key}</span><input aria-label={`${key} candidate color`} type="color" value={/^#[\da-f]{6}$/i.test(value) ? value : "#000000"} onChange={event => updateNode(selected.id, { colors: { ...(selected.colors ?? {}), [key]: event.target.value } })}/><code>{value}</code></label>; })}</fieldset>}
        {selected.kind === "typography" && <label>Body and heading font stack<input value={selected.fontFamily ?? ""} onChange={event => updateNode(selected.id, { fontFamily: event.target.value.slice(0, 240) })}/><small>Use a host-installed or separately licensed font. No font is bundled here.</small></label>}
        <div className="branding-nudge"><span>Canvas position</span><button type="button" aria-label="Move left" onClick={() => updatePosition(selected.id, selected.x - 3, selected.y)}>Left</button><button type="button" aria-label="Move up" onClick={() => updatePosition(selected.id, selected.x, selected.y - 4)}>Up</button><button type="button" aria-label="Move down" onClick={() => updatePosition(selected.id, selected.x, selected.y + 4)}>Down</button><button type="button" aria-label="Move right" onClick={() => updatePosition(selected.id, selected.x + 3, selected.y)}>Right</button></div>
        <button type="button" className="branding-delete" onClick={() => deleteNode(selected.id)}>Remove object and its relationships</button>
      </> : <p>Select a board object to edit its properties.</p>}</aside>
    </EditorWorkbenchFrame>}

    {stage === "kit" && <div className="branding-kit-layout"><aside className="branding-kit-list"><h2>Brand Kit objects</h2><p>Keep identity source, semantic candidates, and host constraints together.</p>{document.nodes.map(node => <button key={node.id} type="button" data-active={selected?.id === node.id} onClick={() => setSelectedId(node.id)}><small>{kindLabel(node.kind)}</small><strong>{node.title}</strong></button>)}<button className="branding-kit-add" type="button" onClick={() => addNode("asset-reference")}>Add asset reference</button></aside><section className="branding-kit-editor"><div className="branding-panel-title"><div><h2>{selected?.title ?? "Brand Kit"}</h2><p>All edits remain local until reviewed.</p></div><button type="button" className="studio-secondary-action" onClick={() => setStage("board")}>Back to board</button></div>{selected ? <div className="branding-kit-fields"><label>Kit item name<input value={selected.title} onChange={event => updateNode(selected.id, { title: event.target.value })}/></label><label>Description and usage<textarea rows={8} value={selected.content} onChange={event => updateNode(selected.id, { content: event.target.value })}/></label><label>Source record<input value={selected.source} onChange={event => updateNode(selected.id, { source: event.target.value })}/></label><label>Rights and approval status<select value={selected.rights} onChange={event => updateNode(selected.id, { rights: event.target.value as BrandNode["rights"] })}><option value="unknown">Unknown · do not publish</option><option value="provided">Provided · terms need review</option><option value="verified">Owner-marked verified</option></select></label>{selected.kind === "palette" && <div className="branding-color-editor branding-kit-colors"><h3>Semantic palette candidates</h3>{COLORS.map(key => { const value = selected.colors?.[key] ?? "#000000"; return <label key={key}><span><i style={{ background: /^#[\da-f]{6}$/i.test(value) ? value : "transparent" }}/>{key}</span><input aria-label={`${key} candidate color`} type="color" value={/^#[\da-f]{6}$/i.test(value) ? value : "#000000"} onChange={event => updateNode(selected.id, { colors: { ...(selected.colors ?? {}), [key]: event.target.value } })}/><code>{value}</code></label>; })}</div>}{selected.kind === "typography" && <label>Font stack<input value={selected.fontFamily ?? ""} onChange={event => updateNode(selected.id, { fontFamily: event.target.value })}/></label>}</div> : <div className="branding-empty-board"><p>Add an object to start your Brand Kit.</p></div>}</section></div>}

    {stage === "theme" && <div className="branding-theme-handoff"><section><h2>Theme Studio handoff</h2><p>The current palette and font candidate will open in the existing Theme Studio, where you can inspect them against real MAATAA components, edit semantic tokens, and export a CSS or JSON theme.</p><div className="branding-theme-warning"><strong>Candidate values only</strong><span>Previewing does not approve a brand, replace a logo, assign a product domain, or update a deployed application.</span></div><div className="branding-color-strip">{COLORS.slice(0, 8).map(key => { const node = document.nodes.find(item => item.kind === "palette"); const color = node?.colors?.[key] ?? DEFAULT_STUDIO_THEME.colors[key]; return <span key={key}><i style={{ background: color }}/><small>{key}</small><code>{color}</code></span>; })}</div><div className="branding-theme-actions"><button type="button" className="gold-button" onClick={openThemeStudio}>Open Theme Studio preview</button><button type="button" className="studio-secondary-action" onClick={() => setStage("review")}>Continue to review</button></div></section><aside className="branding-live-preview" style={variables}><small>PACKAGE COMPONENT PREVIEW</small><h3>{document.name}</h3><p>Semantic colors and typography flow into this real MAATAA package preview.</p><div><Button variant="primary">Primary action</Button><Button variant="secondary">Secondary</Button><Badge tone="success">Reviewable draft</Badge></div><Card><strong>Source-aware Brand Kit</strong><span>Preview surface · candidate only</span><input aria-label="Preview text" placeholder="Example package input"/></Card><p className="branding-preview-caption">This compact preview checks tokens locally. Theme Studio provides the detailed component specimen.</p></aside></div>}

    {stage === "review" && <div className="branding-review-layout"><section className="branding-review-main"><h2>Review this Brand Kit draft</h2><p>Resolve source and rights questions, save an immutable local version, then create product assignment drafts.</p><div className="branding-review-checks">{[
      ["Brand thesis", document.nodes.some(node => node.kind === "thesis" && node.content.trim().length > 40)],
      ["Existing logo source recorded", document.nodes.some(node => node.kind === "asset-reference" && node.source.trim() && !node.content.includes("Add a path or link"))],
      ["Palette candidate present", document.nodes.some(node => node.kind === "palette" && Object.keys(node.colors ?? {}).length >= 8)],
      ["AI changes have provenance", document.acceptedAiChanges.every(change => Boolean(change.provider && change.model && change.acceptedAt))],
    ].map(([label, ready]) => <div key={String(label)} data-ready={Boolean(ready)}><span>{ready ? "✓" : "○"}</span><strong>{label}</strong><small>{ready ? "Recorded in this draft" : "Still open or needs owner review"}</small></div>)}</div>
        <label className="branding-version-field">Version name<input value={versionName} onChange={event => setVersionName(event.target.value)} maxLength={100}/></label><button type="button" className="gold-button" onClick={saveVersion}>Save immutable local version</button>
        {document.versions.length > 0 && <section className="branding-version-list"><h3>Saved local versions</h3>{[...document.versions].reverse().map(version => <div key={version.id}><span><strong>{version.name}</strong><small>{new Date(version.createdAt).toLocaleString()} · local draft</small><code>{version.id}</code></span><button type="button" onClick={() => restoreVersion(version.id)}>Restore to editor</button></div>)}</section>}
        <section className="branding-assignments"><h3>Product assignment drafts</h3><p>Choose targets. Assignments reference exact local versions and are not approvals or deployments.</p><div>{BRAND_DOMAINS.map(domain => <label key={domain.id}><input type="checkbox" aria-label={`Assign draft to ${domain.label}`} checked={assignmentSelection.includes(domain.id)} onChange={() => toggleAssignment(domain.id)}/><span><strong>{domain.label}</strong><small>{document.assignments.find(item => item.domain === domain.id)?.status ?? "unassigned"}</small></span></label>)}</div><button type="button" className="studio-secondary-action" onClick={createAssignments} disabled={!document.versions.length || !assignmentSelection.length}>Create assignment draft for selected products</button>{document.assignments.some(item => item.status === "draft") && <ul>{document.assignments.filter(item => item.status === "draft").map(item => <li key={item.domain}><strong>{BRAND_DOMAINS.find(domain => domain.id === item.domain)?.label}</strong><code>brand {item.brandVersionId} · theme {item.themeVersionId}</code><span>Draft only · no publication</span></li>)}</ul>}</section>
        <details className="branding-portability"><summary>Project JSON, recovery, and audit</summary><p>The complete document includes stable object IDs, connectors, local version snapshots, assignment drafts, accepted AI change metadata, source records, and rights status.</p><button type="button" onClick={() => downloadJson("maataa-branding-project.json", document)}>Download project JSON</button><button type="button" className="branding-portability-import" onClick={() => importRef.current?.click()}>Import a project JSON</button>{importError && <p role="alert">{importError}</p>}</details>
      </section><aside className="branding-ai-panel"><div className="branding-panel-title"><div><h2>Brahmini assistant</h2><p>Send only the board objects you select.</p></div><span data-ready={selectedProviders?.configured ? "true" : "false"} className="branding-provider-dot">●</span></div><p className="branding-provider-status" role="status">{providerBusy ? "Checking provider status…" : providerMessage}</p><label>Provider<select value={providerId} onChange={event => { setProviderId(event.target.value as ProviderId); setModelId(""); }}><option value="ollama">Local Ollama</option><option value="anthropic">Anthropic</option><option value="gemini">Google Gemini</option></select></label><label>Model<select value={selectedModel} onChange={event => setModelId(event.target.value)} disabled={!selectedProviders?.configured || !selectedProviders.models.length}><option value="">No configured model</option>{(selectedProviders?.models ?? []).map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><button type="button" className="branding-refresh" onClick={() => void refreshProviders()} disabled={providerBusy}>Refresh provider status</button><label>What should Brahmini review?<textarea rows={5} value={prompt} onChange={event => setPrompt(event.target.value)} placeholder="For example: find conflicting language in the selected identity and principle objects."/></label><div className="branding-context-summary">Selected context: <strong>{selectedContext.length} object(s)</strong>. Change selection in the board outline.</div><button type="button" className="gold-button" onClick={() => void generateDraft()} disabled={busy || !prompt.trim() || !selectedContext.length || !selectedProviders?.configured || !selectedModel}>{busy ? "Preparing suggestions…" : "Generate review suggestions"}</button><small className="branding-ai-boundary">A chosen provider receives the prompt and selected objects. Suggestions never edit the board until you accept them. No provider fallback occurs.</small>{suggestion && <section className="branding-suggestion"><h3>Review model suggestions</h3><p>{suggestion.summary}</p><small>{suggestion.provider} · {suggestion.model}{suggestion.modelDigest ? ` · ${suggestion.modelDigest.slice(0, 12)}` : ""}</small>{suggestion.changes.length ? suggestion.changes.map((change, index) => <label key={`${change.nodeId}:${change.field}:${index}`}><input type="checkbox" checked={acceptedRows.includes(index)} onChange={() => setAcceptedRows(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}/><span><strong>{change.field} · {document.nodes.find(node => node.id === change.nodeId)?.title}</strong><del>{change.before}</del><em>{change.after}</em><small>{change.reason}</small></span></label>) : <p>The provider suggested no edits for the selected context.</p>}{suggestion.changes.length > 0 && <div><button type="button" onClick={acceptSuggestions} disabled={!acceptedRows.length}>Accept selected changes</button><button type="button" onClick={() => setSuggestion(null)}>Reject suggestions</button></div>}</section>}</aside></div>}
  </section>;
}
