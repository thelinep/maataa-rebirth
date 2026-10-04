import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Toolbar, filters, table content. */
export function TableWorkspaceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="TableWorkspace" template="table-workspace" {...props} />;
}
