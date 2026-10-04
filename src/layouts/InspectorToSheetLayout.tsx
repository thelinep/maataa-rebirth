import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Desktop inspector to mobile sheet. */
export function InspectorToSheetLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="InspectorToSheet" template="inspector-sheet" {...props} />;
}
