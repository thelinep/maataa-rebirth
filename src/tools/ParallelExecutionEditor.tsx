import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ParallelExecutionEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ParallelExecutionEditor(props:ParallelExecutionEditorProps) { return <ToolSurface toolId="TOOL.PARALLEL_EXECUTION_EDITOR" name="Parallel Execution Editor" {...props} />; }
