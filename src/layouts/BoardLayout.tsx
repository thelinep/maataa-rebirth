import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** General card board. */
export function BoardLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Board" template="board" {...props} />;
}
