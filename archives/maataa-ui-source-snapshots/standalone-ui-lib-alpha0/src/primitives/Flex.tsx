/**
 * @maataa/ui/primitives/Flex
 * Low-level flexbox container primitive
 */

import React from "react";
import { spacingTokens } from "../tokens";

const alignMap: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
};

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Flex direction
   * @default 'row'
   */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";

  /**
   * Align items cross-axis
   * @default 'stretch'
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";

  /**
   * Justify items main-axis
   * @default 'start'
   */
  justify?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";

  /**
   * Whether items can wrap
   * @default false
   */
  wrap?: boolean;

  /**
   * Gap between children — a spacing token key or a raw CSS value
   */
  gap?: keyof typeof spacingTokens | string;

  /**
   * Render as an inline-flex container
   * @default false
   */
  inline?: boolean;

  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Flex
 * A low-level flexbox container. Unlike `Stack`, `Flex` makes no
 * assumptions about direction or spacing defaults — it's the raw
 * primitive that `Stack` and other opinionated layouts are built from.
 *
 * @example
 * ```tsx
 * <Flex direction="row" justify="space-between" align="center" gap="md">
 *   <span>Left</span>
 *   <span>Right</span>
 * </Flex>
 * ```
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = "row",
      align = "stretch",
      justify = "start",
      wrap = false,
      gap,
      inline = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const gapValue = gap ? spacingTokens[gap as keyof typeof spacingTokens] || gap : undefined;

    return (
      <div
        ref={ref}
        style={{
          display: inline ? "inline-flex" : "flex",
          flexDirection: direction,
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? "wrap" : "nowrap",
          gap: gapValue,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
