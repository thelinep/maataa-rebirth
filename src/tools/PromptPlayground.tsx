import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptPlaygroundProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptPlayground(props:PromptPlaygroundProps) { return <ToolSurface toolId="TOOL.PROMPT_PLAYGROUND" name="Prompt Playground" {...props} />; }
