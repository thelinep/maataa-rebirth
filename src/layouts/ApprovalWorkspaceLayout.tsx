import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Record, evidence, decision rail. */
export function ApprovalWorkspaceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ApprovalWorkspace" template="approval" {...props} />;
}
