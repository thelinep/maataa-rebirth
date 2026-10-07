/**
 * @maataa/maataa-ui/app-shell
 *
 * Global app-shell primitives. Composable, theme-aware via the canonical
 * --runtime-* token contract, SSR-safe, accessibility-conscious.
 *
 * All components are additive to the existing SovereignRuntimeProvider /
 * ThemeRuntimeProvider stack — they do not replace or wrap them.
 */

export {
  GlobalRuntimeThemeProvider,
  useGlobalRuntimeTheme,
  useHostnameResolvedTheme,
  resolveThemeForHostname,
  THEME_STORAGE_KEY,
  type GlobalRuntimeThemeProviderProps,
  type GlobalRuntimeThemeValue
} from "./global-runtime-theme-provider.tsx";

export {
  AutoHideHeader,
  AutoHideFooterDock,
  type AutoHideHeaderProps,
  type AutoHideFooterDockProps
} from "./auto-hide.tsx";

export {
  BackToTopFab,
  BackToLatestFab,
  RuntimeStatusFab,
  type BackToTopFabProps,
  type BackToLatestFabProps,
  type RuntimeStatusFabProps,
  type RuntimeStatusItem
} from "./floating-actions.tsx";

export { DomainSwitcher, type DomainSwitcherProps, type DomainEntry } from "./domain-switcher.tsx";

export {
  ContextDock,
  type ContextDockProps,
  type ContextDockAction,
  type ContextDockSection
} from "./context-dock.tsx";

export {
  UniversalSearchExpansion,
  type UniversalSearchExpansionProps,
  type UniversalSearchResult
} from "./universal-search-expansion.tsx";
