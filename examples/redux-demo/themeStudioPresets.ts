import { DEFAULT_STUDIO_THEME, type StudioTheme } from "./themeStudioModel";

function preset(name: string, colors: Partial<StudioTheme["colors"]>, paper = false, ruled = false): StudioTheme {
  return {
    ...DEFAULT_STUDIO_THEME,
    name,
    colors: { ...DEFAULT_STUDIO_THEME.colors, ...colors },
    typography: { ...DEFAULT_STUDIO_THEME.typography, ...(paper ? { bodyFont: '"Trebuchet MS", Arial, sans-serif', headingFont: 'Georgia, "Times New Roman", serif', headingWeight: 600, lineHeight: 1.65 } : {}) },
    shape: { ...DEFAULT_STUDIO_THEME.shape, ...(paper ? { radius: 4, surfaceStyle: "solid" as const, shadowOpacity: .07, shadowBlur: 16, shadowY: 4 } : {}), paperPattern: ruled ? "ruled" : "plain" },
    motion: { ...DEFAULT_STUDIO_THEME.motion, hoverLift: !paper },
  };
}

/** Curated options stay available independently of personal browser-saved presets. */
export const BUILTIN_STUDIO_THEMES: readonly StudioTheme[] = [
  preset("TLPS · Warm Paper", { canvas: "#fbf8f1", surface: "#fffdf8", elevated: "#f0e9dc", text: "#221d16", muted: "#645b50", border: "#c9bcaa", primary: "#795321", primaryText: "#ffffff", secondary: "#e4dac9", focus: "#795321" }),
  preset("TLPS · Cinema Gold", { canvas: "#17140f", surface: "#211d17", elevated: "#29231b", text: "#f6efe3", muted: "#bdb2a3", border: "#51483a", primary: "#d7ad2e", primaryText: "#211a07", secondary: "#3a3024", focus: "#d7ad2e" }),
  preset("TLPS · Slate Teal", { canvas: "#101e25", surface: "#182c35", elevated: "#213b46", text: "#edf6f8", muted: "#b0c6cd", border: "#45616c", primary: "#67dbc6", primaryText: "#092720", secondary: "#213b46", focus: "#67dbc6" }),
  preset("TLPS · Ink White", { canvas: "#f7f8fa", surface: "#ffffff", elevated: "#e9edf3", text: "#172234", muted: "#536279", border: "#bec8d7", primary: "#244f94", primaryText: "#ffffff", secondary: "#e9edf3", focus: "#244f94" }),
  preset("TLPS · Graphite Paper", { canvas: "#f5f1e7", surface: "#fffdf6", elevated: "#eae4d6", text: "#302e2a", muted: "#655e53", border: "#938b7c", primary: "#49443c", primaryText: "#fffdf6", secondary: "#e4ddcf", focus: "#49443c" }, true),
  preset("TLPS · Blue Notebook", { canvas: "#f4f5ee", surface: "#fffef8", elevated: "#e7eced", text: "#253640", muted: "#52616a", border: "#899da8", primary: "#285c7a", primaryText: "#ffffff", secondary: "#e0e8ec", focus: "#285c7a" }, true, true),
  preset("TLPS · Kraft Sketch", { canvas: "#e9dcc3", surface: "#f6ead5", elevated: "#ddc9a8", text: "#392f27", muted: "#655340", border: "#9a8062", primary: "#78452e", primaryText: "#fff8e9", secondary: "#dac4a2", focus: "#78452e" }, true),
];
