"use client";

import { useEffect, useMemo, useState } from "react";
import { enterpriseRoadmap, roadmapPhases, type RoadmapStatus, type RoadmapTask } from "@/lib/enterprise-roadmap";

const STORAGE_KEY = "hemant-enterprise-roadmap.v2";
const LEGACY_STORAGE_KEY = "hemant-enterprise-roadmap.v1";
const ACTIVE_AGENT_TASKS = new Set(["B-04", "P-02"]);
const BLOCKED_TASKS = new Set(["S-14"]);
const EVIDENCE_BACKED_TASKS = new Set(["S-10", "S-13"]);
const lanes: { id: RoadmapStatus; title: string; note: string }[] = [
  { id: "done", title: "Evidence-backed", note: "Prototype scope only; not production approval." },
  { id: "in-progress", title: "In progress", note: "Partial implementation or scoped work exists; acceptance gate remains open." },
  { id: "ready", title: "Ready / queued", note: "Can proceed when dependencies are met." },
  { id: "blocked", title: "Needs input / external", note: "Owner decision, customer, provider or mission evidence required." },
  { id: "deferred", title: "Deferred until product is built", note: "Buyer, pilot and commercialization work intentionally waits for the technical product baseline." },
];
type BoardState = Record<string, { status: RoadmapStatus; evidence: string }>;

function initialBoard(): BoardState {
  return Object.fromEntries(enterpriseRoadmap.map((task) => [task.id, { status: task.status, evidence: task.evidence ?? "" }]));
}

function readBoard(raw: string | null, deferLegacyCustomerTasks = false): BoardState {
  const baseline = initialBoard();
  if (!raw) return baseline;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return baseline;
    const stored = value as Record<string, unknown>;
    for (const task of enterpriseRoadmap) {
      const candidate = stored[task.id];
      if (!candidate || typeof candidate !== "object") continue;
      const item = candidate as Record<string, unknown>;
      const validStatus = lanes.some((lane) => lane.id === item.status);
      if (validStatus && typeof item.evidence === "string") {
        let status = deferLegacyCustomerTasks && task.status === "deferred" ? "deferred" : item.status as RoadmapStatus;
        let evidence = item.evidence.slice(0, 1200);
        // Evidence-backed task baselines must advance stale browser-local copies.
        if (EVIDENCE_BACKED_TASKS.has(task.id) && task.status === "done" && status !== "done") {
          status = "done";
          evidence = task.evidence ?? evidence;
        }
        if (BLOCKED_TASKS.has(task.id) && task.status === "blocked" && status !== "blocked" && status !== "done" && status !== "deferred") {
          status = "blocked";
          evidence = task.evidence ?? evidence;
        }
        if (ACTIVE_AGENT_TASKS.has(task.id) && task.status === "in-progress" && status !== "in-progress" && status !== "done" && status !== "deferred") {
          status = "in-progress";
          evidence = task.evidence ?? evidence;
        }
        baseline[task.id] = { status, evidence };
      }
    }
    return baseline;
  } catch {
    return baseline;
  }
}

