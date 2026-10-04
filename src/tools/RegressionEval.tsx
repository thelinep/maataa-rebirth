import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RegressionEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RegressionEval(props:RegressionEvalProps) { return <ToolSurface toolId="TOOL.REGRESSION_EVAL" name="Regression Eval" {...props} />; }
