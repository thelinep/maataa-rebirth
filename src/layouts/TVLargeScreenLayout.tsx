import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Distance-view large-screen layout. */
export function TVLargeScreenLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="TVLargeScreen" template="tv" {...props} />;
}
