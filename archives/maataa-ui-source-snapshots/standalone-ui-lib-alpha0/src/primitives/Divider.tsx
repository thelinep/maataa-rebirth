/**
 * @maataa/ui/primitives/Divider
 * Visual separator between sections of content
 */

import React from "react";
import { colorTokens, spacingTokens, typographyTokens } from "../tokens";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Margin along the axis perpendicular to the divider's length,
   * from the spacing token scale
   * @default 'md'
   */
  spacing?: keyof typeof spacingTokens;

  /**
   * Optional label rendered inline within a horizontal divider
   */
  label?: React.ReactNode;
}

/**
 * Divider
 * A thin line separating sections of content, optionally carrying a
 * text label (horizontal orientation only).
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider label="OR" />
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", spacing = "md", label, style, role, ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role={role ?? "separator"}
          aria-orientation="vertical"
          style={{
            display: "inline-block",
            alignSelf: "stretch",
            width: "1px",
            marginLeft: spacingTokens[spacing],
            marginRight: spacingTokens[spacing],
            backgroundColor: colorTokens.border.primary,
            ...style,
          }}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role={role ?? "separator"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacingTokens.sm,
            marginTop: spacingTokens[spacing],
            marginBottom: spacingTokens[spacing],
            ...style,
          }}
          {...props}
        >
          <span style={{ flex: 1, height: "1px", backgroundColor: colorTokens.border.primary }} />
          <span
            style={{
              fontSize: typographyTokens.fontSize.sm,
              color: colorTokens.text.secondary,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
          <span style={{ flex: 1, height: "1px", backgroundColor: colorTokens.border.primary }} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={role ?? "separator"}
        style={{
          width: "100%",
          height: "1px",
          marginTop: spacingTokens[spacing],
          marginBottom: spacingTokens[spacing],
          backgroundColor: colorTokens.border.primary,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
