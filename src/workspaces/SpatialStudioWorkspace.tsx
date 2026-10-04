import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type SpatialStudioWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function SpatialStudioWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.SPATIALSTUDIO", ...props }: SpatialStudioWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
