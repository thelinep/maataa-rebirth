/**
 * @maataa/ui/surfaces/Tooltip
 * Floating label for brief contextual information
 */

import React, { useState, useRef, useEffect } from "react";
import { Portal } from "../primitives/Portal";
import { VisuallyHidden } from "../primitives/VisuallyHidden";
import { colorTokens, spacingTokens, radiusTokens } from "../tokens";

export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: React.ReactNode;

  /**
   * Element that triggers the tooltip
   */
  children: React.ReactElement;

  /**
   * Tooltip position
   * @default 'top'
   */
  position?: "top" | "right" | "bottom" | "left";

  /**
   * Delay before showing tooltip (ms)
   * @default 200
   */
  delay?: number;

  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Tooltip
 * Floating label showing brief information on hover
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = "top", delay = 200, disabled = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const showTooltip = () => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(false);
    };

    useEffect(() => {
      if (!isVisible || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current?.getBoundingClientRect();

      if (!tooltipRect) return;

      let x = 0;
      let y = 0;
      const gap = 8;

      switch (position) {
        case "top":
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top - tooltipRect.height - gap;
          break;
        case "bottom":
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + gap;
          break;
        case "left":
          x = triggerRect.left - tooltipRect.width - gap;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case "right":
          x = triggerRect.right + gap;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      setTooltipPosition({ x, y });
    }, [isVisible, position]);

    return (
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{
          display: "inline-block",
        }}
      >
        {children}

        {isVisible && !disabled && (
          <Portal>
            <div
              ref={tooltipRef}
              role="tooltip"
              style={{
                position: "fixed",
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                zIndex: 1000,
                padding: `${spacingTokens.sm} ${spacingTokens.md}`,
                backgroundColor: colorTokens.text.primary,
                color: colorTokens.text.inverse,
                fontSize: "14px",
                borderRadius: radiusTokens.md,
                boxShadow: colorTokens.shadow.lg,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {content}
            </div>
          </Portal>
        )}

        <VisuallyHidden>{isVisible ? content : ""}</VisuallyHidden>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
