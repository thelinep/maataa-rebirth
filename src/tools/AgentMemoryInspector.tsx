import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentMemoryInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentMemoryInspector(props:AgentMemoryInspectorProps) { return <ToolSurface toolId="TOOL.AGENT_MEMORY_INSPECTOR" name="Agent Memory Inspector" {...props} />; }
