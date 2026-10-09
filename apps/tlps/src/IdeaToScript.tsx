import React, { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@maataa/ui";
import {
  approveScriptStep,
  normalizeIdea,
  proposeScriptDraft,
  SCRIPT_DRAFT_LABEL,
  SCRIPT_PROMPT_VERSION,
  SCRIPT_SYSTEM_PROMPT,
  scriptDraftMessages,
  sha256Text,
  startFromIdea,
} from "../../shared/contracts/idea-to-script.ts";
import {
  IDEA_TO_SCRIPT_STORE_KEY,
  IDEA_TO_SCRIPT_STORE_SCHEMA,
  parseIdeaToScriptStore,
  serializeIdeaToScriptStore,
  type IdeaToScriptStore,
} from "../../shared/contracts/idea-to-script-store.ts";
import { approveVersion, currentView, type VersionProposal } from "../../shared/contracts/project-record.ts";
import { modelUseFromWorkstationModel } from "../../shared/contracts/workstation-mapping.ts";
import { publishWorkspaceProject, returnToDesktop } from "../../shared/maataa-workspace";
import {
  checkWriteBase,
  describeContextStatus,
  projectContextFromLocation,
  projectContextQuery,
  reconcileContext,
  type ProjectContext,
} from "../../shared/contracts/project-context.ts";
import "./idea-to-script.css";

type Preview = { proposal: VersionProposal; digest: string; conflict: string | null; errors: string[] };
type OllamaModel = { id: string; label: string; digest?: string };
type PendingDraft = {
  preview: Preview;
  text: string;
  passed: boolean;
  notes: string[];
  modelId: string;
  promptSha256: string | null;
};

const ACTION_LABELS: Record<string, string> = {
  "proposal-approved": "Proposal approved",
  "project-created": "Project record created",
  "project-updated": "New version recorded",
};
const short = (digest: string) => digest.replace("sha256:", "").slice(0, 12);

/**
 * Saves only if the stored record is still the base this window edited from.
 * Another window (TLPS or MAATAA UI) may have saved a newer version; in that
 * case nothing is written and the caller reloads the stored record.
 */
async function guardedSave(base: IdeaToScriptStore["record"] | null, next: IdeaToScriptStore): Promise<{ ok: true } | { ok: false; reason: string }> {
  const raw = localStorage.getItem(IDEA_TO_SCRIPT_STORE_KEY);
  const { store: stored, error } = await parseIdeaToScriptStore(raw);
  if (raw && !stored) return { ok: false, reason: `${error ?? "The saved project could not be read."} Nothing was written.` };
  const verdict = checkWriteBase(base, stored?.record ?? null);
  if (!verdict.ok) return verdict;
  localStorage.setItem(IDEA_TO_SCRIPT_STORE_KEY, serializeIdeaToScriptStore(next));
  return { ok: true };
}

const INVALID_CONTEXT: Record<string, string> = {
  "invalid-id": "This window was opened with an invalid project ID. Nothing will be written.",
  "invalid-version": "This window was opened with an invalid project version. Nothing will be written.",
};

/** Registers the record's ID and current version (never its content) with MAATAA Desktop. */
async function registerWithDesktop(record: IdeaToScriptStore["record"]): Promise<string> {
  try {
    const registered = await publishWorkspaceProject({
      id: record.projectId as `prj:${string}`,
      product: "tlps",
      title: record.title,
      projectType: "Idea to Script",
      status: "draft",
      sample: false,
      record: { recordId: record.projectId, recordVersion: record.currentVersion, schema: "maataa.project-record/1.0.0" },
    });
    return registered
      ? ` MAATAA Desktop now lists ${record.projectId} at v${record.currentVersion}.`
      : " Saved in TLPS only: MAATAA Desktop (Tauri) is not available here, so the shared list was not updated.";
  } catch (error) {
    return ` Saved in TLPS, but MAATAA Desktop refused the update: ${error instanceof Error ? error.message : String(error)}`;
  }
}

export function IdeaToScriptPanel({ onClose }: { onClose: () => void }) {
  const [store, setStore] = useState<IdeaToScriptStore | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [ideaPreview, setIdeaPreview] = useState<{ preview: Preview; record: IdeaToScriptStore["record"]; text: string } | null>(null);
  const [models, setModels] = useState<OllamaModel[] | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [modelId, setModelId] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<PendingDraft | null>(null);
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [contextParse] = useState(() => projectContextFromLocation(window.location));
  const [context, setContext] = useState<ProjectContext | null>(contextParse.ok ? contextParse.context : null);

  const updateContext = (next: ProjectContext) => {
    setContext(next);
    const url = new URL(window.location.href);
    for (const [key, value] of new URLSearchParams(projectContextQuery(next))) url.searchParams.set(key, value);
    window.history.replaceState(window.history.state, "", url);
  };

  const reloadStore = async () => {
    const { store: saved, error } = await parseIdeaToScriptStore(localStorage.getItem(IDEA_TO_SCRIPT_STORE_KEY));
    setStore(saved);
    setLoadError(error);
    setDraft(null);
    setIdeaPreview(null);
  };

  useEffect(() => {
    void parseIdeaToScriptStore(localStorage.getItem(IDEA_TO_SCRIPT_STORE_KEY)).then(({ store: saved, error }) => {
      setStore(saved);
      setLoadError(error);
      setLoaded(true);
    });
  }, []);

  const refreshModels = () => {
    setRuntimeError(null);
    fetch("/api/brahmini/status")
      .then(async (response) => {
        if (!response.ok) throw new Error(`Brahmini runtime returned ${response.status}.`);
        const data = (await response.json()) as {
          providers?:
            | Array<{ id: string; configured?: boolean; models?: OllamaModel[]; message?: string }>
            | Record<string, { configured?: boolean; models?: OllamaModel[]; message?: string }>;
        };
        const ollama = Array.isArray(data.providers)
          ? data.providers.find((item) => item.id === "ollama")
          : data.providers?.ollama;
        const list = (ollama?.models ?? []).filter((model) => typeof model.digest === "string");
        setModels(list);
        if (!list.length) setRuntimeError(ollama?.message || "Brahmini is running, but Ollama lists no local models with a digest.");
        setModelId((current) => current || list[0]?.id || "");
      })
      .catch(() => {
        setModels([]);
        setRuntimeError("Brahmini runtime is not reachable. Start it with “pnpm brahmini:runtime”; Ollama must be running.");
      });
  };
  useEffect(refreshModels, []);

  const view = useMemo(() => (store ? currentView(store.record) : null), [store]);
  const contextStatus = useMemo(
    () => (context && loaded
      ? reconcileContext(context, store?.record ?? null, `This window has no readable local copy of ${context.recordId}. Nothing will be written.`)
      : null),
    [context, loaded, store],
  );
  const writeBlock = !contextParse.ok && contextParse.reason !== "missing"
    ? INVALID_CONTEXT[contextParse.reason]
    : contextStatus && contextStatus.status !== "current" ? describeContextStatus(contextStatus) : null;
  const ideaText = useMemo(() => {
    const artifact = store?.record.versions.at(-1)?.artifacts.find((item) => item.kind === "idea");
    return artifact ? store?.contents[artifact.sha256] ?? "" : "";
  }, [store]);

  const previewIdea = async () => {
    setMessage("");
    try {
      const { record, preview } = await startFromIdea(title, idea);
      if (preview.errors.length) throw new Error(preview.errors.join(", "));
      setIdeaPreview({ record, preview, text: normalizeIdea(idea) });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not prepare the preview.");
    }
  };

  const approveIdea = async () => {
    if (!ideaPreview) return;
    const { record, events } = await approveVersion(
      ideaPreview.record,
      ideaPreview.preview,
      { proposalDigest: ideaPreview.preview.digest, decidedBy: "local-user" },
      [],
      "tlps:idea-to-script",
    );
    const ideaRef = record.versions[0].artifacts[0];
    const next: IdeaToScriptStore = { schema: IDEA_TO_SCRIPT_STORE_SCHEMA, record, events, contents: { [ideaRef.sha256]: ideaPreview.text } };
    if (writeBlock) { setMessage(writeBlock); return; }
    const saved = await guardedSave(null, next);
    if (!saved.ok) { setMessage(saved.reason); await reloadStore(); return; }
    setStore(next);
    setIdeaPreview(null);
    setMessage(`Version 1 saved: your idea is now the start of this project record.${await registerWithDesktop(record)}`);
  };

  const askBrahmini = async () => {
    if (!store || writeBlock) return;
    const model = models?.find((item) => item.id === modelId);
    if (!model?.digest) return;
    setBusy(true);
    setMessage("");
    setDraft(null);
    try {
      const response = await fetch("/api/brahmini/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider: "ollama", model: model.id, system: SCRIPT_SYSTEM_PROMPT, messages: scriptDraftMessages(store.record.title, ideaText) }),
      });
      const data = (await response.json()) as { text?: string; error?: string; modelDigest?: string; promptSha256?: string };
      if (!response.ok || typeof data.text !== "string") throw new Error(data.error || "Brahmini did not return a draft.");
      if (data.modelDigest !== model.digest) throw new Error("The model that answered does not match the selected model. Nothing was recorded.");
      const text = data.text.trim();
      const modelUse = modelUseFromWorkstationModel({ id: model.id, runtime: "ollama", digest: model.digest }, "chat");
      const proposed = await proposeScriptDraft(store.record, {
        text,
        storageKey: `${IDEA_TO_SCRIPT_STORE_KEY}/script`,
        storageApp: "tlps",
        model: modelUse,
      });
      setDraft({ preview: proposed.preview, text, passed: proposed.format.passed, notes: proposed.format.notes, modelId: model.id, promptSha256: data.promptSha256 ?? null });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Brahmini could not draft a script.");
    } finally {
      setBusy(false);
    }
  };

  const approveDraft = async () => {
    if (!store || !draft) return;
    try {
      const { record, events } = await approveScriptStep(
        store.record,
        draft.preview,
        { proposalDigest: draft.preview.digest, decidedBy: "local-user" },
        { "script-draft": draft.text },
        store.events,
      );
      const scriptSha = await sha256Text(draft.text);
      const next: IdeaToScriptStore = { ...store, record, events, contents: { ...store.contents, [scriptSha]: draft.text } };
      if (writeBlock) { setMessage(writeBlock); return; }
      const saved = await guardedSave(store.record, next);
      if (!saved.ok) { setMessage(saved.reason); await reloadStore(); return; }
      setStore(next);
      setDraft(null);
      if (context) updateContext({ recordId: record.projectId, recordVersion: record.currentVersion });
      setMessage(`Version ${record.currentVersion} saved with the reviewed script draft.${await registerWithDesktop(record)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The draft could not be approved.");
    }
  };

  const reset = () => {
    localStorage.removeItem(IDEA_TO_SCRIPT_STORE_KEY);
    setStore(null);
    setDraft(null);
    setIdeaPreview(null);
    setConfirmReset(false);
    setLoadError(null);
    setMessage("This browser's Idea → Script project was removed. Your TLPS plan was not touched.");
  };

  const latestScript = store?.record.versions.at(-1)?.artifacts.find((item) => item.kind === "script-draft");

  return (
    <main className="its" aria-labelledby="its-title">
      <div className="its-head">
        <div>
          <p className="tlps-overline">IDEA → SCRIPT · BRAHMINI DRAFT · LOCAL</p>
          <h1 id="its-title">From idea to a first script draft</h1>
          <p className="its-sub">One project record moves from your idea to a reviewed draft. Nothing is saved until you approve it.</p>
        </div>
        <Button variant="secondary" onClick={onClose}>Back to TLPS</Button>
      </div>

      {message && <p className="its-message" role="status">{message}</p>}
      {loadError && <p className="its-error" role="alert">{loadError} The saved data was left untouched.</p>}

      {(context || (!contextParse.ok && contextParse.reason !== "missing")) && (
        <section className="its-card its-context" aria-labelledby="its-context-title">
          <h2 id="its-context-title">Opened from MAATAA Desktop</h2>
          {context && (
            <dl className="its-record">
              <dt>Project ID</dt><dd><code data-testid="its-context-id">{context.recordId}</code></dd>
              <dt>Opened at</dt><dd data-testid="its-context-version">v{context.recordVersion}</dd>
            </dl>
          )}
          {writeBlock
            ? <p className="its-error" role="alert" data-testid="its-context-status">{writeBlock}</p>
            : <p className="its-pass" data-testid="its-context-status">{contextStatus ? describeContextStatus(contextStatus) : ""}</p>}
          <div className="its-actions">
            {contextStatus?.status === "newer-available" && (
              <Button variant="secondary" onClick={() => context && updateContext({ recordId: context.recordId, recordVersion: contextStatus.currentVersion })}>
                Continue with v{contextStatus.currentVersion}
              </Button>
            )}
            <Button variant="ghost" onClick={() => void returnToDesktop().then((result) => { if (!result.ok) setMessage(result.message); })}>Return to MAATAA Desktop</Button>
          </div>
          <p className="its-hint">Local prototype: this record lives on this computer only. There is no sign-in, shared database or server behind it.</p>
        </section>
      )}

      {loaded && !store && !context && !writeBlock && (
        <section className="its-card" aria-labelledby="its-idea-title">
          <h2 id="its-idea-title">1. Your idea</h2>
          <div className="its-fields">
            <label>Project title<Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Monsoon Keeper" /></label>
            <label>Idea<textarea value={idea} rows={4} onChange={(event) => setIdea(event.target.value)} placeholder="Describe the story in your own words." /></label>
          </div>
          {!ideaPreview && <Button variant="primary" disabled={!title.trim() || idea.trim().length < 3} onClick={() => void previewIdea()}>Preview project record</Button>}
          {ideaPreview && (
            <div className="its-preview" aria-label="Project record preview">
              <dl>
                <dt>Project ID</dt><dd><code>{ideaPreview.record.projectId}</code></dd>
                <dt>Will become</dt><dd>Version 1 · idea only</dd>
                <dt>Preview fingerprint</dt><dd><code>{short(ideaPreview.preview.digest)}</code></dd>
              </dl>
              <div className="its-actions">
                <Button variant="primary" disabled={Boolean(writeBlock)} onClick={() => void approveIdea()}>Approve and save version 1</Button>
                <Button variant="ghost" onClick={() => setIdeaPreview(null)}>Edit idea</Button>
              </div>
            </div>
          )}
        </section>
      )}

      {store && view && (
        <>
          <section className="its-card" aria-labelledby="its-record-title">
            <h2 id="its-record-title">Project record</h2>
            <dl className="its-record">
              <dt>Title</dt><dd>{view.title}</dd>
              <dt>Project ID</dt><dd><code data-testid="its-project-id">{view.projectId}</code></dd>
              <dt>Current version</dt><dd data-testid="its-current-version">v{view.currentVersion}</dd>
              <dt>Idea</dt><dd>{ideaText}</dd>
            </dl>
          </section>

          <section className="its-card" aria-labelledby="its-draft-title">
            <h2 id="its-draft-title">2. Script draft from Brahmini</h2>
            {latestScript ? (
              <p>Version {view.currentVersion} holds an approved draft (fingerprint <code>{short(latestScript.sha256)}</code>). You can ask for a new draft; it replaces the draft only after you approve it.</p>
            ) : (
              <p>Brahmini writes a first draft with a local Ollama model. The model is recorded as <em>not qualified</em> for script writing; you decide whether the draft is good.</p>
            )}
            {runtimeError && <p className="its-error" role="alert">{runtimeError}</p>}
            <div className="its-fields its-inline">
              <label>Local model
                <select value={modelId} onChange={(event) => setModelId(event.target.value)} disabled={!models?.length}>
                  {(models ?? []).map((model) => <option key={model.id} value={model.id}>{model.label}</option>)}
                </select>
              </label>
              <Button variant="ghost" onClick={refreshModels}>Refresh models</Button>
            </div>
            <Button variant="primary" disabled={busy || !modelId || Boolean(writeBlock)} onClick={() => void askBrahmini()}>{busy ? "Brahmini is drafting…" : "Ask Brahmini for a draft"}</Button>

            {draft && (
              <div className="its-preview" aria-label="Script draft preview">
                <p className="its-label">{SCRIPT_DRAFT_LABEL}</p>
                <dl>
                  <dt>Project</dt><dd><code>{view.projectId}</code> · from v{view.currentVersion}</dd>
                  <dt>Model</dt><dd>{draft.modelId} · role: chat · not qualified for scripts</dd>
                  <dt>Prompt</dt><dd>{SCRIPT_PROMPT_VERSION}{draft.promptSha256 ? ` · ${draft.promptSha256.slice(0, 12)}` : ""}</dd>
                  <dt>Format check</dt>
                  <dd data-testid="its-check" className={draft.passed ? "its-pass" : "its-fail"}>
                    {draft.passed ? "Passed" : "Failed"} · independent, rule-based ({draft.notes.join(", ")})
                  </dd>
                  <dt>Will become</dt><dd>Version {view.currentVersion + 1}</dd>
                </dl>
                <label className="its-script">Draft (read-only)<textarea readOnly rows={14} value={draft.text} /></label>
                <div className="its-actions">
                  <Button variant="primary" disabled={!draft.passed || Boolean(writeBlock)} onClick={() => void approveDraft()}>Approve draft as version {view.currentVersion + 1}</Button>
                  <Button variant="ghost" onClick={() => setDraft(null)}>Discard draft</Button>
                </div>
                {!draft.passed && <p className="its-hint">A draft that fails the format check cannot be approved. Ask again or choose another model.</p>}
              </div>
            )}
          </section>

          <section className="its-card" aria-labelledby="its-history-title">
            <h2 id="its-history-title">History</h2>
            <ol className="its-versions" aria-label="Versions">
              {store.record.versions.map((version) => (
                <li key={version.version}>
                  <strong>v{version.version}</strong> · {version.summary}
                  <small>
                    {version.artifacts.map((artifact) => `${artifact.kind}${artifact.origin.models.length ? ` (${artifact.origin.models.map((m) => `${m.modelId} · ${m.role} · ${m.qualification === "unqualified" ? "unqualified" : "qualified"}`).join(", ")})` : " (you)"}`).join(" · ")}
                    {version.checks.length ? ` · checks: ${version.checks.map((c) => `${c.checkId} ${c.passed ? "passed" : "failed"}`).join(", ")}` : ""}
                  </small>
                </li>
              ))}
            </ol>
            <ol className="its-events" aria-label="Project activity">
              {store.events.slice().reverse().map((event) => (
                <li key={event.eventId}>
                  <span>#{event.sequence}</span> {ACTION_LABELS[event.action] ?? event.action}
                  <time>{event.time.recordedAt ? new Date(event.time.recordedAt).toLocaleString() : "time unknown"}</time>
                </li>
              ))}
            </ol>
            <p className="its-hint">Times come from this computer's clock and are not verified. Content is saved only in this app's local storage; inside MAATAA Desktop (Tauri) the project ID and version are also listed on the Desktop home.</p>
          </section>

          {!context && <div className="its-actions">
            {!confirmReset ? (
              <Button variant="ghost" onClick={() => setConfirmReset(true)}>Start a new Idea → Script project…</Button>
            ) : (
              <>
                <span className="its-hint">This removes this browser's Idea → Script project. Your TLPS plan stays.</span>
                <Button variant="secondary" onClick={reset}>Yes, remove it</Button>
                <Button variant="ghost" onClick={() => setConfirmReset(false)}>Keep it</Button>
              </>
            )}
          </div>}
        </>
      )}
    </main>
  );
}
