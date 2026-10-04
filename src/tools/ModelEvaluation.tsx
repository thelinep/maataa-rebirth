import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelEvaluationProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelEvaluation(props:ModelEvaluationProps) { return <ToolSurface toolId="TOOL.MODEL_EVALUATION" name="Model Evaluation" {...props} />; }
