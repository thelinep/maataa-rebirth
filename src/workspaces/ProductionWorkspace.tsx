import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type ProductionWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function ProductionWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.PRODUCTION", ...props }: ProductionWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
