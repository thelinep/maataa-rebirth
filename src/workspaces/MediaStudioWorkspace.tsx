import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type MediaStudioWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function MediaStudioWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.MEDIASTUDIO", ...props }: MediaStudioWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
