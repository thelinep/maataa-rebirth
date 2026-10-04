import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Article with side notes/media. */
export function EditorialLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Editorial" template="editorial" {...props} />;
}
