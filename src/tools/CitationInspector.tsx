import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CitationInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CitationInspector(props:CitationInspectorProps) { return <ToolSurface toolId="TOOL.CITATION_INSPECTOR" name="Citation Inspector" {...props} />; }
