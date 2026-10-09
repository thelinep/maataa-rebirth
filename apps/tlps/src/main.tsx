import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Checkbox, Input } from "@maataa/ui";
import "@maataa/ui/styles.css";
import {
  createTlpsFilmHandoff,
  TLPS_FILM_HANDOFF_KEY,
} from "../../shared/tlps-film-handoff";
import {
  publishWorkspaceProject,
  removeWorkspaceProject,
} from "../../shared/maataa-workspace";
import {
  closeIssues,
  emptyTlpsDraft,
  planIssues,
  readTlpsDraft,
  recordActivity,
  sampleTlpsDraft,
  tlpsStorageKey,
  totalBudget,
} from "./workflow";
import {
  TLPS_CAST_ROLES,
  TLPS_CREW_ROLES,
  TLPS_HOD_ROLES,
  TLPS_OPENING_PAYMENT_TYPES,
  TLPS_PROJECT_TYPES,
} from "./types";
import { operatingSystemsForRole, TLPS_ROLE_CHOICES, type TlpsOsId } from "./operatingSystems";
import type {
  EvidenceKind,
  TlpsCrewRole,
  TlpsDraft,
  TlpsHeadOfDepartmentRole,
  TlpsProjectType,
  TlpsRole,
  TlpsView,
} from "./types";
import "./style.css";
import { IdeaToScriptPanel } from "./IdeaToScript";

const views: { id: TlpsView; label: string; description: string }[] = [
  {
    id: "plan",
    label: "Plan",
    description: "Project, budget, people, places, and schedule.",
  },
  {
    id: "review",
    label: "Owner review",
    description: "Submit a complete plan for local preview review.",
  },
  {
    id: "rehearsal",
    label: "Rehearsal",
    description: "Work through readiness checks and evidence metadata.",
  },
  {
    id: "handover",
    label: "Handover",
    description: "Review activity and export this browser-local draft.",
  },
];
const assignableCrewRoles: readonly (
  | TlpsCrewRole
  | TlpsHeadOfDepartmentRole
)[] = [...TLPS_CREW_ROLES, ...TLPS_HOD_ROLES];

