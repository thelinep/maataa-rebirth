import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type PresentationWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function PresentationWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.PRESENTATION", ...props }: PresentationWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
