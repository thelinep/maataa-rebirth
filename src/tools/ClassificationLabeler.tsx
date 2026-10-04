import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ClassificationLabelerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ClassificationLabeler(props:ClassificationLabelerProps) { return <ToolSurface toolId="TOOL.CLASSIFICATION_LABELER" name="Classification Labeler" {...props} />; }
