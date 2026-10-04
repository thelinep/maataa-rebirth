import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Primary split screen. */
export function SplitScreenLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SplitScreen" template="split" {...props} />;
}
