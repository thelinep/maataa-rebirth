import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvalDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvalDashboard(props:EvalDashboardProps) { return <ToolSurface toolId="TOOL.EVAL_DASHBOARD" name="Eval Dashboard" {...props} />; }
