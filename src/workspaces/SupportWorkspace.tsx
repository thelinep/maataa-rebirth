import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type SupportWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function SupportWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.SUPPORT", ...props }: SupportWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
