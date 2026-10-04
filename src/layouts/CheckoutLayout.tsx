import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Checkout form and order summary. */
export function CheckoutLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Checkout" template="checkout" {...props} />;
}
