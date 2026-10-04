import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Search, filters, listings, optional map. */
export function MarketplaceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Marketplace" template="marketplace" {...props} />;
}
