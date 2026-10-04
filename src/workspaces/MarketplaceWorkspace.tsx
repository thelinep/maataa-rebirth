import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type MarketplaceWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function MarketplaceWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.MARKETPLACE", ...props }: MarketplaceWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
