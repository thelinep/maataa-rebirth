import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme
} from "./types.ts";

type AIThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function aiTheme(theme: AIThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = BASE_TYPOGRAPHY_TOKENS;
  return createMaataaTheme({
    ...theme,
    family: "AI_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const AI_THEMES = [
  aiTheme({
    id: "ai-friendly",
    name: "Friendly",
    description: "Warm assistant personality for guided learning, quick questions, and low-pressure onboarding.",
    targetUsers: ["children", "new learners", "first-time users"],
    accessibilityProfile: ["child-safe", "structured"],
    motionProfile: "gentle",
    colorTokens: { primary: "#7c5cff", secondary: "#4fc3f7", accent: "#ffb547", glow: "rgba(124, 92, 255, 0.28)" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "wearable"],
    runtimeModes: ["wonder", "exploration", "discovery"],
    chakraMapping: ["heart"],
    aiAssistantMode: "friendly",
    recommendedFor: ["onboarding", "learning help", "voice prompts"],
    avoidFor: ["security approval flows", "release operations"],
    cssVariables: { "--maataa-ai-tone": "friendly" }
  }),
  aiTheme({
    id: "ai-mentor",
    name: "Mentor",
    description: "Capability-building assistant mode for learning paths, project suggestions, and reflective growth.",
    targetUsers: ["students", "builders", "creators"],
    accessibilityProfile: ["adult-standard", "teen-safe"],
    motionProfile: "standard",
    colorTokens: { primary: "#55d6be", secondary: "#8f5cff", accent: "#f2b84b", glow: "rgba(85, 214, 190, 0.24)" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "innovation", "leadership"],
    chakraMapping: ["solar", "third-eye"],
    aiAssistantMode: "mentor",
    recommendedFor: ["course guidance", "project planning", "reflection"],
    avoidFor: ["child-only guardian contexts"],
    cssVariables: { "--maataa-ai-tone": "mentor" }
  }),
  aiTheme({
    id: "ai-operator",
    name: "Operator",
    description: "Deterministic operations assistant mode for dashboards, release gates, runtime checks, and evidence review.",
    targetUsers: ["admins", "operators", "release teams"],
    accessibilityProfile: ["focus-first", "structured"],
    motionProfile: "data-driven",
    colorTokens: { background: "#030b13", surface: "#0a1520", primary: "#f2b84b", secondary: "#00d4ff", accent: "#fb5607", glow: "rgba(242, 184, 75, 0.22)" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet", "kiosk"],
    runtimeModes: ["operator", "security", "analytics"],
    chakraMapping: ["throat", "third-eye"],
    aiAssistantMode: "operator",
    recommendedFor: ["gate review", "health checks", "runtime verification"],
    avoidFor: ["unsupervised child learning", "casual story mode"],
    cssVariables: { "--maataa-ai-tone": "operator" }
  }),
  aiTheme({
    id: "ai-sage",
    name: "Sage",
    description: "Calm wisdom-oriented assistant mode for archives, reflection, long-form learning, and elder guidance.",
    targetUsers: ["elders", "researchers", "guides", "reflective learners"],
    accessibilityProfile: ["elder-readable", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#f7f1e5", surface: "#fffaf0", text: "#1f2a1e", primary: "#587245", secondary: "#b89248", accent: "#d1b46a", glow: "rgba(184, 146, 72, 0.16)" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "legacy"],
    chakraMapping: ["heart", "crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["archive narration", "wisdom pathways", "slow learning"],
    avoidFor: ["high-speed operator screens"],
    cssVariables: { "--maataa-ai-tone": "sage" }
  })
] as const;

export type AIThemeId = "ai-friendly" | "ai-mentor" | "ai-operator" | "ai-sage";
