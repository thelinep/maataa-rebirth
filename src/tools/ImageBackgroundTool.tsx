import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImageBackgroundToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImageBackgroundTool(props:ImageBackgroundToolProps) { return <ToolSurface toolId="TOOL.IMAGE_BACKGROUND_TOOL" name="Image Background Tool" {...props} />; }
