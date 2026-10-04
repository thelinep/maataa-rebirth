import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AITaggerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AITagger(props:AITaggerProps) { return <ToolSurface toolId="TOOL.AI_TAGGER" name="AI Tagger" {...props} />; }
