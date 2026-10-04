import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SafetyEvaluationProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SafetyEvaluation(props:SafetyEvaluationProps) { return <ToolSurface toolId="TOOL.SAFETY_EVALUATION" name="Safety Evaluation" {...props} />; }
