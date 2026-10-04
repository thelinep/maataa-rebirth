import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentContextInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentContextInspector(props:AgentContextInspectorProps) { return <ToolSurface toolId="TOOL.AGENT_CONTEXT_INSPECTOR" name="Agent Context Inspector" {...props} />; }
