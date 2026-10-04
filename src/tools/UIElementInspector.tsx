import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type UIElementInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function UIElementInspector(props:UIElementInspectorProps) { return <ToolSurface toolId="TOOL.UI_ELEMENT_INSPECTOR" name="UI Element Inspector" {...props} />; }
