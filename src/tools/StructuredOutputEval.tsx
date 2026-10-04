import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type StructuredOutputEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function StructuredOutputEval(props:StructuredOutputEvalProps) { return <ToolSurface toolId="TOOL.STRUCTURED_OUTPUT_EVAL" name="Structured Output Eval" {...props} />; }
