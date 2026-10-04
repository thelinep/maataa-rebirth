import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type GroundingEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function GroundingEval(props:GroundingEvalProps) { return <ToolSurface toolId="TOOL.GROUNDING_EVAL" name="Grounding Eval" {...props} />; }
