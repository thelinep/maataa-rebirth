import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DashboardBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DashboardBuilder(props:DashboardBuilderProps) { return <ToolSurface toolId="TOOL.DASHBOARD_BUILDER" name="Dashboard Builder" {...props} />; }
