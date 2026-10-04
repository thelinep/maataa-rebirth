import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvaluationDatasetBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvaluationDatasetBuilder(props:EvaluationDatasetBuilderProps) { return <ToolSurface toolId="TOOL.EVALUATION_DATASET_BUILDER" name="Evaluation Dataset Builder" {...props} />; }
