import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RouterBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RouterBuilder(props:RouterBuilderProps) { return <ToolSurface toolId="TOOL.ROUTER_BUILDER" name="Router Builder" {...props} />; }
