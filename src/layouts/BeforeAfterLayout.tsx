import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Before/after synchronized panes. */
export function BeforeAfterLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="BeforeAfter" template="comparison" {...props} />;
}
