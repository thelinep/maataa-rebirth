import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Bins, viewer, timeline, inspector. */
export function VideoEditingLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="VideoEditing" template="video-editor" {...props} />;
}
