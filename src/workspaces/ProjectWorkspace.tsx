import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type ProjectWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function ProjectWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.PROJECT", ...props }: ProjectWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
