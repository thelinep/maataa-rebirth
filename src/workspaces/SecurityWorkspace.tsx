import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type SecurityWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function SecurityWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.SECURITY", ...props }: SecurityWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
