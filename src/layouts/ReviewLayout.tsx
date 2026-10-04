import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Content, annotations, decision controls. */
export function ReviewLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Review" template="review" {...props} />;
}
