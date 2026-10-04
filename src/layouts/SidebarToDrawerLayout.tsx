import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Desktop sidebar to mobile drawer. */
export function SidebarToDrawerLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SidebarToDrawer" template="sidebar-drawer" {...props} />;
}
