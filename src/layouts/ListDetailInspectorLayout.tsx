import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** List, detail, inspector three-pane. */
export function ListDetailInspectorLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ListDetailInspector" template="list-detail-inspector" {...props} />;
}
