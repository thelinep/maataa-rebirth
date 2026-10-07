import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme
} from "./types.ts";

type CinematicThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function cinematicTheme(theme: CinematicThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = { ...BASE_TYPOGRAPHY_TOKENS, headingFont: "Cinzel, Georgia, serif" };
  return createMaataaTheme({
    ...theme,
    family: "CINEMATIC_THEMES",
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

export const CINEMATIC_THEMES = [
  cinematicTheme({
    id: "cinematic-cinematic",
    name: "Cinematic",
    description: "Immersive hero-grade theme for visual storytelling, brand moments, and multi-device preview boards.",
    targetUsers: ["presentation viewers", "brand pages", "story demos"],
    accessibilityProfile: ["adult-standard"],
    motionProfile: "cinematic",
    colorTokens: {
      background: "#020713",
      surface: "#0a1020",
      primary: "#f2b84b",
      secondary: "#8f5cff",
      accent: "#00d4ff",
      glow: "rgba(242, 184, 75, 0.36)"
    },
    layoutDensity: "standard",
    deviceSupport: ["desktop", "tablet", "tv"],
    runtimeModes: ["cinematic", "innovation"],
    chakraMapping: ["crown"],
    aiAssistantMode: "mentor",
    recommendedFor: ["hero pages", "multi-device boards", "launch previews"],
    avoidFor: ["low data mode", "dense release matrices"],
    cssVariables: { "--maataa-cinematic-mode": "standard" }
  }),
  cinematicTheme({
    id: "cinematic-quantum",
    name: "Quantum",
    description:
      "Purple-blue high-tech cinematic theme for AI, topology, runtime universe, and advanced learning boards.",
    targetUsers: ["AI users", "builders", "runtime explorers"],
    accessibilityProfile: ["adult-standard", "focus-first"],
    motionProfile: "cinematic",
    colorTokens: {
      background: "#050612",
      surface: "#0b1024",
      primary: "#a855f7",
      secondary: "#00d4ff",
      accent: "#ff7de9",
      glow: "rgba(168, 85, 247, 0.34)"
    },
    layoutDensity: "standard",
    deviceSupport: ["desktop", "tablet", "mobile"],
    runtimeModes: ["innovation", "creation", "cinematic"],
    chakraMapping: ["third-eye", "crown"],
    aiAssistantMode: "mentor",
    recommendedFor: ["AI companion", "runtime universe", "teen and builder previews"],
    avoidFor: ["elder-readable default", "paper-like documents"],
    cssVariables: { "--maataa-cinematic-mode": "quantum" }
  }),
  cinematicTheme({
    id: "cinematic-dhyaan",
    name: "Dhyaan",
    description:
      "Meditative sovereign-intelligence theme extracted from the Vaigyaaniq.com runtime board: chakra-lit focus, purple cosmic surfaces, device-aware preview, and PHKD-safe operating language.",
    targetUsers: ["Vaigyaaniq visitors", "runtime explorers", "knowledge operators", "AI-assisted learners"],
    accessibilityProfile: ["adult-standard", "focus-first", "structured"],
    motionProfile: "cinematic",
    colorTokens: {
      background: "#030517",
      surface: "#080b24",
      surfaceAlt: "#11143a",
      text: "#f8f7ff",
      muted: "#a7a4cf",
      primary: "#a855f7",
      secondary: "#22d3ee",
      accent: "#f6c453",
      success: "#32d67a",
      warning: "#f6a63a",
      danger: "#ff5c7a",
      border: "rgba(168, 85, 247, 0.34)",
      glow: "rgba(168, 85, 247, 0.42)"
    },
    layoutDensity: "mission-control",
    deviceSupport: ["desktop", "tablet", "mobile", "wearable", "tv"],
    runtimeModes: ["cinematic", "innovation", "wisdom", "operator"],
    chakraMapping: ["root", "sacral", "solar", "heart", "throat", "third-eye", "crown"],
    aiAssistantMode: "sage",
    recommendedFor: [
      "Vaigyaaniq.com umbrella landing",
      "Dhyaan runtime preview",
      "chakra-aware theme selection",
      "multi-device sovereign runtime boards"
    ],
    avoidFor: ["child-safe default", "low data mode", "certified telemetry claims"],
    cssVariables: {
      "--maataa-cinematic-mode": "dhyaan",
      "--maataa-dhyaan-violet": "#a855f7",
      "--maataa-dhyaan-cyan": "#22d3ee",
      "--maataa-dhyaan-gold": "#f6c453",
      "--maataa-dhyaan-orbit": "rgba(168, 85, 247, 0.28)",
      "--maataa-dhyaan-chakra-root": "#ff4f6d",
      "--maataa-dhyaan-chakra-sacral": "#ff8a2a",
      "--maataa-dhyaan-chakra-solar": "#ffd84a",
      "--maataa-dhyaan-chakra-heart": "#32d67a",
      "--maataa-dhyaan-chakra-throat": "#22d3ee",
      "--maataa-dhyaan-chakra-third-eye": "#6d5dfc",
      "--maataa-dhyaan-chakra-crown": "#c084fc"
    }
  }),
  cinematicTheme({
    id: "cinematic-earth-runtime",
    name: "Earth Runtime",
    description:
      "Grounded living-systems cinematic theme for agriculture, wellness, community, and nature-aligned dashboards.",
    targetUsers: ["krishi users", "wellness learners", "community builders"],
    accessibilityProfile: ["structured"],
    motionProfile: "gentle",
    colorTokens: {
      background: "#07110b",
      surface: "#101d13",
      primary: "#77b255",
      secondary: "#d9a441",
      accent: "#5fc9b4",
      glow: "rgba(119, 178, 85, 0.22)"
    },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "leadership"],
    chakraMapping: ["root", "heart"],
    aiAssistantMode: "sage",
    recommendedFor: ["earth learning", "krishi", "wellness", "community"],
    avoidFor: ["neon game boards"],
    cssVariables: { "--maataa-cinematic-mode": "earth" }
  }),
  cinematicTheme({
    id: "cinematic-fire-runtime",
    name: "Fire Runtime",
    description: "Energetic cinematic theme for launches, execution, contests, and action-heavy project moments.",
    targetUsers: ["launch teams", "challengers", "builders"],
    accessibilityProfile: ["teen-safe", "focus-first"],
    motionProfile: "cinematic",
    colorTokens: {
      background: "#120805",
      surface: "#1f0f09",
      primary: "#ff7a18",
      secondary: "#f2b84b",
      accent: "#ef476f",
      glow: "rgba(255, 122, 24, 0.32)"
    },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "leadership"],
    chakraMapping: ["solar", "sacral"],
    aiAssistantMode: "operator",
    recommendedFor: ["launch banners", "challenge screens", "execution status"],
    avoidFor: ["rest mode", "elder assist"],
    cssVariables: { "--maataa-cinematic-mode": "fire" }
  }),
  cinematicTheme({
    id: "cinematic-water-runtime",
    name: "Water Runtime",
    description: "Flowing cinematic theme for reflection, wellbeing, language learning, and gentle progression.",
    targetUsers: ["reflective learners", "wellness users", "language learners"],
    accessibilityProfile: ["reduced-motion", "structured"],
    motionProfile: "gentle",
    colorTokens: {
      background: "#06101a",
      surface: "#0d1c2a",
      primary: "#4cc9f0",
      secondary: "#80ffdb",
      accent: "#b3a2ff",
      glow: "rgba(76, 201, 240, 0.22)"
    },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "discovery"],
    chakraMapping: ["heart", "throat"],
    aiAssistantMode: "sage",
    recommendedFor: ["wellness", "reflection", "language learning"],
    avoidFor: ["high-alert security panels"],
    cssVariables: { "--maataa-cinematic-mode": "water" }
  }),
  cinematicTheme({
    id: "cinematic-air-runtime",
    name: "Air Runtime",
    description: "Light, spacious cinematic theme for exploration, maps, concepts, and knowledge discovery.",
    targetUsers: ["explorers", "researchers", "students"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: {
      background: "#eef8ff",
      surface: "#ffffff",
      surfaceAlt: "#e9f2ff",
      text: "#172033",
      muted: "#5e6b80",
      primary: "#4cc9f0",
      secondary: "#7c5cff",
      accent: "#f2b84b",
      border: "rgba(76, 201, 240, 0.32)",
      glow: "rgba(76, 201, 240, 0.22)"
    },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["exploration", "discovery"],
    chakraMapping: ["throat", "third-eye"],
    aiAssistantMode: "friendly",
    recommendedFor: ["maps", "exploration cards", "knowledge discovery"],
    avoidFor: ["dark command centers"],
    cssVariables: { "--maataa-cinematic-mode": "air" }
  }),
  cinematicTheme({
    id: "cinematic-earth-core-runtime",
    name: "Earth-Core Runtime",
    description:
      "Sovereign deep-core cinematic theme for infrastructure, governance, reliability, and root trust surfaces.",
    targetUsers: ["platform owners", "governance teams", "infrastructure reviewers"],
    accessibilityProfile: ["focus-first", "structured"],
    motionProfile: "data-driven",
    colorTokens: {
      background: "#050806",
      surface: "#10140d",
      surfaceAlt: "#1c2015",
      primary: "#d9a441",
      secondary: "#77b255",
      accent: "#c78c3b",
      glow: "rgba(217, 164, 65, 0.24)"
    },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet", "kiosk"],
    runtimeModes: ["security", "operator", "leadership"],
    chakraMapping: ["root", "solar"],
    aiAssistantMode: "operator",
    recommendedFor: ["infrastructure", "governance", "PHKD evidence"],
    avoidFor: ["playful child pages"],
    cssVariables: { "--maataa-cinematic-mode": "earth-core" }
  })
] as const;

export type CinematicThemeId =
  | "cinematic-cinematic"
  | "cinematic-quantum"
  | "cinematic-dhyaan"
  | "cinematic-earth-runtime"
  | "cinematic-fire-runtime"
  | "cinematic-water-runtime"
  | "cinematic-air-runtime"
  | "cinematic-earth-core-runtime";
