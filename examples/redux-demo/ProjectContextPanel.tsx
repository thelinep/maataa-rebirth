import * as React from "react";
import {
  describeContextStatus,
  projectContextFromLocation,
  reconcileContext,
  type ContextStatus,
  type ProjectContext,
} from "../../apps/shared/contracts/project-context.ts";
import { IDEA_TO_SCRIPT_STORE_KEY, parseIdeaToScriptStore } from "../../apps/shared/contracts/idea-to-script-store.ts";
import { openProductWithRecord, returnToDesktop } from "../../apps/shared/maataa-workspace";
import { readStoredText } from "@maataa/ui/compounds";

type TauriWindow = Window & {
  __TAURI__?: { core?: { invoke?: (command: string, args?: Record<string, unknown>) => Promise<unknown> } };
};

type RegistryView = { state: "listed"; version: number } | { state: "not-listed" } | { state: "unavailable"; reason: string };

/** Desktop registry (ID + version only). Outside Tauri there is no registry to read. */
async function readDesktopRegistry(recordId: string): Promise<RegistryView> {
  const invoke = (window as TauriWindow).__TAURI__?.core?.invoke;
  if (!invoke) return { state: "unavailable", reason: "MAATAA Desktop (Tauri) is not available in this window." };
  try {
    const projects = await invoke("list_workspace_projects");
    const entry = Array.isArray(projects)
      ? (projects as Array<{ id?: unknown; record?: { recordId?: unknown; recordVersion?: unknown } }>).find((item) => item.id === recordId)
      : undefined;
    const version = entry?.record?.recordId === recordId ? entry.record.recordVersion : undefined;
    return typeof version === "number" ? { state: "listed", version } : { state: "not-listed" };
  } catch (error) {
    return { state: "unavailable", reason: error instanceof Error ? error.message : String(error) };
  }
}

/**
 * Shows the shared project record that MAATAA Desktop handed to MAATAA UI and
 * passes the same ID + version on to TLPS. Reads the TLPS record (the
 * authoritative local writer) by ID and version only; never shows or copies
 * its content, and never writes it.
 */
export function ProjectContextPanel({ route }: { route: string }) {
  const parsed = React.useMemo(() => projectContextFromLocation({ search: window.location.search, hash: `#${route}` }), [route]);
  const context: ProjectContext | null = parsed.ok ? parsed.context : null;
  const [status, setStatus] = React.useState<ContextStatus | null>(null);
  const [registry, setRegistry] = React.useState<RegistryView | null>(null);
  const [message, setMessage] = React.useState("");

  const refresh = React.useCallback(async () => {
    if (!context) return;
    const { store, error } = await parseIdeaToScriptStore(readStoredText(IDEA_TO_SCRIPT_STORE_KEY));
    setStatus(reconcileContext(
      context,
      store ? { projectId: store.record.projectId, currentVersion: store.record.currentVersion } : null,
      error ?? "This window cannot read the TLPS record (it is stored by TLPS inside MAATAA Desktop). Nothing will be written from here.",
    ));
    setRegistry(await readDesktopRegistry(context.recordId));
  }, [context]);

  React.useEffect(() => {
    void refresh();
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refresh]);

  if (!parsed.ok && parsed.reason === "missing") return null;

  const continueInTlps = async () => {
    if (!context || status?.status !== "current") return;
    setMessage("");
    const result = await openProductWithRecord("tlps", context);
    setMessage(result.ok ? `Opened ${context.recordId} at v${context.recordVersion} in TLPS. Approve the next version there, then return here or to Desktop.` : result.message);
  };

  const registryText = !registry
    ? "Checking…"
    : registry.state === "listed"
      ? `v${registry.version}`
      : registry.state === "not-listed"
        ? "Not listed"
        : registry.reason;
  const registryMismatch = registry?.state === "listed" && status?.status === "current" && registry.version !== status.version;
  const problem = !parsed.ok
    ? (parsed.reason === "invalid-id" ? "The project ID in this link is invalid. Nothing will be read or written." : "The project version in this link is invalid. Nothing will be read or written.")
    : status && status.status !== "current"
      ? describeContextStatus(status)
      : registryMismatch
        ? `Desktop lists v${(registry as { version: number }).version}, but the TLPS record is at v${(status as { version: number }).version}. Refresh Desktop before continuing.`
        : null;

  return (
    <section className="brahmini-project-context" aria-labelledby="brahmini-project-context-title" data-testid="brahmini-project-context">
      <h2 id="brahmini-project-context-title">Project from MAATAA Desktop</h2>
      {context && (
        <dl>
          <dt>Project ID</dt><dd><code data-testid="brahmini-context-id">{context.recordId}</code></dd>
          <dt>Opened at</dt><dd data-testid="brahmini-context-version">v{context.recordVersion}</dd>
          <dt>TLPS record</dt><dd data-testid="brahmini-context-record">{status ? (status.status === "current" ? `v${status.version}` : status.status === "newer-available" || status.status === "ahead-of-record" ? `v${status.currentVersion}` : "Unavailable") : "Checking…"}</dd>
          <dt>Desktop list</dt><dd data-testid="brahmini-context-registry">{registryText}</dd>
        </dl>
      )}
      {problem
        ? <p className="brahmini-context-problem" role="alert" data-testid="brahmini-context-status">{problem}</p>
        : <p className="brahmini-context-ok" role="status" data-testid="brahmini-context-status">{status ? describeContextStatus(status) : "Checking the project record…"}</p>}
      <p className="brahmini-context-note">
        Brahmini proposes the script draft inside TLPS; nothing changes until you approve the exact preview there.
        Local prototype: saved on this computer only, with no sign-in, shared database or server.
      </p>
      <div className="brahmini-context-actions">
        <button type="button" className="gold-button" disabled={Boolean(problem) || status?.status !== "current"} onClick={() => void continueInTlps()}>
          Continue in TLPS · Idea → Script
        </button>
        <button type="button" className="ghost-button" onClick={() => void refresh()}>Refresh project</button>
        <button type="button" className="ghost-button" onClick={() => void returnToDesktop().then((result) => setMessage(result.ok ? "" : result.message))}>Return to MAATAA Desktop</button>
      </div>
      {message && <p className="brahmini-context-message" role="status">{message}</p>}
    </section>
  );
}
