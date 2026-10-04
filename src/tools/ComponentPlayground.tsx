import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComponentPlaygroundProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComponentPlayground(props:ComponentPlaygroundProps) { return <ToolSurface toolId="TOOL.COMPONENT_PLAYGROUND" name="Component Playground" {...props} />; }
