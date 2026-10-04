import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AnnotationToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AnnotationTool(props:AnnotationToolProps) { return <ToolSurface toolId="TOOL.ANNOTATION_TOOL" name="Annotation Tool" {...props} />; }
