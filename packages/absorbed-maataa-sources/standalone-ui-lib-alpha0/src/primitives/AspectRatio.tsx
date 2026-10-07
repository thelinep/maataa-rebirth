/**
 * @maataa/ui/primitives/AspectRatio
 * Constrains content to a fixed width-to-height ratio
 */

import React from "react";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width-to-height ratio, e.g. `16 / 9` or `1` for a square
   * @default 16/9
   */
  ratio?: number;

  /**
   * Children elements. A single child is stretched to fill the box.
   */
  children?: React.ReactNode;
}

/**
 * AspectRatio
 * Keeps its content — typically an image, video, or embed — at a fixed
 * width-to-height ratio regardless of container width.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/banner.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${ratio}`,
          overflow: "hidden",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
