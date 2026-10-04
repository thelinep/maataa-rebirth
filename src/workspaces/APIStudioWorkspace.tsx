import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type APIStudioWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function APIStudioWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.APISTUDIO", ...props }: APIStudioWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
