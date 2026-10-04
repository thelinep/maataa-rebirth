import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type StructuredOutputBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function StructuredOutputBuilder(props:StructuredOutputBuilderProps) { return <ToolSurface toolId="TOOL.STRUCTURED_OUTPUT_BUILDER" name="Structured Output Builder" {...props} />; }
