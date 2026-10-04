import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Global and section sidebars. */
export function DoubleSidebarLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="DoubleSidebar" template="double-sidebar" {...props} />;
}
