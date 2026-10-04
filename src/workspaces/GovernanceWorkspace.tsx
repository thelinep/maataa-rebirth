import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type GovernanceWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function GovernanceWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.GOVERNANCE", ...props }: GovernanceWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
