import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Viewport-edge content/media. */
export function FullBleedLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="FullBleed" template="full-bleed" {...props} />;
}
