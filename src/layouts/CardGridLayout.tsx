import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Repeating equal card grid. */
export function CardGridLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CardGrid" template="card-grid" {...props} />;
}
