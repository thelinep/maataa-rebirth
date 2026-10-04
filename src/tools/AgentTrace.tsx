import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentTraceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentTrace(props:AgentTraceProps) { return <ToolSurface toolId="TOOL.AGENT_TRACE" name="Agent Trace" {...props} />; }
