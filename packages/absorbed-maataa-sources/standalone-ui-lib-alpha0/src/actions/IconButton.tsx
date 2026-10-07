/**
 * @maataa/ui/actions/IconButton
 * Icon-only button for compact, high-frequency actions
 */

import React from "react";
import { colorTokens, radiusTokens, transitionTokens } from "../tokens";
import type { ButtonVariant } from "../primitives/Button";

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /**
   * The icon to render. Any React node — an emoji, an SVG, or an icon
   * component from your icon set of choice.
   */
  icon: React.ReactNode;

  /**
   * Required accessible label, since there is no visible text content
   */
  "aria-label": string;

  /**
   * Visual style, matching `Button`'s variants
   * @default 'secondary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the button is fully circular rather than rounded-square
   * @default true
   */
  rounded?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: colorTokens.interactive.primary,
    color: colorTokens.text.inverse,
    border: "none",
  },
  secondary: {
    backgroundColor: colorTokens.interactive.secondary,
    color: colorTokens.text.primary,
    border: "none",
  },
  tertiary: {
    backgroundColor: "transparent",
    color: colorTokens.interactive.primary,
    border: `2px solid ${colorTokens.interactive.primary}`,
  },
  danger: {
    backgroundColor: colorTokens.semantic.error.bg,
    color: colorTokens.semantic.error.text,
    border: "none",
  },
};

const sizeStyles = {
  sm: { width: "28px", height: "28px", fontSize: "14px" },
  md: { width: "36px", height: "36px", fontSize: "16px" },
  lg: { width: "44px", height: "44px", fontSize: "20px" },
};

/**
 * IconButton
 * A compact, icon-only button. Always pass `aria-label` since there is
 * no visible text for assistive technology to read.
 *
 * @example
 * ```tsx
 * <IconButton icon="✕" aria-label="Close" variant="tertiary" />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, variant = "secondary", size = "md", rounded = true, disabled, style, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        style={{
          ...variantStyles[variant],
          ...sizeStyles[size],
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          borderRadius: rounded ? radiusTokens.full : radiusTokens.md,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          transition: `all ${transitionTokens.base}`,
          flexShrink: 0,
          ...style,
        }}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
