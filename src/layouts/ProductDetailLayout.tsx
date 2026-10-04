import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Media/gallery with details/actions. */
export function ProductDetailLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ProductDetail" template="product-detail" {...props} />;
}
