import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Dockable panel workspace. */
export function DockablePanelLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="DockablePanel" template="dockable" {...props} />;
}
