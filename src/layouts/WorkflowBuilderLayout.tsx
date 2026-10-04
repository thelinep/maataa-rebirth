import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Node canvas with palette and inspector. */
export function WorkflowBuilderLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="WorkflowBuilder" template="workflow-builder" {...props} />;
}
