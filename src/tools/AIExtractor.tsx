import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIExtractorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIExtractor(props:AIExtractorProps) { return <ToolSurface toolId="TOOL.AI_EXTRACTOR" name="AI Extractor" {...props} />; }
