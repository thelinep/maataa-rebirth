import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentLatencyInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentLatencyInspector(props:AgentLatencyInspectorProps) { return <ToolSurface toolId="TOOL.AGENT_LATENCY_INSPECTOR" name="Agent Latency Inspector" {...props} />; }
