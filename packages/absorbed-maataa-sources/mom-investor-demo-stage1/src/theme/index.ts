/**
 * @maataa/maataa-ui — theme (Epic A1: Theme Registry Authority)
 *
 * Single entry point for the unified theme runtime. Aggregates themes from
 * @maataa/themelab, @maataa/theme, and locally-authored themes into one
 * registry keyed by the canonical `--runtime-*` token contract.
 *
 * PHKD status: PREVIEW_SAFE_OPERATIONAL_PACKAGE. productionReady = false.
 * Authority over per-domain palette ROLES still lives in
 * @maataa/runtime-theme-governance; this package normalizes the surface.
 */

export type {
  CanonicalToken,
  SemanticToken,
  ThemeTokenSet,
  ThemeFamily,
  ThemeStatus,
  ThemeSource,
  ThemeNode,
  ThemeProvider,
  ThemeRegistry,
  ThemeRegistryEvidence
} from "./theme-contract.js";
export { CANONICAL_TOKENS, SEMANTIC_TOKENS } from "./theme-contract.js";

export { themeRegistry, buildThemeRegistryEvidence } from "./theme-registry.js";

export {
  loadTheme,
  applyTheme,
  inheritTheme,
  themeToCssVariableMap,
  loadAndApplyTheme
} from "./theme-loader.js";

export {
  THEME_STORAGE_KEY,
  DEFAULT_FALLBACK_ID,
  saveTheme,
  loadSavedTheme,
  clearSavedTheme,
  resolveActiveTheme,
  restoreTheme,
  getHydrationScript
} from "./persistence.js";

export { themelabProvider, cinematicProvider } from "./providers/index.js";

export {
  authoredThemes,
  lightTheme,
  producerTheme,
  directorTheme,
  investorTheme,
  commerceTheme,
  mediaTheme,
  reducedMotionTheme
} from "./themes/index.js";
