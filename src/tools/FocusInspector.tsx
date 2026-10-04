import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FocusInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FocusInspector(props:FocusInspectorProps) { return <ToolSurface toolId="TOOL.FOCUS_INSPECTOR" name="Focus Inspector" {...props} />; }
