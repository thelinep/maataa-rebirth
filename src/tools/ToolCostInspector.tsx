import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolCostInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolCostInspector(props:ToolCostInspectorProps) { return <ToolSurface toolId="TOOL.TOOL_COST_INSPECTOR" name="Tool Cost Inspector" {...props} />; }
