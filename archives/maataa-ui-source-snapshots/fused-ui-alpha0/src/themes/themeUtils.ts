/**
 * @maataa/ui/themes/themeUtils
 * Small internal helpers shared by ThemeProvider. Not part of the public API.
 */

import type { colorTokens } from "../tokens";

type ColorTokens = typeof colorTokens;

/**
 * Flattens a `colorTokens`-shaped object into CSS custom properties, e.g.
 * `colors.text.primary` -> `--maataa-text-primary`,
 * `colors.semantic.success.bg` -> `--maataa-semantic-success-bg`.
 * For anything that prefers to theme via CSS (rather than reading
 * `useTheme().colors` directly), `ThemeProvider` sets these on its wrapper
 * element so a stylesheet can use `var(--maataa-text-primary)` etc.
 */
export function buildThemeCssVars(colors: ColorTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [group, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      vars[`--maataa-${group}`] = value;
      continue;
    }
    for (const [key, inner] of Object.entries(value)) {
      if (typeof inner === "string") {
        vars[`--maataa-${group}-${key}`] = inner;
        continue;
      }
      // Nested one level further, e.g. semantic.success.{bg,text}
      for (const [innerKey, innerValue] of Object.entries(inner as Record<string, string>)) {
        vars[`--maataa-${group}-${key}-${innerKey}`] = innerValue;
      }
    }
  }

  return vars;
}
