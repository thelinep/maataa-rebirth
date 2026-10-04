import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type DesignSystemWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function DesignSystemWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.DESIGNSYSTEM", ...props }: DesignSystemWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
