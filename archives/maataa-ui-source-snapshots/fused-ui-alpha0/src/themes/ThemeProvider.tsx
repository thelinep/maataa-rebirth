/**
 * @maataa/ui/themes/ThemeProvider
 * Runtime theme switching: exposes the active token set (light or dark)
 * via context, and mirrors it as CSS custom properties for CSS consumers.
 */

import React, { createContext, useContext, useMemo, useState } from "react";
import { chartTokens, colorTokens, darkChartTokens, darkColorTokens } from "../tokens";
import { buildThemeCssVars } from "./themeUtils";

export type ThemeName = "light" | "dark";

export interface ThemeContextValue {
  /** The active theme name. */
  theme: ThemeName;
  /** Sets the theme directly. */
  setTheme: (theme: ThemeName) => void;
  /** Flips between "light" and "dark". */
  toggleTheme: () => void;
  /** The active `colorTokens`-shaped palette for the current theme. */
  colors: typeof colorTokens;
  /** The active `chartTokens`-shaped palette for the current theme. */
  chart: typeof chartTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;

  /** Initial theme when uncontrolled. @default "light" */
  defaultTheme?: ThemeName;

  /** Controlled theme — when set, ThemeProvider always renders this theme. */
  theme?: ThemeName;

  /** Called whenever the theme changes, controlled or not. */
  onThemeChange?: (theme: ThemeName) => void;

  className?: string;
  style?: React.CSSProperties;
}

/**
 * ThemeProvider
 * Makes `colorTokens`/`chartTokens` (light) or `darkColorTokens`/
 * `darkChartTokens` (dark) available to descendants via `useTheme()`, and
 * mirrors the active palette as `--maataa-*` CSS custom properties on its
 * wrapper element for anything that themes via CSS instead. Components
 * authored against `useTheme().colors` re-theme live when the theme
 * changes; components that import `colorTokens` directly (most of this
 * library's existing components, as of this theme's introduction) do not
 * — they stay on the light palette until migrated to read from context.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
  theme: controlledTheme,
  onThemeChange,
  className,
  style,
}) => {
  const [uncontrolledTheme, setUncontrolledTheme] = useState<ThemeName>(defaultTheme);
  const theme = controlledTheme ?? uncontrolledTheme;

  const setTheme = (next: ThemeName) => {
    if (controlledTheme === undefined) setUncontrolledTheme(next);
    onThemeChange?.(next);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const colors = theme === "dark" ? darkColorTokens : colorTokens;
  const chart = theme === "dark" ? darkChartTokens : chartTokens;

  const cssVars = useMemo(() => buildThemeCssVars(colors), [colors]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, colors, chart }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, colors, chart]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        data-maataa-theme={theme}
        className={className}
        style={{ ...(cssVars as React.CSSProperties), ...style }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = "ThemeProvider";

/**
 * useTheme
 * Reads the active theme, its token sets, and the setters exposed by the
 * nearest `ThemeProvider`. Throws if used outside one.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
