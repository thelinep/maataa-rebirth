import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CostEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CostEval(props:CostEvalProps) { return <ToolSurface toolId="TOOL.COST_EVAL" name="Cost Eval" {...props} />; }
