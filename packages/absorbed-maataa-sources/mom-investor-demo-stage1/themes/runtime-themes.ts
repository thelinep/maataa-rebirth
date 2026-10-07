import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme,
  type TypographyTokens
} from "./types.ts";

type RuntimeThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  typographyTokens?: Partial<TypographyTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function runtimeTheme(theme: RuntimeThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = { ...BASE_TYPOGRAPHY_TOKENS, ...theme.typographyTokens };
  return createMaataaTheme({
    ...theme,
    family: "RUNTIME_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const RUNTIME_THEMES = [
  runtimeTheme({
    id: "runtime-minimal",
    name: "Minimal",
    description: "Low-noise runtime theme for clean reading, basic navigation, and focused task completion.",
    targetUsers: ["general users", "low-distraction users"],
    accessibilityProfile: ["focus-first", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#0a0f14", surface: "#111820", surfaceAlt: "#19222c", primary: "#d9a441", secondary: "#94a3b8", accent: "#f1c76a", border: "rgba(217, 164, 65, 0.24)", glow: "transparent" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["offline", "discovery"],
    chakraMapping: ["root"],
    aiAssistantMode: "none",
    recommendedFor: ["fast loading", "simple readers", "offline views"],
    avoidFor: ["mission-control dashboards"],
    cssVariables: { "--maataa-chrome-level": "minimal" }
  }),
  runtimeTheme({
    id: "runtime-standard",
    name: "Standard Runtime",
    description: "Default Maataa runtime theme balancing navigation, cards, status, learning, and creation surfaces.",
    targetUsers: ["all standard users", "teams", "learners"],
    accessibilityProfile: ["adult-standard", "structured"],
    motionProfile: "standard",
    colorTokens: { primary: "#d9a441", secondary: "#5eb1bf", accent: "#8f5cff", border: "rgba(217, 164, 65, 0.32)", glow: "rgba(217, 164, 65, 0.22)" },
    layoutDensity: "standard",
    deviceSupport: ["mobile", "tablet", "desktop"],
    runtimeModes: ["discovery", "creation", "leadership"],
    chakraMapping: ["solar", "heart"],
    aiAssistantMode: "mentor",
    recommendedFor: ["core app shells", "onboarding", "dashboards"],
    avoidFor: ["child-only play spaces", "security command center"],
    cssVariables: { "--maataa-chrome-level": "standard" }
  }),
  runtimeTheme({
    id: "runtime-matrix",
    name: "Runtime Matrix",
    description: "Dense matrix theme for operators reviewing gates, telemetry, readiness, dependency graphs, and evidence artifacts.",
    targetUsers: ["release operators", "platform teams", "runtime maintainers"],
    accessibilityProfile: ["focus-first", "structured"],
    motionProfile: "data-driven",
    colorTokens: { background: "#020810", surface: "#07131f", surfaceAlt: "#0e2133", primary: "#f0a93a", secondary: "#00d4ff", accent: "#7dd3fc", border: "rgba(240, 169, 58, 0.38)", glow: "rgba(0, 212, 255, 0.22)" },
    typographyTokens: { numericFont: "JetBrains Mono, ui-monospace", baseSize: "15px" },
    layoutDensity: "mission-control",
    deviceSupport: ["desktop", "tablet", "tv"],
    runtimeModes: ["operator", "analytics", "security"],
    chakraMapping: ["solar", "third-eye"],
    aiAssistantMode: "operator",
    recommendedFor: ["gate matrices", "runtime verification", "release evidence"],
    avoidFor: ["child modes", "casual landing pages"],
    cssVariables: { "--maataa-chrome-level": "matrix" }
  }),
  runtimeTheme({
    id: "runtime-offline",
    name: "Offline Runtime",
    description: "Offline-first theme optimized for local cache state, sync indicators, low data usage, and resilient field operation.",
    targetUsers: ["field users", "rural users", "offline operators"],
    accessibilityProfile: ["offline-lite", "structured"],
    motionProfile: "reduced",
    colorTokens: { background: "#07120e", surface: "#0f1d16", surfaceAlt: "#17271e", primary: "#80b95b", secondary: "#d6a84f", accent: "#56c2a3", border: "rgba(128, 185, 91, 0.32)", glow: "rgba(128, 185, 91, 0.16)" },
    layoutDensity: "compact",
    deviceSupport: ["mobile", "tablet", "desktop", "kiosk"],
    runtimeModes: ["offline", "operator"],
    chakraMapping: ["root", "heart"],
    aiAssistantMode: "none",
    recommendedFor: ["low bandwidth", "sync status", "offline content"],
    avoidFor: ["live telemetry claims", "streaming-heavy pages"],
    cssVariables: { "--maataa-network-mode": "offline" }
  }),
  runtimeTheme({
    id: "runtime-topology",
    name: "Topology Runtime",
    description: "Graph-first theme for semantic runtime maps, dependency constellations, relationship explorers, and observatory topology.",
    targetUsers: ["architects", "researchers", "runtime graph explorers"],
    accessibilityProfile: ["adult-standard", "focus-first"],
    motionProfile: "cinematic",
    colorTokens: { background: "#030712", surface: "#0a1020", surfaceAlt: "#101936", primary: "#9b5cff", secondary: "#00d4ff", accent: "#fbbf24", border: "rgba(155, 92, 255, 0.36)", glow: "rgba(155, 92, 255, 0.34)" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet", "tv"],
    runtimeModes: ["analytics", "innovation", "operator"],
    chakraMapping: ["third-eye", "crown"],
    aiAssistantMode: "operator",
    recommendedFor: ["runtime graphs", "knowledge topology", "dependency tracing"],
    avoidFor: ["young learner dashboards"],
    cssVariables: { "--maataa-graph-edge-opacity": "0.72" }
  }),
  runtimeTheme({
    id: "runtime-sovereign",
    name: "Sovereign Runtime",
    description: "Governance-first theme for PHKD boundaries, trust, privacy, evidence, activation safety, and independent infrastructure.",
    targetUsers: ["governance teams", "security operators", "platform owners"],
    accessibilityProfile: ["structured", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: { background: "#040b12", surface: "#09151f", surfaceAlt: "#122334", primary: "#f2b84b", secondary: "#55d6be", accent: "#8aa0ff", success: "#4ade80", border: "rgba(242, 184, 75, 0.42)", glow: "rgba(85, 214, 190, 0.22)" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet", "kiosk"],
    runtimeModes: ["security", "operator", "leadership"],
    chakraMapping: ["root", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["PHKD gates", "audit centers", "entitlements", "security dashboards"],
    avoidFor: ["play-first child experiences"],
    cssVariables: { "--maataa-governance-mode": "sovereign" }
  })
] as const;

export type RuntimeThemeId =
  | "runtime-minimal"
  | "runtime-standard"
  | "runtime-matrix"
  | "runtime-offline"
  | "runtime-topology"
  | "runtime-sovereign";
