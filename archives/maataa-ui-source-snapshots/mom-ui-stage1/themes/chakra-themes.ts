import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ChakraKey,
  type ColorTokens,
  type MaataaTheme
} from "./types.ts";

type ChakraThemeInput = Omit<
  MaataaTheme,
  "family" | "colorTokens" | "typographyTokens" | "cssVariables" | "chakraMapping"
> & {
  chakra: ChakraKey;
  colorTokens: Partial<ColorTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function chakraTheme(theme: ChakraThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = BASE_TYPOGRAPHY_TOKENS;
  return createMaataaTheme({
    ...theme,
    family: "CHAKRA_THEMES",
    chakraMapping: [theme.chakra],
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

export const CHAKRA_THEMES = [
  chakraTheme({
    id: "chakra-root-stability",
    name: "Root Stability",
    description: "Grounded theme for safety, reliability, offline confidence, and stable system state.",
    targetUsers: ["offline users", "security teams", "public installations"],
    accessibilityProfile: ["structured"],
    motionProfile: "reduced",
    colorTokens: { primary: "#b5483a", secondary: "#d9a441", accent: "#6b4f2a" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop", "kiosk"],
    runtimeModes: ["offline", "security"],
    chakra: "root",
    aiAssistantMode: "operator",
    recommendedFor: ["security", "offline readiness", "recovery state"],
    avoidFor: ["playful child creativity pages"],
    cssVariables: { "--maataa-chakra": "root" }
  }),
  chakraTheme({
    id: "chakra-sacral-creativity",
    name: "Sacral Creativity",
    description: "Expressive theme for creative studios, playful learning, and story-rich workflows.",
    targetUsers: ["creators", "young learners", "designers"],
    accessibilityProfile: ["teen-safe"],
    motionProfile: "standard",
    colorTokens: { primary: "#ff7a18", secondary: "#ff5fa2", accent: "#ffd166" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "identity"],
    chakra: "sacral",
    aiAssistantMode: "mentor",
    recommendedFor: ["design studio", "music", "storytelling"],
    avoidFor: ["formal audit workflows"],
    cssVariables: { "--maataa-chakra": "sacral" }
  }),
  chakraTheme({
    id: "chakra-solar-execution",
    name: "Solar Execution",
    description: "Action-first theme for projects, missions, progress, and execution dashboards.",
    targetUsers: ["builders", "operators", "project teams"],
    accessibilityProfile: ["focus-first"],
    motionProfile: "data-driven",
    colorTokens: { primary: "#f2b84b", secondary: "#ff7a18", accent: "#45c77d" },
    layoutDensity: "dense",
    deviceSupport: ["tablet", "desktop"],
    runtimeModes: ["leadership", "operator"],
    chakra: "solar",
    aiAssistantMode: "operator",
    recommendedFor: ["task progress", "release gates", "project dashboards"],
    avoidFor: ["rest mode"],
    cssVariables: { "--maataa-chakra": "solar" }
  }),
  chakraTheme({
    id: "chakra-heart-collaboration",
    name: "Heart Collaboration",
    description: "Community-safe theme for collaboration, care, support, and shared learning journeys.",
    targetUsers: ["communities", "teachers", "care teams"],
    accessibilityProfile: ["structured"],
    motionProfile: "gentle",
    colorTokens: { primary: "#45c77d", secondary: "#55d6be", accent: "#d9a441" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["exploration", "wisdom"],
    chakra: "heart",
    aiAssistantMode: "friendly",
    recommendedFor: ["community cards", "support flows", "teacher guidance"],
    avoidFor: ["security incident screens"],
    cssVariables: { "--maataa-chakra": "heart" }
  }),
  chakraTheme({
    id: "chakra-throat-communication",
    name: "Throat Communication",
    description: "Communication-first theme for radio, messaging, voice, language, and broadcast surfaces.",
    targetUsers: ["communicators", "radio teams", "language learners"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: { primary: "#219ebc", secondary: "#00d4ff", accent: "#f2b84b" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "analytics"],
    chakra: "throat",
    aiAssistantMode: "mentor",
    recommendedFor: ["voice UI", "radio", "language cards", "comments"],
    avoidFor: ["offline-only no-audio mode"],
    cssVariables: { "--maataa-chakra": "throat" }
  }),
  chakraTheme({
    id: "chakra-third-eye-intelligence",
    name: "Third Eye Intelligence",
    description: "Insight theme for analytics, AI reasoning surfaces, graph views, and runtime topology.",
    targetUsers: ["researchers", "analysts", "AI operators"],
    accessibilityProfile: ["focus-first"],
    motionProfile: "data-driven",
    colorTokens: { primary: "#8f5cff", secondary: "#00d4ff", accent: "#b3a2ff" },
    layoutDensity: "dense",
    deviceSupport: ["tablet", "desktop", "tv"],
    runtimeModes: ["analytics", "innovation"],
    chakra: "third-eye",
    aiAssistantMode: "operator",
    recommendedFor: ["knowledge graphs", "AI runtime", "analytics"],
    avoidFor: ["young child UI"],
    cssVariables: { "--maataa-chakra": "third-eye" }
  }),
  chakraTheme({
    id: "chakra-crown-vision",
    name: "Crown Vision",
    description: "Visionary theme for civilization-scale maps, wisdom pages, future roadmaps, and executive overviews.",
    targetUsers: ["vision holders", "elders", "executives"],
    accessibilityProfile: ["elder-readable", "structured"],
    motionProfile: "cinematic",
    colorTokens: { primary: "#d9a441", secondary: "#b3a2ff", accent: "#ffffff", glow: "rgba(217, 164, 65, 0.3)" },
    layoutDensity: "comfortable",
    deviceSupport: ["desktop", "tablet", "tv"],
    runtimeModes: ["wisdom", "legacy", "leadership"],
    chakra: "crown",
    aiAssistantMode: "sage",
    recommendedFor: ["vision pages", "civilization maps", "leadership summaries"],
    avoidFor: ["small watch screens"],
    cssVariables: { "--maataa-chakra": "crown" }
  })
] as const;

export type ChakraThemeId =
  | "chakra-root-stability"
  | "chakra-sacral-creativity"
  | "chakra-solar-execution"
  | "chakra-heart-collaboration"
  | "chakra-throat-communication"
  | "chakra-third-eye-intelligence"
  | "chakra-crown-vision";
