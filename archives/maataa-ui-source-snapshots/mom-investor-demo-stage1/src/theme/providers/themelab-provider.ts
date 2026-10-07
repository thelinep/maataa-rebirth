import { themeRegistry as themelabRegistry } from "@maataa/themelab";
import type {
  ThemeNode,
  ThemeProvider,
  ThemeFamily,
  ThemeStatus
} from "../theme-contract.js";

/**
 * Adapter that maps @maataa/themelab's `themeRegistry` (20 themes / 9 families
 * in the `--tl-*` namespace) into the canonical `--runtime-*` contract.
 *
 * PHKD: themelab carries `productionReady: false` at the package level; every
 * adapted node inherits that and is marked `status: "preview"`. Family
 * classification is conservative: themelab families that don't map cleanly
 * to the spec's 5-family contract get folded into the closest neighbour.
 */

/** Map themelab's open family string to the contract's constrained union. */
function mapFamily(themelabFamily: string): ThemeFamily {
  switch (themelabFamily) {
    case "accessibility":
      return "accessibility";
    case "runtime":
    case "device":
    case "emotion":
    case "network":
      return "core";
    case "age":
    case "chakra":
    case "language":
      return "maataa";
    case "operator":
      return "tlp";
    case "cinematic":
      return "core";
    default:
      return "core";
  }
}

/**
 * Promotion ledger: theme ids that have earned `live` status via recorded
 * consumer-adoption evidence. PHKD: each entry here corresponds to a passed
 * audit gate + at least one wired consumer route. Adding to this set without
 * that evidence is a fake-LIVE violation.
 *
 * Current entries:
 * - `cinematic-vaigyaaniq` (promoted in commit after db371f1):
 *   - Audit v2 (scripts/ui-theme-audit.mjs): radioPerSelector reports
 *     0 hard-banned + 0 naked hex across 7 radio-class blocks in
 *     apps/web/app/globals.css; 11 fallback-hex (all inside
 *     var(--runtime-*, #hex) — info severity only).
 *   - Consumer wiring: apps/web/components/radio/RuntimeThemeWrapper.tsx
 *     mounts cinematic-vaigyaaniq on /radio, /radio-three, /radio-runtimes
 *     via restoreTheme + applyTheme + saveTheme.
 *   - Evidence: reports/radio-theme-adoption.json,
 *     release/evidence/ui-unification.json.
 */
const PROMOTED_THEME_IDS: ReadonlySet<string> = new Set<string>([
  "cinematic-vaigyaaniq"
]);

function mapStatus(themelabId: string): ThemeStatus {
  return PROMOTED_THEME_IDS.has(themelabId) ? "live" : "preview";
}

/** Translate one themelab theme into the canonical contract. */
function adapt(themelabTheme: (typeof themelabRegistry)[number]): ThemeNode {
  const cssVars = (themelabTheme.cssVars ?? {}) as Record<string, string>;
  const bg = cssVars["--tl-bg"] ?? "#070711";
  const surface = cssVars["--tl-surface"] ?? cssVars["--tl-bg"] ?? "#0e0e1e";
  const border = cssVars["--tl-border"] ?? "#23234a";
  const accent = cssVars["--tl-accent"] ?? "#8b5cf6";

  return {
    id: themelabTheme.id,
    label: themelabTheme.label,
    family: mapFamily(themelabTheme.family),
    status: mapStatus(themelabTheme.id),
    source: "@maataa/themelab",
    description: `Adapted from @maataa/themelab (${themelabTheme.family} family).`,
    productionReady: false,
    tokens: {
      "--runtime-bg": bg,
      "--runtime-panel": surface,
      "--runtime-border": border,
      "--runtime-accent": accent
    }
  };
}

export const themelabProvider: ThemeProvider = {
  source: "@maataa/themelab",
  description:
    "Adapts @maataa/themelab's 20-theme registry (9 families, --tl-* namespace) into the canonical --runtime-* contract.",
  getThemes(): ReadonlyArray<ThemeNode> {
    return themelabRegistry.map(adapt);
  }
};
