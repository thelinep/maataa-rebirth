import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type DatabaseWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function DatabaseWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.DATABASE", ...props }: DatabaseWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
