import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Independent scroll panes. */
export function ScrollablePaneLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ScrollablePane" template="scroll-panes" {...props} />;
}
