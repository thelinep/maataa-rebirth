import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type AIWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function AIWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.AI", ...props }: AIWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
