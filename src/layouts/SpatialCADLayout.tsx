import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Layers, 2D/3D viewport, inspector, tools. */
export function SpatialCADLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SpatialCAD" template="spatial-cad" {...props} />;
}
