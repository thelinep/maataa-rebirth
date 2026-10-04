import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvalDatasetManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvalDatasetManager(props:EvalDatasetManagerProps) { return <ToolSurface toolId="TOOL.EVAL_DATASET_MANAGER" name="Eval Dataset Manager" {...props} />; }
