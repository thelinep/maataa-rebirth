import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIPlannerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIPlanner(props:AIPlannerProps) { return <ToolSurface toolId="TOOL.AI_PLANNER" name="AI Planner" {...props} />; }
