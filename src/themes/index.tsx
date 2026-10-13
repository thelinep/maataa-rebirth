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
  // eslint-disable-next-line react-hooks/exhaustive-deps -- setTheme is recreated every render; listing it would change the context value every render (known stale-closure follow-up)
  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);
  useEffect(() => { document.documentElement.dataset.maataaTheme = resolvedTheme; return () => { delete document.documentElement.dataset.maataaTheme; }; }, [resolvedTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const ctx = useContext(ThemeContext); if (!ctx) throw new Error("useTheme must be used within ThemeProvider"); return ctx; }
// The accessible name is the visible text ("<label>: <theme>"), so the name always
// contains what sighted and voice-control users see (WCAG 2.5.3 Label in Name).
export function ThemeToggle({ label = "Toggle theme" }: { label?: string }) { const { theme, setTheme } = useTheme(); const next = theme === "light" ? "dark" : theme === "dark" ? "high-contrast" : theme === "high-contrast" ? "oled" : theme === "oled" ? "system" : "light"; return <button className="m-button m-ui" type="button" data-maataa-theme-toggle={theme} onClick={() => setTheme(next)}>{label}: {theme}</button>; }
export const lightTheme = { background: "#fbf8f1", surface: "#ffffff", text: "#221d16", primary: "#7a5d2e" } as const;
export const darkTheme = { background: "#17140f", surface: "#211d17", text: "#f6efe3", primary: "#d5ad61" } as const;