export function EnterpriseKanban() {
  const [board, setBoard] = useState<BoardState>(() => initialBoard());
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState("All phases");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState("Loading this browser’s board…");

  useEffect(() => {
    const current = window.localStorage.getItem(STORAGE_KEY);
    const legacy = current ? null : window.localStorage.getItem(LEGACY_STORAGE_KEY);
    setBoard(readBoard(current ?? legacy, !current && legacy !== null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
      setSaved("Saved in this browser");
    } catch {
      setSaved("Browser storage unavailable · changes remain only until this page closes");
    }
  }, [board, ready]);

  const filtered = useMemo(() => enterpriseRoadmap.filter((task) => {
    const term = query.trim().toLowerCase();
    const matchesPhase = phase === "All phases" || task.phase === phase;
    const matchesQuery = !term || `${task.id} ${task.title} ${task.detail} ${task.acceptance} ${task.input ?? ""}`.toLowerCase().includes(term);
    return matchesPhase && matchesQuery;
  }), [phase, query]);
  const doneCount = Object.values(board).filter((item) => item.status === "done").length;
  const progress = Math.round((doneCount / enterpriseRoadmap.length) * 100);

  function updateTask(task: RoadmapTask, status: RoadmapStatus, evidence: string) {
    if (status === "done" && !evidence.trim()) {
      setSaved(`Add a link or evidence note before closing ${task.id}.`);
      return;
    }
    setBoard((current) => ({ ...current, [task.id]: { status, evidence: evidence.slice(0, 1200) } }));
  }

  function resetBoard() {
    if (!window.confirm("Reset all browser-local roadmap progress and evidence notes to the checked-in baseline?")) return;
    setBoard(initialBoard());
    setSaved("Board restored to the checked-in evidence baseline.");
  }

  return <section className="kanban-wrap" aria-label="Enterprise roadmap Kanban board">
    <div className="kanban-toolbar">
      <div className="board-summary"><strong>{doneCount} of {enterpriseRoadmap.length}</strong><span>tasks currently in Evidence-backed</span><div className="progress-track" role="progressbar" aria-label="Tasks marked evidence-backed" aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={enterpriseRoadmap.length}><span style={{ transform: `scaleX(${progress / 100})` }} /></div><small>Not a measure of production readiness</small></div>
      <div className="board-controls"><label>Filter phase<select aria-label="Filter by phase" value={phase} onChange={(event) => setPhase(event.target.value)}><option>All phases</option>{roadmapPhases.map((item) => <option key={item}>{item}</option>)}</select></label><label>Find a task<input aria-label="Search roadmap tasks" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search task, gate, input…" /></label><button className="board-reset" type="button" onClick={resetBoard}>Reset board</button></div>
    </div>
    <p className="board-state" role="status" aria-live="polite">{saved} <span>· local-only, not shared</span></p>
    <p className="board-defer-note"><strong>Sequencing decision:</strong> buyer selection, customer discovery, commercial packaging and customer pilot/release acceptance are deferred until the technical product is built. Science, platform, security and hosting work stays in its real active or input-required lane.</p>
    <div className="kanban-board">
      {lanes.map((lane) => {
        const tasks = filtered.filter((task) => board[task.id]?.status === lane.id);
        return <section className={`kanban-lane lane-${lane.id}`} key={lane.id} aria-labelledby={`lane-${lane.id}`}>
          <header className="lane-heading"><div><h2 id={`lane-${lane.id}`}>{lane.title}</h2><p>{lane.note}</p></div><span>{tasks.length}</span></header>
          <div className="lane-cards">{tasks.length ? tasks.map((task) => {
            const current = board[task.id] ?? { status: task.status, evidence: task.evidence ?? "" };
            return <details className="roadmap-task" key={task.id} data-roadmap-task={task.id}>
              <summary><span className="task-id">{task.id}</span><strong>{task.title}</strong><span className="task-phase">{task.phase}</span></summary>
              <div className="task-body"><p>{task.detail}</p><p className="acceptance"><b>Close gate when:</b> {task.acceptance}</p>
                {task.dependsOn?.length ? <p className="task-meta"><b>Depends:</b> {task.dependsOn.join(" · ")}</p> : null}
                {task.input ? <p className="task-input"><b>Owner input / external dependency:</b> {task.input}</p> : null}
                <label className="task-evidence">Evidence note or link<textarea value={current.evidence} maxLength={1200} onChange={(event) => setBoard((state) => ({ ...state, [task.id]: { ...current, evidence: event.target.value } }))} placeholder="What artifact, test, decision or customer acceptance proves this task?" /></label>
                {current.status === "done" && current.evidence === task.evidence && task.evidence ? <small className="baseline-evidence">Seeded from checked-in project evidence. This confirms only the described prototype scope.</small> : current.status === "done" ? <small className="baseline-evidence">Board owner supplied this evidence note; it has not been independently verified.</small> : null}
                <div className="task-actions"><label>Move to<select aria-label={`Move ${task.id}`} value={current.status} onChange={(event) => updateTask(task, event.target.value as RoadmapStatus, current.evidence)}>{lanes.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><small>Changes save to this browser automatically.</small></div>
              </div>
            </details>;
          }) : <p className="lane-empty">No matching tasks.</p>}</div>
        </section>;
      })}
    </div>
    <p className="board-footnote">A task moved to “Evidence-backed” needs a note or link. For seeded tasks, the note names the checked-in artifact. For new entries, the note is owner-supplied and is not independently certified. Clearing browser storage removes local progress.</p>
  </section>;
}
