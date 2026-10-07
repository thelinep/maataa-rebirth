"use client";

import { navigationTabs } from "@maataa/navigation";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu.tsx";
import { RuntimePulse } from "../runtime/RuntimePulse.tsx";

export function MobileNavigator() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof navigationTabs)[number]["id"]>("ecosystem");

  return (
    <div className="mobile-nav-system">
      <button className="mobile-runtime-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-runtime-shell">
        <span />
        Navigate
      </button>
      {open ? (
        <div className="mobile-runtime-shell" id="mobile-runtime-shell" role="dialog" aria-modal="true" aria-label="Vaigyaaniq mobile navigation">
          <div className="mobile-runtime-map" aria-hidden="true" />
          <header>
            <div>
              <strong>Vaigyaaniq</strong>
              <small>One Earth. Infinite Knowledge.</small>
            </div>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>
          <RuntimePulse compact />
          <div className="mobile-tree-tabs">
            {navigationTabs.map((tab) => (
              <button className={active === tab.id ? "is-active" : ""} key={tab.id} type="button" onClick={() => setActive(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <MegaMenu active={active} onClose={() => undefined} />
        </div>
      ) : null}
    </div>
  );
}
