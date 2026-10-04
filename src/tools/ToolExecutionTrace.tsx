import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolExecutionTraceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolExecutionTrace(props:ToolExecutionTraceProps) { return <ToolSurface toolId="TOOL.TOOL_EXECUTION_TRACE" name="Tool Execution Trace" {...props} />; }
