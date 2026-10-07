"use client";

import type { RuntimeHUDMode, RuntimeHUDStatus } from "./types.ts";

export type RuntimeHUDStatusBarProps = {
  readonly status?: RuntimeHUDStatus;
  readonly mode?: RuntimeHUDMode;
  readonly className?: string;
};

const MODE_LABEL: Record<RuntimeHUDMode, string> = {
  healthy: "Healthy",
  warning: "Warning",
  blocked: "Blocked"
};

function toneClass(mode: RuntimeHUDMode) {
  if (mode === "healthy") return "runtime-hud-tone-healthy";
  if (mode === "blocked") return "runtime-hud-tone-blocked";
  return "runtime-hud-tone-warning";
}

function deriveMode(status?: RuntimeHUDStatus, override?: RuntimeHUDMode): RuntimeHUDMode {
  if (override) return override;
  const modes = [status?.runtime?.mode, status?.telemetry?.mode, status?.topology?.mode].filter(Boolean);
  if (modes.includes("blocked")) return "blocked";
  if (modes.includes("warning") || (status?.notificationsCount ?? 0) > 0) return "warning";
  return "healthy";
}

/**
 * RuntimeHUDStatusBar
 *
 * PHKD: no data means explicit empty labels, not invented state.
 */
export function RuntimeHUDStatusBar({ status, mode, className }: RuntimeHUDStatusBarProps) {
  const overall = deriveMode(status, mode);
  const runtime = status?.runtime;
  const telemetry = status?.telemetry;
  const topology = status?.topology;

  return (
    <header
      className={["runtime-hud-status-bar", toneClass(overall), className ?? ""].join(" ")}
      aria-label="Runtime HUD status bar"
    >
      <div className="runtime-hud-status-primary">
        <span className="runtime-hud-status-dot" aria-hidden="true" />
        <strong>{MODE_LABEL[overall]}</strong>
      </div>
      <dl>
        <div>
          <dt>Theme</dt>
          <dd>{status?.activeTheme ?? "No active theme reported"}</dd>
        </div>
        <div>
          <dt>Domain</dt>
          <dd>{status?.activeDomain ?? "No active domain reported"}</dd>
        </div>
        <RuntimeHUDStatusMetric label="Runtime" value={runtime?.label} mode={runtime?.mode} />
        <RuntimeHUDStatusMetric label="Telemetry" value={telemetry?.label} mode={telemetry?.mode} />
        <RuntimeHUDStatusMetric label="Topology" value={topology?.label} mode={topology?.mode} />
        <div>
          <dt>Alerts</dt>
          <dd>{status?.notificationsCount ?? 0}</dd>
        </div>
      </dl>
    </header>
  );
}

function RuntimeHUDStatusMetric({
  label,
  value,
  mode
}: {
  readonly label: string;
  readonly value?: string;
  readonly mode?: RuntimeHUDMode;
}) {
  return (
    <div className={mode ? toneClass(mode) : undefined}>
      <dt>{label}</dt>
      <dd>{value ?? "No state reported"}</dd>
    </div>
  );
}
