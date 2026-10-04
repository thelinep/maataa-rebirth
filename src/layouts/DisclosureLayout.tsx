import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Progressively disclosed regions. */
export function DisclosureLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Disclosure" template="disclosure" {...props} />;
}
