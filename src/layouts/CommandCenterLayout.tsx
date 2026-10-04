import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Operational command center. */
export function CommandCenterLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CommandCenter" template="command-center" {...props} />;
}
