import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme,
  type TypographyTokens
} from "./types.ts";

type AccessibilityThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  typographyTokens?: Partial<TypographyTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function accessibilityTheme(theme: AccessibilityThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = { ...BASE_TYPOGRAPHY_TOKENS, ...theme.typographyTokens };
  return createMaataaTheme({
    ...theme,
    family: "ACCESSIBILITY_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({
      colorTokens,
      typographyTokens,
      layoutDensity: theme.layoutDensity,
      motionProfile: theme.motionProfile,
      cssVariables: theme.cssVariables
    })
  });
}

export const ACCESSIBILITY_THEMES = [
  accessibilityTheme({
    id: "accessibility-vision-plus",
    name: "Vision+",
    description:
      "Low-vision friendly theme with strong contrast, enlarged typography, clear focus rings, and reduced fine-detail dependence.",
    targetUsers: ["low-vision users", "screen magnifier users"],
    accessibilityProfile: ["low-vision", "focus-first"],
    motionProfile: "reduced",
    colorTokens: {
      background: "#020814",
      surface: "#071426",
      text: "#ffffff",
      muted: "#d4def0",
      primary: "#ffd166",
      secondary: "#4cc9f0",
      accent: "#80ffdb",
      border: "rgba(255, 209, 102, 0.55)",
      glow: "rgba(255, 209, 102, 0.36)"
    },
    typographyTokens: { baseSize: "19px", headingWeight: 800, lineHeight: "1.7" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv", "kiosk"],
    runtimeModes: ["wisdom", "operator"],
    chakraMapping: ["third-eye"],
    aiAssistantMode: "mentor",
    recommendedFor: ["large labels", "high contrast", "keyboard focus"],
    avoidFor: ["tiny telemetry labels", "low-contrast overlays"],
    cssVariables: { "--maataa-focus-ring": "0 0 0 3px #ffd166" }
  }),
  accessibilityTheme({
    id: "accessibility-calm-space",
    name: "Calm Space",
    description:
      "Reduced stimulation theme with calm surfaces, softer accents, low animation, and quiet reading-first layouts.",
    targetUsers: ["low-stimulation users", "focused readers"],
    accessibilityProfile: ["reduced-motion", "structured"],
    motionProfile: "reduced",
    colorTokens: {
      background: "#f5f1e8",
      surface: "#fffaf2",
      surfaceAlt: "#ebe5d7",
      text: "#1e251f",
      muted: "#68705e",
      primary: "#597153",
      secondary: "#9a7b43",
      accent: "#6f8b78",
      border: "rgba(89, 113, 83, 0.24)",
      glow: "rgba(89, 113, 83, 0.12)"
    },
    typographyTokens: { bodyFont: "Atkinson Hyperlegible, Inter, ui-sans-serif", baseSize: "17px", lineHeight: "1.72" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["wisdom", "legacy", "discovery"],
    chakraMapping: ["heart"],
    aiAssistantMode: "sage",
    recommendedFor: ["reading", "reflection", "elder support", "long sessions"],
    avoidFor: ["high-energy game mode", "cinematic launch screens"],
    cssVariables: { "--maataa-animation-duration": "0ms" }
  }),
  accessibilityTheme({
    id: "accessibility-structured-harmony",
    name: "Structured Harmony",
    description:
      "Predictable grid theme with explicit hierarchy, stable spacing, visible grouping, and consistent action placement.",
    targetUsers: ["neurodiverse users", "process-focused operators"],
    accessibilityProfile: ["structured", "focus-first"],
    motionProfile: "standard",
    colorTokens: {
      primary: "#77b255",
      secondary: "#5aa9e6",
      accent: "#e6b34c",
      border: "rgba(119, 178, 85, 0.34)",
      glow: "rgba(90, 169, 230, 0.18)"
    },
    typographyTokens: { bodyFont: "Lexend, Inter, ui-sans-serif", baseSize: "16px", lineHeight: "1.6" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop", "kiosk"],
    runtimeModes: ["discovery", "operator", "analytics"],
    chakraMapping: ["root", "heart"],
    aiAssistantMode: "mentor",
    recommendedFor: ["step flows", "forms", "dashboards", "checklists"],
    avoidFor: ["free-form immersive canvases"],
    cssVariables: { "--maataa-grid-gap": "16px" }
  }),
  accessibilityTheme({
    id: "accessibility-focus-pulse",
    name: "Focus Pulse",
    description:
      "Single-task theme with strong active states, restrained surfaces, and priority-first controls for deep work.",
    targetUsers: ["deep work users", "students", "operators"],
    accessibilityProfile: ["focus-first"],
    motionProfile: "standard",
    colorTokens: {
      background: "#050910",
      surface: "#0c1420",
      surfaceAlt: "#111d2c",
      primary: "#44d7b6",
      secondary: "#5aa9ff",
      accent: "#ffd166",
      border: "rgba(68, 215, 182, 0.32)",
      glow: "rgba(68, 215, 182, 0.22)"
    },
    typographyTokens: { bodyFont: "Lexend, Inter, ui-sans-serif" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "innovation", "operator"],
    chakraMapping: ["solar", "third-eye"],
    aiAssistantMode: "operator",
    recommendedFor: ["coding", "writing", "review queues", "learning streaks"],
    avoidFor: ["young child mode", "celebratory reward screens"],
    cssVariables: { "--maataa-active-outline": "#44d7b6" }
  }),
  accessibilityTheme({
    id: "accessibility-sattva-assist",
    name: "Sattva Assist",
    description: "Elder-readable assistive theme combining larger type, warm paper contrast, and calmer navigation.",
    targetUsers: ["elders", "caregivers", "low-vision readers"],
    accessibilityProfile: ["elder-readable", "low-vision", "structured"],
    motionProfile: "reduced",
    colorTokens: {
      background: "#fbf7ed",
      surface: "#fffdf7",
      surfaceAlt: "#eef3e5",
      text: "#1c261a",
      muted: "#66715e",
      primary: "#597044",
      secondary: "#b89248",
      accent: "#856b34",
      border: "rgba(89, 112, 68, 0.26)",
      glow: "rgba(184, 146, 72, 0.16)"
    },
    typographyTokens: { headingFont: "Georgia, Charter, serif", baseSize: "19px", lineHeight: "1.75" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "legacy"],
    chakraMapping: ["heart", "crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["guided learning", "family support", "archives"],
    avoidFor: ["dense runtime matrix", "neon youth modes"],
    cssVariables: { "--maataa-min-target": "48px" }
  }),
  accessibilityTheme({
    id: "accessibility-lite-runtime",
    name: "Lite Runtime",
    description:
      "Accessible low-compute theme with simplified visuals, reduced shadows, and fast rendering for constrained devices.",
    targetUsers: ["low-end devices", "offline learners", "field operators"],
    accessibilityProfile: ["offline-lite", "structured"],
    motionProfile: "reduced",
    colorTokens: {
      background: "#071016",
      surface: "#0d1820",
      surfaceAlt: "#14232c",
      primary: "#f1b84b",
      secondary: "#5fc9b4",
      accent: "#8aa0ff",
      border: "rgba(241, 184, 75, 0.28)",
      glow: "transparent"
    },
    typographyTokens: { baseSize: "16px" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop", "kiosk"],
    runtimeModes: ["offline", "operator"],
    chakraMapping: ["root"],
    aiAssistantMode: "none",
    recommendedFor: ["2G", "offline sync", "battery-safe usage"],
    avoidFor: ["cinematic pages", "shader-heavy previews"],
    cssVariables: { "--maataa-shadow-strength": "0" }
  }),
  accessibilityTheme({
    id: "accessibility-visual-signal",
    name: "Visual Signal",
    description: "Signal-rich theme that reinforces state through iconography, color, labels, and status patterns.",
    targetUsers: ["status operators", "low-audio contexts", "visual scanners"],
    accessibilityProfile: ["structured", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: {
      background: "#030b13",
      surface: "#0a1520",
      surfaceAlt: "#102235",
      primary: "#ffb703",
      secondary: "#219ebc",
      accent: "#fb5607",
      success: "#2dc653",
      warning: "#ffb703",
      danger: "#ef233c",
      border: "rgba(255, 183, 3, 0.34)",
      glow: "rgba(255, 183, 3, 0.22)"
    },
    typographyTokens: { numericFont: "JetBrains Mono, ui-monospace" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet", "kiosk", "tv"],
    runtimeModes: ["operator", "analytics", "security"],
    chakraMapping: ["solar", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["status matrices", "release gates", "alerts"],
    avoidFor: ["calm reading mode", "preschool flows"],
    cssVariables: { "--maataa-status-opacity": "1" }
  })
] as const;

export type AccessibilityThemeId =
  | "accessibility-vision-plus"
  | "accessibility-calm-space"
  | "accessibility-structured-harmony"
  | "accessibility-focus-pulse"
  | "accessibility-sattva-assist"
  | "accessibility-lite-runtime"
  | "accessibility-visual-signal";
