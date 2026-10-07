/**
 * @maataa/ui/primitives/Card
 * Core card container primitive component
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  elevated?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
}

/**
 * Card Component
 * A flexible container component for content with optional header and footer
 *
 * @example
 * ```tsx
 * <Card title="Profile" subtitle="User Information">
 *   <p>Card content goes here</p>
 *   <p slot="footer">Footer content</p>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { title, subtitle, footer, elevated = false, interactive = false, children, style, ...props },
    ref
  ) => {
    const [isHovering, setIsHovering] = React.useState(false);

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: colorTokens.background.primary,
          border: `1px solid ${colorTokens.interactive.secondary}`,
          borderRadius: radiusTokens.md,
          overflow: "hidden",
          transition: "all 0.3s ease",
          boxShadow: elevated || isHovering ? colorTokens.shadow.lg : colorTokens.shadow.sm,
          cursor: interactive && isHovering ? "pointer" : "default",
          ...style,
        }}
        onMouseEnter={() => interactive && setIsHovering(true)}
        onMouseLeave={() => interactive && setIsHovering(false)}
        {...props}
      >
        {(title || subtitle) && (
          <div
            style={{
              padding: spacingTokens.md,
              borderBottom: `1px solid ${colorTokens.border.secondary}`,
            }}
          >
            {title && (
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: colorTokens.text.primary,
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ margin: "0", fontSize: "13px", color: colorTokens.text.secondary }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div style={{ padding: spacingTokens.md }}>{children}</div>

        {footer && (
          <div
            style={{
              padding: `${spacingTokens.sm} ${spacingTokens.md}`,
              borderTop: `1px solid ${colorTokens.border.secondary}`,
              backgroundColor: colorTokens.background.secondary,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
