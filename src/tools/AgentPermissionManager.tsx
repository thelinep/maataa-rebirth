import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentPermissionManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentPermissionManager(props:AgentPermissionManagerProps) { return <ToolSurface toolId="TOOL.AGENT_PERMISSION_MANAGER" name="Agent Permission Manager" {...props} />; }
