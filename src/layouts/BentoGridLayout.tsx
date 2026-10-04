import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Asymmetric bento grid. */
export function BentoGridLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="BentoGrid" template="bento" {...props} />;
}
