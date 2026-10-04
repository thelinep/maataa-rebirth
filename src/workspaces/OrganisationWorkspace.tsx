import React from "react";
import { WorkspacePreset, type WorkspacePresetProps } from "./WorkspacePreset";

export type OrganisationWorkspaceProps = Omit<WorkspacePresetProps, "workspaceType"> & { workspaceType?: string };
export function OrganisationWorkspace({ workspaceType = "WORKSPACE.TEMPLATE.ORGANISATION", ...props }: OrganisationWorkspaceProps) { return <WorkspacePreset workspaceType={workspaceType} {...props} />; }
