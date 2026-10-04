import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Left rail, main, right rail. */
export function ThreeColumnLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ThreeColumn" template="three-column" {...props} />;
}
