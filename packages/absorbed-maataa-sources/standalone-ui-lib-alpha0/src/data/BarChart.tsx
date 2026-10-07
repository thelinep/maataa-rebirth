/**
 * @maataa/ui/data/BarChart
 * A grouped bar chart with gridlines, legend, and hover tooltip
 */

import React, { useState } from "react";
import { chartTokens, colorTokens, typographyTokens } from "../tokens";
import type { ChartSeries } from "./LineChart";
import { ChartTooltip, type ChartTooltipState } from "./ChartTooltip";
import { Legend } from "./Legend";
import { niceTicks } from "./chartUtils";

export interface BarChartProps {
  /** One or more series, each with one value per `categories` entry. */
  series: ChartSeries[];

  /** X-axis category labels, same length as each series' `data`. */
  categories: string[];

  width?: number;
  height?: number;

  /** Formats a raw value for the tooltip and y-axis ticks. */
  valueFormatter?: (value: number) => string;

  /** Maximum thickness of a single bar, per the design system's mark spec. @default 24 */
  maxBarThickness?: number;

  className?: string;
  style?: React.CSSProperties;
}

const PADDING = { top: 16, right: 16, bottom: 28, left: 44 };
const BAR_GAP = 2;
const RADIUS = 4;

/**
 * BarChart
 * Plots one or more series as grouped, 4px-rounded-top bars over a shared
 * 0-anchored y-axis, with recessive gridlines, a legend (when there are two
 * or more series), and a per-bar hover tooltip.
 *
 * @example
 * ```tsx
 * <BarChart
 *   categories={["Q1", "Q2", "Q3", "Q4"]}
 *   series={[{ label: "Revenue", data: [120, 180, 150, 220] }]}
 * />
 * ```
 */
export const BarChart = React.forwardRef<SVGSVGElement, BarChartProps>(
  (
    {
      series,
      categories,
      width = 480,
      height = 240,
      valueFormatter = String,
      maxBarThickness = 24,
      className,
      style,
    },
    ref
  ) => {
    const [tooltip, setTooltip] = useState<ChartTooltipState | null>(null);

    const plotWidth = width - PADDING.left - PADDING.right;
    const plotHeight = height - PADDING.top - PADDING.bottom;

    const maxValue = Math.max(1, ...series.flatMap((s) => s.data));
    const ticks = niceTicks(maxValue);
    const scaleMax = ticks[ticks.length - 1] || 1;

    const coloredSeries = series.map((s, i) => ({
      ...s,
      color:
        s.color ??
        (series.length > 1
          ? chartTokens.categorical[i % chartTokens.categorical.length]
          : chartTokens.single),
    }));

    const groupWidth = categories.length > 0 ? plotWidth / categories.length : plotWidth;
    const rawBarWidth = (groupWidth - BAR_GAP * (series.length - 1)) / Math.max(series.length, 1);
    const barWidth = Math.min(rawBarWidth, maxBarThickness);
    const groupContentWidth = barWidth * series.length + BAR_GAP * (series.length - 1);

    const yFor = (value: number) => PADDING.top + plotHeight - (value / scaleMax) * plotHeight;
    const baselineY = PADDING.top + plotHeight;

    const handleHover = (
      e: React.MouseEvent,
      s: (typeof coloredSeries)[number],
      categoryIndex: number
    ) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY - 12,
        title: categories[categoryIndex],
        rows: [
          { label: s.label, value: valueFormatter(s.data[categoryIndex] ?? 0), color: s.color },
        ],
      });
    };

    return (
      <div className={className} style={style}>
        <svg
          ref={ref}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Bar chart with ${series.length} series over ${categories.length} categories`}
        >
          {ticks.map((tick) => {
            const y = yFor(tick);
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  x2={width - PADDING.right}
                  y1={y}
                  y2={y}
                  stroke={chartTokens.grid}
                  strokeWidth={1}
                />
                <text
                  x={PADDING.left - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={typographyTokens.fontSize.xs}
                  fill={colorTokens.text.secondary}
                >
                  {valueFormatter(tick)}
                </text>
              </g>
            );
          })}

          {categories.map((cat, categoryIndex) => {
            const groupX =
              PADDING.left + categoryIndex * groupWidth + (groupWidth - groupContentWidth) / 2;
            return (
              <g key={cat}>
                <text
                  x={PADDING.left + categoryIndex * groupWidth + groupWidth / 2}
                  y={height - PADDING.bottom + 18}
                  textAnchor="middle"
                  fontSize={typographyTokens.fontSize.xs}
                  fill={colorTokens.text.secondary}
                >
                  {cat}
                </text>
                {coloredSeries.map((s, si) => {
                  const value = s.data[categoryIndex] ?? 0;
                  const barTop = yFor(value);
                  const barHeight = Math.max(0, baselineY - barTop);
                  const barX = groupX + si * (barWidth + BAR_GAP);
                  const r = Math.min(RADIUS, barWidth / 2, barHeight);
                  return (
                    <g key={s.label}>
                      <path
                        d={roundedTopRectPath(barX, barTop, barWidth, barHeight, r)}
                        fill={s.color}
                        onMouseMove={(e) => handleHover(e, s, categoryIndex)}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        {series.length > 1 && (
          <Legend items={coloredSeries.map((s) => ({ label: s.label, color: s.color }))} />
        )}
        <ChartTooltip state={tooltip} />
      </div>
    );
  }
);

BarChart.displayName = "BarChart";

/** A rectangle with the top two corners rounded and a square baseline. */
function roundedTopRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  if (height <= 0 || width <= 0) return "";
  const r = Math.max(0, Math.min(radius, width / 2, height));
  return [
    `M${x},${y + height}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${x + width - r},${y}`,
    `Q${x + width},${y} ${x + width},${y + r}`,
    `L${x + width},${y + height}`,
    "Z",
  ].join(" ");
}
