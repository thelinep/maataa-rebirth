"use client";

import type { ReactNode } from "react";

export type RuntimeTelemetryHUDProps = {
  readonly timeline?: ReactNode;
  readonly telemetryExplorer?: ReactNode;
  readonly streamLabel?: string;
  readonly eventCount?: number;
  readonly evidenceRef?: string;
};

export function RuntimeTelemetryHUD({
  timeline,
  telemetryExplorer,
  streamLabel,
  eventCount,
  evidenceRef
}: RuntimeTelemetryHUDProps) {
  return (
    <section className="runtime-hud-telemetry" aria-label="Runtime telemetry HUD">
      <header>
        <div>
          <p>Telemetry HUD</p>
          <h3>{streamLabel ?? "No runtime stream supplied"}</h3>
        </div>
        <span>{eventCount ?? 0} events</span>
      </header>
      {evidenceRef ? <code className="runtime-hud-evidence-ref">{evidenceRef}</code> : null}
      <div className="runtime-hud-telemetry-grid">
        <div>{timeline ?? <p className="runtime-hud-empty">No timeline supplied.</p>}</div>
        <div>{telemetryExplorer ?? <p className="runtime-hud-empty">No telemetry explorer supplied.</p>}</div>
      </div>
    </section>
  );
}
