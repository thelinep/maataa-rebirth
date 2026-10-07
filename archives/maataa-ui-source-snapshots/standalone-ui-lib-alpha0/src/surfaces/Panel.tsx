/**
 * @maataa/ui/surfaces/Panel
 * Static layout region with an optional header, actions, and collapse toggle
 */

import React, { useState } from "react";
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Small label rendered above the title (e.g. a section or source label)
   */
  eyebrow?: React.ReactNode;

  /**
   * Panel heading
   */
  title?: React.ReactNode;

  /**
   * Controls or buttons rendered on the right side of the header
   */
  actions?: React.ReactNode;

  /**
   * Whether the panel can be collapsed by clicking its header
   * @default false
   */
  collapsible?: boolean;

  /**
   * Initial collapsed state when `collapsible` is true (uncontrolled)
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * Controlled collapsed state. When provided, `onCollapsedChange` is
   * required to respond to the toggle.
   */
  collapsed?: boolean;

  /**
   * Called when the collapse toggle is used
   */
  onCollapsedChange?: (collapsed: boolean) => void;

  children?: React.ReactNode;
}

/**
 * Panel
 * A larger, static layout region — a dashboard sidebar section, a
 * settings group, an inspector pane — with an optional header, header
 * actions, and an optional collapse toggle. Unlike `Card`, `Panel` is
 * meant for full-height/full-width layout regions rather than
 * standalone content cards.
 *
 * @example
 * ```tsx
 * <Panel title="Filters" collapsible>
 *   <Checkbox label="Active only" />
 * </Panel>
 * ```
 */
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      eyebrow,
      title,
      actions,
      collapsible = false,
      defaultCollapsed = false,
      collapsed,
      onCollapsedChange,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const isControlled = collapsed !== undefined;
    const isCollapsed = isControlled ? collapsed : internalCollapsed;

    const toggle = () => {
      const next = !isCollapsed;
      if (!isControlled) setInternalCollapsed(next);
      onCollapsedChange?.(next);
    };

    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: colorTokens.background.primary,
          border: `1px solid ${colorTokens.border.primary}`,
          borderRadius: radiusTokens.md,
          overflow: "hidden",
          ...style,
        }}
        {...props}
      >
        {(eyebrow || title || actions) && (
          <div
            role={collapsible ? "button" : undefined}
            tabIndex={collapsible ? 0 : undefined}
            onClick={collapsible ? toggle : undefined}
            onKeyDown={
              collapsible
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle();
                    }
                  }
                : undefined
            }
            aria-expanded={collapsible ? !isCollapsed : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: spacingTokens.sm,
              padding: spacingTokens.md,
              borderBottom: isCollapsed ? undefined : `1px solid ${colorTokens.border.secondary}`,
              cursor: collapsible ? "pointer" : "default",
              backgroundColor: colorTokens.background.secondary,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: spacingTokens.xs }}>
              {collapsible && (
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    transition: "transform 0.2s ease",
                    transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                    fontSize: "12px",
                    color: colorTokens.text.secondary,
                  }}
                >
                  ▾
                </span>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {eyebrow && (
                  <span
                    style={{
                      fontSize: typographyTokens.fontSize.xs,
                      fontWeight: typographyTokens.fontWeight.medium,
                      color: colorTokens.text.secondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <span
                    style={{
                      fontSize: typographyTokens.fontSize.lg,
                      fontWeight: typographyTokens.fontWeight.semibold,
                      color: colorTokens.text.primary,
                    }}
                  >
                    {title}
                  </span>
                )}
              </div>
            </div>
            {actions && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ display: "flex", gap: spacingTokens.xs }}
              >
                {actions}
              </div>
            )}
          </div>
        )}
        {!isCollapsed && <div style={{ padding: spacingTokens.md }}>{children}</div>}
      </div>
    );
  }
);

Panel.displayName = "Panel";
