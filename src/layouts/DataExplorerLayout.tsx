import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Filters, results, detail. */
export function DataExplorerLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="DataExplorer" template="data-explorer" {...props} />;
}
