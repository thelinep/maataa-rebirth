import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme,
  type TypographyTokens
} from "./types.ts";

type LanguageThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  typographyTokens?: Partial<TypographyTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function languageTheme(theme: LanguageThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = { ...BASE_TYPOGRAPHY_TOKENS, ...theme.typographyTokens };
  return createMaataaTheme({
    ...theme,
    family: "LANGUAGE_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const LANGUAGE_THEMES = [
  languageTheme({
    id: "language-english-runtime",
    name: "English Runtime",
    description: "English-first theme for global learning, product pages, dashboards, and docs.",
    targetUsers: ["English readers", "global users"],
    accessibilityProfile: ["adult-standard"],
    motionProfile: "standard",
    colorTokens: { primary: "#d9a441", secondary: "#5eb1bf" },
    typographyTokens: { headingFont: "Inter, ui-sans-serif", bodyFont: "Inter, ui-sans-serif" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["discovery", "creation"],
    chakraMapping: ["throat"],
    aiAssistantMode: "mentor",
    recommendedFor: ["English UI", "documentation", "global readers"],
    avoidFor: ["RTL-only content"],
    cssVariables: { "--maataa-language": "en", "--maataa-text-direction": "ltr" }
  }),
  languageTheme({
    id: "language-hindi-runtime",
    name: "Hindi Runtime",
    description: "Hindi-first theme with Devanagari-safe typography, spacious labels, and bilingual fallback.",
    targetUsers: ["Hindi readers", "Bharat learners"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: { primary: "#f2b84b", secondary: "#57c4ad", accent: "#e67e22" },
    typographyTokens: { headingFont: "Noto Sans Devanagari, Mukta, ui-sans-serif", bodyFont: "Noto Sans Devanagari, Mukta, ui-sans-serif", baseSize: "17px", lineHeight: "1.65" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["discovery", "wisdom"],
    chakraMapping: ["throat", "heart"],
    aiAssistantMode: "mentor",
    recommendedFor: ["Hindi labels", "bilingual learning", "community pages"],
    avoidFor: ["Roman-only developer code snippets"],
    cssVariables: { "--maataa-language": "hi", "--maataa-text-direction": "ltr" }
  }),
  languageTheme({
    id: "language-devanagari-optimized",
    name: "Devanagari Optimized",
    description: "Script-optimized theme for Devanagari-heavy reading, line-height safety, and clear conjunct rendering.",
    targetUsers: ["Devanagari readers", "Sanskrit and Hindi learners"],
    accessibilityProfile: ["structured", "elder-readable"],
    motionProfile: "reduced",
    colorTokens: { background: "#fbf6eb", surface: "#fffdf7", text: "#21190f", primary: "#9b6a21", secondary: "#657b4a", accent: "#c69234" },
    typographyTokens: { headingFont: "Noto Serif Devanagari, Noto Sans Devanagari, serif", bodyFont: "Noto Sans Devanagari, Mukta, ui-sans-serif", baseSize: "18px", lineHeight: "1.8" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "legacy", "discovery"],
    chakraMapping: ["throat", "crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["long Devanagari text", "Sanskrit overlays", "script learning"],
    avoidFor: ["dense English code dashboards"],
    cssVariables: { "--maataa-language": "devanagari", "--maataa-text-direction": "ltr" }
  }),
  languageTheme({
    id: "language-multi-script-runtime",
    name: "Multi-Script Runtime",
    description: "Multi-script theme for Roman, Devanagari, Brahmi-inspired labels, and transliteration comparison.",
    targetUsers: ["language learners", "script researchers", "civilization runtime users"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: { background: "#06111f", primary: "#f2b84b", secondary: "#9b5cff", accent: "#55d6be" },
    typographyTokens: { headingFont: "Noto Sans, Noto Sans Devanagari, Inter, ui-sans-serif", bodyFont: "Noto Sans, Noto Sans Devanagari, Inter, ui-sans-serif", numericFont: "JetBrains Mono, ui-monospace" },
    layoutDensity: "dense",
    deviceSupport: ["tablet", "desktop", "tv"],
    runtimeModes: ["discovery", "wisdom", "analytics"],
    chakraMapping: ["throat", "third-eye"],
    aiAssistantMode: "mentor",
    recommendedFor: ["script switching", "transliteration panels", "language labs"],
    avoidFor: ["simple preschool UI"],
    cssVariables: { "--maataa-language": "multi", "--maataa-text-direction": "ltr" }
  }),
  languageTheme({
    id: "language-rtl-runtime",
    name: "RTL Runtime",
    description: "Right-to-left ready theme with mirrored spacing, navigation-safe ordering, and bilingual layout assumptions.",
    targetUsers: ["RTL readers", "Urdu and Arabic-script users"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: { primary: "#d9a441", secondary: "#7dd3fc", accent: "#b3a2ff" },
    typographyTokens: { headingFont: "Noto Naskh Arabic, Noto Sans Arabic, ui-sans-serif", bodyFont: "Noto Sans Arabic, ui-sans-serif", baseSize: "17px", lineHeight: "1.7" },
    layoutDensity: "comfortable",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["discovery", "wisdom"],
    chakraMapping: ["throat"],
    aiAssistantMode: "mentor",
    recommendedFor: ["RTL content", "bilingual layouts", "script research"],
    avoidFor: ["left-only timeline controls"],
    cssVariables: { "--maataa-language": "rtl", "--maataa-text-direction": "rtl" }
  }),
  languageTheme({
    id: "language-brahmi-inspired",
    name: "Brahmi Inspired",
    description: "Civilization-script theme inspired by Brahmi labels, ancient manuscript contrast, and script evolution learning.",
    targetUsers: ["Brahmi learners", "civilization researchers", "Hemant Samwat users"],
    accessibilityProfile: ["structured", "elder-readable"],
    motionProfile: "gentle",
    colorTokens: { background: "#120d08", surface: "#1f170d", surfaceAlt: "#2a1d10", text: "#f6dfb0", primary: "#d9a441", secondary: "#8f6b34", accent: "#f0c36d", border: "rgba(217, 164, 65, 0.42)", glow: "rgba(217, 164, 65, 0.25)" },
    typographyTokens: { headingFont: "Noto Serif, Noto Sans Brahmi, serif", bodyFont: "Noto Sans, Noto Sans Devanagari, ui-sans-serif", baseSize: "17px", lineHeight: "1.7" },
    layoutDensity: "standard",
    deviceSupport: ["tablet", "desktop", "tv"],
    runtimeModes: ["wisdom", "legacy", "discovery"],
    chakraMapping: ["crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["Brahmi overlays", "script heritage", "ancient manuscript cards"],
    avoidFor: ["fast data entry screens"],
    cssVariables: { "--maataa-language": "brahmi-inspired", "--maataa-script-mode": "heritage" }
  })
] as const;

export type LanguageThemeId =
  | "language-english-runtime"
  | "language-hindi-runtime"
  | "language-devanagari-optimized"
  | "language-multi-script-runtime"
  | "language-rtl-runtime"
  | "language-brahmi-inspired";
