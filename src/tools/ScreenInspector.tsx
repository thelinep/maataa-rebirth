import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ScreenInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ScreenInspector(props:ScreenInspectorProps) { return <ToolSurface toolId="TOOL.SCREEN_INSPECTOR" name="Screen Inspector" {...props} />; }
