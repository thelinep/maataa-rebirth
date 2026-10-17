import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { Input, Select } from "@maataa/ui/forms";
import {
  createTlpsDataApi,
  TlpsDataApiError,
  type TlpsCollection,
  type TlpsCollectionData,
  type TlpsEntity,
} from "../services/tlpsDataApi";
import { defaultMaataaTransport } from "../services/maataaAuthApi";
import {
  ProjectStageIconBar,
  type TlpsProjectStage,
} from "./ProjectStageIconBar";
import {
  PILOT_FIELDS,
  PILOT_LABELS,
  fieldValues,
  fieldPayload,
} from "./pilotFields";
import "./connected-projects.css";
type Session = {
  projectId: string;
  principalId: string;
  role: string;
  writeEnabled: boolean;
  reviewEnabled: boolean;
};
type Entry = TlpsEntity<TlpsCollection>;
type Item = {
  id: string;
  kind: "task" | "milestone" | "ticket";
  version: number;
  data: {
    title: string;
    description: string;
    status: string;
    dueDate?: string;
  };
};
const emptyValues = (kind: TlpsCollection) => fieldValues(kind, {});
function errorText(e: unknown) {
  if (e instanceof TlpsDataApiError) {
    return e.status === 409
      ? "Someone changed this record. Your draft is kept below. Reload the latest record before trying again."
      : e.status === 403
        ? "Your current project role cannot perform this action. Ask the project owner or administrator for access."
        : e.status === 401
          ? "This session expired or was revoked. Disconnect and sign in again."
          : e.status === 410
            ? "The project owner deleted this project. An administrator can restore it within 30 days."
          : e.status === 429
            ? "Too many requests in a short time. Wait a moment, then try again."
          : e.status === 404
            ? "This project or record is unavailable. Check your access with the administrator."
            : e.status === 400
              ? "Check the fields, registered IDs, date and amount limits before saving."
              : "The server could not complete the request. Your draft is kept; retry when connected.";
  }
  return "Connection failed. Check the server and retry. Your draft has not been saved.";
}
export function ConnectedProjects({
  route,
  navigate,
}: {
  route: string;
  navigate: (path: string) => void;
}) {
  // One transport per mounted page: Desktop commands inside MAATAA Desktop (the
  // token stays in the Desktop process), else /api/maataa with the token in memory.
  const transport = React.useMemo(() => defaultMaataaTransport(), []),
    generation = React.useRef(0),
    createAttempt = React.useRef<{ signature: string; key: string } | null>(
      null,
    );
  const [credential, setCredential] = React.useState("");
  const [session, setSession] = React.useState<Session | null>(null);
  const [title, setTitle] = React.useState("");
  const [kind, setKind] = React.useState<TlpsCollection>("profiles");
  const [records, setRecords] = React.useState<Entry[]>([]);
  const [profiles, setProfiles] = React.useState<TlpsEntity<"profiles">[]>([]);
  const [editing, setEditing] = React.useState<Entry | null>(null);
  const [values, setValues] = React.useState<Record<string, string>>(
    emptyValues("profiles"),
  );
  const [busy, setBusy] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const [error, setError] = React.useState("");
  const [conflict, setConflict] = React.useState(false);
  const [reviewNote, setReviewNote] = React.useState("");
  const [items, setItems] = React.useState<Item[]>([]);
  const [itemTitle, setItemTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [itemKind, setItemKind] = React.useState<Item["kind"]>("task");
  const [history, setHistory] = React.useState<unknown[]>([]);
  const [online, setOnline] = React.useState(navigator.onLine);
  const [deleteTarget, setDeleteTarget] = React.useState<Entry | null>(null);
  const [stageView, setStageView] = React.useState<TlpsProjectStage>("idea");
  const dirty = JSON.stringify(values) !== JSON.stringify(editing ? fieldValues(kind, editing.data as unknown as Record<string,unknown>) : emptyValues(kind)) || !!reviewNote.trim() || !!itemTitle.trim() || !!description.trim();
  React.useEffect(() => {
    const unload = (event: BeforeUnloadEvent) => { if (dirty) {event.preventDefault();event.returnValue='';} };
    const exiting = (event: Event) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload',unload);
    window.addEventListener('tlps:before-exit',exiting);
    return () => {window.removeEventListener('beforeunload',unload);window.removeEventListener('tlps:before-exit',exiting);};
  },[dirty]);
  const api = React.useMemo(() => createTlpsDataApi({ transport }), [transport]);
  React.useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      void transport.disconnect();
      generation.current++;
    };
  }, []);
  function decode(r: { status: number; body: string }) {
    let b: any = null;
    try {
      b = r.body ? JSON.parse(r.body) : null;
    } catch {
      throw new TlpsDataApiError(502, "invalid-response");
    }
    if (r.status < 200 || r.status > 299)
      throw new TlpsDataApiError(r.status, b?.error?.code ?? "request-failed");
    return b;
  }
  async function raw(path: string, method: "GET" | "POST" = "GET", body?: unknown) {
    let reply;
    try {
      reply = await transport.request(
        method,
        path,
        body === undefined ? undefined : JSON.stringify(body),
      );
    } catch (e) {
      throw transportError(e);
    }
    return decode(reply);
  }
  function transportError(e: unknown) {
    const code = (e as { code?: string }).code;
    if (code === "not-connected") return new TlpsDataApiError(401, "not-connected");
    if (code === "invalid") return new TlpsDataApiError(400, "invalid-client-input");
    return new TlpsDataApiError(503, "unavailable");
  }
  async function refresh(s: Session, k: TlpsCollection) {
    const epoch = generation.current;
    const all: Entry[] = [];
    let cursor: string | undefined;
    do {
      const page = await api.list(s.projectId, k, { cursor, limit: 100 });
      all.push(...page.items);
      cursor = page.nextCursor ?? undefined;
    } while (cursor);
    const [p, work, audit] = await Promise.all([
      api.list(s.projectId, "profiles"),
      raw("/v1/tlps/pilot/items"),
      raw("/v1/tlps/pilot/history"),
    ]);
    if (generation.current !== epoch) return;
    setRecords(all);
    setProfiles(p.items);
    setItems(work.items);
    setHistory(audit.items);
    if (p.items[0]) setStageView(p.items[0].data.stage as TlpsProjectStage);
  }
  async function run(action: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (e) {
      setError(errorText(e));
      if (e instanceof TlpsDataApiError && e.status === 409) setConflict(true);
    } finally {
      setBusy(false);
    }
  }
  async function connect() {
    const epoch = ++generation.current;
    await transport.disconnect();
    setSession(null);
    setRecords([]);
    setProfiles([]);
    await run(async () => {
      const token = credential.trim();
      setCredential("");
      let who;
      try {
        who = await transport.connect(token);
      } catch (e) {
        throw transportError(e);
      }
      decode(who);
      try {
        const s = (await raw("/v1/tlps/pilot/session")) as Session;
        const project = await raw(`/v1/projects/${s.projectId}`);
        if (epoch !== generation.current) return;
        setTitle(project.title);
        setSession(s);
        await refresh(s, kind);
        setNotice("Connected. Records are saved to the project database.");
      } catch (e) {
        await transport.disconnect();
        setSession(null);
        throw e;
      }
    });
  }
  function disconnect() {
    if (dirty && !window.confirm("Disconnect and discard your unsaved draft?")) return;
    generation.current++;
    void transport.disconnect();
    setSession(null);
    setCredential("");
    setRecords([]);
    setProfiles([]);
    setItems([]);
    setHistory([]);
    setTitle("");
    setValues(emptyValues(kind));
    setEditing(null);
    setReviewNote("");
    setItemTitle("");
    setDescription("");
    setDeleteTarget(null);
    createAttempt.current = null;
    setError("");
    setNotice("Disconnected. No project token is stored on this device.");
  }
  const detail = route.startsWith("/tlps/projects/");
  const requested = detail ? route.slice("/tlps/projects/".length) : null;
  const wrongProject = !!session && detail && requested !== session.projectId;
  async function save() {
    if (!session) return;
    const payload = fieldPayload(kind, values);
    if (kind === "profiles" && editing)
      payload.stage = (editing.data as TlpsCollectionData["profiles"]).stage;
    await run(async () => {
      if (editing)
        await api.update(
          session.projectId,
          kind,
          editing.id,
          editing.version,
          payload as TlpsCollectionData[typeof kind],
        );
      else {
        const signature = JSON.stringify([session.projectId, kind, payload]);
        if (createAttempt.current?.signature !== signature)
          createAttempt.current = { signature, key: crypto.randomUUID() };
        await api.create(
          session.projectId,
          kind,
          payload as TlpsCollectionData[typeof kind],
          createAttempt.current.key,
        );
        createAttempt.current = null;
      }
      setEditing(null);
      setValues(emptyValues(kind));
      setConflict(false);
      await refresh(session, kind);
      setNotice("Saved to the project database.");
    });
  }
  function choose(k: TlpsCollection) {
    if (busy) return;
    if (dirty && !window.confirm("Switch record type and discard your unsaved draft?")) return;
    setKind(k);
    setEditing(null);
    setValues(emptyValues(k));
    setConflict(false);
    setDeleteTarget(null);
    if (session) void run(() => refresh(session, k));
  }
  async function download() {
    if (!session) return;
    await run(async () => {
      const data = await api.export(session.projectId);
      const [work, audit] = await Promise.all([
        raw("/v1/tlps/pilot/items"),
        raw("/v1/tlps/pilot/history"),
      ]);
      const blob = new Blob(
        [
          JSON.stringify(
            {
              schema: "tlps.pilot-handover/1",
              project: data,
              work: work.items,
              audit: audit.items,
              scope: "planning-only",
              fileBytesIncluded: false,
              paymentsEnabled: false,
            },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tlps-project-handover.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(
        "Handover exported. It contains planning records and evidence references.",
      );
    });
  }
  const profile = profiles[0];
  const editable = !!session?.writeEnabled && !busy && online && !conflict;
  return (
    <section
      className="tlps-connected"
      aria-labelledby="connected-projects-title"
    >
      <header>
        <h1 id="connected-projects-title">Projects</h1>
        <p>
          Plan with your team. Save records, review stages and keep a traceable
          handover.
        </p>
      </header>
      {!online && (
        <p role="status">
          You are offline. Draft fields remain on this page; writes are
          unavailable and are not queued.
        </p>
      )}
      {error && (
        <div role="alert">
          <p>{error}</p>
          {conflict && editing && (
            <Button
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  if (!session) return;
                  const latest = await api.read(
                    session.projectId,
                    kind,
                    editing.id,
                  );
                  setEditing(latest);
                  setValues(
                    fieldValues(
                      kind,
                      latest.data as unknown as Record<string, unknown>,
                    ),
                  );
                  setConflict(false);
                  setNotice(
                    "Latest version loaded. Review your changes before saving.",
                  );
                })
              }
            >
              Replace draft with latest record
            </Button>
          )}
          {!conflict && session && (
            <Button
              disabled={busy}
              onClick={() => void run(() => refresh(session, kind))}
            >
              Retry loading
            </Button>
          )}
        </div>
      )}
      <p role="status" aria-live="polite">
        {busy ? "Working…" : notice}
      </p>
      {!session ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void connect();
          }}
        >
          <h2>Connect to your project</h2>
          <p>
            Your administrator provides a project token. It stays in memory for
            this session. No account is created here.
          </p>
          <label>
            Project access token
            <Input
              type="password"
              autoComplete="off"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <Button
            type="submit"
            disabled={busy || !online || !credential.trim()}
          >
            Connect project
          </Button>
        </form>
      ) : (
        <>
          <div className="tlps-connected-toolbar">
            <p>
              Signed in as <strong>{session.principalId}</strong> ·{" "}
              {session.role}
            </p>
            <Button variant="secondary" disabled={busy} onClick={disconnect}>
              Disconnect
            </Button>
          </div>
          {wrongProject ? (
            <section>
              <h2>Project unavailable</h2>
              <p>
                This link does not match your project access. No other project
                data is shown.
              </p>
              <Button onClick={() => navigate("/tlps/projects")}>
                Back to projects
              </Button>
            </section>
          ) : !detail ? (
            <section>
              <h2>Available to this session</h2>
              <p>
                Project access is scoped to the token supplied by your
                administrator.
              </p>
              <Button
                onClick={() => navigate(`/tlps/projects/${session.projectId}`)}
              >
                {title || "Open project"}
              </Button>
              <p className="tlps-record-id">{session.projectId}</p>
            </section>
          ) : (
            <>
              <div className="tlps-connected-toolbar">
                <div>
                  <h2>{title}</h2>
                  <p>
                    Database connected ·{" "}
                    {profile
                      ? `Current stage: ${profile.data.stage}`
                      : "Create a project profile to start at Idea."}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  disabled={busy}
                  onClick={() => void download()}
                >
                  Export handover
                </Button>
              </div>
              <ProjectStageIconBar
                value={stageView}
                onValueChange={setStageView}
              />
              <p>
                Selected stage: {stageView}. Stage navigation does not advance
                the project. A separate reviewer approves each transition.
              </p>
              <div className="tlps-connected-layout">
                <nav aria-label="Project records">
                  {(Object.keys(PILOT_FIELDS) as TlpsCollection[]).map((k) => (
                    <button
                      type="button"
                      key={k}
                      aria-current={kind === k ? "page" : undefined}
                      disabled={busy}
                      onClick={() => choose(k)}
                    >
                      {PILOT_LABELS[k]}
                    </button>
                  ))}
                </nav>
                <div>
                  <h2>{PILOT_LABELS[kind]}</h2>
                  <p>
                    Evidence is stored as references, without uploaded file
                    bytes. Financial records are planning notes; no money moves.
                  </p>
                  <ul className="tlps-connected-records">
                    {records.map((record) => (
                      <li key={record.id}>
                        <div>
                          <strong>
                            {String(
                              "title" in record.data
                                ? record.data.title
                                : "name" in record.data
                                  ? record.data.name
                                  : "label" in record.data
                                    ? record.data.label
                                    : "milestone" in record.data
                                      ? record.data.milestone
                                      : record.kind,
                            )}
                          </strong>
                          <p className="tlps-record-id">
                            {record.id} · version {record.version}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          disabled={busy}
                          onClick={() => {
                            if (dirty && !window.confirm("Open another record and discard your unsaved draft?")) return;
                            setEditing(record);
                            setValues(
                              fieldValues(
                                kind,
                                record.data as unknown as Record<
                                  string,
                                  unknown
                                >,
                              ),
                            );
                            setConflict(false);
                          }}
                        >
                          Open record
                        </Button>
                        {session.writeEnabled && kind !== "profiles" && (
                          <Button
                            variant="secondary"
                            disabled={busy || !online}
                            onClick={() => setDeleteTarget(record)}
                          >
                            Remove
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {!records.length && !busy && (
                    <p>
                      No {PILOT_LABELS[kind].toLowerCase()} yet.{" "}
                      {session.writeEnabled
                        ? "Add the first record below."
                        : "Ask an editor to add a record."}
                    </p>
                  )}
                  {deleteTarget && (
                    <section aria-label="Confirm record removal">
                      <h3>Remove this record?</h3>
                      <p>
                        This creates a tombstone. Audit history remains.
                        Referenced records cannot be removed until their links
                        are changed.
                      </p>
                      <Button
                        disabled={busy || !online}
                        onClick={() =>
                          void run(async () => {
                            await api.remove(
                              session.projectId,
                              kind,
                              deleteTarget.id,
                              deleteTarget.version,
                            );
                            setDeleteTarget(null);
                            await refresh(session, kind);
                            setNotice(
                              "Record removed; audit history retained.",
                            );
                          })
                        }
                      >
                        Confirm removal
                      </Button>
                      <Button
                        variant="secondary"
                        disabled={busy}
                        onClick={() => setDeleteTarget(null)}
                      >
                        Keep record
                      </Button>
                    </section>
                  )}
                  {session.writeEnabled && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void save();
                      }}
                    >
                      <h3>{editing ? "Edit record" : "Add record"}</h3>
                      {PILOT_FIELDS[kind]
                        .filter(
                          (f) => !(kind === "profiles" && f.key === "stage"),
                        )
                        .map((f) => (
                          <label key={f.key}>
                            {f.label}
                            {f.optional ? " (optional)" : ""}
                            {f.options ? (
                              <Select
                                value={values[f.key] ?? f.options[0]}
                                disabled={!editable}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    [f.key]: e.target.value,
                                  })
                                }
                              >
                                {f.options.map((v) => (
                                  <option key={v}>{v}</option>
                                ))}
                              </Select>
                            ) : (
                              <Input
                                type={f.type ?? "text"}
                                required={!f.optional}
                                maxLength={2048}
                                step={f.type === "number" ? 1 : undefined}
                                value={values[f.key] ?? ""}
                                disabled={!editable}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    [f.key]: e.target.value,
                                  })
                                }
                              />
                            )}
                          </label>
                        ))}
                      <Button
                        type="submit"
                        disabled={
                          !editable ||
                          (!editing &&
                            ["profiles", "onboarding"].includes(kind) &&
                            records.length > 0)
                        }
                      >
                        Save to database
                      </Button>
                      <Button
                        variant="secondary"
                        disabled={busy}
                        onClick={() => {
                          if (dirty && !window.confirm("Clear this form and discard your unsaved draft?")) return;
                          setEditing(null);
                          setValues(emptyValues(kind));
                          setConflict(false);
                          setError("");
                          createAttempt.current = null;
                        }}
                      >
                        Clear form
                      </Button>
                    </form>
                  )}
                </div>
              </div>
              {profile && session.reviewEnabled && (
                <form onSubmit={(e) => e.preventDefault()}>
                  <h2>Review current stage</h2>
                  <p>
                    Review pins project profile version {profile.version}.
                    Approval advances one stage; it does not certify the entire
                    production plan, rights, bookings or payments. You cannot
                    review your own latest profile change.
                  </p>
                  <label>
                    Review note
                    <Input
                      required
                      maxLength={2048}
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                    />
                  </label>
                  {(["approved", "returned"] as const).map((decision) => (
                    <Button
                      key={decision}
                      disabled={
                        busy ||
                        !online ||
                        !reviewNote.trim() ||
                        (decision === "approved" &&
                          profile.data.stage === "shree")
                      }
                      onClick={() =>
                        void run(async () => {
                          await raw("/v1/tlps/pilot/review", "POST", {
                            profileId: profile.id,
                            version: profile.version,
                            decision,
                            note: reviewNote,
                          });
                          setReviewNote("");
                          setConflict(false);
                          await refresh(session, kind);
                          setNotice(
                            decision === "approved"
                              ? "Stage advanced after recorded review."
                              : "Review returned with notes.",
                          );
                        })
                      }
                    >
                      {decision === "approved"
                        ? "Approve next stage"
                        : "Return with notes"}
                    </Button>
                  ))}
                </form>
              )}
              <section>
                <h2>Team work and support</h2>
                <ul className="tlps-connected-records">
                  {items.map((item) => (
                    <li key={item.id}>
                      <div>
                        <strong>{item.data.title}</strong>
                        <p>
                          {item.kind} · {item.data.status} · version{" "}
                          {item.version}
                        </p>
                        <p>{item.data.description}</p>
                      </div>
                      {session.writeEnabled && item.data.status !== "done" && (
                        <Button
                          variant="secondary"
                          disabled={busy || !online}
                          onClick={() =>
                            void run(async () => {
                              await raw("/v1/tlps/pilot/items", "POST", {
                                ...item,
                                data: { ...item.data, status: "done" },
                                version: item.version,
                                id: item.id,
                                kind: item.kind,
                                createdBy: undefined,
                                updatedAt: undefined,
                              });
                              await refresh(session, kind);
                              setNotice("Work item completed.");
                            })
                          }
                        >
                          Mark done
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
                {!items.length && (
                  <p>No tasks, milestones or support requests yet.</p>
                )}
                {session.writeEnabled && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void run(async () => {
                        await raw("/v1/tlps/pilot/items", "POST", {
                          id: crypto.randomUUID(),
                          kind: itemKind,
                          version: 0,
                          data: {
                            title: itemTitle,
                            description,
                            status: "open",
                          },
                        });
                        setItemTitle("");
                        setDescription("");
                        await refresh(session, kind);
                        setNotice("Work item saved to the project database.");
                      });
                    }}
                  >
                    <label>
                      Work type
                      <Select
                        value={itemKind}
                        onChange={(e) =>
                          setItemKind(e.target.value as Item["kind"])
                        }
                      >
                        <option value="task">Task</option>
                        <option value="milestone">Milestone</option>
                        <option value="ticket">Support request</option>
                      </Select>
                    </label>
                    <label>
                      Title
                      <Input
                        required
                        maxLength={200}
                        value={itemTitle}
                        onChange={(e) => setItemTitle(e.target.value)}
                      />
                    </label>
                    <label>
                      Description
                      <Input
                        required
                        maxLength={2048}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </label>
                    <Button type="submit" disabled={busy || !online}>
                      Save work item
                    </Button>
                  </form>
                )}
              </section>
              <section>
                <h2>Team audit history</h2>
                <p>
                  Latest 500 membership, work-item and stage-review events.
                  Production record history is also included in the project
                  export.
                </p>
                <ol className="tlps-connected-audit">
                  {history.map((entry, index) => (
                    <li key={index}>
                      <pre>{JSON.stringify(entry, null, 2)}</pre>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          )}
        </>
      )}
    </section>
  );
}
