"use client";
/**
 * MaataaThemeProvider — canonical theme provider (Theme Consolidation Step 1).
 *
 * ADDITIVE ONLY: composes the two existing runtime theme providers
 * (GlobalRuntimeThemeProvider — hostname/persisted theme resolution — and
 * ThemeRuntimeProvider — sovereign runtime token bridge) behind one component,
 * so later steps can migrate consumers to a single mount point. Behavior is
 * byte-identical to mounting the two providers in today's AppProviders order.
 * NOTHING consumes this yet (per reports/theme/migration_plan.md step 1);
 * existing providers/exports are untouched.
 *
 * Note: ThemeRuntimeProvider requires an ancestor SovereignRuntimeProvider
 * (it calls useSovereignRuntime). That contract is unchanged here and is
 * addressed when AppProviders migrates in a later step.
 */
import type { ReactNode } from "react";
import { GlobalRuntimeThemeProvider } from "../app-shell/global-runtime-theme-provider.tsx";
import { ThemeRuntimeProvider } from "../runtime/ThemeRuntimeProvider.tsx";

export type MaataaThemeProviderProps = {
  children: ReactNode;
  /** Explicit theme id (wins over hostname resolution). */
  themeId?: string;
  /** Fallback theme id when nothing is resolved/persisted. */
  defaultThemeId?: string;
  /** Persist user theme choice (cookie/localStorage per existing provider). */
  persist?: boolean;
  /** Disable hostname→theme resolution (tests / previews). */
  disableHostnameResolution?: boolean;
  /** Class applied to the sovereign runtime root wrapper. */
  className?: string;
};

export function MaataaThemeProvider({
  children,
  themeId,
  defaultThemeId,
  persist = true,
  disableHostnameResolution = false,
  className
}: MaataaThemeProviderProps) {
  return (
    <GlobalRuntimeThemeProvider
      themeId={themeId}
      defaultThemeId={defaultThemeId}
      persist={persist}
      disableHostnameResolution={disableHostnameResolution}
    >
      <ThemeRuntimeProvider className={className}>{children}</ThemeRuntimeProvider>
    </GlobalRuntimeThemeProvider>
  );
}
