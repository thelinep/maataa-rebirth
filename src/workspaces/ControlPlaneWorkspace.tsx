import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type ControlPlaneWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function ControlPlaneWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.CONTROLPLANE", ...props }: ControlPlaneWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
