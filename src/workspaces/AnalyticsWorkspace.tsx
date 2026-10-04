import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type AnalyticsWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function AnalyticsWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.ANALYTICS", ...props }: AnalyticsWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
