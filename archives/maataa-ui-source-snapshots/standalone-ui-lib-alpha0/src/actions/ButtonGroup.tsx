/**
 * @maataa/ui/actions/ButtonGroup
 * Groups related buttons together, visually connected or spaced apart
 */

import React, { Children, cloneElement, isValidElement } from "react";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout direction
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * When true, buttons are rendered edge-to-edge with shared borders,
   * like a segmented control. When false, buttons keep their own
   * shape and are simply spaced apart by `gap`.
   * @default true
   */
  attached?: boolean;

  /**
   * Gap between buttons when `attached` is false, from the spacing
   * token scale
   * @default 'sm'
   */
  gap?: keyof typeof spacingTokens;

  /**
   * The buttons to group. Each child's outer corners are rounded and
   * its border is de-duplicated with its neighbor automatically when
   * `attached` is true.
   */
  children?: React.ReactNode;
}

/**
 * ButtonGroup
 * Groups a set of buttons together, either as a connected segmented
 * control (`attached`, the default) or as simply-spaced siblings.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="secondary">Day</Button>
 *   <Button variant="secondary">Week</Button>
 *   <Button variant="secondary">Month</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { orientation = "horizontal", attached = true, gap = "sm", children, style, role, ...props },
    ref
  ) => {
    const items = Children.toArray(children).filter(isValidElement) as React.ReactElement<{
      style?: React.CSSProperties;
    }>[];
    const isHorizontal = orientation === "horizontal";

    return (
      <div
        ref={ref}
        role={role ?? "group"}
        style={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          gap: attached ? 0 : spacingTokens[gap],
          ...style,
        }}
        {...props}
      >
        {items.map((child, index) => {
          if (!attached) return cloneElement(child, { key: index });

          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          const attachedStyle: React.CSSProperties = {
            borderRadius: radiusTokens.none,
            ...(isHorizontal
              ? {
                  borderTopLeftRadius: isFirst ? radiusTokens.md : undefined,
                  borderBottomLeftRadius: isFirst ? radiusTokens.md : undefined,
                  borderTopRightRadius: isLast ? radiusTokens.md : undefined,
                  borderBottomRightRadius: isLast ? radiusTokens.md : undefined,
                  borderRight: isLast ? undefined : `1px solid ${colorTokens.background.primary}`,
                }
              : {
                  borderTopLeftRadius: isFirst ? radiusTokens.md : undefined,
                  borderTopRightRadius: isFirst ? radiusTokens.md : undefined,
                  borderBottomLeftRadius: isLast ? radiusTokens.md : undefined,
                  borderBottomRightRadius: isLast ? radiusTokens.md : undefined,
                  borderBottom: isLast ? undefined : `1px solid ${colorTokens.background.primary}`,
                }),
          };

          return cloneElement(child, {
            key: index,
            style: { ...child.props.style, ...attachedStyle },
          });
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
