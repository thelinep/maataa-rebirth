import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextSummarizerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextSummarizer(props:ContextSummarizerProps) { return <ToolSurface toolId="TOOL.CONTEXT_SUMMARIZER" name="Context Summarizer" {...props} />; }
