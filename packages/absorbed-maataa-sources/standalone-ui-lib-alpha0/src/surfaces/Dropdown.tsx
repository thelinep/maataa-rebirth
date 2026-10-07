/**
 * @maataa/ui/surfaces/Dropdown
 * Context menu or action dropdown component
 */

import React, { useState, useRef, useEffect } from "react";
import { Portal } from "../primitives/Portal";
import { Stack } from "../primitives/Stack";
import { colorTokens, spacingTokens, radiusTokens } from "../tokens";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  /**
   * Dropdown trigger button content
   */
  trigger: React.ReactNode;

  /**
   * Dropdown menu items
   */
  items: DropdownItem[];

  /**
   * Callback when item is clicked
   */
  onSelect?: (itemId: string) => void;

  /**
   * Position relative to trigger
   * @default 'bottom'
   */
  position?: "top" | "bottom" | "left" | "right";

  /**
   * Whether dropdown is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Dropdown
 * Context menu or action dropdown component
 */
export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, items, onSelect, position = "bottom", disabled = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleItemClick = (itemId: string) => {
      const item = items.find((i) => i.id === itemId);
      if (item && !item.disabled) {
        item.onClick?.();
        onSelect?.(itemId);
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current?.getBoundingClientRect();

      if (!dropdownRect) return;

      let x = 0;
      let y = 0;
      const gap = 8;

      switch (position) {
        case "bottom":
          x = triggerRect.left;
          y = triggerRect.bottom + gap;
          break;
        case "top":
          x = triggerRect.left;
          y = triggerRect.top - dropdownRect.height - gap;
          break;
        case "left":
          x = triggerRect.left - dropdownRect.width - gap;
          y = triggerRect.top;
          break;
        case "right":
          x = triggerRect.right + gap;
          y = triggerRect.top;
          break;
      }

      setDropdownPosition({ x, y });
    }, [isOpen, position]);

    useEffect(() => {
      if (!isOpen) return;

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
      <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
        <button
          ref={triggerRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {trigger}
        </button>

        {isOpen && !disabled && (
          <Portal>
            <div
              ref={dropdownRef}
              role="menu"
              style={{
                position: "fixed",
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y}px`,
                zIndex: 1000,
                backgroundColor: colorTokens.background.primary,
                border: `1px solid ${colorTokens.border.primary}`,
                borderRadius: radiusTokens.md,
                boxShadow: colorTokens.shadow.lg,
                minWidth: "160px",
                overflow: "hidden",
              }}
            >
              <Stack direction="vertical" spacing="0">
                {items.map((item, index) => {
                  if (item.divider) {
                    return (
                      <div
                        key={`divider-${index}`}
                        style={{
                          height: "1px",
                          backgroundColor: colorTokens.border.primary,
                          margin: `${spacingTokens.xs} 0`,
                        }}
                      />
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      role="menuitem"
                      onClick={() => handleItemClick(item.id)}
                      disabled={item.disabled}
                      style={{
                        width: "100%",
                        padding: spacingTokens.md,
                        border: "none",
                        backgroundColor: "transparent",
                        textAlign: "left",
                        color: colorTokens.text.primary,
                        cursor: item.disabled ? "not-allowed" : "pointer",
                        opacity: item.disabled ? 0.6 : 1,
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!item.disabled) {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            colorTokens.background.secondary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <span
                        style={{ display: "flex", alignItems: "center", gap: spacingTokens.sm }}
                      >
                        {item.icon && <span>{item.icon}</span>}
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </Stack>
            </div>
          </Portal>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
