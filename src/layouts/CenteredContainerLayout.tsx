import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Centered max-width content. */
export function CenteredContainerLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CenteredContainer" template="single-column" {...props} />;
}
