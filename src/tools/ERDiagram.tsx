import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ERDiagramProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ERDiagram(props:ERDiagramProps) { return <ToolSurface toolId="TOOL.ER_DIAGRAM" name="ER Diagram" {...props} />; }
