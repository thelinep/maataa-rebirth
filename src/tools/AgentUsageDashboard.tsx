import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentUsageDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentUsageDashboard(props:AgentUsageDashboardProps) { return <ToolSurface toolId="TOOL.AGENT_USAGE_DASHBOARD" name="Agent Usage Dashboard" {...props} />; }
