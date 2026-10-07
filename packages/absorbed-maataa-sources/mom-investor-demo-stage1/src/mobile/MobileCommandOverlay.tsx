"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { statusLabel } from "@maataa/navigation";
import { mobileEcosystemClusters, mobileSearch } from "./runtime.ts";
import { mobileHaptic } from "./gestures.ts";
import { trackRuntimeEvent } from "../runtime/telemetry.ts";
import { MobileQuickActions } from "./MobileQuickActions.tsx";

type MobileCommandOverlayProps = {
  open: boolean;
  mode: "ecosystem" | "search";
  onClose: () => void;
};

export function MobileCommandOverlay({ open, mode, onClose }: MobileCommandOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => mobileSearch(query), [query]);

  useEffect(() => {
    if (!open) return;
    void trackRuntimeEvent("mobile_command_open", { mode });
    if (mode === "search") {
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [mode, open]);

  useEffect(() => {
    if (!open) return;
    if (query.trim()) {
      void trackRuntimeEvent("mobile_command_search", { length: query.length });
    }
  }, [open, query]);

  if (!open) return null;

  return (
    <div className="mobile-command-overlay" role="dialog" aria-modal="true" aria-label="Mobile ecosystem navigator">
      <div className="mobile-command-orbit" aria-hidden="true" />
      <header className="mobile-command-header">
        <div>
          <p>Vaigyaaniq</p>
          <h2>{mode === "search" ? "Find a place or action" : "Where do you want to go?"}</h2>
        </div>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </header>

      <label className="mobile-command-search">
        <span>Search systems, domains, scripts, and pages</span>
        <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Vaigyaaniq" />
      </label>

      <MobileQuickActions />

      {query.trim() ? (
        <section className="mobile-command-section">
          <h3>Results</h3>
          <div className="mobile-command-list">
            {results.length ? results.map((item) => <MobileCommandLink key={item.id} item={item} />) : <p className="mobile-empty-state">No matching route yet.</p>}
          </div>
        </section>
      ) : (
        mobileEcosystemClusters.map((cluster) => (
          <section className="mobile-command-section" key={cluster.id}>
            <h3>{cluster.title}</h3>
            <div className="mobile-command-list">
              {cluster.nodes.map((item) => (
                <MobileCommandLink key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

function MobileCommandLink({ item }: { item: ReturnType<typeof mobileSearch>[number] }) {
  return (
    <a
      className="mobile-command-link"
      href={item.href}
      onClick={() => {
        mobileHaptic("medium");
        void trackRuntimeEvent("mobile_quick_action", { action: item.id });
      }}
    >
      <span className="mobile-command-mark">{item.title.slice(0, 1)}</span>
      <span>
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>
      <em>{statusLabel(item.status)}</em>
    </a>
  );
}
