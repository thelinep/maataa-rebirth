import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Calendar grid. */
export function CalendarLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Calendar" template="calendar" {...props} />;
}
