/**
 * @maataa/ui/data/MetricCard
 * A stat tile: label, headline value, optional delta and trend sparkline
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";
import { formatCompactNumber } from "./chartUtils";
import { Sparkline } from "./Sparkline";

export interface MetricCardProps {
  /** Sentence-case label, no trailing colon (e.g. "Total revenue"). */
  label: string;

  /** The headline value. A number is auto-compacted (1,284 / 12.9K / $4.2M). */
  value: number | string;

  /** Optional "$" or other prefix applied when `value` is a number. */
  valuePrefix?: string;

  /** Signed change vs. a named prior period, e.g. 12.4 for "+12.4%". */
  delta?: number;

  /** What the delta is measured against, e.g. "vs last week". */
  deltaPeriod?: string;

  /** Whether a positive delta is a good outcome. @default true */
  positiveIsGood?: boolean;

  /** Optional trend sparkline data. */
  trend?: number[];

  className?: string;
  style?: React.CSSProperties;
}

/**
 * MetricCard
 * The stat-tile figure from the data-viz guidelines: a sentence-case label,
 * an auto-compacted headline value, an optional signed delta colored by
 * direction × whether up is good for this metric, and an optional trend
 * sparkline.
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Total revenue"
 *   value={128400}
 *   valuePrefix="$"
 *   delta={12.4}
 *   deltaPeriod="vs last month"
 *   trend={[4, 6, 5, 8, 9, 7, 10]}
 * />
 * ```
 */
export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      valuePrefix = "",
      delta,
      deltaPeriod,
      positiveIsGood = true,
      trend,
      className,
      style,
    },
    ref
  ) => {
    const displayValue =
      typeof value === "number" ? formatCompactNumber(value, valuePrefix) : value;

    const isGoodDelta = delta !== undefined && delta >= 0 === positiveIsGood;
    const deltaColor =
      delta === undefined
        ? undefined
        : delta === 0
          ? colorTokens.text.secondary
          : isGoodDelta
            ? colorTokens.interactive.success
            : colorTokens.interactive.error;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacingTokens.xs,
          padding: spacingTokens.lg,
          backgroundColor: colorTokens.background.primary,
          border: `1px solid ${colorTokens.border.primary}`,
          borderRadius: radiusTokens.lg,
          ...style,
        }}
      >
        <span
          style={{
            fontSize: typographyTokens.fontSize.sm,
            color: colorTokens.text.secondary,
          }}
        >
          {label}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: spacingTokens.md,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: spacingTokens.xs }}>
            <span
              style={{
                fontSize: typographyTokens.fontSize["4xl"],
                fontWeight: typographyTokens.fontWeight.semibold,
                color: colorTokens.text.primary,
                lineHeight: typographyTokens.lineHeight.tight,
              }}
            >
              {displayValue}
            </span>
            {delta !== undefined && (
              <span style={{ fontSize: typographyTokens.fontSize.xs, color: deltaColor }}>
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "–"} {Math.abs(delta)}%
                {deltaPeriod && (
                  <span style={{ color: colorTokens.text.secondary }}> {deltaPeriod}</span>
                )}
              </span>
            )}
          </div>
          {trend && trend.length > 0 && (
            <Sparkline
              data={trend}
              color={
                isGoodDelta || delta === undefined
                  ? colorTokens.interactive.success
                  : colorTokens.interactive.error
              }
              aria-label={`${label} trend`}
            />
          )}
        </div>
      </div>
    );
  }
);

MetricCard.displayName = "MetricCard";
