export declare const THEME_FAMILIES: readonly [
  "AGE_THEMES",
  "ACCESSIBILITY_THEMES",
  "RUNTIME_THEMES",
  "AI_THEMES",
  "DEVICE_THEMES",
  "EMOTION_THEMES",
  "LANGUAGE_THEMES",
  "NETWORK_THEMES",
  "CHAKRA_THEMES",
  "OPERATOR_THEMES",
  "CINEMATIC_THEMES"
];
export type ThemeFamily = (typeof THEME_FAMILIES)[number];
export type LayoutDensity = "playful" | "comfortable" | "standard" | "compact" | "dense" | "mission-control";
export type MotionProfile = "gentle" | "reduced" | "standard" | "cinematic" | "data-driven";
export type AccessibilityProfile =
  | "early-child"
  | "child-safe"
  | "teen-safe"
  | "adult-standard"
  | "elder-readable"
  | "low-vision"
  | "reduced-motion"
  | "focus-first"
  | "structured"
  | "offline-lite";
export type DeviceSupport = "mobile" | "tablet" | "desktop" | "tv" | "wearable" | "kiosk";
export type RuntimeMode =
  | "wonder"
  | "exploration"
  | "discovery"
  | "identity"
  | "creation"
  | "innovation"
  | "leadership"
  | "wisdom"
  | "legacy"
  | "operator"
  | "offline"
  | "cinematic"
  | "analytics"
  | "security";
export type ChakraKey = "root" | "sacral" | "solar" | "heart" | "throat" | "third-eye" | "crown" | "none";
export type AIAssistantMode = "none" | "friendly" | "mentor" | "operator" | "sage" | "guardian";
export type ColorTokens = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  glow: string;
};
export type TypographyTokens = {
  headingFont: string;
  bodyFont: string;
  numericFont: string;
  baseSize: string;
  headingWeight: number;
  bodyWeight: number;
  letterSpacing: string;
  lineHeight: string;
};
export type CSSVariableMap = Record<`--${string}`, string>;
export type MaataaTheme = {
  id: string;
  name: string;
  family: ThemeFamily;
  description: string;
  targetUsers: readonly string[];
  accessibilityProfile: readonly AccessibilityProfile[];
  motionProfile: MotionProfile;
  colorTokens: ColorTokens;
  typographyTokens: TypographyTokens;
  layoutDensity: LayoutDensity;
  deviceSupport: readonly DeviceSupport[];
  runtimeModes: readonly RuntimeMode[];
  chakraMapping: readonly ChakraKey[];
  aiAssistantMode: AIAssistantMode;
  recommendedFor: readonly string[];
  avoidFor: readonly string[];
  cssVariables: CSSVariableMap;
};
export type ThemeProfile = {
  age?: number;
  accessibility?: readonly AccessibilityProfile[];
  device?: DeviceSupport;
  network?: "offline" | "2g" | "4g" | "wifi" | "low-data";
  chakra?: ChakraKey;
  runtimeMode?: RuntimeMode;
  aiAssistantMode?: AIAssistantMode;
  language?: string;
};
export type ThemeStackInput = ThemeProfile & {
  themeIds?: readonly string[];
  families?: readonly ThemeFamily[];
};
export type ResolvedThemeStack = {
  themes: readonly MaataaTheme[];
  ids: readonly string[];
  families: readonly ThemeFamily[];
  cssVariables: CSSVariableMap;
};
export declare const BASE_COLOR_TOKENS: {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  glow: string;
};
export declare const BASE_TYPOGRAPHY_TOKENS: {
  headingFont: string;
  bodyFont: string;
  numericFont: string;
  baseSize: string;
  headingWeight: number;
  bodyWeight: number;
  letterSpacing: string;
  lineHeight: string;
};
export declare function createMaataaTheme<const Theme extends MaataaTheme>(theme: Theme): Theme;
export declare function createCSSVariables(theme: {
  colorTokens: ColorTokens;
  typographyTokens: TypographyTokens;
  layoutDensity: LayoutDensity;
  motionProfile: MotionProfile;
  cssVariables?: CSSVariableMap;
}): CSSVariableMap;
//# sourceMappingURL=types.d.ts.map
