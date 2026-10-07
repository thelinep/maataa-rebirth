import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme
} from "./types.ts";

type EmotionThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function emotionTheme(theme: EmotionThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = BASE_TYPOGRAPHY_TOKENS;
  return createMaataaTheme({
    ...theme,
    family: "EMOTION_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const EMOTION_THEMES = [
  emotionTheme({
    id: "emotion-calm",
    name: "Calm",
    description: "Low-stimulation emotional palette for slower learning, reflection, and reduced pressure.",
    targetUsers: ["reflective learners", "wellness users"],
    accessibilityProfile: ["reduced-motion", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#f5f0e5", surface: "#fffaf1", text: "#243024", primary: "#66845a", secondary: "#b89248", accent: "#86a184", glow: "rgba(102, 132, 90, 0.14)" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["wisdom", "legacy"],
    chakraMapping: ["heart"],
    aiAssistantMode: "sage",
    recommendedFor: ["wellness", "journaling", "quiet lessons"],
    avoidFor: ["high-velocity operations"],
    cssVariables: { "--maataa-emotion": "calm" }
  }),
  emotionTheme({
    id: "emotion-focused",
    name: "Focused",
    description: "Attention-first theme for deep work, fewer competing accents, and strong active task hierarchy.",
    targetUsers: ["students", "writers", "developers"],
    accessibilityProfile: ["focus-first"],
    motionProfile: "standard",
    colorTokens: { background: "#061018", surface: "#0c1722", primary: "#44d7b6", secondary: "#5aa9ff", accent: "#f2b84b" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "innovation"],
    chakraMapping: ["solar", "third-eye"],
    aiAssistantMode: "mentor",
    recommendedFor: ["coding", "study blocks", "forms"],
    avoidFor: ["festival or celebration screens"],
    cssVariables: { "--maataa-emotion": "focused" }
  }),
  emotionTheme({
    id: "emotion-creative",
    name: "Creative",
    description: "Expressive color theme for studios, storyboards, design spaces, and playful creative momentum.",
    targetUsers: ["creators", "students", "designers"],
    accessibilityProfile: ["adult-standard", "teen-safe"],
    motionProfile: "cinematic",
    colorTokens: { background: "#10071f", surface: "#1a1030", primary: "#ff5fa2", secondary: "#8f5cff", accent: "#ffbf4d", glow: "rgba(255, 95, 162, 0.3)" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "identity"],
    chakraMapping: ["sacral", "throat"],
    aiAssistantMode: "mentor",
    recommendedFor: ["design studio", "story creation", "music and media"],
    avoidFor: ["formal audit consoles"],
    cssVariables: { "--maataa-emotion": "creative" }
  }),
  emotionTheme({
    id: "emotion-rest-mode",
    name: "Rest Mode",
    description: "Evening-safe theme with darker low-brightness surfaces, reduced contrast spikes, and gentle status cues.",
    targetUsers: ["night learners", "low-light users"],
    accessibilityProfile: ["reduced-motion", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#040711", surface: "#0a1020", text: "#dfe7ff", muted: "#8d98b8", primary: "#7aa2ff", secondary: "#8f7cff", accent: "#f0b36a", glow: "rgba(122, 162, 255, 0.14)" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "wearable"],
    runtimeModes: ["wisdom", "offline"],
    chakraMapping: ["crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["night reading", "sleep-safe prompts", "reflection"],
    avoidFor: ["daylight kiosk screens"],
    cssVariables: { "--maataa-emotion": "rest" }
  }),
  emotionTheme({
    id: "emotion-energized",
    name: "Energized",
    description: "High-energy theme for challenges, streaks, launch panels, and momentum-heavy learning.",
    targetUsers: ["challenge learners", "young builders"],
    accessibilityProfile: ["teen-safe"],
    motionProfile: "standard",
    colorTokens: { background: "#070712", surface: "#111126", primary: "#ff7a18", secondary: "#00d4ff", accent: "#ffd166", glow: "rgba(255, 122, 24, 0.3)" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["creation", "innovation"],
    chakraMapping: ["solar"],
    aiAssistantMode: "friendly",
    recommendedFor: ["daily missions", "badges", "launch screens"],
    avoidFor: ["calm reading", "elder assist"],
    cssVariables: { "--maataa-emotion": "energized" }
  }),
  emotionTheme({
    id: "emotion-reflective",
    name: "Reflective",
    description: "Thoughtful theme for wisdom notes, personal progress, archive review, and contemplative dashboards.",
    targetUsers: ["learners", "elders", "researchers"],
    accessibilityProfile: ["structured", "elder-readable"],
    motionProfile: "gentle",
    colorTokens: { background: "#0c1018", surface: "#151b25", primary: "#c6a15b", secondary: "#7fb3a6", accent: "#b3a2ff", glow: "rgba(198, 161, 91, 0.18)" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["wisdom", "legacy", "discovery"],
    chakraMapping: ["heart", "third-eye"],
    aiAssistantMode: "sage",
    recommendedFor: ["journals", "archives", "review loops"],
    avoidFor: ["rapid status operations"],
    cssVariables: { "--maataa-emotion": "reflective" }
  })
] as const;

export type EmotionThemeId =
  | "emotion-calm"
  | "emotion-focused"
  | "emotion-creative"
  | "emotion-rest-mode"
  | "emotion-energized"
  | "emotion-reflective";
