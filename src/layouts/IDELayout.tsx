import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Navigator, editor, terminal/status panes. */
export function IDELayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="IDE" template="ide" {...props} />;
}
