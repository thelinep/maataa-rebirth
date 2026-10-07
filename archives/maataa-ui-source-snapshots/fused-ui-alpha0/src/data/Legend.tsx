/**
 * @maataa/ui/data/Legend
 * Series identity key for a chart with two or more series
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";

export interface LegendItem {
  label: string;
  color: string;
}

export interface LegendProps {
  items: LegendItem[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Legend
 * A row of color-swatch + label pairs — the dependable identity channel for
 * a multi-series chart. Per the data-viz guidelines, a single-series chart
 * doesn't need one (its title already says what's plotted); render this
 * only when a chart has two or more series.
 *
 * @example
 * ```tsx
 * <Legend items={[{ label: "Revenue", color: chartTokens.categorical[0] }]} />
 * ```
 */
export const Legend = React.forwardRef<HTMLUListElement, LegendProps>(
  ({ items, className, style }, ref) => {
    return (
      <ul
        ref={ref}
        className={className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: spacingTokens.md,
          listStyle: "none",
          margin: 0,
          padding: 0,
          ...style,
        }}
      >
        {items.map((item) => (
          <li
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacingTokens.xs,
              fontSize: typographyTokens.fontSize.sm,
              color: colorTokens.text.secondary,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: radiusTokens.full,
                backgroundColor: item.color,
                flexShrink: 0,
              }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    );
  }
);

Legend.displayName = "Legend";
