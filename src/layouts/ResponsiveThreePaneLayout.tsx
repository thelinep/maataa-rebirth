import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Three-pane responsive collapse.
 * @deprecated Same template as `ThreeColumnLayout`; use `ThreeColumnLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function ResponsiveThreePaneLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ResponsiveThreePane" template="three-column" {...props} />;
}
