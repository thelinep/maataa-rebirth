import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type ObservabilityWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function ObservabilityWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.OBSERVABILITY", ...props }: ObservabilityWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
