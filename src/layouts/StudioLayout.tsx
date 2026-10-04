import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Asset palette, stage, inspector, timeline. */
export function StudioLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Studio" template="studio" {...props} />;
}
