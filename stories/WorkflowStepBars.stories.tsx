import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import referenceData from "./workflow-step-bars.reference-data.json";
import "./workflow-step-bars.css";
import { ProjectStageIconBar, TLPS_PROJECT_STAGES, type TlpsProjectStage } from "../apps/tlps/src/project/ProjectStageIconBar";

type Flow = {
  id: string;
  name: string;
  source_reference: string;
  steps: string[];
};
type Group = { group: string; flows: Flow[] };
const groups = referenceData.groups as Group[];

function FlowBar({
  flow,
  style,
}: {
  flow: Flow;
  style: "horizontal" | "vertical";
}) {
  const [current, setCurrent] = useState(0);
  const currentStep = flow.steps[current];
  return (
    <article className={`wf-card ${style}`}>
      <header className="wf-card-heading">
        <h3>{flow.name}</h3>
        <span>{flow.steps.length} steps</span>
        <small>{flow.source_reference}</small>
      </header>
      <ol className="wf-steps" aria-label={`${flow.name} steps`}>
        {flow.steps.map((label, index) => {
          const state =
            index < current
              ? "done"
              : index === current
                ? "current"
                : "upcoming";
          return (
            <li className={`wf-step ${state}`} key={`${flow.id}-${index}`}>
              <button
                type="button"
                aria-label={`Step ${index + 1} of ${flow.steps.length}: ${label}, ${state === "current" ? "current step" : state}`}
                aria-current={state === "current" ? "step" : undefined}
                aria-pressed={index === current}
                onClick={() => setCurrent(index)}
              >
                <span className="wf-step-marker" aria-hidden="true">
                  {index < current ? "✓" : index + 1}
                </span>
                <span className="wf-step-label">{label}</span>
              </button>
              {index < flow.steps.length - 1 && (
                <span
                  className={`wf-connector ${index < current ? "complete" : ""}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      <footer className="wf-card-footer">
        <p aria-live="polite">
          Step {current + 1} of {flow.steps.length} ·{" "}
          <strong>{currentStep}</strong>
        </p>
        <div>
          <button
            type="button"
            disabled={current === 0}
            onClick={() => setCurrent((step) => Math.max(0, step - 1))}
          >
            Back
          </button>
          <button
            type="button"
            disabled={current === flow.steps.length - 1}
            onClick={() =>
              setCurrent((step) => Math.min(flow.steps.length - 1, step + 1))
            }
          >
            Next
          </button>
        </div>
      </footer>
    </article>
  );
}

function ProjectStagePreview({ vertical = false }: { vertical?: boolean }) {
  const [stage, setStage] = useState<TlpsProjectStage>("idea");
  const selected = TLPS_PROJECT_STAGES.find((item) => item.id === stage)!;
  return <section className="wf-project-stages" aria-labelledby="project-stage-heading">
    <h2 id="project-stage-heading">Project stage icon bar</h2>
    <p>Idea → Story → Board → Pre → Production → Post → Release → Shree</p>
    <ProjectStageIconBar value={stage} onValueChange={setStage} vertical={vertical} />
    <p className="wf-project-stage-selected" aria-live="polite"><strong>{selected.label}</strong> — {selected.description}</p>
    <p>Stage selection is a local preview. It does not complete work, grant approval, collect payment or release funds.</p>
  </section>;
}

function FocusedProjectStages() {
  const [theme, setTheme] = useState("light");
  const [vertical, setVertical] = useState(false);
  return <main className="maataa-root wf-gallery" data-theme={theme} data-maataa-theme={theme}>
    <header className="wf-header"><div><h1>Project stages</h1><p>Eight stages, one icon bar. Select a stage to preview its purpose.</p></div></header>
    <section className="wf-controls" aria-label="Project stage preview settings">
      <label>Theme<select aria-label="Theme" value={theme} onChange={(event) => setTheme(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option><option value="high-contrast">High contrast</option><option value="oled">OLED</option></select></label>
      <label>Layout<select aria-label="Layout" value={vertical ? "vertical" : "horizontal"} onChange={(event) => setVertical(event.target.value === "vertical")}><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></label>
    </section>
    <ProjectStagePreview vertical={vertical} />
  </main>;
}

function WorkflowStepBarsGallery() {
  const [theme, setTheme] = useState("light");
  const [style, setStyle] = useState<"horizontal" | "vertical">("horizontal");
  const flowCount = groups.reduce(
    (total, group) => total + group.flows.length,
    0,
  );
  return (
    <main
      className="maataa-root wf-gallery"
      data-theme={theme}
      data-maataa-theme={theme}
    >
      <header className="wf-header">
        <div>
          <p className="wf-kicker">MAATAA UI · COMPONENT GALLERY</p>
          <h1>Workflow step bars</h1>
          <p>
            Interactive progress previews from the supplied reference:{" "}
            {flowCount} example flows across {groups.length} groups. Select a
            step or use Back and Next; changes stay in this preview.
          </p>
        </div>
        <span className="wf-brand" aria-hidden="true">
          M
        </span>
      </header>
      <section className="wf-controls" aria-label="Preview settings">
        <label>
          Theme
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="high-contrast">High contrast</option>
            <option value="oled">OLED</option>
          </select>
        </label>
        <label>
          Style
          <select
            value={style}
            onChange={(event) => setStyle(event.target.value as typeof style)}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>
        <p className="wf-disclosure">
          Reference inventory only. Flow names, step labels and source
          references have not been checked against current product owners or
          live workflows.
        </p>
      </section>
      <ProjectStagePreview vertical={style === "vertical"} />
      <nav className="wf-jump" aria-label="Workflow groups">
        {groups.map((group, index) => (
          <a key={group.group} href={`#wf-group-${index}`}>
            {group.group}
          </a>
        ))}
      </nav>
      {groups.map((group, index) => (
        <section
          className="wf-group"
          id={`wf-group-${index}`}
          key={group.group}
          aria-labelledby={`wf-heading-${index}`}
        >
          <h2 id={`wf-heading-${index}`}>
            {group.group}
            <span>
              {group.flows.length} {group.flows.length === 1 ? "flow" : "flows"}
            </span>
          </h2>
          <div className={`wf-grid ${style}`}>
            {group.flows.map((flow) => (
              <FlowBar flow={flow} style={style} key={flow.id} />
            ))}
          </div>
        </section>
      ))}
      <footer className="wf-footer">
        Theme values resolve from MAATAA UI tokens. Preview state is local to
        this story and is not saved or sent.
      </footer>
    </main>
  );
}

const meta = {
  title: "Workflows/Step Bars",
  component: WorkflowStepBarsGallery,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorkflowStepBarsGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ReferenceInventory: Story = {};

export const ProjectStages: Story = { render: () => <FocusedProjectStages /> };
