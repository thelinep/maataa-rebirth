import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Block library, canvas, layer/property tools. */
export function PageBuilderLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="PageBuilder" template="builder" {...props} />;
}
