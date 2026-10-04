import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvaluationDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvaluationDashboard(props:EvaluationDashboardProps) { return <ToolSurface toolId="TOOL.EVALUATION_DASHBOARD" name="Evaluation Dashboard" {...props} />; }
