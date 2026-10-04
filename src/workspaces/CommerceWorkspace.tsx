import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type CommerceWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function CommerceWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.COMMERCE", ...props }: CommerceWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
