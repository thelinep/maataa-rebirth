import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentCostInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentCostInspector(props:AgentCostInspectorProps) { return <ToolSurface toolId="TOOL.AGENT_COST_INSPECTOR" name="Agent Cost Inspector" {...props} />; }
