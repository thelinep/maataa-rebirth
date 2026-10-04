import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type EventWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function EventWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.EVENT", ...props }: EventWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
