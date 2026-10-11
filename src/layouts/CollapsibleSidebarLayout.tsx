import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Collapsible sidebar shell.
 * @deprecated Same template as `SidebarShellLayout`; use `SidebarShellLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function CollapsibleSidebarLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CollapsibleSidebar" template="sidebar-shell" {...props} />;
}
