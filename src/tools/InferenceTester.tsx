import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type InferenceTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function InferenceTester(props:InferenceTesterProps) { return <ToolSurface toolId="TOOL.INFERENCE_TESTER" name="Inference Tester" {...props} />; }
