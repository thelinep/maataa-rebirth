"use client";

import { type CSSProperties, type ReactNode } from "react";
import { sovereignThemeToCSSVariables } from "@maataa/theme";
import { useSovereignRuntime } from "./SovereignRuntimeProvider.tsx";

/**
 * ThemeRuntimeProvider projects the active SovereignTheme into `--sv-*` CSS
 * custom properties on a wrapper element, and exposes the theme id + truth-mode
 * as data-attributes so CSS and components can react. It is additive: it never
 * overrides the legacy `--brand-*` / `--accent` variables, so it can be mounted
 * alongside the existing client ThemeProvider without conflict.
 */
export function ThemeRuntimeProvider({ children, className }: { children: ReactNode; className?: string }) {
  const { theme, truthMode } = useSovereignRuntime();
  const style = sovereignThemeToCSSVariables(theme) as CSSProperties;

  return (
    <div
      className={className ? `sovereign-runtime-root ${className}` : "sovereign-runtime-root"}
      data-sovereign-theme={theme.id}
      data-sovereignty={theme.sovereigntyLevel}
      data-cinematic={theme.cinematicMode ? "true" : "false"}
      data-truth-mode={truthMode ? "true" : "false"}
      style={style}
    >
      {children}
    </div>
  );
}
