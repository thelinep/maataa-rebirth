import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type TestingWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function TestingWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.TESTING", ...props }: TestingWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
