import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptEvaluatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptEvaluator(props:PromptEvaluatorProps) { return <ToolSurface toolId="TOOL.PROMPT_EVALUATOR" name="Prompt Evaluator" {...props} />; }
