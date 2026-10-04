import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Asset browser, viewer, timeline, inspector. */
export function MediaEditingLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="MediaEditing" template="media-editor" {...props} />;
}
