import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentPlaygroundProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentPlayground(props:AgentPlaygroundProps) { return <ToolSurface toolId="TOOL.AGENT_PLAYGROUND" name="Agent Playground" {...props} />; }
