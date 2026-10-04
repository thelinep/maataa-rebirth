import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HallucinationDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HallucinationDashboard(props:HallucinationDashboardProps) { return <ToolSurface toolId="TOOL.HALLUCINATION_DASHBOARD" name="Hallucination Dashboard" {...props} />; }
