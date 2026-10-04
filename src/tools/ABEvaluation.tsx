import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ABEvaluationProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ABEvaluation(props:ABEvaluationProps) { return <ToolSurface toolId="TOOL.A_B_EVALUATION" name="A/B Evaluation" {...props} />; }
