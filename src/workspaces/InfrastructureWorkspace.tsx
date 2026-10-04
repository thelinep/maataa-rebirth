import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type InfrastructureWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function InfrastructureWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.INFRASTRUCTURE", ...props }: InfrastructureWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
