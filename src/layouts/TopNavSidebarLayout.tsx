import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Top navigation plus sidebar. */
export function TopNavSidebarLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="TopNavSidebar" template="topnav-sidebar" {...props} />;
}
