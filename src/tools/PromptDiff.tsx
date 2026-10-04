import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptDiffProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptDiff(props:PromptDiffProps) { return <ToolSurface toolId="TOOL.PROMPT_DIFF" name="Prompt Diff" {...props} />; }
