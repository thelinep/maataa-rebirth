import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type FinanceWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function FinanceWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.FINANCE", ...props }: FinanceWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
