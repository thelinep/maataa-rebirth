import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Variable-height masonry. */
export function MasonryLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Masonry" template="masonry" {...props} />;
}
