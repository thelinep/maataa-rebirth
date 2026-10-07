/**
 * @maataa/ui/navigation/Tabs
 * Tabbed interface component with keyboard navigation
 */

import React, { useState } from "react";
import { Stack } from "../primitives/Stack";
import { VisuallyHidden } from "../primitives/VisuallyHidden";
import { colorTokens, spacingTokens, radiusTokens } from "../tokens";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of tab items
   */
  tabs: TabItem[];

  /**
   * Default active tab ID
   */
  defaultTab?: string;

  /**
   * Callback when tab changes
   */
  onChange?: (tabId: string) => void;

  /**
   * Tab variant style
   * @default 'line'
   */
  variant?: "line" | "box" | "pill";

  /**
   * Whether tabs are disabled
   */
  disabled?: boolean;
}

/**
 * Tabs
 * Tabbed interface with keyboard navigation support
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultTab, onChange, variant = "line", disabled = false, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

    const handleTabChange = (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab && !tab.disabled && !disabled) {
        setActiveTab(tabId);
        onChange?.(tabId);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let newIndex = index;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          newIndex = Math.min(index + 1, tabs.length - 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          newIndex = Math.max(index - 1, 0);
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      handleTabChange(tabs[newIndex].id);
    };

    const tabIndex = tabs.findIndex((t) => t.id === activeTab);

    const variantStyles = {
      line: {
        tab: (isActive: boolean) => ({
          padding: `${spacingTokens.md} ${spacingTokens.lg}`,
          borderBottom: `3px solid ${isActive ? colorTokens.interactive.primary : "transparent"}`,
          color: isActive ? colorTokens.interactive.primary : colorTokens.text.secondary,
          fontWeight: isActive ? 600 : 500,
        }),
        indicator: { display: "none" },
      },
      box: {
        tab: (isActive: boolean) => ({
          padding: spacingTokens.md,
          border: `1px solid ${colorTokens.border.primary}`,
          borderRadius: radiusTokens.md,
          backgroundColor: isActive
            ? colorTokens.interactive.primary
            : colorTokens.background.secondary,
          color: isActive ? colorTokens.background.primary : colorTokens.text.primary,
          fontWeight: isActive ? 600 : 500,
          margin: spacingTokens.sm,
        }),
        indicator: { display: "none" },
      },
      pill: {
        tab: (isActive: boolean) => ({
          padding: `${spacingTokens.sm} ${spacingTokens.lg}`,
          borderRadius: radiusTokens.full,
          backgroundColor: isActive
            ? colorTokens.interactive.primary
            : colorTokens.background.secondary,
          color: isActive ? colorTokens.background.primary : colorTokens.text.primary,
          fontWeight: isActive ? 600 : 500,
          margin: spacingTokens.xs,
        }),
        indicator: { display: "none" },
      },
    };

    const currentVariant = variantStyles[variant];

    return (
      <div ref={ref} {...props} style={{ width: "100%", ...props.style }}>
        {/* Tab list */}
        <Stack
          direction="horizontal"
          spacing="0"
          role="tablist"
          style={{
            borderBottom: variant === "line" ? `1px solid ${colorTokens.border.primary}` : "none",
            flexWrap: "wrap",
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={tab.disabled || disabled}
                style={{
                  border: "none",
                  background: "none",
                  cursor: tab.disabled || disabled ? "not-allowed" : "pointer",
                  opacity: tab.disabled || disabled ? 0.6 : 1,
                  transition: "all 0.2s ease",
                  ...currentVariant.tab(isActive),
                  ...props.style,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </Stack>

        {/* Tab panel */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== activeTab}
            style={{
              padding: spacingTokens.lg,
              display: tab.id === activeTab ? "block" : "none",
            }}
          >
            <VisuallyHidden>
              Tab {tabIndex + 1} of {tabs.length}
            </VisuallyHidden>
            {tab.content}
          </div>
        ))}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
