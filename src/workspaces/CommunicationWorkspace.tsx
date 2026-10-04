import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type CommunicationWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function CommunicationWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.COMMUNICATION", ...props }: CommunicationWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
