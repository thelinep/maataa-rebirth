import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ScorerBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ScorerBuilder(props:ScorerBuilderProps) { return <ToolSurface toolId="TOOL.SCORER_BUILDER" name="Scorer Builder" {...props} />; }
