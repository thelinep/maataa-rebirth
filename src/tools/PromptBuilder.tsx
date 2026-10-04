import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptBuilder(props:PromptBuilderProps) { return <ToolSurface toolId="TOOL.PROMPT_BUILDER" name="Prompt Builder" {...props} />; }
