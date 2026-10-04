import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PlannerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Planner(props:PlannerProps) { return <ToolSurface toolId="TOOL.PLANNER" name="Planner" {...props} />; }
