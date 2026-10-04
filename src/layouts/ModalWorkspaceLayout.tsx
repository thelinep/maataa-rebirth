import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Focused overlay workspace. */
export function ModalWorkspaceLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="ModalWorkspace" template="modal-workspace" {...props} />;
}
