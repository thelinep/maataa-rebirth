import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Sticky navigation/context rail. */
export function StickySidebarLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="StickySidebar" template="sticky-sidebar" {...props} />;
}
