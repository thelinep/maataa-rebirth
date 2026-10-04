import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RedTeamWorkspaceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RedTeamWorkspace(props:RedTeamWorkspaceProps) { return <ToolSurface toolId="TOOL.RED_TEAM_WORKSPACE" name="Red Team Workspace" {...props} />; }
