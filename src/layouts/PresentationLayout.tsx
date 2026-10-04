import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Slide navigator, stage, notes. */
export function PresentationLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Presentation" template="presentation" {...props} />;
}
