import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BatchEvalRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BatchEvalRunner(props:BatchEvalRunnerProps) { return <ToolSurface toolId="TOOL.BATCH_EVAL_RUNNER" name="Batch Eval Runner" {...props} />; }
