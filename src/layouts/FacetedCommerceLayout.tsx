import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Filters and product/result grid. */
export function FacetedCommerceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="FacetedCommerce" template="commerce" {...props} />;
}
