/**
 * @maataa/ui/primitives/VisuallyHidden
 * Component for hiding content visually while keeping it accessible to screen readers
 */

import React from "react";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Children content that should be visible to screen readers
   */
  children: React.ReactNode;

  /**
   * Whether the element is focusable
   * @default false
   */
  focusable?: boolean;
}

/**
 * VisuallyHidden
 * Hides content visually while keeping it accessible to screen readers
 * Follows ARIA best practices for accessibility
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ focusable = false, children, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
          ...(focusable && {
            "&:focus": {
              clip: "auto",
              width: "auto",
              height: "auto",
              overflow: "visible",
            },
          }),
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";
