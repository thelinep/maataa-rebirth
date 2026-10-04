import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Single centered content column. */
export function SingleColumnLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SingleColumn" template="single-column" {...props} />;
}
