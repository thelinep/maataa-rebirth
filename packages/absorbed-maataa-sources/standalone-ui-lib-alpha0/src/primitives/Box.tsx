/**
 * @maataa/ui/primitives/Box
 * Generic building-block container exposing token-based style shorthands
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding on all sides, from the spacing token scale
   */
  padding?: keyof typeof spacingTokens;

  /**
   * Margin on all sides, from the spacing token scale
   */
  margin?: keyof typeof spacingTokens;

  /**
   * Background color, from the background token group
   */
  background?: keyof typeof colorTokens.background;

  /**
   * Border radius, from the radius token scale
   */
  radius?: keyof typeof radiusTokens;

  /**
   * Whether to render a 1px border using the default border token
   * @default false
   */
  border?: boolean;

  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Box
 * The most generic layout primitive: a `div` with token-based padding,
 * margin, background, radius, and border shorthands. Use it as the base
 * for one-off layout needs that don't warrant a more opinionated
 * component like `Flex`, `Grid`, or `Stack`.
 *
 * @example
 * ```tsx
 * <Box padding="md" background="secondary" radius="lg" border>
 *   Content
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ padding, margin, background, radius, border = false, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          padding: padding ? spacingTokens[padding] : undefined,
          margin: margin ? spacingTokens[margin] : undefined,
          backgroundColor: background ? colorTokens.background[background] : undefined,
          borderRadius: radius ? radiusTokens[radius] : undefined,
          border: border ? `1px solid ${colorTokens.border.primary}` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";
