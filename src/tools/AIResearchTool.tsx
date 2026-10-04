import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIResearchToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIResearchTool(props:AIResearchToolProps) { return <ToolSurface toolId="TOOL.AI_RESEARCH_TOOL" name="AI Research Tool" {...props} />; }
