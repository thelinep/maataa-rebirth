"use client";

import { useEffect, useState } from "react";
import type { MobileDockTab } from "./runtime.ts";
import { mobileDockTabs } from "./runtime.ts";
import { trackRuntimeEvent } from "../runtime/telemetry.ts";
import { mobileHaptic } from "./gestures.ts";

type MobileBottomDockProps = {
  onOpenCommand: () => void;
  onOpenStatus: () => void;
};

export function MobileBottomDock({ onOpenCommand, onOpenStatus }: MobileBottomDockProps) {
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <nav className="mobile-bottom-dock" aria-label="Mobile navigation dock">
      <div className="mobile-bottom-dock-inner">
        {mobileDockTabs.map((tab) => {
          const active = tab.href ? pathname === tab.href : false;
          if (tab.href) {
            return (
              <a key={tab.id} className={active ? "is-active" : ""} href={tab.href} onClick={() => recordDockClick(tab)}>
                <DockIcon id={tab.id} />
                <span>{tab.label}</span>
              </a>
            );
          }

          return (
            <button
              key={tab.id}
              className={tab.id === "runtime" ? "has-pulse" : ""}
              type="button"
              onClick={() => {
                recordDockClick(tab);
                if (tab.mode === "status") onOpenStatus();
                else onOpenCommand();
              }}
            >
              <DockIcon id={tab.id} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function recordDockClick(tab: MobileDockTab) {
  mobileHaptic();
  void trackRuntimeEvent("mobile_dock_click", { tab: tab.id });
}

function DockIcon({ id }: { id: MobileDockTab["id"] }) {
  return (
    <span className={`mobile-dock-icon mobile-dock-icon-${id}`} aria-hidden="true">
      <span />
    </span>
  );
}
