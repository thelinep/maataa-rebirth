import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Sticky header with scrolling content. */
export function StickyHeaderLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="StickyHeader" template="sticky-header" {...props} />;
}
