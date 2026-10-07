/**
 * @maataa/ui/data/LineChart
 * A multi-series line chart with gridlines, legend, and hover tooltip
 */

import React, { useState } from "react";
import { chartTokens, colorTokens, typographyTokens } from "../tokens";
import { ChartTooltip, type ChartTooltipState } from "./ChartTooltip";
import { Legend } from "./Legend";
import { buildLinePath, niceTicks } from "./chartUtils";

export interface ChartSeries {
  label: string;
  data: number[];
  color?: string;
}

export interface LineChartProps {
  /** One or more series, each with one value per `categories` entry. */
  series: ChartSeries[];

  /** X-axis category labels, same length as each series' `data`. */
  categories: string[];

  width?: number;
  height?: number;

  /** Formats a raw value for the tooltip and y-axis ticks. */
  valueFormatter?: (value: number) => string;

  className?: string;
  style?: React.CSSProperties;
}

const PADDING = { top: 16, right: 16, bottom: 28, left: 44 };

/**
 * LineChart
 * Plots one or more series as 2px lines over a shared 0-anchored y-axis,
 * with recessive gridlines, an end-dot per series, a legend (when there are
 * two or more series), and a per-category hover tooltip listing every
 * series' value at that point.
 *
 * @example
 * ```tsx
 * <LineChart
 *   categories={["Mon", "Tue", "Wed", "Thu", "Fri"]}
 *   series={[{ label: "Visits", data: [120, 180, 150, 220, 300] }]}
 * />
 * ```
 */
export const LineChart = React.forwardRef<SVGSVGElement, LineChartProps>(
  (
    { series, categories, width = 480, height = 240, valueFormatter = String, className, style },
    ref
  ) => {
    const [tooltip, setTooltip] = useState<ChartTooltipState | null>(null);

    const plotWidth = width - PADDING.left - PADDING.right;
    const plotHeight = height - PADDING.top - PADDING.bottom;

    const maxValue = Math.max(1, ...series.flatMap((s) => s.data));
    const ticks = niceTicks(maxValue);
    const scaleMax = ticks[ticks.length - 1] || 1;

    const xFor = (i: number) =>
      PADDING.left +
      (categories.length > 1 ? (i / (categories.length - 1)) * plotWidth : plotWidth / 2);
    const yFor = (value: number) => PADDING.top + plotHeight - (value / scaleMax) * plotHeight;

    const coloredSeries = series.map((s, i) => ({
      ...s,
      color:
        s.color ??
        (series.length > 1
          ? chartTokens.categorical[i % chartTokens.categorical.length]
          : chartTokens.single),
    }));

    const handleHover = (e: React.MouseEvent, categoryIndex: number) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY - 12,
        title: categories[categoryIndex],
        rows: coloredSeries.map((s) => ({
          label: s.label,
          value: valueFormatter(s.data[categoryIndex] ?? 0),
          color: s.color,
        })),
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
          aria-label={`Line chart with ${series.length} series over ${categories.length} categories`}
        >
          {/* Gridlines + y-axis ticks */}
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

          {/* X-axis category labels */}
          {categories.map((cat, i) => (
            <text
              key={cat}
              x={xFor(i)}
              y={height - PADDING.bottom + 18}
              textAnchor="middle"
              fontSize={typographyTokens.fontSize.xs}
              fill={colorTokens.text.secondary}
            >
              {cat}
            </text>
          ))}

          {/* Series lines + end dots */}
          {coloredSeries.map((s) => {
            const points = s.data.map((v, i) => ({ x: xFor(i), y: yFor(v) }));
            const last = points[points.length - 1];
            return (
              <g key={s.label}>
                <path
                  d={buildLinePath(points)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {last && (
                  <>
                    <circle cx={last.x} cy={last.y} r={6} fill={colorTokens.background.primary} />
                    <circle cx={last.x} cy={last.y} r={4} fill={s.color} />
                  </>
                )}
              </g>
            );
          })}

          {/* Hover hit targets, one per category, spanning the full plot height */}
          {categories.map((cat, i) => {
            const bandWidth =
              categories.length > 1 ? plotWidth / (categories.length - 1) : plotWidth;
            return (
              <rect
                key={cat}
                x={xFor(i) - bandWidth / 2}
                y={PADDING.top}
                width={bandWidth}
                height={plotHeight}
                fill="transparent"
                onMouseMove={(e) => handleHover(e, i)}
                onMouseLeave={() => setTooltip(null)}
              />
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

LineChart.displayName = "LineChart";
