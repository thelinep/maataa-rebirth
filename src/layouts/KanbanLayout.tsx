import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Horizontal workflow columns. */
export function KanbanLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Kanban" template="kanban" {...props} />;
}
