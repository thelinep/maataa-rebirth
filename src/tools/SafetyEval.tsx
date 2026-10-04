import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SafetyEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SafetyEval(props:SafetyEvalProps) { return <ToolSurface toolId="TOOL.SAFETY_EVAL" name="Safety Eval" {...props} />; }
