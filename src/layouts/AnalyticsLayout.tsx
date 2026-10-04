import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** KPI, chart and data regions. */
export function AnalyticsLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Analytics" template="analytics" {...props} />;
}
