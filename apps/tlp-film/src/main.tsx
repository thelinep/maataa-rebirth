import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Checkbox, Input } from "@maataa/ui";
import "@maataa/ui/styles.css";
import {
  blankFilmProject,
  filmStages,
  filmStorageKey,
  parseFilmProject,
  thirtyTrillionIndiaProject,
  type FilmStageId,
  type FilmProjectState,
} from "./filmTimeline";
import {
  getFilmStagePacket,
  thirtyTrillionIndiaPrompt,
} from "./filmProject30Trillion";
import { PublicFilmSurface } from "./PublicFilmSurface";
import { TlpPublicSurface } from "./TlpPublicSurface";
import { LocalPreviewAccess, TlpWorkspaceSetup, type TlpProjectIntake } from "./ProductEntry";
import {
  parseTlpsFilmHandoff,
  TLPS_FILM_HANDOFF_KEY,
  TLPS_FILM_PREVIOUS_PROJECT_KEY,
  type TlpsFilmHandoff,
} from "../../shared/tlps-film-handoff";
import {
  publishWorkspaceProject,
  removeWorkspaceProject,
} from "../../shared/maataa-workspace";
import "./style.css";
import { readStoredText, removeStoredValue, writeStoredValue } from "@maataa/ui/compounds";

const localSessionKey = "tlp.local-preview-session.v1";
const workspaceProfileKey = "tlp.workspace-profile.v1";
type AppRoute = "product" | "film" | "signin" | "onboarding" | "workspace";

function readPublicSurface(): AppRoute {
  const params = new URLSearchParams(window.location.search);
  const surface = params.get("surface");
  const fromTlps = params.get("from") === "tlps"
    && parseTlpsFilmHandoff(readStoredText(TLPS_FILM_HANDOFF_KEY)) !== null;
  if (surface === "tlp") return "product";
  if (surface === "film" || surface === "public") return "film";
  const hasSession = readStoredText(localSessionKey) === "active";
  const hasProfile = readStoredText(workspaceProfileKey) !== null;
  if (fromTlps) return hasSession ? "workspace" : "signin";
  if (surface === "signin") return hasSession ? "onboarding" : "signin";
  if (surface === "onboarding") return hasSession ? "onboarding" : "signin";
  if (surface === "workspace") return hasSession && (hasProfile || fromTlps) ? "workspace" : "signin";
  return hasSession ? (hasProfile ? "workspace" : "onboarding") : "product";
}

