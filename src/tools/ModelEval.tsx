import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelEval(props:ModelEvalProps) { return <ToolSurface toolId="TOOL.MODEL_EVAL" name="Model Eval" {...props} />; }
