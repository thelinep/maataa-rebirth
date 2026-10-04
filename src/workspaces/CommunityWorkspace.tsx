import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type CommunityWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function CommunityWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.COMMUNITY", ...props }: CommunityWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
