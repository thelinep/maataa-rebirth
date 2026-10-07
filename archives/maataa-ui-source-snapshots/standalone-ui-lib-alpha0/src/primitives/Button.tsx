/**
 * @maataa/ui/primitives/Button
 * Core button primitive component
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens, transitionTokens } from "../tokens";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
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

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: `${spacingTokens.xs} ${spacingTokens.sm}`,
    fontSize: "12px",
    minWidth: "60px",
  },
  md: {
    padding: `${spacingTokens.sm} ${spacingTokens.md}`,
    fontSize: "14px",
    minWidth: "80px",
  },
  lg: {
    padding: `${spacingTokens.md} ${spacingTokens.lg}`,
    fontSize: "16px",
    minWidth: "120px",
  },
};

/**
 * Button Component
 * A versatile button component with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 * <Button variant="danger" onClick={() => console.log('delete')}>Delete</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      className,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={className}
        style={{
          ...variantStyles[variant],
          ...sizeStyles[size],
          borderRadius: radiusTokens.md,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          transition: `all ${transitionTokens.base}`,
          fontWeight: "500",
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = colorTokens.shadow.md;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
