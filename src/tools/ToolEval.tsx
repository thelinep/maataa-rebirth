import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolEval(props:ToolEvalProps) { return <ToolSurface toolId="TOOL.TOOL_EVAL" name="Tool Eval" {...props} />; }
