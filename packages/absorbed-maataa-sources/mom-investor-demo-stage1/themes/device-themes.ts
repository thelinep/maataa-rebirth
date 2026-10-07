import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type DeviceSupport,
  type MaataaTheme
} from "./types.ts";

type DeviceThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables" | "deviceSupport"> & {
  colorTokens: Partial<ColorTokens>;
  device: DeviceSupport;
  cssVariables?: MaataaTheme["cssVariables"];
};

function deviceTheme(theme: DeviceThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = BASE_TYPOGRAPHY_TOKENS;
  return createMaataaTheme({
    ...theme,
    family: "DEVICE_THEMES",
    deviceSupport: [theme.device],
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const DEVICE_THEMES = [
  deviceTheme({
    id: "device-mobile-runtime",
    name: "Mobile Runtime",
    description: "Single-column touch-first runtime with bottom navigation, compact cards, and thumb-safe actions.",
    targetUsers: ["mobile users"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: { primary: "#d9a441", secondary: "#4fc3f7" },
    layoutDensity: "compact",
    device: "mobile",
    runtimeModes: ["discovery", "offline"],
    chakraMapping: ["root"],
    aiAssistantMode: "friendly",
    recommendedFor: ["phones", "quick actions", "offline use"],
    avoidFor: ["wide matrix dashboards"],
    cssVariables: { "--maataa-shell-width": "100vw", "--maataa-nav-placement": "bottom" }
  }),
  deviceTheme({
    id: "device-tablet-runtime",
    name: "Tablet Runtime",
    description: "Hybrid touch runtime with split panels, learning cards, and moderate dashboard density.",
    targetUsers: ["tablet users", "classrooms"],
    accessibilityProfile: ["structured"],
    motionProfile: "standard",
    colorTokens: { primary: "#8f5cff", secondary: "#55d6be" },
    layoutDensity: "standard",
    device: "tablet",
    runtimeModes: ["exploration", "creation"],
    chakraMapping: ["heart"],
    aiAssistantMode: "mentor",
    recommendedFor: ["classroom use", "creative work", "split panels"],
    avoidFor: ["desktop-only command centers"],
    cssVariables: { "--maataa-shell-width": "768px", "--maataa-nav-placement": "side-or-bottom" }
  }),
  deviceTheme({
    id: "device-desktop-runtime",
    name: "Desktop Runtime",
    description: "Full dashboard runtime with side navigation, top bar, dense grids, and multi-panel orchestration.",
    targetUsers: ["desktop users", "operators", "builders"],
    accessibilityProfile: ["adult-standard", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: { primary: "#d9a441", secondary: "#00d4ff" },
    layoutDensity: "dense",
    device: "desktop",
    runtimeModes: ["operator", "innovation", "analytics"],
    chakraMapping: ["solar", "third-eye"],
    aiAssistantMode: "operator",
    recommendedFor: ["dashboards", "graphs", "release evidence"],
    avoidFor: ["watch-sized cards"],
    cssVariables: { "--maataa-shell-width": "1280px", "--maataa-nav-placement": "side" }
  }),
  deviceTheme({
    id: "device-tv-runtime",
    name: "TV Runtime",
    description: "Large-screen runtime for glanceable cards, presentation panels, and remote-safe navigation.",
    targetUsers: ["living-room users", "classrooms", "command displays"],
    accessibilityProfile: ["low-vision", "structured"],
    motionProfile: "cinematic",
    colorTokens: { background: "#020712", primary: "#f2b84b", secondary: "#8aa0ff" },
    layoutDensity: "comfortable",
    device: "tv",
    runtimeModes: ["cinematic", "wisdom"],
    chakraMapping: ["crown"],
    aiAssistantMode: "sage",
    recommendedFor: ["presentation mode", "public dashboards", "education displays"],
    avoidFor: ["form-heavy workflows"],
    cssVariables: { "--maataa-shell-width": "1920px", "--maataa-min-target": "56px" }
  }),
  deviceTheme({
    id: "device-wearable-runtime",
    name: "Wearable Runtime",
    description: "Tiny-screen runtime for summary cards, daily reminders, health-safe prompts, and glanceable status.",
    targetUsers: ["watch users"],
    accessibilityProfile: ["structured", "offline-lite"],
    motionProfile: "reduced",
    colorTokens: { background: "#05070f", surface: "#11131d", primary: "#d9a441", secondary: "#45c77d" },
    layoutDensity: "compact",
    device: "wearable",
    runtimeModes: ["offline", "wisdom"],
    chakraMapping: ["heart"],
    aiAssistantMode: "friendly",
    recommendedFor: ["daily prompts", "status chips", "reminders"],
    avoidFor: ["full dashboards", "long-form reading"],
    cssVariables: { "--maataa-shell-width": "320px", "--maataa-card-max": "1" }
  }),
  deviceTheme({
    id: "device-kiosk-runtime",
    name: "Kiosk Runtime",
    description: "Public-device runtime with large controls, constrained navigation, session safety, and reset-friendly surfaces.",
    targetUsers: ["kiosk users", "public installations"],
    accessibilityProfile: ["low-vision", "structured"],
    motionProfile: "standard",
    colorTokens: { background: "#031014", primary: "#f2b84b", secondary: "#55d6be", danger: "#ef5b5b" },
    layoutDensity: "comfortable",
    device: "kiosk",
    runtimeModes: ["operator", "discovery"],
    chakraMapping: ["root", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["public terminals", "museum displays", "school kiosks"],
    avoidFor: ["private profile details", "payment screens"],
    cssVariables: { "--maataa-shell-width": "1440px", "--maataa-session-mode": "kiosk" }
  })
] as const;

export type DeviceThemeId =
  | "device-mobile-runtime"
  | "device-tablet-runtime"
  | "device-desktop-runtime"
  | "device-tv-runtime"
  | "device-wearable-runtime"
  | "device-kiosk-runtime";
