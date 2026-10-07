"use client";

import { Activity, Bell, Clock3, Command, Network, Search } from "lucide-react";
import type { RuntimeHUDPanelId, RuntimeHUDRailItem, RuntimeHUDRoleMode } from "./types.ts";

export type RuntimeHUDRailProps = {
  readonly items?: readonly RuntimeHUDRailItem[];
  readonly activeItem?: RuntimeHUDPanelId | null;
  readonly roleMode?: RuntimeHUDRoleMode;
  readonly onSelect?: (item: RuntimeHUDRailItem) => void;
  readonly mobileCollapsed?: boolean;
  readonly className?: string;
};

export const defaultRuntimeHUDRailItems: readonly RuntimeHUDRailItem[] = [
  { id: "notifications", label: "Notifications" },
  { id: "timeline", label: "Timeline" },
  { id: "telemetry", label: "Telemetry" },
  { id: "topology", label: "Topology" },
  { id: "command", label: "Command" }
] as const;

const ICONS = {
  notifications: Bell,
  timeline: Clock3,
  telemetry: Activity,
  topology: Network,
  observatory: Network,
  command: Command,
  search: Search,
  domains: Network,
  tasks: Clock3,
  approvals: Bell
} satisfies Record<RuntimeHUDPanelId, typeof Bell>;

export function RuntimeHUDRail({
  items = defaultRuntimeHUDRailItems,
  activeItem,
  roleMode = "viewer",
  onSelect,
  mobileCollapsed = true,
  className
}: RuntimeHUDRailProps) {
  const filtered = items.filter((item) => !item.roleModes || item.roleModes.includes(roleMode));

  return (
    <nav
      className={["runtime-hud-rail", mobileCollapsed ? "runtime-hud-rail-mobile-collapsed" : "", className ?? ""].join(
        " "
      )}
      aria-label="Runtime HUD rail"
    >
      {filtered.length === 0 ? (
        <span className="runtime-hud-empty">No HUD rail items for this role.</span>
      ) : (
        filtered.map((item) => {
          const Icon = ICONS[item.id];
          const active = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-pressed={active}
              data-mode={item.mode ?? "healthy"}
              onClick={() => onSelect?.(item)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
              {item.count ? <em>{item.count}</em> : null}
            </button>
          );
        })
      )}
    </nav>
  );
}
