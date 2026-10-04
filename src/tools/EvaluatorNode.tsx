import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvaluatorNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvaluatorNode(props:EvaluatorNodeProps) { return <ToolSurface toolId="TOOL.EVALUATOR_NODE" name="Evaluator Node" {...props} />; }
