import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptUsageDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptUsageDashboard(props:PromptUsageDashboardProps) { return <ToolSurface toolId="TOOL.PROMPT_USAGE_DASHBOARD" name="Prompt Usage Dashboard" {...props} />; }
