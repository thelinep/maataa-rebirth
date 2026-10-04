import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Fluid viewport-filling content. */
export function FluidLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Fluid" template="fluid" {...props} />;
}
