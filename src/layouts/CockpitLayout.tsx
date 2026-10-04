import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Dense operational cockpit. */
export function CockpitLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Cockpit" template="cockpit" {...props} />;
}
