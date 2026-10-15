import { describe, expect, it } from "vitest";
import { BUILTIN_STUDIO_THEMES } from "../examples/redux-demo/themeStudioPresets";
import {
  DEFAULT_STUDIO_THEME,
  applyThemeTokens,
  clearThemeTokens,
  contrastRatio,
  parseActiveTheme,
  parseSavedThemes,
  themeToCss,
  themeToCssVariables,
} from "../examples/redux-demo/themeStudioModel";

describe("Theme Studio design tokens", () => {
  it("keeps all nine options readable and resets notebook ruling when switching themes", () => {
    expect(new Set(BUILTIN_STUDIO_THEMES.map((theme) => theme.name)).size).toBe(9);
    for (const theme of BUILTIN_STUDIO_THEMES) {
      expect(contrastRatio(theme.colors.text, theme.colors.canvas), theme.name).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.colors.muted, theme.colors.surface), theme.name).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.colors.primaryText, theme.colors.primary), theme.name).toBeGreaterThanOrEqual(4.5);
      expect(parseActiveTheme(JSON.stringify(theme))?.name).toBe(theme.name);
    }
    const notebook = BUILTIN_STUDIO_THEMES.find((theme) => theme.name.endsWith("Blue Notebook"))!;
    expect(themeToCssVariables(notebook)["--m-paper-pattern"]).toContain("repeating-linear-gradient");
    expect(themeToCssVariables(DEFAULT_STUDIO_THEME)["--m-paper-pattern"]).toBe("none");
  });
  it("measures WCAG contrast and composes exportable semantic variables", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    const variables = themeToCssVariables(DEFAULT_STUDIO_THEME);
    expect(variables["--m-primary"]).toBe(DEFAULT_STUDIO_THEME.colors.primary);
    expect(variables["--m-font-heading"]).toBe(DEFAULT_STUDIO_THEME.typography.headingFont);
    expect(variables["--m-font-size-h1"]).toBe("29.05px");
    expect(variables["--m-font-size-h3"]).toBe("19.52px");
    expect(variables["--m-radius-md"]).toBe("11px");
    expect(themeToCss(DEFAULT_STUDIO_THEME)).toContain("--m-motion-duration: 180ms;");
  });

  it("turns reduced motion off and removes elevation in the exported token set", () => {
    const quiet = { ...DEFAULT_STUDIO_THEME, motion: { ...DEFAULT_STUDIO_THEME.motion, reducedMotion: true } };
    const variables = themeToCssVariables(quiet);
    expect(variables["--m-motion-duration"]).toBe("0ms");
    expect(variables["--m-hover-lift"]).toBe("0px");
    expect(variables["--m-card-shadow"]).toBe("none");
  });

  it("loads only theme-shaped local presets and applies or clears CSS variables", () => {
    expect(parseSavedThemes("invalid")).toEqual([]);
    expect(parseActiveTheme(JSON.stringify(DEFAULT_STUDIO_THEME))?.name).toBe("MAATAA Signature");
    const style = new Map<string, string>();
    const target = { style: { setProperty: (key: string, value: string) => style.set(key, value), removeProperty: (key: string) => style.delete(key) }, dataset: { maataaCustomTheme: "true" } } as unknown as HTMLElement;
    applyThemeTokens(target, DEFAULT_STUDIO_THEME);
    expect(style.get("--m-primary")).toBe(DEFAULT_STUDIO_THEME.colors.primary);
    clearThemeTokens(target);
    expect(style.has("--m-primary")).toBe(false);
    expect(target.dataset.maataaCustomTheme).toBeUndefined();
  });
});
