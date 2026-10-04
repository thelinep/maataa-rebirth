import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptHistoryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptHistory(props:PromptHistoryProps) { return <ToolSurface toolId="TOOL.PROMPT_HISTORY" name="Prompt History" {...props} />; }
