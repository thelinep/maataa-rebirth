/**
 * @maataa/ui/data/DonutChart
 * Categorical share-of-total, as a ring of stroke segments
 */

import React, { useState } from "react";
import { chartTokens, colorTokens, typographyTokens } from "../tokens";
import { ChartTooltip, type ChartTooltipState } from "./ChartTooltip";
import { Legend } from "./Legend";
import { formatCompactNumber } from "./chartUtils";

export interface DonutSlice {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: DonutSlice[];

  size?: number;

  /** Ring thickness in px. @default 24 */
  thickness?: number;

  /** Shows the summed total in the center of the ring. @default true */
  showTotal?: boolean;

  /** Formats a raw value for the tooltip and (when `showTotal`) the center label. */
  valueFormatter?: (value: number) => string;

  className?: string;
  style?: React.CSSProperties;
}

const GAP = 2;

/**
 * DonutChart
 * Each slice is a stroke segment on a ring, in the design system's
 * CVD-safe categorical order, separated by a 2px surface gap. A legend
 * always accompanies it (color alone never carries identity here), and
 * the ring's center can show the summed total.
 *
 * @example
 * ```tsx
 * <DonutChart
 *   data={[
 *     { label: "Direct", value: 420 },
 *     { label: "Referral", value: 180 },
 *     { label: "Social", value: 90 },
 *   ]}
 * />
 * ```
 */
export const DonutChart = React.forwardRef<SVGSVGElement, DonutChartProps>(
  (
    {
      data,
      size = 200,
      thickness = 24,
      showTotal = true,
      valueFormatter = String,
      className,
      style,
    },
    ref
  ) => {
    const [tooltip, setTooltip] = useState<ChartTooltipState | null>(null);

    const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    let cumulative = 0;
    const slices = data.map((d, i) => {
      const fraction = d.value / total;
      const length = fraction * circumference;
      const color = d.color ?? chartTokens.categorical[i % chartTokens.categorical.length];
      const offsetBefore = cumulative;
      cumulative += length;
      return { ...d, length, offsetBefore, color, fraction };
    });

    const handleHover = (e: React.MouseEvent, slice: (typeof slices)[number]) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY - 12,
        title: slice.label,
        rows: [
          {
            label: `${Math.round(slice.fraction * 1000) / 10}%`,
            value: valueFormatter(slice.value),
            color: slice.color,
          },
        ],
      });
    };

    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "12px", ...style }}
      >
        <div style={{ position: "relative", width: size, height: size }}>
          <svg
            ref={ref}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label={`Donut chart with ${data.length} categories`}
          >
            <g transform={`rotate(-90 ${center} ${center})`}>
              {slices.map((slice) => {
                const drawLength = Math.max(slice.length - GAP, 0);
                return (
                  <circle
                    key={slice.label}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth={thickness}
                    strokeDasharray={`${drawLength} ${circumference - drawLength}`}
                    strokeDashoffset={-slice.offsetBefore}
                    onMouseMove={(e) => handleHover(e, slice)}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </g>
          </svg>
          {showTotal && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontSize: typographyTokens.fontSize["2xl"],
                  fontWeight: typographyTokens.fontWeight.semibold,
                  color: colorTokens.text.primary,
                }}
              >
                {formatCompactNumber(total)}
              </span>
              <span
                style={{
                  fontSize: typographyTokens.fontSize.xs,
                  color: colorTokens.text.secondary,
                }}
              >
                Total
              </span>
            </div>
          )}
        </div>
        <Legend items={slices.map((s) => ({ label: s.label, color: s.color }))} />
        <ChartTooltip state={tooltip} />
      </div>
    );
  }
);

DonutChart.displayName = "DonutChart";
