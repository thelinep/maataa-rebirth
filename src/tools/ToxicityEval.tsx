import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToxicityEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToxicityEval(props:ToxicityEvalProps) { return <ToolSurface toolId="TOOL.TOXICITY_EVAL" name="Toxicity Eval" {...props} />; }
