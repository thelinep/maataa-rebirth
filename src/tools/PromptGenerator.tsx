import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptGenerator(props:PromptGeneratorProps) { return <ToolSurface toolId="TOOL.PROMPT_GENERATOR" name="Prompt Generator" {...props} />; }
