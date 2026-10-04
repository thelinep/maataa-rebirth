import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Sidebar, article, table of contents. */
export function DocumentationLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Documentation" template="documentation" {...props} />;
}
