/**
 * @maataa/ui/surfaces/Popover
 * Floating panel with more content than a tooltip
 */

import React, { useState, useRef, useEffect } from "react";
import { Portal } from "../primitives/Portal";
import { Stack } from "../primitives/Stack";
import { colorTokens, spacingTokens, radiusTokens } from "../tokens";

export interface PopoverProps {
  /**
   * Popover content
   */
  content: React.ReactNode;

  /**
   * Element that triggers the popover
   */
  children: React.ReactElement;

  /**
   * Popover position
   * @default 'bottom'
   */
  position?: "top" | "right" | "bottom" | "left";

  /**
   * Popover title
   */
  title?: string;

  /**
   * Whether popover is controlled
   */
  isOpen?: boolean;

  /**
   * Callback when popover open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether popover is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Popover
 * Floating panel with more content than a tooltip
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({
    content,
    children,
    position = "bottom",
    title,
    isOpen: controlledIsOpen,
    onOpenChange,
    disabled = false,
  }) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

    const handleOpenChange = (newIsOpen: boolean) => {
      if (!disabled) {
        setUncontrolledIsOpen(newIsOpen);
        onOpenChange?.(newIsOpen);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current?.getBoundingClientRect();

      if (!popoverRect) return;

      let x = 0;
      let y = 0;
      const gap = 8;

      switch (position) {
        case "top":
          x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
          y = triggerRect.top - popoverRect.height - gap;
          break;
        case "bottom":
          x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
          y = triggerRect.bottom + gap;
          break;
        case "left":
          x = triggerRect.left - popoverRect.width - gap;
          y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
          break;
        case "right":
          x = triggerRect.right + gap;
          y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
          break;
      }

      setPopoverPosition({ x, y });
    }, [isOpen, position]);

    useEffect(() => {
      if (!isOpen) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, handleClickOutside]);

    return (
      <div
        ref={triggerRef}
        style={{
          display: "inline-block",
        }}
      >
        {React.cloneElement(children, {
          onClick: () => handleOpenChange(!isOpen),
        })}

        {isOpen && !disabled && (
          <Portal>
            <div
              ref={popoverRef}
              role="dialog"
              style={{
                position: "fixed",
                left: `${popoverPosition.x}px`,
                top: `${popoverPosition.y}px`,
                zIndex: 1000,
                backgroundColor: colorTokens.background.primary,
                border: `1px solid ${colorTokens.border.primary}`,
                borderRadius: radiusTokens.lg,
                boxShadow: colorTokens.shadow.lg,
                minWidth: "200px",
                maxWidth: "400px",
              }}
            >
              <Stack direction="vertical" spacing="0">
                {title && (
                  <div
                    style={{
                      padding: spacingTokens.md,
                      borderBottom: `1px solid ${colorTokens.border.primary}`,
                      fontWeight: 600,
                      color: colorTokens.text.primary,
                    }}
                  >
                    {title}
                  </div>
                )}
                <div
                  style={{
                    padding: spacingTokens.md,
                    color: colorTokens.text.primary,
                  }}
                >
                  {content}
                </div>
              </Stack>
            </div>
          </Portal>
        )}
      </div>
    );
  }
);

Popover.displayName = "Popover";
