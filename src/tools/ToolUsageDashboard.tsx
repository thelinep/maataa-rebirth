import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolUsageDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolUsageDashboard(props:ToolUsageDashboardProps) { return <ToolSurface toolId="TOOL.TOOL_USAGE_DASHBOARD" name="Tool Usage Dashboard" {...props} />; }
