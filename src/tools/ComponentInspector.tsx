import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComponentInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComponentInspector(props:ComponentInspectorProps) { return <ToolSurface toolId="TOOL.COMPONENT_INSPECTOR" name="Component Inspector" {...props} />; }
