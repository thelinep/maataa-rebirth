import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type BookingWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function BookingWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.BOOKING", ...props }: BookingWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
