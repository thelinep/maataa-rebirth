import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type DeveloperWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function DeveloperWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.DEVELOPER", ...props }: DeveloperWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
