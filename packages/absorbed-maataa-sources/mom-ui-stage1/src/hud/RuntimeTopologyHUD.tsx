"use client";

import type { ReactNode } from "react";
import type { RuntimeHUDSignal } from "./types.ts";

export type RuntimeTopologyHUDProps = {
  readonly graph?: ReactNode;
  readonly healthSignals?: readonly RuntimeHUDSignal[];
  readonly telemetrySnapshot?: {
    readonly generatedAt?: string;
    readonly windowLabel?: string;
    readonly evidenceRefs?: readonly string[];
  };
  readonly runtimeMap?: {
    readonly sourceArtifacts?: readonly string[];
    readonly nodes?: readonly unknown[];
    readonly edges?: readonly unknown[];
  };
};

export function RuntimeTopologyHUD({
  graph,
  healthSignals = [],
  telemetrySnapshot,
  runtimeMap
}: RuntimeTopologyHUDProps) {
  const hasRuntimeMap = Boolean(
    runtimeMap?.nodes?.length || runtimeMap?.edges?.length || runtimeMap?.sourceArtifacts?.length
  );

  return (
    <section className="runtime-hud-topology" aria-label="Runtime topology HUD">
      <header>
        <div>
          <p>Topology HUD</p>
          <h3>{hasRuntimeMap ? "Runtime map supplied" : "No runtime map supplied"}</h3>
        </div>
        {telemetrySnapshot?.windowLabel ? <span>{telemetrySnapshot.windowLabel}</span> : null}
      </header>
      <div className="runtime-hud-topology-graph">
        {graph ?? <p className="runtime-hud-empty">No topology graph supplied.</p>}
      </div>
      <div className="runtime-hud-signal-row">
        {healthSignals.length === 0 ? (
          <p className="runtime-hud-empty">No health signals supplied.</p>
        ) : (
          healthSignals.map((signal) => (
            <article key={signal.id} data-mode={signal.mode}>
              <strong>{signal.label}</strong>
              {signal.detail ? <span>{signal.detail}</span> : null}
              {signal.evidenceRef ? <code>{signal.evidenceRef}</code> : null}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
