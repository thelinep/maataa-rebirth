import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolNode(props:ToolNodeProps) { return <ToolSurface toolId="TOOL.TOOL_NODE" name="Tool Node" {...props} />; }
