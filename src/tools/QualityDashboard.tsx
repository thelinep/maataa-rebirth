import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type QualityDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function QualityDashboard(props:QualityDashboardProps) { return <ToolSurface toolId="TOOL.QUALITY_DASHBOARD" name="Quality Dashboard" {...props} />; }
