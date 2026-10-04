import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type TeamWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function TeamWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.TEAM", ...props }: TeamWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
