"use client";

import { RuntimePulse } from "../runtime/RuntimePulse.tsx";

export function FooterStatus() {
  return (
    <div className="footer-status">
      <RuntimePulse />
      <span>Live systems monitored</span>
      <span>Single VPS deployment</span>
    </div>
  );
}
