import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvaluationRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvaluationRunner(props:EvaluationRunnerProps) { return <ToolSurface toolId="TOOL.EVALUATION_RUNNER" name="Evaluation Runner" {...props} />; }
