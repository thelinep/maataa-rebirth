"use client";

import { mobileQuickActions } from "./runtime.ts";
import { mobileHaptic } from "./gestures.ts";
import { trackRuntimeEvent } from "../runtime/telemetry.ts";

export function MobileQuickActions() {
  return (
    <div className="mobile-quick-actions" aria-label="Mobile quick actions">
      {mobileQuickActions.map((action) => (
        <a
          href={action.href}
          key={action.id}
          onClick={() => {
            mobileHaptic();
            void trackRuntimeEvent("mobile_quick_action", { action: action.id });
          }}
        >
          <span>{action.title.slice(0, 1)}</span>
          <strong>{action.title}</strong>
          <small>{action.status}</small>
        </a>
      ))}
    </div>
  );
}
