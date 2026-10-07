/**
 * @maataa/ui/primitives/Container
 * Max-width centered content wrapper
 */

import React from "react";
import { spacingTokens } from "../tokens";

const maxWidths = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  full: "100%",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width breakpoint
   * @default 'lg'
   */
  maxWidth?: keyof typeof maxWidths;

  /**
   * Horizontal padding, from the spacing token scale
   * @default 'md'
   */
  padding?: keyof typeof spacingTokens;

  /**
   * Whether to horizontally center the container with automatic margins
   * @default true
   */
  centered?: boolean;

  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Container
 * Constrains content to a maximum width and centers it on the page,
 * with consistent horizontal padding. The standard wrapper for page
 * and section content.
 *
 * @example
 * ```tsx
 * <Container maxWidth="lg">
 *   <h1>Page content</h1>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = "lg", padding = "md", centered = true, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          maxWidth: maxWidths[maxWidth],
          marginLeft: centered ? "auto" : undefined,
          marginRight: centered ? "auto" : undefined,
          paddingLeft: spacingTokens[padding],
          paddingRight: spacingTokens[padding],
          boxSizing: "border-box",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
