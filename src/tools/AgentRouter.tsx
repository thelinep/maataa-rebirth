import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentRouterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentRouter(props:AgentRouterProps) { return <ToolSurface toolId="TOOL.AGENT_ROUTER" name="Agent Router" {...props} />; }
