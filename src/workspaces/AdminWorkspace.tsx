import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type AdminWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function AdminWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.ADMIN", ...props }: AdminWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
