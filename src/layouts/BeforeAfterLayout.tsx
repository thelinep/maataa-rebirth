import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Before/after synchronized panes.
 * @deprecated Same template as `ComparisonLayout`; use `ComparisonLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function BeforeAfterLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="BeforeAfter" template="comparison" {...props} />;
}
