export const THEME_FAMILIES = [
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
] as const;

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

export const BASE_COLOR_TOKENS = {
  background: "#06111f",
  surface: "#0b1727",
  surfaceAlt: "#132235",
  text: "#f8efe1",
  muted: "#a7b0bd",
  primary: "#d9a441",
  secondary: "#6eb7ff",
  accent: "#8f5cff",
  success: "#45c77d",
  warning: "#f4b84c",
  danger: "#ef5b5b",
  border: "rgba(217, 164, 65, 0.32)",
  glow: "rgba(217, 164, 65, 0.28)"
} satisfies ColorTokens;

export const BASE_TYPOGRAPHY_TOKENS = {
  headingFont: "Inter, ui-sans-serif, system-ui",
  bodyFont: "Inter, ui-sans-serif, system-ui",
  numericFont: "JetBrains Mono, ui-monospace, SFMono-Regular",
  baseSize: "16px",
  headingWeight: 700,
  bodyWeight: 500,
  letterSpacing: "0",
  lineHeight: "1.5"
} satisfies TypographyTokens;

export function createMaataaTheme<const Theme extends MaataaTheme>(theme: Theme): Theme {
  return theme;
}

export function createCSSVariables(theme: {
  colorTokens: ColorTokens;
  typographyTokens: TypographyTokens;
  layoutDensity: LayoutDensity;
  motionProfile: MotionProfile;
  cssVariables?: CSSVariableMap;
}): CSSVariableMap {
  return {
    "--maataa-bg": theme.colorTokens.background,
    "--maataa-surface": theme.colorTokens.surface,
    "--maataa-surface-alt": theme.colorTokens.surfaceAlt,
    "--maataa-text": theme.colorTokens.text,
    "--maataa-muted": theme.colorTokens.muted,
    "--maataa-primary": theme.colorTokens.primary,
    "--maataa-secondary": theme.colorTokens.secondary,
    "--maataa-accent": theme.colorTokens.accent,
    "--maataa-success": theme.colorTokens.success,
    "--maataa-warning": theme.colorTokens.warning,
    "--maataa-danger": theme.colorTokens.danger,
    "--maataa-border": theme.colorTokens.border,
    "--maataa-glow": theme.colorTokens.glow,
    "--maataa-font-heading": theme.typographyTokens.headingFont,
    "--maataa-font-body": theme.typographyTokens.bodyFont,
    "--maataa-font-numeric": theme.typographyTokens.numericFont,
    "--maataa-base-size": theme.typographyTokens.baseSize,
    "--maataa-heading-weight": String(theme.typographyTokens.headingWeight),
    "--maataa-body-weight": String(theme.typographyTokens.bodyWeight),
    "--maataa-letter-spacing": theme.typographyTokens.letterSpacing,
    "--maataa-line-height": theme.typographyTokens.lineHeight,
    "--maataa-layout-density": theme.layoutDensity,
    "--maataa-motion-profile": theme.motionProfile,
    ...(theme.cssVariables ?? {})
  };
}
