import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PropertyInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PropertyInspector(props:PropertyInspectorProps) { return <ToolSurface toolId="TOOL.PROPERTY_INSPECTOR" name="Property Inspector" {...props} />; }
