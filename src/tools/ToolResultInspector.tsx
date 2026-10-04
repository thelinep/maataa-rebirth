import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolResultInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolResultInspector(props:ToolResultInspectorProps) { return <ToolSurface toolId="TOOL.TOOL_RESULT_INSPECTOR" name="Tool Result Inspector" {...props} />; }
