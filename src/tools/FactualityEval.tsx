import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FactualityEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FactualityEval(props:FactualityEvalProps) { return <ToolSurface toolId="TOOL.FACTUALITY_EVAL" name="Factuality Eval" {...props} />; }
