/**
 * @maataa/ui/data/EmptyState
 * Placeholder for a table, chart, or list with nothing to show
 */

import React from "react";
import { colorTokens, spacingTokens, typographyTokens } from "../tokens";

export interface EmptyStateProps {
  /** A short glyph or icon shown above the title. */
  icon?: React.ReactNode;

  title: string;

  description?: string;

  /** e.g. a `<Button>` inviting the user to create the first item. */
  action?: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}

/**
 * EmptyState
 * A centered placeholder for a `DataTable`, chart, or any list with no
 * data yet — an icon, a title, optional description, and an optional
 * call-to-action.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon="📊"
 *   title="No results yet"
 *   description="Data will appear here once the first event comes in."
 * />
 * ```
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: spacingTokens.sm,
          padding: spacingTokens["2xl"],
          color: colorTokens.text.secondary,
          ...style,
        }}
      >
        {icon && (
          <div aria-hidden="true" style={{ fontSize: typographyTokens.fontSize["5xl"] }}>
            {icon}
          </div>
        )}
        <div
          style={{
            fontSize: typographyTokens.fontSize.lg,
            fontWeight: typographyTokens.fontWeight.semibold,
            color: colorTokens.text.primary,
          }}
        >
          {title}
        </div>
        {description && (
          <div style={{ fontSize: typographyTokens.fontSize.sm, maxWidth: "360px" }}>
            {description}
          </div>
        )}
        {action && <div style={{ marginTop: spacingTokens.xs }}>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
