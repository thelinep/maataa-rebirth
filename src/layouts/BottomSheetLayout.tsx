import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Mobile bottom-sheet workspace. */
export function BottomSheetLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="BottomSheet" template="bottom-sheet" {...props} />;
}
