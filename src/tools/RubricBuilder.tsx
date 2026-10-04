import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RubricBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RubricBuilder(props:RubricBuilderProps) { return <ToolSurface toolId="TOOL.RUBRIC_BUILDER" name="Rubric Builder" {...props} />; }
