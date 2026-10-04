import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Single-column mobile stack. */
export function MobileStackLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="MobileStack" template="mobile-stack" {...props} />;
}
