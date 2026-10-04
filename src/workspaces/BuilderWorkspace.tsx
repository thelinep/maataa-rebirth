import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type BuilderWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function BuilderWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.BUILDER", ...props }: BuilderWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
