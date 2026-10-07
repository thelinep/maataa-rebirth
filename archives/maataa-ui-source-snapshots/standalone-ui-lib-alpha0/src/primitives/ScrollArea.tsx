/**
 * @maataa/ui/primitives/ScrollArea
 * Scrollable container with consistent, themed scrollbar styling
 */

import React from "react";
import { colorTokens } from "../tokens";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum height before scrolling kicks in
   */
  maxHeight?: string;

  /**
   * Maximum width before scrolling kicks in
   */
  maxWidth?: string;

  /**
   * Which axis/axes may scroll
   * @default 'vertical'
   */
  direction?: "vertical" | "horizontal" | "both";

  /**
   * Children elements
   */
  children?: React.ReactNode;
}

const overflowByDirection = {
  vertical: { overflowY: "auto" as const, overflowX: "hidden" as const },
  horizontal: { overflowY: "hidden" as const, overflowX: "auto" as const },
  both: { overflowY: "auto" as const, overflowX: "auto" as const },
};

/**
 * ScrollArea
 * A scrollable container with a themed, unobtrusive scrollbar.
 * Falls back gracefully to the platform's default scrollbar in
 * browsers that don't support the `::-webkit-scrollbar` pseudo-elements.
 *
 * @example
 * ```tsx
 * <ScrollArea maxHeight="240px">
 *   <LongListOfItems />
 * </ScrollArea>
 * ```
 */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ maxHeight, maxWidth, direction = "vertical", children, style, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className ? `maataa-scroll-area ${className}` : "maataa-scroll-area"}
        style={{
          maxHeight,
          maxWidth,
          scrollbarWidth: "thin",
          scrollbarColor: `${colorTokens.border.primary} transparent`,
          ...overflowByDirection[direction],
          ...style,
        }}
        {...props}
      >
        {children}
        <style>
          {`
            .maataa-scroll-area::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .maataa-scroll-area::-webkit-scrollbar-track {
              background: transparent;
            }
            .maataa-scroll-area::-webkit-scrollbar-thumb {
              background-color: ${colorTokens.border.primary};
              border-radius: 9999px;
            }
          `}
        </style>
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";
