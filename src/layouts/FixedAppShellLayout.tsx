import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Fixed app chrome with scrollable content. */
export function FixedAppShellLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="FixedAppShell" template="fixed-shell" {...props} />;
}
