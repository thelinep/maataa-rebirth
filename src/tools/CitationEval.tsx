import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CitationEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CitationEval(props:CitationEvalProps) { return <ToolSurface toolId="TOOL.CITATION_EVAL" name="Citation Eval" {...props} />; }
