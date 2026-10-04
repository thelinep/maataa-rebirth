import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type DocumentWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function DocumentWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.DOCUMENT", ...props }: DocumentWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
