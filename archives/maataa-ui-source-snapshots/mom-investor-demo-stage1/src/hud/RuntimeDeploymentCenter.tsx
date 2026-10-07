"use client";

import type { RuntimeDeploymentState } from "./types.ts";

export type RuntimeDeploymentAction = "view-deployment-plan" | "view-rollback-plan" | "request-drill";

export type RuntimeDeploymentItem = {
  readonly id: string;
  readonly label: string;
  readonly state: RuntimeDeploymentState;
  readonly summary?: string;
  readonly missing?: readonly string[];
  readonly evidenceRefs?: readonly string[];
};

export type RuntimeDeploymentCenterProps = {
  readonly items?: readonly RuntimeDeploymentItem[];
  readonly onAction?: (action: RuntimeDeploymentAction, item: RuntimeDeploymentItem) => void;
  readonly emptyLabel?: string;
};

const STATE_LABEL: Record<RuntimeDeploymentState, string> = {
  NOT_TESTED: "Not tested",
  DRILL_REQUIRED: "Drill required",
  READY_FOR_DRILL: "Ready for drill",
  DRILL_PASSED: "Drill passed"
};

function modeForDeploymentState(state: RuntimeDeploymentState) {
  if (state === "DRILL_PASSED") return "healthy";
  if (state === "NOT_TESTED" || state === "DRILL_REQUIRED") return "blocked";
  return "warning";
}

export function RuntimeDeploymentCenter({ items = [], onAction, emptyLabel = "No deployment readiness evidence supplied." }: RuntimeDeploymentCenterProps) {
  return (
    <section className="runtime-operational-center runtime-deployment-center" aria-label="Runtime deployment center">
      <header>
        <div>
          <p>Deployment Center</p>
          <h3>Deploy, Rollback, Restore Readiness</h3>
        </div>
      </header>
      {items.length === 0 ? (
        <p className="runtime-hud-empty">{emptyLabel}</p>
      ) : (
        <div className="runtime-operational-list">
          {items.map((item) => (
            <article key={item.id} data-mode={modeForDeploymentState(item.state)}>
              <header>
                <div>
                  <p>{STATE_LABEL[item.state]}</p>
                  <h4>{item.label}</h4>
                </div>
              </header>
              {item.summary ? <p>{item.summary}</p> : null}
              {item.missing?.length ? (
                <div className="runtime-operational-bullets">
                  <strong>Missing</strong>
                  <ul>
                    {item.missing.map((missing) => (
                      <li key={missing}>{missing}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.evidenceRefs?.length ? (
                <div className="runtime-operational-evidence">
                  {item.evidenceRefs.map((ref) => (
                    <code key={ref}>{ref}</code>
                  ))}
                </div>
              ) : null}
              <div className="runtime-operational-actions" aria-label={`${item.label} actions`}>
                <button type="button" disabled={!onAction} onClick={() => onAction?.("view-deployment-plan", item)}>
                  View Deployment Plan
                </button>
                <button type="button" disabled={!onAction} onClick={() => onAction?.("view-rollback-plan", item)}>
                  View Rollback Plan
                </button>
                <button type="button" disabled={!onAction || item.state === "DRILL_PASSED"} onClick={() => onAction?.("request-drill", item)}>
                  Request Drill
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
