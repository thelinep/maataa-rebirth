import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Fixed-width centered layout. */
export function FixedLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Fixed" template="fixed" {...props} />;
}
