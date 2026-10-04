import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Responsive dashboard grid. */
export function DashboardGridLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="DashboardGrid" template="dashboard" {...props} />;
}
