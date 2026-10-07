/**
 * @maataa/ui/navigation
 * Category: navigation
 * Navigation components for moving through applications
 */

// Tabs
export { Tabs, type TabsProps, type TabItem } from "./Tabs";

// Breadcrumb
export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from "./Breadcrumb";

// Pagination
export { Pagination, type PaginationProps } from "./Pagination";

// Core navigation & shell components (MUI-06)
export { Menu, type MenuProps, type MenuItem } from "./Menu";
export { Sidebar, type SidebarProps } from "./Sidebar";
export { TopNav, type TopNavProps } from "./TopNav";
export { AppShell, type AppShellProps } from "./AppShell";

// Component metadata for Storybook and docs
export const navigationComponents = [
  {
    id: "menu",
    name: "Menu",
    component: "Menu",
    category: "Navigation",
    description: "A static, in-page navigational menu with optional nested, collapsible groups",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    component: "Sidebar",
    category: "Navigation",
    description:
      "A vertical application navigation rail, with an optional collapsed/icon-only mode",
  },
  {
    id: "top-nav",
    name: "TopNav",
    component: "TopNav",
    category: "Navigation",
    description: "A horizontal application top bar, with brand, nav items, and actions slots",
  },
  {
    id: "app-shell",
    name: "AppShell",
    component: "AppShell",
    category: "Navigation",
    description:
      "Responsive workspace frame with configurable navigation, toolbar, content, and footer regions",
  },
];
