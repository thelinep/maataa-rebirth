"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { RuntimeHUDOverlayTab, RuntimeHUDPanelId, RuntimeHUDRoleMode } from "./types.ts";

export type RuntimeHUDOverlayProps = {
  readonly open: boolean;
  readonly tabs: readonly RuntimeHUDOverlayTab[];
  readonly activeTab?: RuntimeHUDPanelId;
  readonly roleMode?: RuntimeHUDRoleMode;
  readonly onActiveTabChange?: (tab: RuntimeHUDPanelId) => void;
  readonly onClose: () => void;
  readonly title?: string;
};

export function RuntimeHUDOverlay({
  open,
  tabs,
  activeTab,
  roleMode = "viewer",
  onActiveTabChange,
  onClose,
  title = "Runtime HUD"
}: RuntimeHUDOverlayProps) {
  const visibleTabs = useMemo(
    () => tabs.filter((tab) => !tab.roleModes || tab.roleModes.includes(roleMode)),
    [roleMode, tabs]
  );
  const [internalTab, setInternalTab] = useState<RuntimeHUDPanelId>(visibleTabs[0]?.id ?? "search");
  const selectedTab = activeTab ?? internalTab;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const selected = visibleTabs.find((tab) => tab.id === selectedTab) ?? visibleTabs[0];

  const updateTab = (tab: RuntimeHUDPanelId) => {
    setInternalTab(tab);
    onActiveTabChange?.(tab);
  };

  return (
    <div className="runtime-hud-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <section>
        <header>
          <div>
            <p>HUD</p>
            <h2>{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close HUD">
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="runtime-hud-overlay-tabs" role="tablist" aria-label="Runtime HUD tabs">
          {visibleTabs.length === 0 ? (
            <span className="runtime-hud-empty">No HUD tabs for this role.</span>
          ) : (
            visibleTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected?.id === tab.id}
                data-mode={tab.mode ?? "healthy"}
                onClick={() => updateTab(tab.id)}
              >
                {tab.label}
              </button>
            ))
          )}
        </div>
        <div className="runtime-hud-overlay-body">
          {selected?.content ?? (
            <p className="runtime-hud-empty">{selected?.emptyLabel ?? "No runtime data supplied for this HUD tab."}</p>
          )}
        </div>
      </section>
    </div>
  );
}
