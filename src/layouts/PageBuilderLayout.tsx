import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Block library, canvas, layer/property tools.
 * @deprecated Same template as `BuilderLayout`; use `BuilderLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function PageBuilderLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="PageBuilder" template="builder" {...props} />;
}
