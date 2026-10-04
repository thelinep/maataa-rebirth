import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Primary freeform canvas. */
export function CanvasLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Canvas" template="canvas" {...props} />;
}
