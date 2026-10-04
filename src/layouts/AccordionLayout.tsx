import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Stacked expandable sections. */
export function AccordionLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Accordion" template="accordion" {...props} />;
}
