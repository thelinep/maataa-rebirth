import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolBuilder(props:ToolBuilderProps) { return <ToolSurface toolId="TOOL.TOOL_BUILDER" name="Tool Builder" {...props} />; }
