import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type StructuredOutputTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function StructuredOutputTester(props:StructuredOutputTesterProps) { return <ToolSurface toolId="TOOL.STRUCTURED_OUTPUT_TESTER" name="Structured Output Tester" {...props} />; }
