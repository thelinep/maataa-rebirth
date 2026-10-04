import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type GroundingInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function GroundingInspector(props:GroundingInspectorProps) { return <ToolSurface toolId="TOOL.GROUNDING_INSPECTOR" name="Grounding Inspector" {...props} />; }
