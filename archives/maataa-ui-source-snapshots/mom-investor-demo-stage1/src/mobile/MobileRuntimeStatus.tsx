"use client";

import { useEffect, useState } from "react";
import { trackRuntimeEvent } from "../runtime/telemetry.ts";

type ProbeState = "checking" | "online" | "issue";

type MobileRuntimeStatusProps = {
  apiBaseUrl: string;
  open: boolean;
  onClose: () => void;
  sync?: {
    queuedActions: number;
    replayState: "pass" | "warning" | "unknown";
    pendingSync: number;
    retryState: string;
    checkpointStatus: string;
    offlinePersistence: string;
    attachmentBacklog: number;
    remoteState: "disabled" | "remote_not_configured" | "remote_enabled";
  };
};

export function MobileRuntimeStatus({ apiBaseUrl, open, onClose, sync }: MobileRuntimeStatusProps) {
  const [state, setState] = useState<ProbeState>("checking");
  const syncState = sync ?? {
    queuedActions: 0,
    replayState: "unknown" as const,
    pendingSync: 0,
    retryState: "local only",
    checkpointStatus: "not loaded",
    offlinePersistence: "available",
    attachmentBacklog: 0,
    remoteState: "remote_not_configured" as const
  };

  useEffect(() => {
    if (!open) return;
    void trackRuntimeEvent("mobile_status_open", {});
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);
    fetch(`${apiBaseUrl.replace(/\/$/, "")}/health`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setState("issue");
          return;
        }
        const data = (await response.json()) as { ok?: boolean };
        setState(data.ok ? "online" : "issue");
      })
      .catch(() => setState("issue"))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [apiBaseUrl, open]);

  if (!open) return null;

  return (
    <div className="mobile-runtime-status-sheet" role="dialog" aria-modal="true" aria-label="Mobile live status">
      <button className="mobile-sheet-backdrop" type="button" aria-label="Close live status" onClick={onClose} />
      <section className="mobile-status-panel">
        <header>
          <div>
            <p>Live status</p>
            <h2>{state === "online" ? "Online" : state === "checking" ? "Checking" : "Needs attention"}</h2>
          </div>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="mobile-status-strip">
          <StatusCard label="API" value={state === "checking" ? "Checking" : state === "online" ? "Online" : "Issue"} tone={state === "online" ? "good" : state === "issue" ? "risk" : "watch"} />
          <StatusCard label="Deploy" value="Live" tone="good" />
          <StatusCard label="Domains" value="Public" tone="good" />
          <StatusCard label="Access" value="Alpha live" tone="watch" />
        </div>
        <div className="mobile-status-strip" aria-label="Field sync state">
          <StatusCard label="Queue" value={`${syncState.queuedActions} action(s)`} tone={syncState.queuedActions ? "watch" : "good"} />
          <StatusCard label="Replay" value={syncState.replayState} tone={syncState.replayState === "pass" ? "good" : "watch"} />
          <StatusCard label="Checkpoint" value={syncState.checkpointStatus} tone={syncState.checkpointStatus === "not loaded" ? "watch" : "good"} />
          <StatusCard label="Remote" value={syncState.remoteState === "remote_enabled" ? "Enabled" : "Off"} tone={syncState.remoteState === "remote_enabled" ? "good" : "watch"} />
          <StatusCard label="Retry" value={syncState.retryState} tone={syncState.pendingSync ? "watch" : "good"} />
          <StatusCard label="Attachments" value={`${syncState.attachmentBacklog} waiting`} tone={syncState.attachmentBacklog ? "watch" : "good"} />
        </div>
        <p className="mobile-status-note">
          Mobile field sync is local-first. Remote sync is shown only when a real adapter is configured; this alpha does not hide queued actions or checkpoint state.
        </p>
      </section>
    </div>
  );
}

function StatusCard({ label, value, tone }: { label: string; value: string; tone: "good" | "watch" | "risk" }) {
  return (
    <div className={`mobile-status-card mobile-status-card-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
