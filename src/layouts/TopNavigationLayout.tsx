import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Top navigation with content. */
export function TopNavigationLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="TopNavigation" template="topnav" {...props} />;
}
