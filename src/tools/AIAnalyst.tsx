import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIAnalystProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIAnalyst(props:AIAnalystProps) { return <ToolSurface toolId="TOOL.AI_ANALYST" name="AI Analyst" {...props} />; }
