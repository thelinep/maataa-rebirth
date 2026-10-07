/**
 * @maataa/maataa-ui · ui-system · foundations · canonical-map
 *
 * Bridges the design-sheet hex tokens (absorbed into ./colors) onto the
 * canonical governed token namespace owned by @maataa/runtime-theme-governance
 * (CANONICAL_TOKEN_NAMESPACE = "--maataa-"). This keeps ui-system a *mapped*
 * consumer of the theme authority rather than a rogue independent source.
 *
 * Sync status: ui-system-foundations = "legacy-migrating" → target "mapped".
 * Source of truth for the token vocabulary remains @maataa/runtime-theme-governance.
 * PHKD: runtime CONTROLLED_NO_GO · production PRODUCTION_READY_NO.
 */
import { colors } from "./colors.ts";

export const CANONICAL_TOKEN_NAMESPACE = "--maataa-";

/** design-sheet color id → canonical governed CSS variable (--maataa-*). */
export const COLOR_TO_CANONICAL_TOKEN = {
  primaryGold: "--maataa-accent-primary",
  sacredPurple: "--maataa-accent-secondary",
  energeticBlue: "--maataa-accent-info",
  successGreen: "--maataa-status-ok",
  warningOrange: "--maataa-status-warn",
  dangerRed: "--maataa-status-danger",
  neutral800: "--maataa-surface",
  neutral900: "--maataa-background"
} as const satisfies Record<keyof typeof colors, string>;

/** Structural tokens (surface/text/border) layered on top of the palette, with safe defaults. */
export const STRUCTURAL_TOKENS = {
  "--maataa-border": "#1f2a40",
  "--maataa-text": "#e8eef6",
  "--maataa-text-muted": "#8b9bb4",
  "--maataa-surface-alt": "#141d31",
  "--maataa-chip": "#0c1322"
} as const;

/** Emit canonical CSS custom properties from the absorbed palette + structural defaults. */
export function toCanonicalVars(): Record<string, string> {
  const palette = Object.fromEntries(
    (Object.keys(COLOR_TO_CANONICAL_TOKEN) as (keyof typeof colors)[]).map((k) => [
      COLOR_TO_CANONICAL_TOKEN[k],
      colors[k]
    ])
  );
  return { ...palette, ...STRUCTURAL_TOKENS };
}

export const meta = {
  layer: "foundations",
  id: "canonical-map",
  status: "MAPPED_TO_CANONICAL",
  authority: "@maataa/runtime-theme-governance",
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
