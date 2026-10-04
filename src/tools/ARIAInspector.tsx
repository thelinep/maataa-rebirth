import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ARIAInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ARIAInspector(props:ARIAInspectorProps) { return <ToolSurface toolId="TOOL.ARIA_INSPECTOR" name="ARIA Inspector" {...props} />; }
