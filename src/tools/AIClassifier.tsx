import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIClassifierProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIClassifier(props:AIClassifierProps) { return <ToolSurface toolId="TOOL.AI_CLASSIFIER" name="AI Classifier" {...props} />; }
