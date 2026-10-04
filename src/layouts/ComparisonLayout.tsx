import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Parallel comparison panes. */
export function ComparisonLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Comparison" template="comparison" {...props} />;
}
