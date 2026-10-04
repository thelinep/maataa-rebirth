import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TaskDecomposerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TaskDecomposer(props:TaskDecomposerProps) { return <ToolSurface toolId="TOOL.TASK_DECOMPOSER" name="Task Decomposer" {...props} />; }
