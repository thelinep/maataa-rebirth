import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FrameExtractorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FrameExtractor(props:FrameExtractorProps) { return <ToolSurface toolId="TOOL.FRAME_EXTRACTOR" name="Frame Extractor" {...props} />; }
