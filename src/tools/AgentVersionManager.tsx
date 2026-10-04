import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentVersionManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentVersionManager(props:AgentVersionManagerProps) { return <ToolSurface toolId="TOOL.AGENT_VERSION_MANAGER" name="Agent Version Manager" {...props} />; }
