/**
 * @maataa/ui/themes
 * Category: themes
 * Runtime light/dark theme switching: ThemeProvider, useTheme, ThemeToggle
 */

export {
  ThemeProvider,
  useTheme,
  type ThemeName,
  type ThemeContextValue,
  type ThemeProviderProps,
} from "./ThemeProvider";
export { ThemeToggle, type ThemeToggleProps } from "./ThemeToggle";

// Component metadata for Storybook and docs
export const themeComponents = [
  {
    id: "theme-provider",
    name: "ThemeProvider",
    component: "ThemeProvider",
    category: "Themes",
    description: "Runtime light/dark theme context, mirrored as CSS custom properties",
  },
  {
    id: "theme-toggle",
    name: "ThemeToggle",
    component: "ThemeToggle",
    category: "Themes",
    description: "A labeled switch that flips the nearest ThemeProvider between light and dark",
  },
];
