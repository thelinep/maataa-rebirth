// @maataa/maataa-ui · foundations — barrel
export { colors } from "./colors.ts";
export { typography } from "./typography.ts";
export { spacing, radius, elevation } from "./spacing.ts";
export { icons } from "./icons.ts";
export { COLOR_TO_CANONICAL_TOKEN, CANONICAL_TOKEN_NAMESPACE, toCanonicalVars } from "./canonical-map.ts";
export { ThemeProvider, useTheme, token } from "./ThemeProvider.tsx";
export type { ThemeContextValue, ThemeProviderProps, ThemeVars, CanonicalToken } from "./ThemeProvider.tsx";
export const LAYER = { name: "foundations", members: ["colors","typography","spacing","icons","canonical-map","ThemeProvider"] } as const;
