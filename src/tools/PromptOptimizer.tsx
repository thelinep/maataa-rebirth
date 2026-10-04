import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptOptimizerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptOptimizer(props:PromptOptimizerProps) { return <ToolSurface toolId="TOOL.PROMPT_OPTIMIZER" name="Prompt Optimizer" {...props} />; }
