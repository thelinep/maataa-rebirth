import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HallucinationEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HallucinationEval(props:HallucinationEvalProps) { return <ToolSurface toolId="TOOL.HALLUCINATION_EVAL" name="Hallucination Eval" {...props} />; }
