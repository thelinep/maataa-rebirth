import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SafetyDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SafetyDashboard(props:SafetyDashboardProps) { return <ToolSurface toolId="TOOL.SAFETY_DASHBOARD" name="Safety Dashboard" {...props} />; }
