import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ExecutionPlannerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ExecutionPlanner(props:ExecutionPlannerProps) { return <ToolSurface toolId="TOOL.EXECUTION_PLANNER" name="Execution Planner" {...props} />; }
