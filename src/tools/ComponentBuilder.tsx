import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComponentBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComponentBuilder(props:ComponentBuilderProps) { return <ToolSurface toolId="TOOL.COMPONENT_BUILDER" name="Component Builder" {...props} />; }
