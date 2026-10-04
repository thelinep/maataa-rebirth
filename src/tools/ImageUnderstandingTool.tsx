import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImageUnderstandingToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImageUnderstandingTool(props:ImageUnderstandingToolProps) { return <ToolSurface toolId="TOOL.IMAGE_UNDERSTANDING_TOOL" name="Image Understanding Tool" {...props} />; }
