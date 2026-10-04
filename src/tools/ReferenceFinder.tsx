import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ReferenceFinderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ReferenceFinder(props:ReferenceFinderProps) { return <ToolSurface toolId="TOOL.REFERENCE_FINDER" name="Reference Finder" {...props} />; }
