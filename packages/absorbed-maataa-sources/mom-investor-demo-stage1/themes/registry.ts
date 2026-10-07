import { ACCESSIBILITY_THEMES, type AccessibilityThemeId } from "./accessibility-themes.ts";
import { AGE_THEMES, type AgeThemeId } from "./age-themes.ts";
import { AI_THEMES, type AIThemeId } from "./ai-themes.ts";
import { CHAKRA_THEMES, type ChakraThemeId } from "./chakra-themes.ts";
import { CINEMATIC_THEMES, type CinematicThemeId } from "./cinematic-themes.ts";
import { DEVICE_THEMES, type DeviceThemeId } from "./device-themes.ts";
import { EMOTION_THEMES, type EmotionThemeId } from "./emotion-themes.ts";
import { LANGUAGE_THEMES, type LanguageThemeId } from "./language-themes.ts";
import { NETWORK_THEMES, type NetworkThemeId } from "./network-themes.ts";
import { OPERATOR_THEMES, type OperatorThemeId } from "./operator-themes.ts";
import { RUNTIME_THEMES, type RuntimeThemeId } from "./runtime-themes.ts";
import {
  THEME_FAMILIES,
  type CSSVariableMap,
  type MaataaTheme,
  type ResolvedThemeStack,
  type ThemeFamily,
  type ThemeProfile,
  type ThemeStackInput
} from "./types.ts";

export type ThemeId =
  | AgeThemeId
  | AccessibilityThemeId
  | RuntimeThemeId
  | AIThemeId
  | DeviceThemeId
  | EmotionThemeId
  | LanguageThemeId
  | NetworkThemeId
  | ChakraThemeId
  | OperatorThemeId
  | CinematicThemeId;

export const THEME_REGISTRY = [
  ...AGE_THEMES,
  ...ACCESSIBILITY_THEMES,
  ...RUNTIME_THEMES,
  ...AI_THEMES,
  ...DEVICE_THEMES,
  ...EMOTION_THEMES,
  ...LANGUAGE_THEMES,
  ...NETWORK_THEMES,
  ...CHAKRA_THEMES,
  ...OPERATOR_THEMES,
  ...CINEMATIC_THEMES
] as const satisfies readonly MaataaTheme[];

const THEME_LOOKUP = new Map<string, MaataaTheme>(THEME_REGISTRY.map((theme) => [theme.id, theme]));

export function getThemeById(id: ThemeId | string): MaataaTheme | undefined {
  return THEME_LOOKUP.get(id);
}

export function getThemesByFamily(family: ThemeFamily): readonly MaataaTheme[] {
  return THEME_REGISTRY.filter((theme) => theme.family === family);
}

export function themeToCSSVariables(theme: MaataaTheme | ThemeId | string | undefined): CSSVariableMap {
  const resolved = typeof theme === "string" ? getThemeById(theme) : theme;
  return resolved ? { ...resolved.cssVariables } : {};
}

export function getRecommendedThemes(profile: ThemeProfile = {}): readonly MaataaTheme[] {
  const scored = THEME_REGISTRY.map((theme) => ({
    theme,
    score: scoreTheme(theme, profile)
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.theme.id.localeCompare(b.theme.id));

  if (scored.length > 0) {
    return scored.map(({ theme }) => theme);
  }

  return [
    getThemeById("age-nexus"),
    getThemeById("runtime-standard"),
    getThemeById("device-desktop-runtime"),
    getThemeById("network-standard-4g")
  ].filter((theme): theme is MaataaTheme => Boolean(theme));
}

export function resolveThemeStack(input: ThemeStackInput = {}): ResolvedThemeStack {
  const selected: MaataaTheme[] = [];

  for (const id of input.themeIds ?? []) {
    const theme = getThemeById(id);
    if (theme) selected.push(theme);
  }

  for (const family of input.families ?? []) {
    const familyTheme = getThemesByFamily(family)[0];
    if (familyTheme) selected.push(familyTheme);
  }

  selected.push(...getRecommendedThemes(input).slice(0, 6));

  const themes = dedupeThemes(selected);
  const cssVariables = themes.reduce<CSSVariableMap>(
    (variables, theme) => ({ ...variables, ...theme.cssVariables }),
    {}
  );

  return {
    themes,
    ids: themes.map((theme) => theme.id),
    families: [...new Set(themes.map((theme) => theme.family))],
    cssVariables
  };
}

export function getThemeFamilies(): readonly ThemeFamily[] {
  return THEME_FAMILIES;
}

function scoreTheme(theme: MaataaTheme, profile: ThemeProfile): number {
  let score = 0;

  if (typeof profile.age === "number") {
    const age = profile.age;
    if (age <= 5 && theme.id === "age-bloom") score += 12;
    if (age >= 5 && age <= 9 && theme.id === "age-spark") score += 12;
    if (age >= 10 && age <= 13 && theme.id === "age-pulse-junior") score += 12;
    if (age >= 13 && age <= 18 && theme.id === "age-pulse") score += 12;
    if (age >= 19 && age <= 30 && theme.id === "age-runtime") score += 12;
    if (age >= 31 && age <= 50 && theme.id === "age-nexus") score += 12;
    if (age >= 50 && theme.id === "age-sattva") score += 12;
  }

  if (profile.device && theme.deviceSupport.includes(profile.device)) score += 3;
  if (profile.runtimeMode && theme.runtimeModes.includes(profile.runtimeMode)) score += 4;
  if (profile.chakra && theme.chakraMapping.includes(profile.chakra)) score += 4;
  if (profile.aiAssistantMode && theme.aiAssistantMode === profile.aiAssistantMode) score += 3;
  if (profile.accessibility?.some((item) => theme.accessibilityProfile.includes(item))) score += 5;

  if (profile.network === "offline" && theme.id === "network-offline") score += 10;
  if (profile.network === "2g" && theme.id === "network-lite-2g") score += 10;
  if (profile.network === "4g" && theme.id === "network-standard-4g") score += 10;
  if (profile.network === "wifi" && theme.id === "network-wifi-cinematic") score += 10;
  if (profile.network === "low-data" && theme.id === "network-low-data-mode") score += 10;

  if (profile.language) {
    const language = profile.language.toLowerCase();
    if (language === "en" && theme.id === "language-english-runtime") score += 8;
    if ((language === "hi" || language === "hindi") && theme.id === "language-hindi-runtime") score += 8;
    if (language.includes("devanagari") && theme.id === "language-devanagari-optimized") score += 8;
    if (language.includes("rtl") && theme.id === "language-rtl-runtime") score += 8;
    if (language.includes("brahmi") && theme.id === "language-brahmi-inspired") score += 8;
  }

  return score;
}

function dedupeThemes(themes: readonly MaataaTheme[]): readonly MaataaTheme[] {
  const seen = new Set<string>();
  const result: MaataaTheme[] = [];

  for (const theme of themes) {
    if (seen.has(theme.id)) continue;
    seen.add(theme.id);
    result.push(theme);
  }

  return result;
}
