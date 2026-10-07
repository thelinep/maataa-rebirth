"use client";

import type { ReactNode } from "react";
import { UiProvider } from "@maataa/ui/foundation";
import { ThemeToggle } from "@maataa/ui/themes";

export function Providers({ children }: { children: ReactNode }) {
  return <UiProvider theme="light"><div className="consumer-shell">
    <header className="consumer-header">
      <a className="brand" href="/" aria-label="MAATAA UI home"><span className="brand-mark">M</span><span>MAATAA <small>UI SYSTEM</small></span></a>
      <nav aria-label="Main navigation"><a href="/">Overview</a><a href="/workflow">Guided workflow</a></nav>
      <ThemeToggle label="Toggle MAATAA theme" />
    </header>
    {children}
  </div></UiProvider>;
}
