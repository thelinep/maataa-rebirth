import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Centered max-width content.
 * @deprecated Same template as `SingleColumnLayout`; use `SingleColumnLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function CenteredContainerLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CenteredContainer" template="single-column" {...props} />;
}
