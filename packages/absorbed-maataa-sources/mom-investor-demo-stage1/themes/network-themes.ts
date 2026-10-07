import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme
} from "./types.ts";

type NetworkThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function networkTheme(theme: NetworkThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = BASE_TYPOGRAPHY_TOKENS;
  return createMaataaTheme({
    ...theme,
    family: "NETWORK_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const NETWORK_THEMES = [
  networkTheme({
    id: "network-offline",
    name: "Offline",
    description: "Fully offline-safe theme emphasizing cache state, local persistence, and unavailable network clarity.",
    targetUsers: ["offline users", "field teams"],
    accessibilityProfile: ["offline-lite", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#08100c", surface: "#101a13", primary: "#80b95b", secondary: "#d9a441", accent: "#56c2a3", glow: "transparent" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop", "kiosk"],
    runtimeModes: ["offline"],
    chakraMapping: ["root"],
    aiAssistantMode: "none",
    recommendedFor: ["cached lessons", "sync status", "local-first workflows"],
    avoidFor: ["live streams", "real-time telemetry"],
    cssVariables: { "--maataa-network": "offline", "--maataa-asset-policy": "local-only" }
  }),
  networkTheme({
    id: "network-lite-2g",
    name: "Lite 2G",
    description: "Low-data theme with reduced media, simplified shadows, deferred visuals, and compact layout.",
    targetUsers: ["2G users", "low data users"],
    accessibilityProfile: ["offline-lite", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#071016", surface: "#0d1820", primary: "#f1b84b", secondary: "#5fc9b4", glow: "transparent" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet"],
    runtimeModes: ["offline", "discovery"],
    chakraMapping: ["root"],
    aiAssistantMode: "none",
    recommendedFor: ["low-bandwidth routes", "text-first screens"],
    avoidFor: ["video-heavy pages", "large canvas scenes"],
    cssVariables: { "--maataa-network": "2g", "--maataa-media-quality": "minimal" }
  }),
  networkTheme({
    id: "network-standard-4g",
    name: "Standard 4G",
    description: "Balanced network theme for ordinary mobile and desktop browsing with adaptive media and normal interaction.",
    targetUsers: ["standard mobile users", "desktop users"],
    accessibilityProfile: ["adult-standard"],
    motionProfile: "standard",
    colorTokens: { primary: "#d9a441", secondary: "#5eb1bf", accent: "#8f5cff" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["discovery", "creation"],
    chakraMapping: ["solar"],
    aiAssistantMode: "mentor",
    recommendedFor: ["general app usage", "standard media"],
    avoidFor: ["offline-only installs"],
    cssVariables: { "--maataa-network": "4g", "--maataa-media-quality": "adaptive" }
  }),
  networkTheme({
    id: "network-wifi-cinematic",
    name: "WiFi Cinematic",
    description: "High-bandwidth theme for rich visual previews, video-safe sections, and cinematic runtime surfaces.",
    targetUsers: ["WiFi users", "presentation viewers"],
    accessibilityProfile: ["adult-standard"],
    motionProfile: "cinematic",
    colorTokens: { background: "#030712", surface: "#0a1020", primary: "#f2b84b", secondary: "#9b5cff", accent: "#00d4ff", glow: "rgba(242, 184, 75, 0.32)" },
    layoutDensity: "standard",
    deviceSupport: ["desktop", "tablet", "tv"],
    runtimeModes: ["cinematic", "innovation"],
    chakraMapping: ["crown"],
    aiAssistantMode: "mentor",
    recommendedFor: ["hero pages", "visual previews", "demo screens"],
    avoidFor: ["2G routes", "offline-first field mode"],
    cssVariables: { "--maataa-network": "wifi", "--maataa-media-quality": "cinematic" }
  }),
  networkTheme({
    id: "network-low-data-mode",
    name: "Low Data Mode",
    description: "Explicit data-saving theme that keeps layouts useful while reducing image density and background effects.",
    targetUsers: ["metered connection users", "budget data users"],
    accessibilityProfile: ["offline-lite", "focus-first"],
    motionProfile: "reduced",
    colorTokens: { background: "#071016", surface: "#101922", primary: "#55d6be", secondary: "#d9a441", glow: "transparent" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["offline", "discovery"],
    chakraMapping: ["root"],
    aiAssistantMode: "none",
    recommendedFor: ["metered plans", "fast route readiness", "text-first cards"],
    avoidFor: ["cinematic experiences"],
    cssVariables: { "--maataa-network": "low-data", "--maataa-media-quality": "reduced" }
  })
] as const;

export type NetworkThemeId =
  | "network-offline"
  | "network-lite-2g"
  | "network-standard-4g"
  | "network-wifi-cinematic"
  | "network-low-data-mode";
