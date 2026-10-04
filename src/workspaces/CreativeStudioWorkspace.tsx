import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type CreativeStudioWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function CreativeStudioWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.CREATIVESTUDIO", ...props }: CreativeStudioWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
