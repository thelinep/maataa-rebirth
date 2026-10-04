import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptEval(props:PromptEvalProps) { return <ToolSurface toolId="TOOL.PROMPT_EVAL" name="Prompt Eval" {...props} />; }