function App() {
  const [draft, setDraft] = useState<TlpsDraft>(() =>
    readTlpsDraft(localStorage.getItem(tlpsStorageKey)),
  );
  const isSavedWorkspaceEntry = window.location.pathname.endsWith("/workspace.html")
    || new URLSearchParams(window.location.search).get("surface") === "workspace";
  const [view, setView] = useState<TlpsView | "start">(
    isSavedWorkspaceEntry ? "plan" : "start",
  );
  const [intakeStep, setIntakeStep] = useState<"role" | "systems" | "project">("role");
  const [intakeRole, setIntakeRole] = useState<TlpsRole | "">("");
  const [selectedOs, setSelectedOs] = useState<TlpsOsId | "">("");
  const [intakeIdea, setIntakeIdea] = useState(draft.project.idea ?? "");
  const [notice, setNotice] = useState("");
  const [ideaToScript, setIdeaToScript] = useState(
    () => new URLSearchParams(window.location.search).get("surface") === "idea-to-script"
      || window.location.pathname.endsWith("/idea-to-script.html"),
  );
  const [budgetItem, setBudgetItem] = useState("");
  const [budgetRate, setBudgetRate] = useState("25000");
  const [crewName, setCrewName] = useState("");
  const [crewRole, setCrewRole] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [scene, setScene] = useState("");
  const [sceneTime, setSceneTime] = useState("09:00");
  const [reviewNote, setReviewNote] = useState("");
  const issues = useMemo(() => planIssues(draft), [draft]);
  const finishIssues = useMemo(() => closeIssues(draft), [draft]);
  const activeIndex = views.findIndex((item) => item.id === view);
  const recommendedSystems = intakeRole ? operatingSystemsForRole(intakeRole) : [];

  useEffect(() => {
    localStorage.setItem(tlpsStorageKey, JSON.stringify(draft));
  }, [draft]);

  useEffect(() => {
    const title = draft.project.title.trim();
    const timer = window.setTimeout(() => {
      if (!title) {
        void removeWorkspaceProject("tlps").catch(() =>
          setNotice("Plan saved here, but MAATAA Desktop could not refresh its project list."),
        );
        return;
      }
      void publishWorkspaceProject({
        id: "tlps:workspace",
        product: "tlps",
        title,
        projectType: draft.project.productionType,
        status: "draft",
        sample: false,
      }).catch(() =>
        setNotice("Plan saved here, but MAATAA Desktop could not refresh its project list."),
      );
    }, 250);
    return () => window.clearTimeout(timer);
  }, [draft.project.title, draft.project.productionType]);
  const setProject = (patch: Partial<TlpsDraft["project"]>) =>
    setDraft((current) => ({
      ...current,
      project: { ...current.project, ...patch },
    }));
  const addBudget = () => {
    const rate = Number(budgetRate);
    if (!budgetItem.trim() || !Number.isSafeInteger(rate) || rate <= 0) {
      setNotice("Enter a budget item and a positive whole-number estimate.");
      return;
    }
    setDraft((current) =>
      recordActivity(
        {
          ...current,
          budget: [
            ...current.budget,
            {
              id: crypto.randomUUID(),
              item: budgetItem.trim(),
              quantity: 1,
              rate,
            },
          ],
        },
        "Added budget estimate",
      ),
    );
    setBudgetItem("");
    setNotice("Estimate added to the local plan.");
  };
  const addCrew = () => {
    if (!crewName.trim() || !crewRole.trim()) {
      setNotice("Enter a person and their responsibility.");
      return;
    }
    const role = assignableCrewRoles.find((option) => option === crewRole.trim());
    setDraft((current) =>
      recordActivity(
        {
          ...current,
          crew: [
            ...current.crew,
            {
              id: crypto.randomUUID(),
              name: crewName.trim(),
              responsibility: crewRole.trim(),
              ...(role ? { role } : {}),
            },
          ],
        },
        "Added crew responsibility",
      ),
    );
    setCrewName("");
    setCrewRole("");
    setNotice("Responsibility added to the local plan.");
  };
  const addLocation = () => {
    if (!locationName.trim() || !locationNote.trim()) {
      setNotice("Enter a location candidate and a planning note.");
      return;
    }
    setDraft((current) =>
      recordActivity(
        {
          ...current,
          locations: [
            ...current.locations,
            {
              id: crypto.randomUUID(),
              name: locationName.trim(),
              note: locationNote.trim(),
            },
          ],
        },
        "Added location planning note",
      ),
    );
    setLocationName("");
    setLocationNote("");
    setNotice("Planning note added. It does not confirm access or booking.");
  };
  const addSchedule = () => {
    if (!scene.trim() || !/^([01]\d|2[0-3]):[0-5]\d$/.test(sceneTime)) {
      setNotice("Enter a scene and valid 24-hour call time.");
      return;
    }
    setDraft((current) =>
      recordActivity(
        {
          ...current,
          schedule: [
            ...current.schedule,
            { id: crypto.randomUUID(), time: sceneTime, scene: scene.trim() },
          ],
        },
        "Added call-sheet entry",
      ),
    );
    setScene("");
    setNotice("Call-sheet entry added to the local plan.");
  };
  const loadSample = () => {
    setDraft(sampleTlpsDraft());
    setView("plan");
    setNotice("Loaded fictional sample planning data in this browser.");
  };
  const startPlanning = () => {
    setDraft((current) => ({
      ...current,
      project: {
        ...current.project,
        createdByRole: TLPS_ROLE_CHOICES.find((role) => role.id === intakeRole)?.label ?? "",
        idea: intakeIdea.trim(),
        title: current.project.title,
      },
    }));
    setView("plan");
  };
  const clearDraft = () => {
    localStorage.removeItem(tlpsStorageKey);
    setDraft(emptyTlpsDraft);
    setView("plan");
    setNotice("Local draft cleared.");
  };
  const submit = () => {
    if (draft.status !== "draft" || issues.length) {
      setNotice(
        issues.length ? issues.join(" ") : "Only a draft can be submitted.",
      );
      return;
    }
    setDraft((current) =>
      recordActivity(
        { ...current, status: "submitted" },
        "Submitted for owner preview",
      ),
    );
    setView("review");
    setNotice("Submitted for local owner preview.");
  };
  const approve = () => {
    if (!reviewNote.trim()) {
      setNotice("Add a review note before approving this preview.");
      return;
    }
    setDraft((current) =>
      recordActivity(
        { ...current, status: "approved", approvalNote: reviewNote.trim() },
        "Owner preview approved",
      ),
    );
    setNotice(
      "Preview marked approved locally. This is not an authenticated approval.",
    );
  };
  const returnForChanges = () => {
    if (!reviewNote.trim()) {
      setNotice("Add a review note before returning this plan.");
      return;
    }
    setDraft((current) =>
      recordActivity(
        { ...current, status: "draft", approvalNote: reviewNote.trim() },
        "Returned for planning changes",
      ),
    );
    setNotice("Returned to draft for changes.");
    setView("plan");
  };
  const startRehearsal = () => {
    if (draft.status !== "approved") {
      setNotice(
        "Approve the submitted local preview before starting rehearsal.",
      );
      return;
    }
    setDraft((current) =>
      recordActivity(
        { ...current, status: "rehearsing" },
        "Started local rehearsal",
      ),
    );
    setView("rehearsal");
    setNotice("Local rehearsal started.");
  };
  const toggleTask = (key: keyof TlpsDraft["tasks"], checked: boolean) =>
    setDraft((current) =>
      recordActivity(
        { ...current, tasks: { ...current.tasks, [key]: checked } },
        `Rehearsal check ${checked ? "completed" : "reopened"}: ${key}`,
      ),
    );
  const addEvidence = async (file: File | undefined, kind: EvidenceKind) => {
    if (!file) return;
    if (!file.size || file.size > 2_000_000) {
      setNotice("Choose a non-empty file no larger than 2 MB.");
      return;
    }
    const digest = await crypto.subtle.digest(
      "SHA-256",
      await file.arrayBuffer(),
    );
    const sha256 = [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    if (draft.evidence.some((item) => item.sha256 === sha256)) {
      setNotice("That file is already listed in this draft.");
      return;
    }
    setDraft((current) =>
      recordActivity(
        {
          ...current,
          evidence: [
            ...current.evidence,
            {
              id: crypto.randomUUID(),
              name: file.name,
              kind,
              bytes: file.size,
              sha256,
            },
          ],
        },
        `Recorded ${kind} evidence metadata`,
      ),
    );
    setNotice(
      "Evidence metadata saved locally. File bytes were not uploaded or retained.",
    );
  };
  const closeLocal = () => {
    if (finishIssues.length) {
      setNotice(finishIssues.join(" "));
      return;
    }
    setDraft((current) =>
      recordActivity(
        { ...current, status: "closed-local" },
        "Closed local rehearsal record",
      ),
    );
    setView("handover");
    setNotice(
      "Local handover is ready. This does not report production completion.",
    );
  };
  const exportJson = () => {
    const payload = {
      ...draft,
      exportScope: "local-demo-only",
      productionReady: false,
      confirmedBooking: false,
      realPayment: false,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "tlps-local-handover.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("JSON handover downloaded.");
  };

  const openFilmProject = () => {
    const invoke = (window as Window & {
      __TAURI__?: { core?: { invoke?: (command: string, args?: Record<string, unknown>) => Promise<unknown> } };
    }).__TAURI__?.core?.invoke;
    if (!window.location.pathname.startsWith("/tlps/") && !invoke) {
      setNotice("This local handoff is available from the MAATAA Desktop TLPS window.");
      return;
    }
    try {
      localStorage.setItem(
        TLPS_FILM_HANDOFF_KEY,
        JSON.stringify(createTlpsFilmHandoff(draft)),
      );
      if (invoke) {
        void invoke("open_product_window", { product: "tlp-film", handoffFromTlps: true })
          .then(() => setNotice("TLP Film opened in a new MAATAA Desktop window. Review and confirm the local plan there."))
          .catch(() => setNotice("Could not open TLP Film. Your local plan remains saved in this window."));
        return;
      }
      window.parent.postMessage(
        { type: "maataa:desktop:open-tlps-film" },
        window.location.origin,
      );
    } catch {
      setNotice("This browser could not save the local handoff. Download the JSON instead.");
    }
  };

  return (
    <div className="tlps-app">
      <header className="tlps-header">
        <a className="tlps-brand" href="#home">
          <span className="tlps-brand-mark">T</span>
          <span>
            <strong>TLPS</strong>
            <small>PLANNING WORKSPACE</small>
          </span>
        </a>
        <div className="tlps-header-right">
          <span className="local-pill">
            <span aria-hidden="true" />
            <span className="local-pill-label">Local demo · no account</span>
          </span>
          {view !== "start" && <Button variant="secondary" onClick={() => { setIntakeStep("role"); setView("start"); }}>Start screen</Button>}
          {!ideaToScript && <Button variant="secondary" onClick={() => setIdeaToScript(true)}>Idea → Script</Button>}
          <Button variant="secondary" onClick={loadSample}>Load sample</Button>
        </div>
      </header>
      {ideaToScript ? (
        <IdeaToScriptPanel onClose={() => setIdeaToScript(false)} />
      ) : view === "start" ? (
        <main className="tlps-start" aria-labelledby="tlps-start-title">
          <div className="tlps-start-copy">
            <p className="tlps-overline">START WITH YOUR WORK · {intakeStep === "role" ? "STEP 1 OF 3" : intakeStep === "systems" ? "STEP 2 OF 3" : "STEP 3 OF 3"}</p>
            <h1 id="tlps-start-title">{intakeStep === "role" ? "What is your role?" : intakeStep === "systems" ? "Choose a work area" : "What do you want to make?"}</h1>
            <p>{intakeStep === "role" ? "Choose your role first. We’ll show the TLPS work areas that fit what you do." : intakeStep === "systems" ? "Pick one work area to start with. You can explore the others later." : "Choose the kind of project and tell us your idea in your own words."}</p>
            <div className="tlps-start-form">
              {intakeStep === "role" && <label className="tlps-role-field">
                <span>Choose your role</span>
                <select aria-label="What is your role?" className="m-select" value={intakeRole} onChange={(event) => { setIntakeRole(event.target.value as TlpsRole | ""); setSelectedOs(""); }}>
                  <option value="">Select a role</option>
                  {TLPS_ROLE_CHOICES.map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}
                </select>
              </label>}
              {intakeStep === "systems" && <section className="tlps-role-os" aria-label="Work areas for your role">
                <div className="tlps-role-os-heading"><div><h2>Work areas for {TLPS_ROLE_CHOICES.find((role) => role.id === intakeRole)?.label}</h2><p>Select one area. “Catalogue” items are listed for guidance and are not active in this demo.</p></div><span>{recommendedSystems.length} areas</span></div>
                <div className="tlps-os-grid">{recommendedSystems.map((system) => system.availability === "demo" ? <button type="button" aria-pressed={selectedOs === system.id} className={`tlps-os-card is-available ${selectedOs === system.id ? "is-selected" : ""}`} key={system.id} onClick={() => setSelectedOs(system.id)}><span className="tlps-os-card-top"><strong>{system.name}</strong><small>Available in demo</small></span><span>{system.detail}</span><b>{selectedOs === system.id ? "Selected ✓" : "Choose this area"}</b></button> : <article className="tlps-os-card" key={system.id}><span className="tlps-os-card-top"><strong>{system.name}</strong><small>Catalogue</small></span><span>{system.detail}</span></article>)}</div>
              </section>}
              {intakeStep === "project" && <>
              <label>
                <span>What are you making?</span>
                <select aria-label="What are you making?" className="m-select" value={draft.project.productionType} onChange={(event) => setProject({ productionType: event.target.value as TlpsProjectType })}>
                  {TLPS_PROJECT_TYPES.map((projectType) => <option key={projectType} value={projectType}>{projectType}</option>)}
                </select>
              </label>
              <label className="tlps-idea-field">
                <span>What is your idea?</span>
                <textarea value={intakeIdea} onChange={(event) => setIntakeIdea(event.target.value)} placeholder="For example: a short film about two sisters who reopen their father's cinema." rows={4} />
                <small>You can also leave this blank and start with a project name.</small>
              </label>
              <div className="tlps-start-actions">
                <Button variant="primary" onClick={startPlanning}>Start my plan <span aria-hidden="true">→</span></Button>
                <Button variant="ghost" onClick={loadSample}>See a sample plan</Button>
              </div>
              </>}
              {intakeStep === "role" && <div className="tlps-start-actions"><Button variant="primary" disabled={!intakeRole} onClick={() => setIntakeStep("systems")}>Show my work areas →</Button></div>}
              {intakeStep === "systems" && <div className="tlps-start-actions"><Button variant="ghost" onClick={() => setIntakeStep("role")}>Back</Button><Button variant="primary" disabled={!selectedOs} onClick={() => setIntakeStep("project")}>Continue with selected area →</Button></div>}
              {intakeStep === "project" && <Button variant="ghost" onClick={() => setIntakeStep("systems")}>Back to work areas</Button>}
            </div>
            <p className="tlps-start-boundary">This is a local demo. OS entries marked “Catalogue” are not live services; your idea stays in this browser.</p>
          </div>
          <aside className="tlps-start-steps" aria-label="What happens next">
            <p className="side-label">YOUR SIMPLE PATH</p>
            {[["1", "Choose your role", "Tell us what work you do."], ["2", "Choose a work area", "See the tools suggested for your role."], ["3", "Describe your project", "Pick a type and share your idea."], ["4", "Make your plan", "Add people, places, dates, and estimates."]].map(([number, title, detail]) => <div className="tlps-start-step" key={number}><span>{number}</span><div><strong>{title}</strong><small>{detail}</small></div></div>)}
          </aside>
        </main>
      ) : <div className="tlps-shell">
        <aside className="tlps-sidebar">
          <p className="side-label">WORKFLOW</p>
          <nav aria-label="Planning workflow">
            {views.map((item, index) => (
              <button
                key={item.id}
                className={`view-link ${view === item.id ? "is-active" : ""}`}
                aria-current={view === item.id ? "step" : undefined}
                onClick={() => setView(item.id)}
              >
                <span
                  className={`view-number ${activeIndex > index ? "is-past" : ""}`}
                >
                  {activeIndex > index ? "✓" : index + 1}
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </button>
            ))}
          </nav>
          <div className="sidebar-note">
            <strong>Preview boundary</strong>
            <p>
              Role controls and approvals are local demonstrations. No TLPS
              account or production record is connected.
            </p>
            <Button variant="ghost" onClick={clearDraft}>
              Clear local draft
            </Button>
          </div>
        </aside>
        <main className="tlps-main">
          <div className="tlps-title-row">
            <div>
              <p className="tlps-overline">PRODUCTION PLANNING</p>
              <h1>{views.find((item) => item.id === view)?.label}</h1>
              <p className="tlps-subtitle">
                {views.find((item) => item.id === view)?.description}
              </p>
            </div>
            <span className={`status-chip status-${draft.status}`}>
              {draft.status.replace("-", " ")}
            </span>
          </div>
          {view === "plan" && (
            <section className="tlps-panel" aria-label="Production plan">
              <div className="section-heading">
                <div>
                  <h2>Project intake</h2>
                  <p>
                    Start with a project outline, then add the planning details.
                  </p>
                </div>
                <span className="section-count">01 / 04</span>
              </div>
              {draft.project.idea && <div className="tlps-idea-summary"><strong>Your idea</strong><p>{draft.project.idea}</p><small>Shared by: {draft.project.createdByRole ?? "Project creator"}</small></div>}
              <div className="field-grid">
                <label>
                  Project title
                  <Input
                    value={draft.project.title}
                    disabled={draft.status !== "draft"}
                    onChange={(event) =>
                      setProject({ title: event.target.value })
                    }
                    placeholder="e.g. Mountain Light"
                  />
                </label>
                <label>
                  Production city
                  <Input
                    value={draft.project.city}
                    disabled={draft.status !== "draft"}
                    onChange={(event) =>
                      setProject({ city: event.target.value })
                    }
                    placeholder="City or planning area"
                  />
                </label>
                <label>
                  Project type
                  <select
                    className="m-select"
                    value={draft.project.productionType}
                    disabled={draft.status !== "draft"}
                    onChange={(event) =>
                      setProject({
                        productionType: event.target.value as TlpsProjectType,
                      })
                    }
                  >
                    {TLPS_PROJECT_TYPES.map((projectType) => (
                      <option key={projectType} value={projectType}>
                        {projectType}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Shoot date
                  <Input
                    type="date"
                    value={draft.project.shootDate}
                    disabled={draft.status !== "draft"}
                    onChange={(event) =>
                      setProject({ shootDate: event.target.value })
                    }
                  />
                </label>
                <label>
                  Budget ceiling (₹)
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={draft.project.ceiling}
                    disabled={draft.status !== "draft"}
                    onChange={(event) =>
                      setProject({ ceiling: Number(event.target.value) })
                    }
                  />
                </label>
              </div>
              <div className="section-heading subheading">
                <div>
                  <h2>Budget estimates</h2>
                  <p>Planning values only; no quote or payment is created.</p>
                </div>
                <span className="section-count">
                  ₹{totalBudget(draft).toLocaleString("en-IN")} / ₹
                  {draft.project.ceiling.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="inline-entry">
                <Input
                  aria-label="Budget item"
                  placeholder="Budget item"
                  value={budgetItem}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setBudgetItem(event.target.value)}
                />
                <Input
                  aria-label="Estimated rate"
                  type="number"
                  min="1"
                  value={budgetRate}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setBudgetRate(event.target.value)}
                />
                <Button
                  variant="secondary"
                  disabled={draft.status !== "draft"}
                  onClick={addBudget}
                >
                  Add estimate
                </Button>
              </div>
              {draft.budget.length > 0 && (
                <ul className="record-list">
                  {draft.budget.map((item) => (
                    <li key={item.id}>
                      <span>{item.item}</span>
                      <strong>
                        ₹{(item.quantity * item.rate).toLocaleString("en-IN")}
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
              <div className="section-heading subheading">
                <div>
                  <h2>Crew responsibilities</h2>
                  <p>
                    Track people and responsibilities; this is not an invitation
                    or contract.
                  </p>
                </div>
                <span className="section-count">
                  {draft.crew.length} listed
                </span>
              </div>
              <div className="inline-entry">
                <Input
                  aria-label="Crew member"
                  placeholder="Name"
                  value={crewName}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setCrewName(event.target.value)}
                />
                <Input
                  aria-label="Crew responsibility"
                  list="tlps-crew-role-options"
                  placeholder="Responsibility"
                  value={crewRole}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setCrewRole(event.target.value)}
                />
                <datalist id="tlps-crew-role-options">
                  {[...new Set([...TLPS_CREW_ROLES, ...TLPS_HOD_ROLES])].map(
                    (role) => (
                      <option key={role} value={role} />
                    ),
                  )}
                </datalist>
                <Button
                  variant="secondary"
                  disabled={draft.status !== "draft"}
                  onClick={addCrew}
                >
                  Add person
                </Button>
              </div>
              {draft.crew.length > 0 && (
                <ul className="record-list">
                  {draft.crew.map((person) => (
                    <li key={person.id}>
                      <span>{person.name}</span>
                      <strong>{person.responsibility}</strong>
                    </li>
                  ))}
                </ul>
              )}
              <details className="tlps-role-reference">
                <summary>Cast and payment reference</summary>
                <p>
                  Cast roles: {TLPS_CAST_ROLES.join(", ")}.
                </p>
                <p>
                  Opening payment options: {TLPS_OPENING_PAYMENT_TYPES.join(", ")}.
                  These are planning terms only; no payment is processed.
                </p>
              </details>
              <div className="section-heading subheading">
                <div>
                  <h2>Location notes</h2>
                  <p>
                    A planning note does not confirm access, availability,
                    permission, or booking.
                  </p>
                </div>
                <span className="section-count">
                  {draft.locations.length} notes
                </span>
              </div>
              <div className="inline-entry">
                <Input
                  aria-label="Location candidate"
                  placeholder="Location candidate"
                  value={locationName}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setLocationName(event.target.value)}
                />
                <Input
                  aria-label="Location planning note"
                  placeholder="Planning note"
                  value={locationNote}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setLocationNote(event.target.value)}
                />
                <Button
                  variant="secondary"
                  disabled={draft.status !== "draft"}
                  onClick={addLocation}
                >
                  Add note
                </Button>
              </div>
              {draft.locations.length > 0 && (
                <ul className="record-list">
                  {draft.locations.map((location) => (
                    <li key={location.id}>
                      <span>{location.name}</span>
                      <strong>{location.note}</strong>
                    </li>
                  ))}
                </ul>
              )}
              <div className="section-heading subheading">
                <div>
                  <h2>Call sheet outline</h2>
                  <p>Draft scene and call-time entries for review.</p>
                </div>
                <span className="section-count">
                  {draft.schedule.length} entries
                </span>
              </div>
              <div className="inline-entry schedule-entry">
                <Input
                  aria-label="Scene or activity"
                  placeholder="Scene or activity"
                  value={scene}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setScene(event.target.value)}
                />
                <Input
                  aria-label="Call time"
                  type="time"
                  value={sceneTime}
                  disabled={draft.status !== "draft"}
                  onChange={(event) => setSceneTime(event.target.value)}
                />
                <Button
                  variant="secondary"
                  disabled={draft.status !== "draft"}
                  onClick={addSchedule}
                >
                  Add entry
                </Button>
              </div>
              {draft.schedule.length > 0 && (
                <ul className="record-list">
                  {draft.schedule.map((entry) => (
                    <li key={entry.id}>
                      <span>{entry.time}</span>
                      <strong>{entry.scene}</strong>
                    </li>
                  ))}
                </ul>
              )}
              <div className="issues-box" aria-live="polite">
                <strong>
                  {issues.length
                    ? `${issues.length} items before submission`
                    : "Plan ready for local review"}
                </strong>
                {issues.length > 0 && (
                  <ul>
                    {issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="panel-actions">
                <p>Drafts stay in this browser under a TLPS-specific key.</p>
                <Button
                  disabled={draft.status !== "draft" || issues.length > 0}
                  onClick={submit}
                >
                  Submit for owner review <span>→</span>
                </Button>
              </div>
            </section>
          )}
          {view === "review" && (
            <section className="tlps-panel">
              <div className="section-heading">
                <div>
                  <h2>Plan review</h2>
                  <p>Review the local preview summary and record a note.</p>
                </div>
              </div>
              {draft.status === "draft" && (
                <div className="empty-review">
                  <strong>This plan has not been submitted.</strong>
                  <p>
                    Complete the plan intake, then submit it from the Plan view.
                  </p>
                  <Button variant="secondary" onClick={() => setView("plan")}>
                    Return to plan
                  </Button>
                </div>
              )}
              {draft.status !== "draft" && (
                <>
                  <div className="review-summary">
                    <p>
                      <span>Project</span>
                      <strong>{draft.project.title}</strong>
                    </p>
                    <p>
                      <span>Project type</span>
                      <strong>{draft.project.productionType}</strong>
                    </p>
                    <p>
                      <span>Location</span>
                      <strong>{draft.project.city}</strong>
                    </p>
                    <p>
                      <span>Shoot date</span>
                      <strong>{draft.project.shootDate}</strong>
                    </p>
                    <p>
                      <span>Estimated total</span>
                      <strong>
                        ₹{totalBudget(draft).toLocaleString("en-IN")}
                      </strong>
                    </p>
                    <p>
                      <span>People</span>
                      <strong>{draft.crew.length}</strong>
                    </p>
                    <p>
                      <span>Call-sheet entries</span>
                      <strong>{draft.schedule.length}</strong>
                    </p>
                  </div>
                  <label className="review-field">
                    Review note
                    <textarea
                      value={reviewNote}
                      onChange={(event) => setReviewNote(event.target.value)}
                      placeholder="Add what was reviewed or what should change"
                    />
                  </label>
                  <div className="review-actions">
                    <Button variant="secondary" onClick={returnForChanges}>
                      Return for changes
                    </Button>
                    <Button
                      onClick={approve}
                      disabled={draft.status !== "submitted"}
                    >
                      Approve local preview
                    </Button>
                  </div>
                </>
              )}
              <p className="boundary-note">
                This preview action is not authenticated or server-enforced and
                does not create an authoritative approval.
              </p>
              {draft.status === "approved" && (
                <Button onClick={startRehearsal}>Start rehearsal →</Button>
              )}
            </section>
          )}
          {view === "rehearsal" && (
            <section className="tlps-panel">
              <div className="section-heading">
                <div>
                  <h2>Readiness checks</h2>
                  <p>Review the plan before recording a local rehearsal.</p>
                </div>
              </div>
              {draft.status === "approved" && (
                <Button onClick={startRehearsal}>Start local rehearsal</Button>
              )}
              {draft.status === "rehearsing" ||
              draft.status === "closed-local" ? (
                <>
                  <div className="readiness-list">
                    {(
                      [
                        ["setup", "Setup and department readiness"],
                        [
                          "rehearsal",
                          "Rehearsal completed against the draft plan",
                        ],
                        ["wrap", "Wrap notes and next actions recorded"],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key} className="readiness-item">
                        <Checkbox
                          checked={draft.tasks[key]}
                          disabled={draft.status !== "rehearsing"}
                          onChange={(event) =>
                            toggleTask(key, event.target.checked)
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="evidence-grid">
                    {(["planning", "rehearsal"] as const).map((kind) => (
                      <label className="evidence-upload" key={kind}>
                        <strong>
                          {kind === "planning"
                            ? "Planning evidence"
                            : "Rehearsal evidence"}
                        </strong>
                        <span>
                          {draft.evidence.filter((item) => item.kind === kind)
                            .length
                            ? "Metadata recorded"
                            : "Choose a file to record metadata"}
                        </span>
                        <input
                          type="file"
                          disabled={draft.status !== "rehearsing"}
                          onChange={(event) =>
                            void addEvidence(event.target.files?.[0], kind)
                          }
                        />
                      </label>
                    ))}
                  </div>
                  {draft.evidence.length > 0 && (
                    <ul className="record-list">
                      {draft.evidence.map((item) => (
                        <li key={item.id}>
                          <span>
                            {item.name} · {item.kind} ·{" "}
                            {item.bytes.toLocaleString()} bytes
                          </span>
                          <code>{item.sha256.slice(0, 16)}…</code>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="issues-box">
                    <strong>
                      {finishIssues.length
                        ? "Closeout checklist"
                        : "Local closeout ready"}
                    </strong>
                    {finishIssues.length > 0 && (
                      <ul>
                        {finishIssues.map((issue) => (
                          <li key={issue}>{issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button
                    disabled={
                      draft.status !== "rehearsing" || finishIssues.length > 0
                    }
                    onClick={closeLocal}
                  >
                    Close local rehearsal
                  </Button>
                </>
              ) : (
                <div className="empty-review">
                  <strong>Rehearsal has not started.</strong>
                  <p>Complete owner preview review first.</p>
                </div>
              )}
              <p className="boundary-note">
                Selected files are hashed in memory. Only name, size, kind, and
                SHA-256 are saved; file bytes are not uploaded or retained.
              </p>
            </section>
          )}
          {view === "handover" && (
            <section className="tlps-panel">
              <div className="section-heading">
                <div>
                  <h2>Local handover</h2>
                  <p>Export the plan and its local review/rehearsal record.</p>
                </div>
              </div>
              <div className="handover-state">
                <span className={`status-chip status-${draft.status}`}>
                  {draft.status.replace("-", " ")}
                </span>
                <strong>{draft.project.title || "Untitled local plan"}</strong>
                <p>
                  Project records: {draft.budget.length} budget lines ·{" "}
                  {draft.crew.length} responsibilities ·{" "}
                  {draft.locations.length} location notes ·{" "}
                  {draft.schedule.length} call-sheet entries
                </p>
              </div>
              <div className="activity-list">
                <h3>Activity record</h3>
                {draft.activity.length ? (
                  [...draft.activity].reverse().map((entry, index) => (
                    <p key={`${entry.at}-${index}`}>
                      <span>{new Date(entry.at).toLocaleString()}</span>
                      {entry.action}
                    </p>
                  ))
                ) : (
                  <p>No activity recorded yet.</p>
                )}
              </div>
              <Button onClick={exportJson}>Download JSON handover</Button>
              <Button variant="secondary" onClick={openFilmProject}>
                Continue into a film project <span>→</span>
              </Button>
              <p className="boundary-note">
                This carries the plan into TLP Film inside MAATAA Desktop. The next screen asks before creating the film workspace; no booking, payment, or production is started.
              </p>
              <p className="boundary-note">
                The export labels itself local-demo-only and explicitly marks
                production readiness, confirmed bookings, and real payments as
                false.
              </p>
            </section>
          )}
          {notice && (
            <p className="tlps-notice" role="status">
              {notice}
            </p>
          )}
        </main>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
