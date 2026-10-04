import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImageUpscalerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImageUpscaler(props:ImageUpscalerProps) { return <ToolSurface toolId="TOOL.IMAGE_UPSCALER" name="Image Upscaler" {...props} />; }
