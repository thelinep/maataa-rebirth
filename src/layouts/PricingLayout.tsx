import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Pricing cards/comparison. */
export function PricingLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Pricing" template="pricing" {...props} />;
}
