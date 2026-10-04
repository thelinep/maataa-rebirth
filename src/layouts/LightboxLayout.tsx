import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Fullscreen media viewer. */
export function LightboxLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Lightbox" template="lightbox" {...props} />;
}
