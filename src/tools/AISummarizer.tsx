import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AISummarizerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AISummarizer(props:AISummarizerProps) { return <ToolSurface toolId="TOOL.AI_SUMMARIZER" name="AI Summarizer" {...props} />; }
