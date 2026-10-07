/**
 * @maataa/ui/navigation/TopNav
 * Horizontal application top bar, with brand, nav items, and actions slots
 */

import React from "react";
import { colorTokens, spacingTokens } from "../tokens";
import { Menu, type MenuItem } from "./Menu";

export interface TopNavProps {
  /**
   * Brand/logo content on the far left
   */
  brand?: React.ReactNode;

  /**
   * Navigation items, rendered horizontally via `Menu`
   */
  items?: MenuItem[];

  /**
   * The id of the currently active item
   */
  activeId?: string;

  /**
   * Called when a `Menu` item is selected
   */
  onSelect?: (id: string) => void;

  /**
   * Content on the far right, e.g. search, notifications, user avatar
   */
  actions?: React.ReactNode;

  /**
   * Whether the bar sticks to the top of its scroll container
   * @default false
   */
  sticky?: boolean;

  children?: React.ReactNode;
}

/**
 * TopNav
 * A horizontal top bar for an application shell: brand on the left,
 * primary navigation in the middle, and actions (search, avatar,
 * notifications) on the right. Pair with `Sidebar` and `AppShell`.
 *
 * @example
 * ```tsx
 * <TopNav
 *   brand={<Logo />}
 *   items={[{ id: "home", label: "Home" }, { id: "docs", label: "Docs" }]}
 *   activeId="home"
 *   actions={<IconButton icon="🔔" aria-label="Notifications" />}
 * />
 * ```
 */
export const TopNav: React.FC<TopNavProps> = ({
  brand,
  items,
  activeId,
  onSelect,
  actions,
  sticky = false,
  children,
}) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacingTokens.lg,
        padding: `${spacingTokens.sm} ${spacingTokens.lg}`,
        backgroundColor: colorTokens.background.primary,
        borderBottom: `1px solid ${colorTokens.border.primary}`,
        position: sticky ? "sticky" : "static",
        top: sticky ? 0 : undefined,
        zIndex: sticky ? 100 : undefined,
      }}
    >
      {brand && <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{brand}</div>}
      <div style={{ flex: 1, display: "flex", alignItems: "center", overflowX: "auto" }}>
        {children ??
          (items && (
            <Menu items={items} activeId={activeId} onSelect={onSelect} orientation="horizontal" />
          ))}
      </div>
      {actions && (
        <div
          style={{ display: "flex", alignItems: "center", gap: spacingTokens.sm, flexShrink: 0 }}
        >
          {actions}
        </div>
      )}
    </header>
  );
};

TopNav.displayName = "TopNav";
