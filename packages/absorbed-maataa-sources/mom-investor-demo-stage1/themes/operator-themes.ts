import {
  BASE_COLOR_TOKENS,
  BASE_TYPOGRAPHY_TOKENS,
  createCSSVariables,
  createMaataaTheme,
  type ColorTokens,
  type MaataaTheme
} from "./types.ts";

type OperatorThemeInput = Omit<MaataaTheme, "family" | "colorTokens" | "typographyTokens" | "cssVariables"> & {
  colorTokens: Partial<ColorTokens>;
  cssVariables?: MaataaTheme["cssVariables"];
};

function operatorTheme(theme: OperatorThemeInput): MaataaTheme {
  const colorTokens = { ...BASE_COLOR_TOKENS, ...theme.colorTokens };
  const typographyTokens = { ...BASE_TYPOGRAPHY_TOKENS, numericFont: "JetBrains Mono, ui-monospace" };
  return createMaataaTheme({
    ...theme,
    family: "OPERATOR_THEMES",
    colorTokens,
    typographyTokens,
    cssVariables: createCSSVariables({ colorTokens, typographyTokens, layoutDensity: theme.layoutDensity, motionProfile: theme.motionProfile, cssVariables: theme.cssVariables })
  });
}

export const OPERATOR_THEMES = [
  operatorTheme({
    id: "operator-admin-console",
    name: "Admin Console",
    description: "Administrative theme for tenant settings, access review, configuration, and controlled runtime management.",
    targetUsers: ["admins", "tenant operators"],
    accessibilityProfile: ["structured", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: { background: "#030b13", surface: "#0a1520", primary: "#f2b84b", secondary: "#55d6be" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet"],
    runtimeModes: ["operator", "security"],
    chakraMapping: ["root", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["RBAC", "tenant config", "audit logs"],
    avoidFor: ["public landing pages", "child mode"],
    cssVariables: { "--maataa-operator-mode": "admin" }
  }),
  operatorTheme({
    id: "operator-analytics-console",
    name: "Analytics Console",
    description: "Data-dense theme for charts, cohort summaries, activity trends, and evidence dashboards.",
    targetUsers: ["analysts", "researchers", "operators"],
    accessibilityProfile: ["focus-first"],
    motionProfile: "data-driven",
    colorTokens: { background: "#020714", primary: "#00d4ff", secondary: "#8f5cff", accent: "#f2b84b" },
    layoutDensity: "mission-control",
    deviceSupport: ["desktop", "tablet", "tv"],
    runtimeModes: ["analytics", "operator"],
    chakraMapping: ["third-eye"],
    aiAssistantMode: "operator",
    recommendedFor: ["graphs", "metrics", "runtime health"],
    avoidFor: ["preschool cards"],
    cssVariables: { "--maataa-operator-mode": "analytics" }
  }),
  operatorTheme({
    id: "operator-status-matrix",
    name: "Status Matrix",
    description: "Status-first console for service health, queues, route readiness, and deterministic verification outcomes.",
    targetUsers: ["SRE", "release teams", "runtime operators"],
    accessibilityProfile: ["structured", "focus-first"],
    motionProfile: "data-driven",
    colorTokens: { background: "#020b10", primary: "#f2b84b", secondary: "#45c77d", accent: "#00d4ff", danger: "#ef5b5b" },
    layoutDensity: "mission-control",
    deviceSupport: ["desktop", "tv", "kiosk"],
    runtimeModes: ["operator", "security", "analytics"],
    chakraMapping: ["solar", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["uptime", "route readiness", "SSE monitoring"],
    avoidFor: ["consumer onboarding"],
    cssVariables: { "--maataa-operator-mode": "status-matrix" }
  }),
  operatorTheme({
    id: "operator-release-operator",
    name: "Release Operator",
    description: "Release-gate theme for evidence aggregation, PHKD blockers, rollback readiness, and human approval boundaries.",
    targetUsers: ["release managers", "governance reviewers"],
    accessibilityProfile: ["focus-first", "structured"],
    motionProfile: "data-driven",
    colorTokens: { background: "#070b12", primary: "#d9a441", secondary: "#80ffdb", accent: "#ffb703" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet"],
    runtimeModes: ["operator", "security"],
    chakraMapping: ["root", "solar"],
    aiAssistantMode: "operator",
    recommendedFor: ["release gates", "evidence artifacts", "rollback checklists"],
    avoidFor: ["public marketing pages"],
    cssVariables: { "--maataa-operator-mode": "release" }
  }),
  operatorTheme({
    id: "operator-support-operator",
    name: "Support Operator",
    description: "Support console theme for inboxes, help flows, incident triage, and user-safe operational assistance.",
    targetUsers: ["support teams", "moderators"],
    accessibilityProfile: ["structured", "focus-first"],
    motionProfile: "standard",
    colorTokens: { background: "#061018", primary: "#55d6be", secondary: "#f2b84b", accent: "#7aa2ff" },
    layoutDensity: "dense",
    deviceSupport: ["desktop", "tablet"],
    runtimeModes: ["operator", "wisdom"],
    chakraMapping: ["heart", "throat"],
    aiAssistantMode: "operator",
    recommendedFor: ["support inbox", "moderation", "case history"],
    avoidFor: ["automated approval claims"],
    cssVariables: { "--maataa-operator-mode": "support" }
  }),
  operatorTheme({
    id: "operator-security-operator",
    name: "Security Operator",
    description: "Security command theme for audit events, threat summaries, entitlement review, and privacy-safe controls.",
    targetUsers: ["security teams", "privacy reviewers"],
    accessibilityProfile: ["focus-first", "structured"],
    motionProfile: "data-driven",
    colorTokens: { background: "#03070d", primary: "#ffd166", secondary: "#4cc9f0", accent: "#ef476f", danger: "#ef233c", border: "rgba(255, 209, 102, 0.42)" },
    layoutDensity: "mission-control",
    deviceSupport: ["desktop", "tablet", "kiosk"],
    runtimeModes: ["security", "operator"],
    chakraMapping: ["root", "third-eye"],
    aiAssistantMode: "operator",
    recommendedFor: ["audit logs", "permissions", "security evidence"],
    avoidFor: ["children", "public onboarding"],
    cssVariables: { "--maataa-operator-mode": "security" }
  })
] as const;

export type OperatorThemeId =
  | "operator-admin-console"
  | "operator-analytics-console"
  | "operator-status-matrix"
  | "operator-release-operator"
  | "operator-support-operator"
  | "operator-security-operator";
