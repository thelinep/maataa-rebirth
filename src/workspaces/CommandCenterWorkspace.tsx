import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type CommandCenterWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function CommandCenterWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.COMMANDCENTER", ...props }: CommandCenterWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
