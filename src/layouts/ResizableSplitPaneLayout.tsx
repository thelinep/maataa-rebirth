import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Resizable split panes. */
export function ResizableSplitPaneLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ResizableSplitPane" template="resizable-split" {...props} />;
}
