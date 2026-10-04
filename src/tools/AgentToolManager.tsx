import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentToolManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentToolManager(props:AgentToolManagerProps) { return <ToolSurface toolId="TOOL.AGENT_TOOL_MANAGER" name="Agent Tool Manager" {...props} />; }
