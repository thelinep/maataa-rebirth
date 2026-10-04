import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Outline, document canvas, comments/tools. */
export function DocumentEditorLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="DocumentEditor" template="document" {...props} />;
}
