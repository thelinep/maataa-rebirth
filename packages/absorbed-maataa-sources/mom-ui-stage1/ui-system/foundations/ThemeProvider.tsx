/**
 * @maataa/maataa-ui · ui-system · foundations · ThemeProvider
 *
 * Emits the design-sheet palette as canonical governed CSS custom properties
 * (--maataa-*) via toCanonicalVars(), so every ui-system component themes off
 * the @maataa/runtime-theme-governance vocabulary instead of hardcoded hex.
 *
 * Components read tokens with token("--maataa-accent-primary") => "var(--maataa-accent-primary)".
 * Overrides let a theme/runtime swap the palette without touching components.
 *
 * PHKD: runtime CONTROLLED_NO_GO · production PRODUCTION_READY_NO.
 */
import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from "react";
import { toCanonicalVars, COLOR_TO_CANONICAL_TOKEN, CANONICAL_TOKEN_NAMESPACE } from "./canonical-map.ts";

export type CanonicalToken = (typeof COLOR_TO_CANONICAL_TOKEN)[keyof typeof COLOR_TO_CANONICAL_TOKEN];
export type ThemeVars = Record<string, string>;

export type ThemeContextValue = {
  vars: ThemeVars;
  namespace: string;
  token: (name: string) => string;
};

const baseVars = toCanonicalVars();

const ThemeContext = createContext<ThemeContextValue>({
  vars: baseVars,
  namespace: CANONICAL_TOKEN_NAMESPACE,
  token: (name) => `var(${name})`
});

export type ThemeProviderProps = {
  /** Override any --maataa-* token (e.g. from a SovereignTheme / 69-family theme). */
  overrides?: ThemeVars;
  /** Render as a specific element; defaults to a div carrying the CSS vars. */
  as?: "div" | "section" | "main" | "article";
  className?: string;
  children?: ReactNode;
};

export function ThemeProvider({ overrides, as: Tag = "div", className, children }: ThemeProviderProps) {
  const value = useMemo<ThemeContextValue>(() => {
    const vars = { ...baseVars, ...(overrides ?? {}) };
    return { vars, namespace: CANONICAL_TOKEN_NAMESPACE, token: (name) => `var(${name})` };
  }, [overrides]);

  return (
    <ThemeContext.Provider value={value}>
      <Tag className={className} style={value.vars as CSSProperties} data-maataa-theme="canonical">
        {children}
      </Tag>
    </ThemeContext.Provider>
  );
}

/** Access the active theme context (vars + token resolver). */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/** Resolve a canonical token to a CSS value reference: token("--maataa-surface") -> "var(--maataa-surface)". */
export function token(name: string): string {
  return `var(${name})`;
}

export const meta = {
  layer: "foundations",
  id: "ThemeProvider",
  status: "IMPLEMENTED",
  authority: "@maataa/runtime-theme-governance",
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;

export default ThemeProvider;
