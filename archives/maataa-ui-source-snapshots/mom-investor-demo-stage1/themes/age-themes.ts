import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme,
  type TypographyTokens
} from "./types.ts";

type AgeThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  typographyTokens?: Partial<TypographyTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function ageTheme(theme: AgeThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = { ...BASE_TYPOGRAPHY_TOKENS, ...theme.typographyTokens };

  return createMaataaTheme({
    ...theme,
    family: "AGE_THEMES",
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

export const AGE_THEMES = [
  ageTheme({
    id: "age-bloom",
    name: "Bloom",
    description: "0-5 years sensory awakening theme with soft sky colors, large tap targets, parent-guided flow, and gentle Maataa AI presence.",
    targetUsers: ["0-5 years", "little explorers", "parent-guided learners"],
    accessibilityProfile: ["early-child", "child-safe", "reduced-motion"],
    motionProfile: "gentle",
    colorTokens: {
      background: "#eef8ff",
      surface: "#ffffff",
      surfaceAlt: "#ffe8f2",
      text: "#27164f",
      muted: "#6b6395",
      primary: "#e85b9c",
      secondary: "#5ac8fa",
      accent: "#ffbe4f",
      border: "rgba(232, 91, 156, 0.28)",
      glow: "rgba(90, 200, 250, 0.32)"
    },
    typographyTokens: { headingFont: "Fredoka, Nunito, ui-sans-serif", bodyFont: "Nunito, ui-sans-serif", baseSize: "18px", lineHeight: "1.65" },
    layoutDensity: "playful",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wonder"],
    chakraMapping: ["heart", "crown"],
    aiAssistantMode: "guardian",
    recommendedFor: ["voice-friendly learning", "big buttons", "safe content", "parent dashboard"],
    avoidFor: ["commerce", "social feeds", "operator consoles"],
    cssVariables: { "--maataa-age-band": "0-5", "--maataa-radius": "28px" }
  }),
  ageTheme({
    id: "age-spark",
    name: "Spark",
    description: "5-9 years wonder and curiosity theme with bright educational colors, rewards, games, story cards, and safe creative spaces.",
    targetUsers: ["5-9 years", "young explorers", "early primary learners"],
    accessibilityProfile: ["child-safe", "structured"],
    motionProfile: "gentle",
    colorTokens: {
      background: "#f7fbff",
      surface: "#ffffff",
      surfaceAlt: "#f3edff",
      text: "#21145f",
      muted: "#5d5b89",
      primary: "#7c5cff",
      secondary: "#4fc3f7",
      accent: "#ffb547",
      success: "#4cd964",
      border: "rgba(124, 92, 255, 0.28)",
      glow: "rgba(124, 92, 255, 0.34)"
    },
    typographyTokens: { headingFont: "Fredoka, Poppins, ui-sans-serif", bodyFont: "Nunito, ui-sans-serif", baseSize: "17px", lineHeight: "1.58" },
    layoutDensity: "playful",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["wonder", "exploration"],
    chakraMapping: ["sacral", "heart"],
    aiAssistantMode: "friendly",
    recommendedFor: ["fun learning", "story journeys", "badges", "parent controls"],
    avoidFor: ["ungated chat", "payments", "dense data tables"],
    cssVariables: { "--maataa-age-band": "5-9", "--maataa-radius": "24px" }
  }),
  ageTheme({
    id: "age-pulse-junior",
    name: "Pulse Junior",
    description: "10-13 years discovery theme with space-inspired gradients, quests, safe projects, and structured creator learning.",
    targetUsers: ["10-13 years", "middle-grade learners", "project beginners"],
    accessibilityProfile: ["child-safe", "teen-safe", "structured"],
    motionProfile: "standard",
    colorTokens: {
      background: "#070b2a",
      surface: "#111447",
      surfaceAlt: "#1d1b65",
      text: "#f7f4ff",
      muted: "#b6b6e8",
      primary: "#8b5cf6",
      secondary: "#00d4ff",
      accent: "#ffbf4d",
      border: "rgba(139, 92, 246, 0.4)",
      glow: "rgba(0, 212, 255, 0.28)"
    },
    typographyTokens: { headingFont: "Poppins, Inter, ui-sans-serif", bodyFont: "Poppins, ui-sans-serif", baseSize: "16px" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["discovery", "exploration"],
    chakraMapping: ["solar", "throat"],
    aiAssistantMode: "friendly",
    recommendedFor: ["math quests", "safe coding", "science labs", "achievement systems"],
    avoidFor: ["public posting without moderation", "payment flows"],
    cssVariables: { "--maataa-age-band": "10-13", "--maataa-radius": "20px" }
  }),
  ageTheme({
    id: "age-pulse",
    name: "Pulse",
    description: "13-18 years identity and creation theme with teen-safe neon UI, creator tools, challenge cards, and moderation-aware collaboration.",
    targetUsers: ["13-18 years", "teen creators", "secondary learners"],
    accessibilityProfile: ["teen-safe", "structured"],
    motionProfile: "standard",
    colorTokens: {
      background: "#06071d",
      surface: "#101030",
      surfaceAlt: "#191246",
      text: "#faf7ff",
      muted: "#b8afd8",
      primary: "#b83cff",
      secondary: "#00d4ff",
      accent: "#ff5fa2",
      border: "rgba(184, 60, 255, 0.38)",
      glow: "rgba(184, 60, 255, 0.34)"
    },
    typographyTokens: { headingFont: "Poppins, Inter, ui-sans-serif", bodyFont: "Poppins, ui-sans-serif", numericFont: "Orbitron, ui-monospace", baseSize: "16px" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["identity", "creation"],
    chakraMapping: ["throat", "third-eye"],
    aiAssistantMode: "mentor",
    recommendedFor: ["creative studio", "code lab", "project dashboards", "moderated peer community"],
    avoidFor: ["ungated monetization", "institutional admin panels"],
    cssVariables: { "--maataa-age-band": "13-18", "--maataa-radius": "18px" }
  }),
  ageTheme({
    id: "age-runtime",
    name: "Runtime",
    description: "19-30 years innovation theme for builders, learners, developers, and young operators working in fast dark-mode environments.",
    targetUsers: ["19-30 years", "builders", "students", "early professionals"],
    accessibilityProfile: ["adult-standard", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: {
      background: "#050612",
      surface: "#0b1024",
      surfaceAlt: "#141a38",
      text: "#f8fbff",
      muted: "#9aa8c5",
      primary: "#8f42ff",
      secondary: "#00d4ff",
      accent: "#ff7de9",
      border: "rgba(143, 66, 255, 0.38)",
      glow: "rgba(0, 212, 255, 0.25)"
    },
    typographyTokens: { headingFont: "Inter, Poppins, ui-sans-serif", bodyFont: "Inter, ui-sans-serif", numericFont: "JetBrains Mono, ui-monospace" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["innovation", "creation"],
    chakraMapping: ["solar", "third-eye"],
    aiAssistantMode: "mentor",
    recommendedFor: ["code labs", "learning dashboards", "analytics", "portfolio projects"],
    avoidFor: ["early-child experiences", "elder-first readability mode"],
    cssVariables: { "--maataa-age-band": "19-30", "--maataa-radius": "16px" }
  }),
  ageTheme({
    id: "age-nexus",
    name: "Nexus",
    description: "31-50 years leadership theme with brass-accent dashboards, professional density, AI mentor cards, and multi-device productivity.",
    targetUsers: ["31-50 years", "leaders", "operators", "professionals"],
    accessibilityProfile: ["adult-standard", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: {
      background: "#07110f",
      surface: "#0d1b18",
      surfaceAlt: "#15231f",
      text: "#f8efe1",
      muted: "#b1b9ac",
      primary: "#d9a441",
      secondary: "#5eb1bf",
      accent: "#c78c3b",
      border: "rgba(217, 164, 65, 0.36)",
      glow: "rgba(217, 164, 65, 0.24)"
    },
    typographyTokens: { headingFont: "Inter, ui-sans-serif", bodyFont: "Inter, ui-sans-serif", numericFont: "JetBrains Mono, ui-monospace" },
    layoutDensity: "dense",
    deviceSupport: ["mobile", "tablet", "desktop", "wearable"],
    runtimeModes: ["leadership", "innovation"],
    chakraMapping: ["solar", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["professional dashboards", "analytics", "project leadership", "team coordination"],
    avoidFor: ["play-first child experiences", "low-stimulus rest mode"],
    cssVariables: { "--maataa-age-band": "31-50", "--maataa-radius": "14px" }
  }),
  ageTheme({
    id: "age-sattva",
    name: "Sattva",
    description: "50+ years wisdom and guidance theme with elder-readable typography, calm green surfaces, large controls, and archive-friendly flows.",
    targetUsers: ["50+ years", "guides", "elders", "archive stewards"],
    accessibilityProfile: ["elder-readable", "low-vision", "structured"],
    motionProfile: "reduced",
    colorTokens: {
      background: "#f6f2e8",
      surface: "#fffaf0",
      surfaceAlt: "#edf3df",
      text: "#1f2a1e",
      muted: "#68705e",
      primary: "#587245",
      secondary: "#b58b3a",
      accent: "#d1b46a",
      border: "rgba(88, 114, 69, 0.28)",
      glow: "rgba(88, 114, 69, 0.2)"
    },
    typographyTokens: { headingFont: "Georgia, Charter, serif", bodyFont: "Inter, ui-sans-serif", baseSize: "18px", lineHeight: "1.68", headingWeight: 650 },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "legacy"],
    chakraMapping: ["heart", "crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["health learning", "language learning", "archives", "guided community support"],
    avoidFor: ["high-speed neon motion", "dense trading-style dashboards"],
    cssVariables: { "--maataa-age-band": "50-plus", "--maataa-radius": "18px" }
  })
] as const;

export type AgeThemeId =
  | "age-bloom"
  | "age-spark"
  | "age-pulse-junior"
  | "age-pulse"
  | "age-runtime"
  | "age-nexus"
  | "age-sattva";
