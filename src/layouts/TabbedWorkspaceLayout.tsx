import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Tabbed workspace shell. */
export function TabbedWorkspaceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="TabbedWorkspace" template="tabbed" {...props} />;
}
