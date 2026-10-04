import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Dense multi-column editorial. */
export function NewspaperLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Newspaper" template="newspaper" {...props} />;
}
