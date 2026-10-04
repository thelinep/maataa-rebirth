import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Toolbar, canvas, inspector workbench. */
export function WorkbenchLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Workbench" template="workbench" {...props} />;
}
