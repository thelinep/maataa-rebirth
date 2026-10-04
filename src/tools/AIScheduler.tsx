import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AISchedulerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIScheduler(props:AISchedulerProps) { return <ToolSurface toolId="TOOL.AI_SCHEDULER" name="AI Scheduler" {...props} />; }
