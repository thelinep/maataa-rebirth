import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Form/editor plus live preview. */
export function FormPreviewLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="FormPreview" template="form-preview" {...props} />;
}
