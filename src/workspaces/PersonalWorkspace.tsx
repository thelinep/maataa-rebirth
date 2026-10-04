import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type PersonalWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function PersonalWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.PERSONAL", ...props }: PersonalWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
