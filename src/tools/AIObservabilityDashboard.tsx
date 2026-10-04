import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIObservabilityDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIObservabilityDashboard(props:AIObservabilityDashboardProps) { return <ToolSurface toolId="TOOL.AI_OBSERVABILITY_DASHBOARD" name="AI Observability Dashboard" {...props} />; }
