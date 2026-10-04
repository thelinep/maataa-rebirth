import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type EducationWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function EducationWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.EDUCATION", ...props }: EducationWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
