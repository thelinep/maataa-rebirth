/**
 * @maataa/ui/navigation/Sidebar
 * Vertical application navigation rail, with an optional collapsed/icon-only mode
 */

import React from "react";
import { colorTokens, spacingTokens } from "../tokens";
import { Menu, type MenuItem } from "./Menu";

export interface SidebarProps {
  /**
   * Navigation items, rendered via `Menu`. Omit and use `children`
   * for fully custom sidebar content instead.
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

  /** Direction for its menu items. @default 'vertical' */
  orientation?: "vertical" | "horizontal";

  /** Accessible name for the sidebar landmark. @default 'Sidebar navigation' */
  label?: string;

  /**
   * Content shown above the navigation items, e.g. a logo or app name
   */
  header?: React.ReactNode;

  /**
   * Content pinned to the bottom of the sidebar, e.g. a user menu
   */
  footer?: React.ReactNode;

  /**
   * Whether the sidebar is in its narrow, icon-only state
   * @default false
   */
  collapsed?: boolean;

  /**
   * Width when expanded
   * @default '240px'
   */
  width?: string;

  /**
   * Width when `collapsed` is true
   * @default '64px'
   */
  collapsedWidth?: string;

  /**
   * Custom content, rendered instead of the `items` menu
   */
  children?: React.ReactNode;
}

/**
 * Sidebar
 * A vertical navigation rail for an application shell, with header
 * and footer slots and an optional collapsed, icon-only width. Pair
 * with `TopNav` and `AppShell` to compose a full app layout.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   header={<Logo />}
 *   items={[{ id: "home", label: "Home", icon: <HomeIcon /> }]}
 *   activeId="home"
 * />
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onSelect,
  orientation = "vertical",
  label = "Sidebar navigation",
  header,
  footer,
  collapsed = false,
  width = "240px",
  collapsedWidth = "64px",
  children,
}) => {
  return (
    <aside
      aria-label={label}
      style={{
        display: "flex",
        flexDirection: "column",
        width: collapsed ? collapsedWidth : width,
        height: "100%",
        backgroundColor: colorTokens.background.primary,
        borderRight: `1px solid ${colorTokens.border.primary}`,
        transition: "none",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {header && (
        <div
          style={{
            padding: spacingTokens.md,
            borderBottom: `1px solid ${colorTokens.border.secondary}`,
          }}
        >
          {header}
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: spacingTokens.sm }}>
        {children ??
          (items && (
            <Menu items={items} activeId={activeId} onSelect={onSelect} orientation={orientation} />
          ))}
      </div>
      {footer && (
        <div
          style={{
            padding: spacingTokens.md,
            borderTop: `1px solid ${colorTokens.border.secondary}`,
          }}
        >
          {footer}
        </div>
      )}
    </aside>
  );
};

Sidebar.displayName = "Sidebar";
