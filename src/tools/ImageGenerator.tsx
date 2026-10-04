import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImageGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImageGenerator(props:ImageGeneratorProps) { return <ToolSurface toolId="TOOL.IMAGE_GENERATOR" name="Image Generator" {...props} />; }
