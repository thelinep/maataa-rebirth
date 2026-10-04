import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelRegressionTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelRegressionTester(props:ModelRegressionTesterProps) { return <ToolSurface toolId="TOOL.MODEL_REGRESSION_TESTER" name="Model Regression Tester" {...props} />; }
