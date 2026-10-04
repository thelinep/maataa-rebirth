import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Media gallery grid. */
export function GalleryLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Gallery" template="gallery" {...props} />;
}
