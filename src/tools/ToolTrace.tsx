import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolTraceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolTrace(props:ToolTraceProps) { return <ToolSurface toolId="TOOL.TOOL_TRACE" name="Tool Trace" {...props} />; }
