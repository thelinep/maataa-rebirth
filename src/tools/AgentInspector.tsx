import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentInspector(props:AgentInspectorProps) { return <ToolSurface toolId="TOOL.AGENT_INSPECTOR" name="Agent Inspector" {...props} />; }
