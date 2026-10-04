import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvaluationStudioProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvaluationStudio(props:EvaluationStudioProps) { return <ToolSurface toolId="TOOL.EVALUATION_STUDIO" name="Evaluation Studio" {...props} />; }
