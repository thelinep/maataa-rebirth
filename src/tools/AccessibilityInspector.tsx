import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AccessibilityInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AccessibilityInspector(props:AccessibilityInspectorProps) { return <ToolSurface toolId="TOOL.ACCESSIBILITY_INSPECTOR" name="Accessibility Inspector" {...props} />; }
