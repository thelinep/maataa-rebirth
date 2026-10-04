import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Breakpoint-adaptive structure. */
export function ResponsiveAdaptiveLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ResponsiveAdaptive" template="adaptive" {...props} />;
}
