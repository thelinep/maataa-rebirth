import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type CRMWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function CRMWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.CRM", ...props }: CRMWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
