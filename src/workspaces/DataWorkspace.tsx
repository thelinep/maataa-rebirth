import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type DataWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function DataWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.DATA", ...props }: DataWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
