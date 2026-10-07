/**
 * @maataa/ui/data/Sparkline
 * A compact, axis-free inline trend line
 */

import React from "react";
import { chartTokens } from "../tokens";
import { buildLinePath } from "./chartUtils";

export interface SparklineProps {
  /** The series values, in order. */
  data: number[];

  width?: number;
  height?: number;

  /** Line color. Defaults to the system's single-series brand color. */
  color?: string;

  /** Highlights the final point with a filled dot. @default true */
  showEndDot?: boolean;

  /** Accessible label summarizing what the sparkline shows. */
  "aria-label"?: string;

  className?: string;
  style?: React.CSSProperties;
}

/**
 * Sparkline
 * A minimal inline trend line with no axes or gridlines — for a stat
 * tile's `trend`, or any place a full chart would be too heavy.
 *
 * @example
 * ```tsx
 * <Sparkline data={[4, 6, 5, 8, 9, 7, 10]} aria-label="Last 7 days" />
 * ```
 */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      width = 96,
      height = 28,
      color = chartTokens.single,
      showEndDot = true,
      "aria-label": ariaLabel,
      className,
      style,
    },
    ref
  ) => {
    const padding = 3;
    const min = Math.min(...data, 0);
    const max = Math.max(...data, 1);
    const range = max - min || 1;

    const points = data.map((value, i) => {
      const x =
        data.length > 1 ? padding + (i / (data.length - 1)) * (width - padding * 2) : width / 2;
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return { x, y };
    });

    const path = buildLinePath(points);
    const last = points[points.length - 1];

    return (
      <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel ?? `Trend sparkline, ${data.length} points`}
        style={style}
      >
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showEndDot && last && <circle cx={last.x} cy={last.y} r={2.5} fill={color} />}
      </svg>
    );
  }
);

Sparkline.displayName = "Sparkline";
