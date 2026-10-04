import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptChainBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptChainBuilder(props:PromptChainBuilderProps) { return <ToolSurface toolId="TOOL.PROMPT_CHAIN_BUILDER" name="Prompt Chain Builder" {...props} />; }
