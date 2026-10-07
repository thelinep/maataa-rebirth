/**
 * @maataa/ui/navigation/Menu
 * Static navigational menu list, with optional nested groups
 */

import React, { useState } from "react";
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  /**
   * Nested items, rendered as a collapsible sub-list
   */
  children?: MenuItem[];
}

export interface MenuProps {
  /**
   * The items to render
   */
  items: MenuItem[];

  /**
   * The id of the currently active/selected item
   */
  activeId?: string;

  /**
   * Called when an item without its own `onClick` is selected
   */
  onSelect?: (id: string) => void;

  /**
   * Layout direction
   * @default 'vertical'
   */
  orientation?: "vertical" | "horizontal";

  /**
   * Ids of items whose children start expanded (uncontrolled)
   */
  defaultExpandedIds?: string[];

  className?: string;
  style?: React.CSSProperties;
}

const MenuItems: React.FC<{
  items: MenuItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  orientation: "vertical" | "horizontal";
  depth: number;
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
}> = ({ items, activeId, onSelect, orientation, depth, expandedIds, toggleExpanded }) => {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: orientation === "horizontal" && depth === 0 ? "row" : "column",
        gap: orientation === "horizontal" && depth === 0 ? spacingTokens.xs : 0,
      }}
    >
      {items.map((item) => {
        const hasChildren = Boolean(item.children && item.children.length > 0);
        const isExpanded = expandedIds.has(item.id);
        const isActive = item.id === activeId;

        const handleClick = () => {
          if (item.disabled) return;
          if (hasChildren) {
            toggleExpanded(item.id);
            return;
          }
          item.onClick?.();
          onSelect?.(item.id);
        };

        const content = (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacingTokens.sm,
              width: orientation === "horizontal" && depth === 0 ? "auto" : "100%",
              padding: `${spacingTokens.sm} ${spacingTokens.md}`,
              paddingLeft: `calc(${spacingTokens.md} + ${depth} * ${spacingTokens.lg})`,
              borderRadius: radiusTokens.sm,
              fontSize: typographyTokens.fontSize.md,
              fontWeight: isActive
                ? typographyTokens.fontWeight.semibold
                : typographyTokens.fontWeight.normal,
              color: isActive ? colorTokens.interactive.primary : colorTokens.text.primary,
              backgroundColor: isActive ? colorTokens.background.secondary : "transparent",
              cursor: item.disabled ? "not-allowed" : "pointer",
              opacity: item.disabled ? 0.6 : 1,
            }}
          >
            {item.icon && (
              <span aria-hidden="true" style={{ display: "flex" }}>
                {item.icon}
              </span>
            )}
            <span style={{ flex: 1 }}>{item.label}</span>
            {hasChildren && (
              <span
                aria-hidden="true"
                style={{
                  fontSize: "10px",
                  transition: "transform 0.2s ease",
                  transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                }}
              >
                ▾
              </span>
            )}
          </span>
        );

        return (
          <li key={item.id}>
            {item.href && !hasChildren ? (
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                  else {
                    item.onClick?.();
                    onSelect?.(item.id);
                  }
                }}
                style={{ textDecoration: "none", display: "block" }}
              >
                {content}
              </a>
            ) : (
              <button
                type="button"
                onClick={handleClick}
                disabled={item.disabled}
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-current={isActive ? "page" : undefined}
                style={{
                  display: "block",
                  width: orientation === "horizontal" && depth === 0 ? "auto" : "100%",
                  border: "none",
                  background: "none",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                {content}
              </button>
            )}
            {hasChildren && isExpanded && (
              <MenuItems
                items={item.children!}
                activeId={activeId}
                onSelect={onSelect}
                orientation="vertical"
                depth={depth + 1}
                expandedIds={expandedIds}
                toggleExpanded={toggleExpanded}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

/**
 * Menu
 * A static, in-page navigational menu — as opposed to `Dropdown`,
 * which is a floating action popup. Supports nested, collapsible
 * groups and both vertical and horizontal layouts. `Sidebar` and
 * `TopNav` use `Menu` internally.
 *
 * @example
 * ```tsx
 * <Menu
 *   items={[
 *     { id: "home", label: "Home", href: "/" },
 *     { id: "settings", label: "Settings", children: [
 *       { id: "profile", label: "Profile", href: "/settings/profile" },
 *     ]},
 *   ]}
 *   activeId="home"
 * />
 * ```
 */
export const Menu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  orientation = "vertical",
  defaultExpandedIds = [],
  className,
  style,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <nav className={className} style={style}>
      <MenuItems
        items={items}
        activeId={activeId}
        onSelect={onSelect}
        orientation={orientation}
        depth={0}
        expandedIds={expandedIds}
        toggleExpanded={toggleExpanded}
      />
    </nav>
  );
};

Menu.displayName = "Menu";
