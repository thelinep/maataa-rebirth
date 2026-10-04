import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type ProductivityWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function ProductivityWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.PRODUCTIVITY", ...props }: ProductivityWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
