"use client";

import type { RuntimeActionGate, RuntimeActionId } from "./types.ts";

const DEFAULT_ACTION_LABELS: Record<RuntimeActionId, string> = {
  PROMOTE_TLP: "Promote TLP",
  PROMOTE_VAIGYAANIQ: "Promote Vaigyaaniq",
  APPROVE: "Approve",
  REJECT: "Reject",
  DEFER: "Defer",
  REQUEST_VALIDATION: "Request Validation",
  REQUEST_ROLLBACK_DRILL: "Request Rollback Drill"
};

export type RuntimeActionBarProps = {
  readonly gates?: readonly RuntimeActionGate[];
  readonly sourceRef?: string;
  readonly onAction?: (gate: RuntimeActionGate) => void;
  readonly emptyLabel?: string;
};

export function RuntimeActionBar({
  gates = [],
  sourceRef = "reports/runtime-action-gates.json",
  onAction,
  emptyLabel = "No runtime action gates supplied."
}: RuntimeActionBarProps) {
  return (
    <section className="runtime-action-bar" aria-label="Runtime action gates">
      <header>
        <div>
          <p>Action Gates</p>
          <h3>Runtime Actions</h3>
        </div>
        <code>{sourceRef}</code>
      </header>
      {gates.length === 0 ? (
        <p className="runtime-hud-empty">{emptyLabel}</p>
      ) : (
        <div className="runtime-action-bar-grid">
          {gates.map((gate) => {
            const disabled = !gate.allowed || !onAction;
            const label = gate.label ?? DEFAULT_ACTION_LABELS[gate.action];
            return (
              <article key={gate.action} data-mode={gate.allowed ? "healthy" : "blocked"}>
                <button type="button" disabled={disabled} onClick={() => gate.allowed && onAction?.(gate)}>
                  {label}
                </button>
                <p>
                  {gate.allowed
                    ? "Evidence gate passed. No production mutation is performed by this component."
                    : (gate.reason ?? "Blocked by missing evidence.")}
                </p>
                {gate.allowed && !onAction ? <small>No execution handler supplied.</small> : null}
                {gate.missing?.length ? (
                  <ul aria-label={`${label} missing evidence`}>
                    {gate.missing.map((missing) => (
                      <li key={missing}>{missing}</li>
                    ))}
                  </ul>
                ) : null}
                {gate.evidenceRefs?.length ? (
                  <div className="runtime-action-bar-evidence">
                    {gate.evidenceRefs.map((ref) => (
                      <code key={ref}>{ref}</code>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
