import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Two-column content/sidebar. */
export function TwoColumnLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="TwoColumn" template="two-column" {...props} />;
}
