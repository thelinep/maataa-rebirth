"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { RuntimeOperationalMode } from "./types.ts";

export type RuntimeOperatorWorkspacePanel = {
  readonly id: string;
  readonly title: string;
  readonly summary?: string;
  readonly roleModes?: readonly RuntimeOperationalMode[];
  readonly content?: ReactNode;
};

export type RuntimeOperatorWorkspaceWidget = {
  readonly id: string;
  readonly label: string;
  readonly value: ReactNode;
  readonly detail?: string;
  readonly roleModes?: readonly RuntimeOperationalMode[];
};

export type RuntimeOperatorWorkspaceProps = {
  readonly activeMode?: RuntimeOperationalMode;
  readonly defaultMode?: RuntimeOperationalMode;
  readonly onModeChange?: (mode: RuntimeOperationalMode) => void;
  readonly widgets?: readonly RuntimeOperatorWorkspaceWidget[];
  readonly panels?: readonly RuntimeOperatorWorkspacePanel[];
  readonly actions?: ReactNode;
  readonly emptyLabel?: string;
};

const MODES: readonly RuntimeOperationalMode[] = ["viewer", "operator", "producer", "investor", "developer"] as const;

const MODE_LABEL: Record<RuntimeOperationalMode, string> = {
  viewer: "Viewer",
  operator: "Operator",
  producer: "Producer",
  investor: "Investor",
  developer: "Developer"
};

export function RuntimeOperatorWorkspace({
  activeMode,
  defaultMode = "operator",
  onModeChange,
  widgets = [],
  panels = [],
  actions,
  emptyLabel = "No operator workspace panels for this mode."
}: RuntimeOperatorWorkspaceProps) {
  const [internalMode, setInternalMode] = useState<RuntimeOperationalMode>(defaultMode);
  const mode = activeMode ?? internalMode;

  const visibleWidgets = useMemo(() => widgets.filter((widget) => !widget.roleModes || widget.roleModes.includes(mode)), [mode, widgets]);
  const visiblePanels = useMemo(() => panels.filter((panel) => !panel.roleModes || panel.roleModes.includes(mode)), [mode, panels]);

  const updateMode = (nextMode: RuntimeOperationalMode) => {
    setInternalMode(nextMode);
    onModeChange?.(nextMode);
  };

  return (
    <section className="runtime-operational-center runtime-operator-workspace" data-role={mode} aria-label="Runtime operator workspace">
      <header>
        <div>
          <p>Operator Workspace</p>
          <h3>{MODE_LABEL[mode]} Mode</h3>
        </div>
      </header>
      <div className="runtime-operator-mode-switcher" role="tablist" aria-label="Operator modes">
        {MODES.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => updateMode(item)}>
            {MODE_LABEL[item]}
          </button>
        ))}
      </div>
      {visibleWidgets.length ? (
        <dl className="runtime-operator-widgets">
          {visibleWidgets.map((widget) => (
            <div key={widget.id}>
              <dt>{widget.label}</dt>
              <dd>{widget.value}</dd>
              {widget.detail ? <small>{widget.detail}</small> : null}
            </div>
          ))}
        </dl>
      ) : null}
      {actions ? <div className="runtime-operator-actions">{actions}</div> : null}
      {visiblePanels.length === 0 ? (
        <p className="runtime-hud-empty">{emptyLabel}</p>
      ) : (
        <div className="runtime-operational-list">
          {visiblePanels.map((panel) => (
            <article key={panel.id}>
              <h4>{panel.title}</h4>
              {panel.summary ? <p>{panel.summary}</p> : null}
              {panel.content}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
