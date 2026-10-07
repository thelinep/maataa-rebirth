/**
 * @maataa/ui/themes/ThemeToggle
 * A labeled switch that flips the nearest ThemeProvider between light and dark
 */

import React from "react";
import { radiusTokens, spacingTokens, transitionTokens, typographyTokens } from "../tokens";
import { useTheme } from "./ThemeProvider";

export interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * ThemeToggle
 * Reads and flips the theme of the nearest `ThemeProvider`. Styled from
 * `useTheme().colors`, so — unlike most of this library's components,
 * which are styled from the static `colorTokens` — it re-themes itself
 * live as the theme changes.
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <ThemeToggle />
 * </ThemeProvider>
 * ```
 */
export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, style, "aria-label": ariaLabel }, ref) => {
    const { theme, toggleTheme, colors } = useTheme();
    const isDark = theme === "dark";

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={ariaLabel ?? `Switch to ${isDark ? "light" : "dark"} theme`}
        onClick={toggleTheme}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: spacingTokens.sm,
          padding: `${spacingTokens.xs} ${spacingTokens.md}`,
          border: `1px solid ${colors.border.primary}`,
          borderRadius: radiusTokens.full,
          backgroundColor: colors.background.secondary,
          color: colors.text.primary,
          fontFamily: typographyTokens.fontFamily.base,
          fontSize: typographyTokens.fontSize.sm,
          fontWeight: typographyTokens.fontWeight.medium,
          cursor: "pointer",
          transition: `background-color ${transitionTokens.base}, border-color ${transitionTokens.base}, color ${transitionTokens.base}`,
          ...style,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: radiusTokens.full,
            backgroundColor: isDark ? colors.interactive.primary : colors.interactive.warning,
          }}
        />
        {isDark ? "Dark" : "Light"}
      </button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
