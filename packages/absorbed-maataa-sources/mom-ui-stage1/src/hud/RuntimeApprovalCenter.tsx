"use client";

import type { RuntimeApprovalState } from "./types.ts";

export type RuntimeApprovalAction = "review" | "inspect-evidence" | "request-validation" | "defer";

export type RuntimeApprovalItem = {
  readonly id: string;
  readonly label: string;
  readonly state: RuntimeApprovalState;
  readonly summary?: string;
  readonly blockers?: readonly string[];
  readonly conditions?: readonly string[];
  readonly evidenceRefs?: readonly string[];
};

export type RuntimeApprovalCenterProps = {
  readonly items?: readonly RuntimeApprovalItem[];
  readonly onAction?: (action: RuntimeApprovalAction, item: RuntimeApprovalItem) => void;
  readonly emptyLabel?: string;
};

const STATE_LABEL: Record<RuntimeApprovalState, string> = {
  READY_FOR_REVIEW: "Ready for review",
  WAITING_FOR_EVIDENCE: "Waiting for evidence",
  BLOCKED: "Blocked",
  DEFERRED: "Deferred"
};

function modeForApprovalState(state: RuntimeApprovalState) {
  if (state === "READY_FOR_REVIEW") return "healthy";
  if (state === "BLOCKED") return "blocked";
  return "warning";
}

export function RuntimeApprovalCenter({
  items = [],
  onAction,
  emptyLabel = "No approval evidence supplied."
}: RuntimeApprovalCenterProps) {
  return (
    <section className="runtime-operational-center runtime-approval-center" aria-label="Runtime approval center">
      <header>
        <div>
          <p>Approval Center</p>
          <h3>Release Review Readiness</h3>
        </div>
      </header>
      {items.length === 0 ? (
        <p className="runtime-hud-empty">{emptyLabel}</p>
      ) : (
        <div className="runtime-operational-list">
          {items.map((item) => (
            <article key={item.id} data-mode={modeForApprovalState(item.state)}>
              <header>
                <div>
                  <p>{STATE_LABEL[item.state]}</p>
                  <h4>{item.label}</h4>
                </div>
              </header>
              {item.summary ? <p>{item.summary}</p> : null}
              <RuntimeOperationalBullets label="Blockers" items={item.blockers} />
              <RuntimeOperationalBullets label="Conditions" items={item.conditions} />
              <RuntimeEvidenceRefs refs={item.evidenceRefs} />
              <div className="runtime-operational-actions" aria-label={`${item.label} actions`}>
                <button
                  type="button"
                  disabled={!onAction || item.state === "BLOCKED"}
                  onClick={() => onAction?.("review", item)}
                >
                  Review
                </button>
                <button
                  type="button"
                  disabled={!onAction || !item.evidenceRefs?.length}
                  onClick={() => onAction?.("inspect-evidence", item)}
                >
                  Inspect Evidence
                </button>
                <button
                  type="button"
                  disabled={!onAction || item.state === "READY_FOR_REVIEW"}
                  onClick={() => onAction?.("request-validation", item)}
                >
                  Request Validation
                </button>
                <button type="button" disabled={!onAction} onClick={() => onAction?.("defer", item)}>
                  Defer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function RuntimeOperationalBullets({ label, items }: { readonly label: string; readonly items?: readonly string[] }) {
  if (!items?.length) return null;
  return (
    <div className="runtime-operational-bullets">
      <strong>{label}</strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function RuntimeEvidenceRefs({ refs }: { readonly refs?: readonly string[] }) {
  if (!refs?.length) return null;
  return (
    <div className="runtime-operational-evidence">
      {refs.map((ref) => (
        <code key={ref}>{ref}</code>
      ))}
    </div>
  );
}
