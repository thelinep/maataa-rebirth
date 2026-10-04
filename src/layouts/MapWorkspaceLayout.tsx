import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Map-first workspace. */
export function MapWorkspaceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="MapWorkspace" template="map" {...props} />;
}
