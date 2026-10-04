import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Task tree plus schedule. */
export function GanttLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Gantt" template="gantt" {...props} />;
}