function App() {
  const [publicSurface, setPublicSurface] = useState<AppRoute>(readPublicSurface);
  const [project, setProject] = useState<FilmProjectState>(() =>
    (() => {
      const stored = readStoredText(filmStorageKey);
      if (stored === null) return thirtyTrillionIndiaProject;
      const existing = parseFilmProject(stored);
      return existing.projectName === "The Quiet Frame · sample"
        ? thirtyTrillionIndiaProject
        : existing;
    })(),
  );
  const [pendingTlpsHandoff, setPendingTlpsHandoff] = useState<TlpsFilmHandoff | null>(() =>
    new URLSearchParams(window.location.search).get("from") === "tlps"
      ? parseTlpsFilmHandoff(readStoredText(TLPS_FILM_HANDOFF_KEY))
      : null,
  );
  const [activeTlpsHandoff, setActiveTlpsHandoff] = useState<TlpsFilmHandoff | null>(() =>
    parseTlpsFilmHandoff(readStoredText("maataa.tlps-film.active-handoff.v1")),
  );
  const [hasPreviousProject, setHasPreviousProject] = useState(() =>
    readStoredText(TLPS_FILM_PREVIOUS_PROJECT_KEY) !== null,
  );
  const [projectDraft, setProjectDraft] = useState(project.projectName);
  const [notice, setNotice] = useState("");
  const goTo = (route: AppRoute) => {
    const url = new URL(window.location.href);
    if (route === "product") url.searchParams.set("surface", "tlp");
    else if (route === "film") url.searchParams.set("surface", "film");
    else url.searchParams.set("surface", route);
    window.history.pushState(null, "", `${url.pathname}${url.search}`);
    setPublicSurface(readPublicSurface());
  };
  const activeStage =
    filmStages.find((stage) => stage.id === project.activeStage) ??
    filmStages[0];
  const allTasks = useMemo(
    () =>
      filmStages.flatMap((stage) =>
        stage.topics.flatMap((topic) =>
          topic.tasks.map((task) => `${topic.id}:${task}`),
        ),
      ),
    [],
  );
  const progress = allTasks.length
    ? Math.round((project.completedTasks.length / allTasks.length) * 100)
    : 0;
  const stagePacket = getFilmStagePacket(
    activeStage.id,
    project.generationRevisions[activeStage.id] ?? 1,
  );

  useEffect(() => {
    writeStoredValue(filmStorageKey, project);
    setProjectDraft(project.projectName);
  }, [project]);

  useEffect(() => {
    const title = project.projectName.trim();
    const isSample = !activeTlpsHandoff
      && title === "30 Trillion India"
      && !project.createdByRole
      && !project.projectIdea;
    const timer = window.setTimeout(() => {
      if (!title) {
        void removeWorkspaceProject("tlp-film").catch(() =>
          setNotice("Project saved here, but MAATAA Desktop could not refresh its project list."),
        );
        return;
      }
      void publishWorkspaceProject({
        id: "tlp-film:workspace",
        product: "tlp-film",
        title,
        projectType: project.productionType || "Feature Film",
        status: isSample ? "example" : "draft",
        sample: isSample,
      }).catch(() =>
        setNotice("Project saved here, but MAATAA Desktop could not refresh its project list."),
      );
    }, 250);
    return () => window.clearTimeout(timer);
  }, [activeTlpsHandoff, project]);

  useEffect(() => {
    const syncSurface = () => setPublicSurface(readPublicSurface());
    window.addEventListener("popstate", syncSurface);
    return () => window.removeEventListener("popstate", syncSurface);
  }, []);

  useEffect(() => {
    document.title =
      publicSurface === "product"
        ? "TLP · Film Production Planning"
        : publicSurface === "film"
          ? "30 Trillion India · Film Concept"
          : publicSurface === "signin"
            ? "TLP · Workspace Access"
            : publicSurface === "onboarding"
              ? "TLP · Set up your workspace"
              : "TLP · Film Producer Workspace";
  }, [publicSurface]);

  const updateProject = (patch: Partial<FilmProjectState>) =>
    setProject((current) => ({ ...current, ...patch }));
  const toggleTask = (key: string) =>
    setProject((current) => ({
      ...current,
      completedTasks: current.completedTasks.includes(key)
        ? current.completedTasks.filter((task) => task !== key)
        : [...current.completedTasks, key],
    }));
  const chooseStage = (id: FilmStageId) => updateProject({ activeStage: id });
  const loadSample = () => {
    setProject(thirtyTrillionIndiaProject);
    setActiveTlpsHandoff(null);
    removeStoredValue("maataa.tlps-film.active-handoff.v1");
    setNotice(
      "Loaded the 30 Trillion India fictional feature-film simulation in this browser.",
    );
  };
  const acceptTlpsHandoff = () => {
    if (!pendingTlpsHandoff) return;
    const current = readStoredText(filmStorageKey);
    if (current) writeStoredValue(TLPS_FILM_PREVIOUS_PROJECT_KEY, current);
    const nextProject: FilmProjectState = {
      ...blankFilmProject,
      projectName: pendingTlpsHandoff.project.title,
    };
    writeStoredValue(filmStorageKey, nextProject);
    writeStoredValue("maataa.tlps-film.active-handoff.v1", pendingTlpsHandoff);
    removeStoredValue(TLPS_FILM_HANDOFF_KEY);
    setProject(nextProject);
    setActiveTlpsHandoff(pendingTlpsHandoff);
    setPendingTlpsHandoff(null);
    setHasPreviousProject(Boolean(current));
    window.history.replaceState(null, "", window.location.pathname);
    setNotice("Film project created from the TLPS plan. Review the imported planning summary before using it.");
  };
  const restorePreviousProject = () => {
    const previous = parseFilmProject(readStoredText(TLPS_FILM_PREVIOUS_PROJECT_KEY));
    if (!previous.projectName) return;
    setProject(previous);
    writeStoredValue(filmStorageKey, previous);
    removeStoredValue(TLPS_FILM_PREVIOUS_PROJECT_KEY);
    removeStoredValue("maataa.tlps-film.active-handoff.v1");
    setActiveTlpsHandoff(null);
    setHasPreviousProject(false);
    setNotice("Previous film project restored from this browser.");
  };
  const generateStageDraft = () => {
    setProject((current) => ({
      ...current,
      generationRevisions: {
        ...current.generationRevisions,
        [activeStage.id]: (current.generationRevisions[activeStage.id] ?? 1) + 1,
      },
    }));
    setNotice(
      `Generated another simulated ${activeStage.label.toLowerCase()} draft. Review before use.`,
    );
  };
  const resetProject = () => {
    removeStoredValue(filmStorageKey);
    setProject(blankFilmProject);
    setNotice("Local project cleared.");
  };
  const finishStage = () => {
    const stageTasks = activeStage.topics.flatMap((topic) =>
      topic.tasks.map((task) => `${topic.id}:${task}`),
    );
    if (!stageTasks.every((task) => project.completedTasks.includes(task))) {
      setNotice(
        "Complete each checklist item in this stage before marking it ready.",
      );
      return;
    }
    const next =
      filmStages[
        filmStages.findIndex((stage) => stage.id === activeStage.id) + 1
      ];
    setProject((current) => ({
      ...current,
      completedStages: current.completedStages.includes(activeStage.id)
        ? current.completedStages
        : [...current.completedStages, activeStage.id],
      activeStage: next?.id ?? activeStage.id,
    }));
    setNotice(
      next
        ? `${activeStage.label} marked ready. Moved to ${next.label}.`
        : "All stages are marked ready. Check unverified release items with qualified reviewers.",
    );
  };
  const saveName = () => {
    updateProject({ projectName: projectDraft.trim().slice(0, 120) });
    setNotice(
      projectDraft.trim()
        ? "Project name saved locally."
        : "Add a project name to start your workspace.",
    );
  };

  const openWorkspace = () => {
    if (readStoredText(localSessionKey) === "active" && readStoredText(workspaceProfileKey)) goTo("workspace");
    else goTo("signin");
  };
  const enterLocalPreview = () => {
    writeStoredValue(localSessionKey, "active");
    const isTlpsHandoff = new URLSearchParams(window.location.search).get("from") === "tlps"
      && parseTlpsFilmHandoff(readStoredText(TLPS_FILM_HANDOFF_KEY)) !== null;
    goTo(isTlpsHandoff ? "workspace" : "onboarding");
  };
  const createLocalProject = (intake: TlpProjectIntake) => {
    const current = readStoredText(filmStorageKey);
    if (current) writeStoredValue(TLPS_FILM_PREVIOUS_PROJECT_KEY, current);
    const nextProject: FilmProjectState = {
      ...blankFilmProject,
      projectName: intake.title,
      createdByRole: intake.roleLabel,
      selectedOperatingSystem: intake.operatingSystem,
      productionType: intake.productionType,
      projectIdea: intake.idea,
    };
    writeStoredValue(workspaceProfileKey, { role: intake.role, roleLabel: intake.roleLabel, operatingSystem: intake.operatingSystem });
    removeStoredValue("maataa.tlps-film.active-handoff.v1");
    setActiveTlpsHandoff(null);
    setHasPreviousProject(Boolean(current));
    setProject(nextProject);
    goTo("workspace");
    setNotice("Local project created from your idea. Drafts and planning data remain a preview.");
  };

  if (publicSurface === "product") return <TlpPublicSurface onOpenWorkspace={openWorkspace} />;

  if (publicSurface === "signin") return <LocalPreviewAccess onEnter={enterLocalPreview} onBack={() => goTo("product")} />;
  if (publicSurface === "onboarding") return <TlpWorkspaceSetup onComplete={createLocalProject} />;

  if (publicSurface === "film") {
    return (
      <PublicFilmSurface
        onOpenWorkspace={() => {
          openWorkspace();
        }}
      />
    );
  }

  return (
    <div className="film-app">
      <header className="film-header">
        <a
          className="film-brand"
          href="#home"
          aria-label="TLP Film Producer Workspace home"
        >
          <span className="film-brand-mark">T</span>
          <span>
            <strong>TLP</strong>
            <small>FILM PRODUCER WORKSPACE</small>
          </span>
        </a>
        <div className="film-header-actions">
          <a className="public-preview-link" href="./index.html?surface=tlp">
            Public surface ↗
          </a>
          <span className="local-pill">
            <span aria-hidden="true" />
            Demo · saved in this browser
          </span>
          <Button variant="secondary" onClick={loadSample}>
            Reload 30 Trillion India
          </Button>
          <Button variant="ghost" onClick={() => { removeStoredValue(localSessionKey); removeStoredValue(workspaceProfileKey); goTo("product"); }}>Exit preview</Button>
        </div>
      </header>
      {(project.createdByRole || project.projectIdea) && <section className="film-project-origin" aria-label="Project setup details">
        <span>STARTED FROM YOUR IDEA</span><strong>{project.createdByRole || "Creator"} · {project.productionType || "Project"}</strong>
        {project.selectedOperatingSystem && <small>Work area: {project.selectedOperatingSystem}</small>}
        {project.projectIdea && <p>{project.projectIdea}</p>}
      </section>}
      {pendingTlpsHandoff && <section className="film-tlps-handoff" aria-labelledby="film-tlps-handoff-title">
        <div><p className="film-overline">FROM TLPS · LOCAL PLAN</p><h2 id="film-tlps-handoff-title">Start a film project from “{pendingTlpsHandoff.project.title}”?</h2>
          <p>{pendingTlpsHandoff.project.type} · {pendingTlpsHandoff.project.city || "Location not set"} · {pendingTlpsHandoff.project.shootDate || "Shoot date not set"}</p>
          <p>{pendingTlpsHandoff.budgetLines} estimate lines · {pendingTlpsHandoff.crewResponsibilities} crew responsibilities · ₹{pendingTlpsHandoff.estimatedBudget.toLocaleString("en-IN")} estimated</p>
          <small>Local planning details only. They do not confirm budget, bookings, permissions, or production readiness.</small></div>
        <div className="film-tlps-handoff-actions"><Button onClick={acceptTlpsHandoff}>Create film project</Button><Button variant="secondary" onClick={() => { setPendingTlpsHandoff(null); removeStoredValue(TLPS_FILM_HANDOFF_KEY); window.history.replaceState(null, "", window.location.pathname); }}>Keep current project</Button></div>
      </section>}
      {activeTlpsHandoff && <section className="film-tlps-handoff film-tlps-handoff-active" aria-label="TLPS plan used to start this film project">
        <div><p className="film-overline">FILM PROJECT STARTED FROM TLPS</p><strong>{activeTlpsHandoff.project.type} · {activeTlpsHandoff.project.city || "Location not set"}</strong><p>{activeTlpsHandoff.budgetLines} estimates · {activeTlpsHandoff.crewResponsibilities} crew responsibilities · planning data remains a local demo.</p></div>
        {hasPreviousProject && <Button variant="secondary" onClick={restorePreviousProject}>Restore previous film project</Button>}
      </section>}
      {hasPreviousProject && !activeTlpsHandoff && <section className="film-tlps-handoff" aria-label="Previous local film project">
        <div><p className="film-overline">PREVIOUS LOCAL PROJECT</p><p>Your earlier project is saved in this browser.</p></div>
        <Button variant="secondary" onClick={restorePreviousProject}>Restore previous film project</Button>
      </section>}
      <div className="film-layout">
        <aside className="film-sidebar" aria-label="Film production stages">
          <div className="project-picker">
            <label htmlFor="film-project-name">CURRENT PROJECT</label>
            <div className="project-name-row">
              <Input
                id="film-project-name"
                value={projectDraft}
                onChange={(event) => setProjectDraft(event.target.value)}
                placeholder="Name your film"
                onKeyDown={(event) => {
                  if (event.key === "Enter") saveName();
                }}
              />
              <Button
                aria-label="Save project name"
                variant="ghost"
                onClick={saveName}
              >
                Save
              </Button>
            </div>
          </div>
          <nav className="stage-nav">
            {filmStages.map((stage, index) => {
              const done = project.completedStages.includes(stage.id);
              return (
                <button
                  key={stage.id}
                  className={`stage-nav-item ${project.activeStage === stage.id ? "is-active" : ""}`}
                  aria-current={
                    project.activeStage === stage.id ? "step" : undefined
                  }
                  onClick={() => chooseStage(stage.id)}
                >
                  <span className={`stage-index ${done ? "is-done" : ""}`}>
                    {done ? "✓" : String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="stage-nav-copy">
                    <strong>{stage.label}</strong>
                    <small>{stage.topics.length} work areas</small>
                  </span>
                  <span className="stage-chevron" aria-hidden="true">
                    ›
                  </span>
                </button>
              );
            })}
          </nav>
          <div className="film-progress">
            <div className="progress-label">
              <span>Project checklist</span>
              <strong>{progress}%</strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Project checklist progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <p>
              {project.completedTasks.length} of {allTasks.length} checklist
              items complete
            </p>
            <Button variant="ghost" onClick={resetProject}>
              Clear local project
            </Button>
          </div>
        </aside>
        <main className="film-main">
          <section className="film-stage-heading">
            <div>
              <p className="film-overline">FILM PRODUCTION · WORKSPACE</p>
              <h1>{activeStage.label}</h1>
              <p className="film-stage-description">
                {activeStage.description}
              </p>
            </div>
            <div className="stage-counter">
              <strong>
                {String(
                  filmStages.findIndex((stage) => stage.id === activeStage.id) +
                    1,
                ).padStart(2, "0")}
              </strong>
              <span>/ 06</span>
            </div>
          </section>
          <section
            className="film-project-summary"
            aria-label="Project summary"
          >
            <div>
              <span>PROJECT</span>
              <strong>{project.projectName || "Untitled film"}</strong>
            </div>
            <div>
              <span>ACTIVE STAGE</span>
              <strong>{activeStage.label}</strong>
            </div>
            <div>
              <span>CHECKLIST</span>
              <strong>
                {project.completedTasks.length} / {allTasks.length}
              </strong>
            </div>
          </section>
          <section className="generation-studio" aria-label="Prompt generation and production simulation">
            <div className="generation-prompt">
              <div className="generation-section-head">
                <div>
                  <p className="film-overline">PROMPT → FILM PLAN</p>
                  <h2>{project.projectName || "Untitled film"}</h2>
                </div>
                <span className="demo-tag">SIMULATED GENERATION</span>
              </div>
              <p>{activeTlpsHandoff
                ? "This film workspace started from a TLPS production plan. Add and review the story idea before creating project-specific script or production drafts."
                : thirtyTrillionIndiaPrompt}</p>
              <div className="generated-head">
                <div>
                  <span className="packet-label">{activeStage.label} packet · draft {stagePacket.version}</span>
                  <strong>{activeTlpsHandoff ? "Project setup" : "Generated starting points"}</strong>
                </div>
                <Button variant="secondary" onClick={generateStageDraft} disabled={Boolean(activeTlpsHandoff)}>
                  {activeTlpsHandoff ? "Project drafts not ready" : "Generate another draft"}
                </Button>
              </div>
              <div className="generated-artifacts">
                {activeTlpsHandoff ? <article className="generated-artifact">
                  <h3>TLPS plan connected</h3>
                  <p>{activeTlpsHandoff.project.type} · {activeTlpsHandoff.project.city || "Location not set"} · {activeTlpsHandoff.project.shootDate || "Shoot date not set"}. The imported estimates and responsibilities are planning data only.</p>
                </article> : stagePacket.artifacts.map((artifact) => (
                  <article className="generated-artifact" key={artifact.title}>
                    <h3>{artifact.title}</h3>
                    <p>{artifact.text}</p>
                  </article>
                ))}
              </div>
            </div>
            {!activeTlpsHandoff && <div className="simulation-panel">
              <div className="simulation-heading">
                <div>
                  <span className="packet-label">{activeStage.label} · repeatable demo seed TTI-001</span>
                  <h3>Production simulation</h3>
                </div>
                <span className="demo-tag">SYNTHETIC DATA</span>
              </div>
              <div className="simulation-metrics">
                {stagePacket.simulation.map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <small>{metric.context}</small>
                  </div>
                ))}
              </div>
              <p className="simulation-boundary">{stagePacket.boundary}</p>
            </div>}
          </section>
          <section
            className="topic-list"
            aria-label={`${activeStage.label} work areas`}
          >
            {activeStage.topics.map((topic, index) => (
              <article className="topic-row" key={topic.id}>
                <div className="topic-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="topic-content">
                  <div className="topic-title-line">
                    <h2>{topic.title}</h2>
                    {topic.reviewRequired && (
                      <span className="review-tag">Needs qualified review</span>
                    )}
                  </div>
                  <p>{topic.summary}</p>
                  <div className="topic-checklist">
                    {topic.tasks.map((task) => {
                      const key = `${topic.id}:${task}`;
                      return (
                        <label
                          className={`task-row ${project.completedTasks.includes(key) ? "is-checked" : ""}`}
                          key={key}
                        >
                          <Checkbox
                            checked={project.completedTasks.includes(key)}
                            onChange={() => toggleTask(key)}
                            aria-label={task}
                          />
                          <span>{task}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </section>
          <footer className="stage-footer">
            <p>
              Checklist progress is stored locally. It does not confirm
              permissions, rights, bookings, funding, or production completion.
            </p>
            <Button onClick={finishStage}>
              Mark stage ready <span aria-hidden="true">→</span>
            </Button>
          </footer>
          {notice && (
            <p className="film-notice" role="status">
              {notice}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
