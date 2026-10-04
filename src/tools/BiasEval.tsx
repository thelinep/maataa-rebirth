import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BiasEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BiasEval(props:BiasEvalProps) { return <ToolSurface toolId="TOOL.BIAS_EVAL" name="Bias Eval" {...props} />; }
