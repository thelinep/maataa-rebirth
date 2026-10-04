import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Timeline tracks and detail. */
export function TimelineLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Timeline" template="timeline" {...props} />;
}
