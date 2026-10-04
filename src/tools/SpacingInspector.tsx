import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SpacingInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SpacingInspector(props:SpacingInspectorProps) { return <ToolSurface toolId="TOOL.SPACING_INSPECTOR" name="Spacing Inspector" {...props} />; }
