"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { themeRegistry } from "../theme/theme-registry.ts";
import { applyTheme, loadTheme } from "../theme/theme-loader.ts";
import { loadSavedTheme, saveTheme, THEME_STORAGE_KEY } from "../theme/persistence.ts";
import type { ThemeNode } from "../theme/theme-contract.ts";

/**
 * Hostname → themeId resolver.
 *
 * Pure function — no DOM/window touch. Maps known production hostnames to
 * concrete theme ids from the theme registry. Returns null on no match so
 * the caller can apply its own fallback policy.
 *
 * PHKD: only maps to themes that ARE in the registry. Unknown hosts return
 * null rather than guess.
 */
const HOSTNAME_THEME_MAP: ReadonlyArray<{ readonly suffix: string; readonly themeId: string }> = [
  { suffix: "radio.vaigyaaniq.online", themeId: "cinematic-vaigyaaniq" },
  { suffix: "vaigyaaniq.online", themeId: "cinematic-vaigyaaniq" },
  { suffix: "vaigyaaniq.com", themeId: "cinematic-vaigyaaniq" },
  { suffix: "tlps.in", themeId: "tlp-producer" },
  { suffix: "allb.xyz", themeId: "allb-commerce" }
];

export function resolveThemeForHostname(hostname: string | null | undefined): string | null {
  if (!hostname) return null;
  const lower = hostname.toLowerCase();
  for (const entry of HOSTNAME_THEME_MAP) {
    if (lower === entry.suffix || lower.endsWith("." + entry.suffix)) {
      return entry.themeId;
    }
  }
  return null;
}

/**
 * React hook variant — reads window.location.hostname on the client only.
 * SSR-safe: returns null during server render, the actual hostname after mount.
 */
export function useHostnameResolvedTheme(): string | null {
  const [themeId, setThemeId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setThemeId(resolveThemeForHostname(window.location.hostname));
  }, []);
  return themeId;
}

/* =============================================================
   GlobalRuntimeThemeProvider
   ============================================================= */

export type GlobalRuntimeThemeValue = {
  readonly activeThemeId: string | null;
  readonly activeTheme: ThemeNode | null;
  readonly setThemeId: (id: string) => void;
  readonly availableThemes: ReadonlyArray<ThemeNode>;
};

const GlobalRuntimeThemeContext = createContext<GlobalRuntimeThemeValue>({
  activeThemeId: null,
  activeTheme: null,
  setThemeId: () => undefined,
  availableThemes: []
});

export function useGlobalRuntimeTheme(): GlobalRuntimeThemeValue {
  return useContext(GlobalRuntimeThemeContext);
}

export type GlobalRuntimeThemeProviderProps = {
  readonly children: ReactNode;
  /** Explicit theme id; takes precedence over hostname + persisted choice. */
  readonly themeId?: string;
  /** Default theme id used when no hostname match and no persisted choice. */
  readonly defaultThemeId?: string;
  /** Persist user theme selection to localStorage (key: maataa.theme.v1). */
  readonly persist?: boolean;
  /** Disable hostname-based resolution (use explicit/persisted/default only). */
  readonly disableHostnameResolution?: boolean;
};

/**
 * GlobalRuntimeThemeProvider — top-level, composable theme authority.
 *
 * Resolution precedence (first non-null wins):
 *   1. explicit `themeId` prop
 *   2. persisted theme id from localStorage (when persist === true)
 *   3. hostname resolution via resolveThemeForHostname()
 *   4. `defaultThemeId` prop
 *   5. registry's first preview theme
 *
 * Applies canonical --runtime-* tokens via the registry's applyTheme().
 * Exposes context so descendants can switch themes via useGlobalRuntimeTheme().
 *
 * PHKD: never invents a theme. If precedence chain yields nothing, mounts a
 * known registry theme rather than a fabricated default.
 */
export function GlobalRuntimeThemeProvider({
  children,
  themeId,
  defaultThemeId,
  persist = true,
  disableHostnameResolution = false
}: GlobalRuntimeThemeProviderProps) {
  const all = useMemo(() => themeRegistry.getAllThemes(), []);
  const fallbackId = useMemo(() => defaultThemeId ?? all[0]?.id ?? null, [defaultThemeId, all]);

  const [activeId, setActiveId] = useState<string | null>(themeId ?? fallbackId);

  /* Resolve on mount with full precedence chain. */
  useEffect(() => {
    if (themeId) {
      setActiveId(themeId);
      return;
    }
    const persisted = persist ? loadSavedTheme() : null;
    if (persisted) {
      setActiveId(persisted);
      return;
    }
    if (!disableHostnameResolution && typeof window !== "undefined") {
      const fromHost = resolveThemeForHostname(window.location.hostname);
      if (fromHost) {
        setActiveId(fromHost);
        return;
      }
    }
    if (fallbackId) setActiveId(fallbackId);
  }, [themeId, persist, disableHostnameResolution, fallbackId]);

  /* Apply tokens whenever the active id changes. */
  useEffect(() => {
    if (!activeId) return;
    const node = loadTheme(activeId);
    if (node) applyTheme(node);
  }, [activeId]);

  const setThemeId = useCallback(
    (id: string) => {
      setActiveId(id);
      if (persist) saveTheme(id);
    },
    [persist]
  );

  const value = useMemo<GlobalRuntimeThemeValue>(
    () => ({
      activeThemeId: activeId,
      activeTheme: activeId ? loadTheme(activeId) : null,
      setThemeId,
      availableThemes: all
    }),
    [activeId, setThemeId, all]
  );

  return (
    <GlobalRuntimeThemeContext.Provider value={value}>
      <div data-runtime-theme={activeId ?? ""}>{children}</div>
    </GlobalRuntimeThemeContext.Provider>
  );
}

export { THEME_STORAGE_KEY };
