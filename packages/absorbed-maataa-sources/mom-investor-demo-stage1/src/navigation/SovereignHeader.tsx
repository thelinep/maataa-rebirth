"use client";

import { primaryNav } from "@maataa/navigation";
import { useEffect, useRef, useState } from "react";
import { MegaMenu } from "./MegaMenu.tsx";
import { MobileNavigator } from "./MobileNavigator.tsx";
import { RuntimePulse } from "../runtime/RuntimePulse.tsx";
import { RuntimeSearch } from "./RuntimeSearch.tsx";

export function SovereignHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [compressed, setCompressed] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        setCompressed(window.scrollY > 24);
        frame.current = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`sovereign-header${compressed ? " is-compressed" : ""}`} onMouseLeave={() => setActive(null)}>
      <div className="sovereign-header-edge" aria-hidden="true" />
      <div className="sovereign-header-inner">
        <a className="sovereign-brand" href="/" aria-label="Vaigyaaniq home">
          <img src="/brand/vaigyaaniq-2026/logos/vaigyaaniq-mark.svg" alt="" />
          <span>
            <strong>VAIGYAANIQ</strong>
            <small>One Vision. One Ecosystem. Infinite Possibilities.</small>
          </span>
        </a>
        <div className="sovereign-header-trust" aria-label="Preview governance signals">
          <RuntimePulse compact />
          <span>PHKD</span>
          <span>Preview-safe</span>
        </div>
        <nav className="sovereign-nav" aria-label="Primary navigation">
          {primaryNav.map((item) =>
            item.menuId ? (
              <button
                key={item.label}
                aria-controls="sovereign-mega-menu"
                aria-expanded={active === item.menuId}
                aria-haspopup="true"
                className={active === item.menuId ? "is-active sovereign-nav-trigger" : "sovereign-nav-trigger"}
                type="button"
                onFocus={() => setActive(item.menuId ?? null)}
                onMouseEnter={() => setActive(item.menuId ?? null)}
                onClick={() => setActive(active === item.menuId ? null : item.menuId ?? null)}
              >
                {item.label}
                <span className="sovereign-nav-caret" aria-hidden="true">▾</span>
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="sovereign-nav-link"
                onMouseEnter={() => setActive(null)}
                {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <div className="sovereign-header-actions">
          <RuntimeSearch />
          <a className="runtime-status-link" href="/status" aria-label="Runtime status">
            Status
          </a>
          <a className="runtime-status-link" href="/auth" data-onboarding-signal="signin_intent">
            Sign In
          </a>
          <a className="launch-button" href="/maataa" data-onboarding-signal="runtime_intent">
            Enter Runtime
          </a>
        </div>
        <MobileNavigator />
      </div>
      <MegaMenu active={active} onClose={() => setActive(null)} />
    </header>
  );
}
