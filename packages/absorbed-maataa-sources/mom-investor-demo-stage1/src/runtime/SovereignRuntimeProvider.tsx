"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  resolveSovereignTheme,
  sovereignThemes,
  type SovereignTheme
} from "@maataa/theme";

/**
 * SovereignRuntimeProvider supplies the active domain-runtime identity (theme)
 * and the PHKD truth-mode flag to the whole tree. It is host-driven: pass the
 * request hostname and the correct SovereignTheme is resolved, or pass a theme
 * explicitly. Truth mode defaults ON (honest by default).
 */

export type SovereignRuntimeValue = {
  theme: SovereignTheme;
  host: string;
  truthMode: boolean;
};

const DEFAULT_VALUE: SovereignRuntimeValue = {
  theme: sovereignThemes.vaigyaaniq,
  host: "vaigyaaniq.com",
  truthMode: true
};

const SovereignRuntimeContext = createContext<SovereignRuntimeValue>(DEFAULT_VALUE);

export type SovereignRuntimeProviderProps = {
  children: ReactNode;
  /** Request hostname; used to resolve the theme when `theme` is not provided. */
  host?: string;
  /** Explicit theme override (skips host resolution). */
  theme?: SovereignTheme;
  /** PHKD truth mode. Defaults to true. */
  truthMode?: boolean;
};

export function SovereignRuntimeProvider({ children, host, theme, truthMode = true }: SovereignRuntimeProviderProps) {
  const value = useMemo<SovereignRuntimeValue>(() => {
    const resolvedHost = host ?? DEFAULT_VALUE.host;
    return {
      theme: theme ?? resolveSovereignTheme(resolvedHost),
      host: resolvedHost,
      truthMode
    };
  }, [host, theme, truthMode]);

  return <SovereignRuntimeContext.Provider value={value}>{children}</SovereignRuntimeContext.Provider>;
}

/** Access the active sovereign runtime (theme + host + truthMode). */
export function useSovereignRuntime(): SovereignRuntimeValue {
  return useContext(SovereignRuntimeContext);
}
