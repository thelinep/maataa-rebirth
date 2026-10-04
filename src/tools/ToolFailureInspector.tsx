import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolFailureInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolFailureInspector(props:ToolFailureInspectorProps) { return <ToolSurface toolId="TOOL.TOOL_FAILURE_INSPECTOR" name="Tool Failure Inspector" {...props} />; }
