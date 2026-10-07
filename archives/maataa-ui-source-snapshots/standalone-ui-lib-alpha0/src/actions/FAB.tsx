/**
 * @maataa/ui/actions/FAB
 * Floating action button for a screen's primary, most-frequent action
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens, transitionTokens } from "../tokens";

export type FABPosition = "static" | "bottom-right" | "bottom-left" | "top-right" | "top-left";

export interface FABProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * The icon to render
   */
  icon: React.ReactNode;

  /**
   * Optional label. When provided, the FAB extends into a pill shape
   * showing the icon and label side by side; without it, the FAB is a
   * plain circle and `aria-label` becomes required for accessibility.
   */
  label?: string;

  /**
   * Button size
   * @default 'lg'
   */
  size?: "md" | "lg";

  /**
   * Fixed screen position. `'static'` leaves the button in normal
   * document flow for embedding inside a container.
   * @default 'bottom-right'
   */
  position?: FABPosition;
}

const sizeStyles = {
  md: { diameter: "48px", fontSize: "20px" },
  lg: { diameter: "56px", fontSize: "24px" },
};

const positionStyles: Record<FABPosition, React.CSSProperties> = {
  static: {},
  "bottom-right": { position: "fixed", bottom: spacingTokens.lg, right: spacingTokens.lg },
  "bottom-left": { position: "fixed", bottom: spacingTokens.lg, left: spacingTokens.lg },
  "top-right": { position: "fixed", top: spacingTokens.lg, right: spacingTokens.lg },
  "top-left": { position: "fixed", top: spacingTokens.lg, left: spacingTokens.lg },
};

/**
 * FAB
 * A prominent, circular (or extended, when given a `label`) button
 * for a screen's single most important action. Positioned fixed in a
 * screen corner by default.
 *
 * @example
 * ```tsx
 * <FAB icon="+" aria-label="Create new item" />
 * <FAB icon="+" label="New task" position="static" />
 * ```
 */
export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ icon, label, size = "lg", position = "bottom-right", disabled, style, ...props }, ref) => {
    const { diameter, fontSize } = sizeStyles[size];

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacingTokens.sm,
          height: diameter,
          width: label ? "auto" : diameter,
          minWidth: diameter,
          padding: label ? `0 ${spacingTokens.lg}` : 0,
          fontSize,
          fontWeight: 500,
          border: "none",
          borderRadius: label ? radiusTokens.full : radiusTokens.full,
          backgroundColor: colorTokens.interactive.primary,
          color: colorTokens.text.inverse,
          boxShadow: colorTokens.shadow.lg,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          transition: `all ${transitionTokens.base}`,
          zIndex: 100,
          ...positionStyles[position],
          ...style,
        }}
        {...props}
      >
        <span aria-hidden={Boolean(label)}>{icon}</span>
        {label && <span style={{ fontSize: "14px" }}>{label}</span>}
      </button>
    );
  }
);

FAB.displayName = "FAB";
