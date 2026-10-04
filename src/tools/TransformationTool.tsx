import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TransformationToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TransformationTool(props:TransformationToolProps) { return <ToolSurface toolId="TOOL.TRANSFORMATION_TOOL" name="Transformation Tool" {...props} />; }
