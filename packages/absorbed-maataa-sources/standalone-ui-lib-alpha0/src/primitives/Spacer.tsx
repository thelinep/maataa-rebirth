/**
 * @maataa/ui/primitives/Spacer
 * Flexible or fixed-size gap for flex layouts
 */

import React from "react";
import { spacingTokens } from "../tokens";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Fixed size, from the spacing token scale or a raw CSS value.
   * When omitted, the Spacer grows to fill available space (`flex: 1`).
   */
  size?: keyof typeof spacingTokens | string;

  /**
   * Which axis the fixed `size` applies to when a flex-growing spacer
   * is not being used
   * @default 'vertical'
   */
  axis?: "horizontal" | "vertical";
}

/**
 * Spacer
 * Used inside a `Flex` or `Stack` to either grow and fill remaining
 * space (default) or insert a fixed-size gap along one axis.
 *
 * @example
 * ```tsx
 * <Flex>
 *   <span>Left</span>
 *   <Spacer />
 *   <span>Right</span>
 * </Flex>
 * <Spacer size="lg" axis="vertical" />
 * ```
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ size, axis = "vertical", style, "aria-hidden": ariaHidden = true, ...props }, ref) => {
    const resolvedSize = size
      ? spacingTokens[size as keyof typeof spacingTokens] || size
      : undefined;

    return (
      <div
        ref={ref}
        aria-hidden={ariaHidden}
        style={
          resolvedSize
            ? {
                flexShrink: 0,
                width: axis === "horizontal" ? resolvedSize : undefined,
                height: axis === "vertical" ? resolvedSize : undefined,
                ...style,
              }
            : {
                flex: 1,
                ...style,
              }
        }
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";
