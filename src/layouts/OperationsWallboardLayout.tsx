import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Always-on operational wallboard. */
export function OperationsWallboardLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="OperationsWallboard" template="wallboard" {...props} />;
}
