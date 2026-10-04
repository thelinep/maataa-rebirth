import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Palette, canvas, inspector. */
export function BuilderLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Builder" template="builder" {...props} />;
}
