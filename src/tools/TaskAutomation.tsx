import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TaskAutomationProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TaskAutomation(props:TaskAutomationProps) { return <ToolSurface toolId="TOOL.TASK_AUTOMATION" name="Task Automation" {...props} />; }
