import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelUsageDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelUsageDashboard(props:ModelUsageDashboardProps) { return <ToolSurface toolId="TOOL.MODEL_USAGE_DASHBOARD" name="Model Usage Dashboard" {...props} />; }
