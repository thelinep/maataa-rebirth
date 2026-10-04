import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIRewriterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIRewriter(props:AIRewriterProps) { return <ToolSurface toolId="TOOL.AI_REWRITER" name="AI Rewriter" {...props} />; }
