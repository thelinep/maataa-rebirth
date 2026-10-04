import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Editorial feature and support columns. */
export function MagazineLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Magazine" template="magazine" {...props} />;
}
