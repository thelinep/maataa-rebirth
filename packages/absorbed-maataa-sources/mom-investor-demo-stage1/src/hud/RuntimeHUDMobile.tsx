"use client";

import { ArrowDown, Activity, Home, Search, User, Globe2 } from "lucide-react";
import type { RefObject } from "react";
import { BackToLatestFab, BackToTopFab, RuntimeStatusFab, type RuntimeStatusItem } from "../app-shell/floating-actions.tsx";
import type { RuntimeHUDMobileItem, RuntimeHUDPanelId, RuntimeHUDRoleMode } from "./types.ts";

export type RuntimeHUDMobileProps = {
  readonly items?: readonly RuntimeHUDMobileItem[];
  readonly roleMode?: RuntimeHUDRoleMode;
  readonly activePanel?: RuntimeHUDPanelId | null;
  readonly latestRef?: RefObject<HTMLElement | null>;
  readonly statusItems?: readonly RuntimeStatusItem[];
  readonly onOpenPanel?: (panel: RuntimeHUDPanelId) => void;
};

const DEFAULT_ITEMS: readonly RuntimeHUDMobileItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "domains", label: "Domains", href: "/domains" },
  { id: "runtime", label: "Runtime", panel: "telemetry" },
  { id: "search", label: "Search", panel: "search" },
  { id: "profile", label: "Profile", href: "/auth" }
] as const;

const MOBILE_ICONS = {
  home: Home,
  domains: Globe2,
  runtime: Activity,
  search: Search,
  profile: User,
  notifications: Activity,
  timeline: ArrowDown,
  telemetry: Activity,
  topology: Globe2,
  observatory: Globe2,
  command: Search,
  tasks: ArrowDown,
  approvals: User
};

export function RuntimeHUDMobile({
  items = DEFAULT_ITEMS,
  roleMode = "viewer",
  activePanel,
  latestRef,
  statusItems = [],
  onOpenPanel
}: RuntimeHUDMobileProps) {
  const visible = items.filter((item) => !item.roleModes || item.roleModes.includes(roleMode));

  return (
    <div className="runtime-hud-mobile" aria-label="Runtime HUD mobile">
      <nav aria-label="Runtime HUD mobile dock">
        {visible.length === 0 ? (
          <span className="runtime-hud-empty">No mobile HUD items for this role.</span>
        ) : (
          visible.map((item) => {
            const Icon = MOBILE_ICONS[item.id] ?? Activity;
            const active = item.panel && activePanel === item.panel;
            const content = (
              <>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </>
            );
            if (item.href) {
              return (
                <a key={item.id} href={item.href} aria-current={active ? "page" : undefined}>
                  {content}
                </a>
              );
            }
            return (
              <button key={item.id} type="button" aria-pressed={active} onClick={() => item.panel && onOpenPanel?.(item.panel)}>
                {content}
              </button>
            );
          })
        )}
      </nav>
      <div className="runtime-hud-mobile-fabs" aria-label="Runtime HUD mobile actions">
        <BackToTopFab label="Top" />
        {latestRef ? <BackToLatestFab latestRef={latestRef} label="Latest" /> : null}
        <RuntimeStatusFab items={statusItems} label="Runtime" />
      </div>
    </div>
  );
}
