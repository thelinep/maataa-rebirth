import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type InvestmentWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function InvestmentWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.INVESTMENT", ...props }: InvestmentWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
