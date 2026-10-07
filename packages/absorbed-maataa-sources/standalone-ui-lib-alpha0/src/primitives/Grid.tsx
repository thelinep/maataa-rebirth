/**
 * @maataa/ui/primitives/Grid
 * CSS Grid layout container primitive
 */

import React from "react";
import { spacingTokens } from "../tokens";

const alignMap: Record<string, string> = {
  start: "start",
  center: "center",
  end: "end",
  stretch: "stretch",
};

const justifyMap: Record<string, string> = {
  start: "start",
  center: "center",
  end: "end",
  stretch: "stretch",
  "space-between": "space-between",
};

function resolveTemplate(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `repeat(${value}, 1fr)` : value;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of equal-width columns, or an explicit `grid-template-columns` value
   */
  columns?: number | string;

  /**
   * Number of equal-height rows, or an explicit `grid-template-rows` value
   */
  rows?: number | string;

  /**
   * Gap between rows and columns — a spacing token key or a raw CSS value.
   * Overridden individually by `columnGap` / `rowGap` when set.
   */
  gap?: keyof typeof spacingTokens | string;

  /**
   * Gap between columns only — a spacing token key or a raw CSS value
   */
  columnGap?: keyof typeof spacingTokens | string;

  /**
   * Gap between rows only — a spacing token key or a raw CSS value
   */
  rowGap?: keyof typeof spacingTokens | string;

  /**
   * Align items on the block (cross) axis
   * @default 'stretch'
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Justify items on the inline (main) axis
   * @default 'stretch'
   */
  justify?: "start" | "center" | "end" | "stretch" | "space-between";

  /**
   * Children elements
   */
  children?: React.ReactNode;
}

function resolveSpacing(value?: keyof typeof spacingTokens | string): string | undefined {
  if (!value) return undefined;
  return spacingTokens[value as keyof typeof spacingTokens] || value;
}

/**
 * Grid
 * A CSS Grid layout primitive. Pass a number of columns/rows for an
 * even `repeat()` track, or a raw `grid-template-columns`/`-rows`
 * string for full control.
 *
 * @example
 * ```tsx
 * <Grid columns={3} gap="md">
 *   <Card>1</Card>
 *   <Card>2</Card>
 *   <Card>3</Card>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns,
      rows,
      gap,
      columnGap,
      rowGap,
      align = "stretch",
      justify = "stretch",
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: resolveTemplate(columns),
          gridTemplateRows: resolveTemplate(rows),
          gap: resolveSpacing(gap),
          columnGap: resolveSpacing(columnGap),
          rowGap: resolveSpacing(rowGap),
          alignItems: alignMap[align],
          justifyItems: justifyMap[justify],
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";
