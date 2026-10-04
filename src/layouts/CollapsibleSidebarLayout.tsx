import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Collapsible sidebar shell. */
export function CollapsibleSidebarLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CollapsibleSidebar" template="sidebar-shell" {...props} />;
}
