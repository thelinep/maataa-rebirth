import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
export type MaataaTheme = "light" | "dark" | "system" | "high-contrast" | "oled";
type ThemeContextValue = { theme: MaataaTheme; resolvedTheme: Exclude<MaataaTheme,"system">; setTheme: (theme: MaataaTheme) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);
export function ThemeProvider({ children, defaultTheme = "system", theme: controlled, onThemeChange }: { children: React.ReactNode; defaultTheme?: MaataaTheme; theme?: MaataaTheme; onThemeChange?: (theme: MaataaTheme) => void }) {
  const [internal, setInternal] = useState<MaataaTheme>(defaultTheme);
  const theme = controlled ?? internal;
  const systemDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const resolvedTheme: Exclude<MaataaTheme,"system"> = theme === "system" ? (systemDark ? "dark" : "light") : theme;
  const setTheme = (next: MaataaTheme) => { if (controlled === undefined) setInternal(next); onThemeChange?.(next); };
  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);
  useEffect(() => { document.documentElement.dataset.maataaTheme = resolvedTheme; return () => { delete document.documentElement.dataset.maataaTheme; }; }, [resolvedTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const ctx = useContext(ThemeContext); if (!ctx) throw new Error("useTheme must be used within ThemeProvider"); return ctx; }
export function ThemeToggle({ label = "Toggle theme" }: { label?: string }) { const { theme, setTheme } = useTheme(); const next = theme === "light" ? "dark" : theme === "dark" ? "high-contrast" : theme === "high-contrast" ? "oled" : theme === "oled" ? "system" : "light"; return <button className="m-button m-ui" type="button" aria-label={label} onClick={() => setTheme(next)}>{theme}</button>; }
export const lightTheme = { background: "#fbf8f1", surface: "#ffffff", text: "#221d16", primary: "#7a5d2e" } as const;
export const darkTheme = { background: "#17140f", surface: "#211d17", text: "#f6efe3", primary: "#d5ad61" } as const;
