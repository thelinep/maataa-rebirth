import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImageVariationsProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImageVariations(props:ImageVariationsProps) { return <ToolSurface toolId="TOOL.IMAGE_VARIATIONS" name="Image Variations" {...props} />; }
