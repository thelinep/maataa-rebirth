import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextProvenanceViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextProvenanceViewer(props:ContextProvenanceViewerProps) { return <ToolSurface toolId="TOOL.CONTEXT_PROVENANCE_VIEWER" name="Context Provenance Viewer" {...props} />; }
