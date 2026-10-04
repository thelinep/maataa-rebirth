import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Resources versus time. */
export function SchedulerLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Scheduler" template="scheduler" {...props} />;
}
