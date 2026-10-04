import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Mobile tabbed content. */
export function MobileTabLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="MobileTab" template="mobile-tabs" {...props} />;
}
