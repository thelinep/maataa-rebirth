import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Persistent sidebar shell. */
export function SidebarShellLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SidebarShell" template="sidebar-shell" {...props} />;
}
