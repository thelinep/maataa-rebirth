/**
 * @maataa/ui/primitives/Badge
 * Status badge primitive component
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens, transitionTokens } from "../tokens";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  onDismiss?: () => void;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  default: {
    bg: colorTokens.interactive.secondary,
    color: colorTokens.text.primary,
    border: `1px solid ${colorTokens.border.primary}`,
  },
  success: {
    bg: colorTokens.semantic.success.bg,
    color: colorTokens.semantic.success.text,
    border: `1px solid ${colorTokens.semantic.success.bg}`,
  },
  warning: {
    bg: colorTokens.semantic.warning.bg,
    color: colorTokens.semantic.warning.text,
    border: `1px solid ${colorTokens.semantic.warning.bg}`,
  },
  error: {
    bg: colorTokens.semantic.error.bg,
    color: colorTokens.semantic.error.text,
    border: `1px solid ${colorTokens.semantic.error.bg}`,
  },
  info: {
    bg: colorTokens.semantic.info.bg,
    color: colorTokens.semantic.info.text,
    border: `1px solid ${colorTokens.semantic.info.bg}`,
  },
};

const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
  sm: {
    padding: `2px ${spacingTokens.sm}`,
    fontSize: "11px",
    minHeight: "18px",
  },
  md: {
    padding: `${spacingTokens.xs} ${spacingTokens.md}`,
    fontSize: "12px",
    minHeight: "22px",
  },
  lg: {
    padding: `6px ${spacingTokens.lg}`,
    fontSize: "13px",
    minHeight: "28px",
  },
};

/**
 * Badge Component
 * A compact status indicator component with multiple variants
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="lg">Failed</Badge>
 * <Badge variant="warning" onDismiss={() => {}}>Warning</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", onDismiss, children, style, ...props }, ref) => {
    const styles = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    return (
      <span
        ref={ref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          backgroundColor: styles.bg,
          color: styles.color,
          border: styles.border,
          borderRadius: radiusTokens.lg,
          fontWeight: "500",
          whiteSpace: "nowrap",
          ...sizeStyle,
          ...style,
        }}
        {...props}
      >
        {children}
        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "16px",
              height: "16px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0",
              color: "inherit",
              fontSize: "14px",
              lineHeight: "1",
              borderRadius: radiusTokens.full,
              transition: `all ${transitionTokens.base}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
