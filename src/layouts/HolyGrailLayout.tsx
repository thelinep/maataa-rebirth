import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Holy Grail — header, left rail, main, right rail, footer. */
export function HolyGrailLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="HolyGrail" template="holy-grail" {...props} />;
}
