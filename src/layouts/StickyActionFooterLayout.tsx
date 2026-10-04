import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Sticky action footer. */
export function StickyActionFooterLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="StickyActionFooter" template="sticky-footer" {...props} />;
}
