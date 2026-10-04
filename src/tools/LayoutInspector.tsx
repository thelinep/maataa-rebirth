import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LayoutInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LayoutInspector(props:LayoutInspectorProps) { return <ToolSurface toolId="TOOL.LAYOUT_INSPECTOR" name="Layout Inspector" {...props} />; }
