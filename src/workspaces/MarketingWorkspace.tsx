import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type MarketingWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function MarketingWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.MARKETING", ...props }: MarketingWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
