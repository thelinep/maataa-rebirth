import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Content-driven intrinsic layout. */
export function IntrinsicLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Intrinsic" template="intrinsic" {...props} />;
}
