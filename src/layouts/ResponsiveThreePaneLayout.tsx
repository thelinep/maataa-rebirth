import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Three-pane responsive collapse. */
export function ResponsiveThreePaneLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ResponsiveThreePane" template="three-column" {...props} />;
}
