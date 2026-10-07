"use client";

import { useState, type ReactNode } from "react";
import { RuntimeNotificationCenter } from "./RuntimeNotificationCenter.tsx";
import { RuntimeTelemetryHUD } from "./RuntimeTelemetryHUD.tsx";
import { RuntimeTopologyHUD, type RuntimeTopologyHUDProps } from "./RuntimeTopologyHUD.tsx";
import type { RuntimeHUDMode, RuntimeHUDNotification, RuntimeHUDRoleMode, RuntimeHUDSignal } from "./types.ts";

export type RuntimeObservatoryOverlayItem = {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  readonly mode?: RuntimeHUDMode;
  readonly evidenceRef?: string;
};

export type RuntimeObservatoryOverlaySection = {
  readonly id: "approvals" | "deployments" | "evidence" | "runtime-health";
  readonly title: string;
  readonly mode: RuntimeHUDMode;
  readonly items?: readonly RuntimeObservatoryOverlayItem[];
  readonly emptyLabel?: string;
  readonly roleModes?: readonly RuntimeHUDRoleMode[];
};

export type RuntimeObservatoryHUDProps = {
  readonly roleMode?: RuntimeHUDRoleMode;
  readonly title?: string;
  readonly description?: ReactNode;
  readonly actionBar?: ReactNode;
  readonly topologyGraph?: ReactNode;
  readonly timeline?: ReactNode;
  readonly telemetryExplorer?: ReactNode;
  readonly approvalCenter?: ReactNode;
  readonly deploymentCenter?: ReactNode;
  readonly evidenceCenter?: ReactNode;
  readonly operatorWorkspace?: ReactNode;
  readonly runtimeMap?: RuntimeTopologyHUDProps["runtimeMap"];
  readonly healthSignals?: readonly RuntimeHUDSignal[];
  readonly telemetrySnapshot?: RuntimeTopologyHUDProps["telemetrySnapshot"];
  readonly telemetryStreamLabel?: string;
  readonly telemetryEventCount?: number;
  readonly telemetryEvidenceRef?: string;
  readonly notifications?: readonly RuntimeHUDNotification[];
  readonly overlays?: readonly RuntimeObservatoryOverlaySection[];
  readonly initialTab?: RuntimeObservatoryTabId;
};

export type RuntimeObservatoryTabId =
  "topology" | "telemetry" | "timeline" | "notifications" | "approvals" | "deployments" | "evidence" | "operator";

const OBSERVATORY_TABS: readonly { readonly id: RuntimeObservatoryTabId; readonly label: string }[] = [
  { id: "topology", label: "Topology" },
  { id: "telemetry", label: "Telemetry" },
  { id: "timeline", label: "Timeline" },
  { id: "notifications", label: "Notifications" },
  { id: "approvals", label: "Approvals" },
  { id: "deployments", label: "Deployments" },
  { id: "evidence", label: "Evidence" },
  { id: "operator", label: "Operator" }
];

export function RuntimeObservatoryHUD({
  roleMode = "viewer",
  title = "Runtime Observatory",
  description,
  topologyGraph,
  timeline,
  telemetryExplorer,
  runtimeMap,
  healthSignals = [],
  telemetrySnapshot,
  telemetryStreamLabel,
  telemetryEventCount,
  telemetryEvidenceRef,
  notifications = [],
  overlays = [],
  actionBar,
  approvalCenter,
  deploymentCenter,
  evidenceCenter,
  operatorWorkspace,
  initialTab = "topology"
}: RuntimeObservatoryHUDProps) {
  const [activeTab, setActiveTab] = useState<RuntimeObservatoryTabId>(initialTab);
  const visibleOverlays = overlays.filter((overlay) => !overlay.roleModes || overlay.roleModes.includes(roleMode));
  const telemetryHud = (
    <RuntimeTelemetryHUD
      streamLabel={telemetryStreamLabel}
      eventCount={telemetryEventCount}
      evidenceRef={telemetryEvidenceRef}
      timeline={timeline}
      telemetryExplorer={telemetryExplorer}
    />
  );
  const notificationsCenter = <RuntimeNotificationCenter notifications={notifications} />;
  const topologyHud = (
    <RuntimeTopologyHUD
      healthSignals={healthSignals}
      telemetrySnapshot={telemetrySnapshot}
      runtimeMap={runtimeMap}
      graph={topologyGraph}
    />
  );

  return (
    <section className="runtime-observatory-hud" data-role={roleMode} aria-label={title}>
      <header className="runtime-observatory-hud-header">
        <div>
          <p>Runtime Observatory</p>
          <h2>{title}</h2>
        </div>
        <span>{roleMode}</span>
      </header>
      {description ? <div className="runtime-hud-widget-description">{description}</div> : null}
      {actionBar ? <div className="runtime-observatory-action-slot">{actionBar}</div> : null}
      <div className="runtime-observatory-tabs" role="tablist" aria-label="Runtime observatory tabs">
        {OBSERVATORY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="runtime-observatory-tab-panel">
        {activeTab === "topology" ? (
          <div className="runtime-observatory-hud-grid">
            <div className="runtime-observatory-hud-center">{topologyHud}</div>
            <aside className="runtime-observatory-hud-side" aria-label="Runtime observatory supporting surfaces">
              {telemetryHud}
              {notificationsCenter}
            </aside>
          </div>
        ) : null}
        {activeTab === "telemetry" ? telemetryHud : null}
        {activeTab === "timeline"
          ? (timeline ?? <p className="runtime-hud-empty">No runtime timeline supplied.</p>)
          : null}
        {activeTab === "notifications" ? notificationsCenter : null}
        {activeTab === "approvals"
          ? (approvalCenter ?? <p className="runtime-hud-empty">No approval center supplied.</p>)
          : null}
        {activeTab === "deployments"
          ? (deploymentCenter ?? <p className="runtime-hud-empty">No deployment center supplied.</p>)
          : null}
        {activeTab === "evidence"
          ? (evidenceCenter ?? <p className="runtime-hud-empty">No evidence center supplied.</p>)
          : null}
        {activeTab === "operator"
          ? (operatorWorkspace ?? <p className="runtime-hud-empty">No operator workspace supplied.</p>)
          : null}
      </div>
      <div className="runtime-observatory-floating-overlays" aria-label="Runtime observatory overlays">
        {visibleOverlays.length === 0 ? (
          <p className="runtime-hud-empty">No observatory overlays for this role.</p>
        ) : (
          visibleOverlays.map((overlay) => <RuntimeObservatoryOverlay key={overlay.id} overlay={overlay} />)
        )}
      </div>
    </section>
  );
}

function RuntimeObservatoryOverlay({ overlay }: { readonly overlay: RuntimeObservatoryOverlaySection }) {
  return (
    <article className="runtime-observatory-overlay-card" data-mode={overlay.mode}>
      <header>
        <p>{overlay.id}</p>
        <h3>{overlay.title}</h3>
      </header>
      {!overlay.items?.length ? (
        <p className="runtime-hud-empty">{overlay.emptyLabel ?? "No runtime data supplied for this overlay."}</p>
      ) : (
        <dl>
          {overlay.items.map((item) => (
            <div key={item.id} data-mode={item.mode ?? overlay.mode}>
              <dt>{item.label}</dt>
              {item.detail ? <dd>{item.detail}</dd> : null}
              {item.evidenceRef ? <code>{item.evidenceRef}</code> : null}
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
