import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ProvenanceViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ProvenanceViewer(props:ProvenanceViewerProps) { return <ToolSurface toolId="TOOL.PROVENANCE_VIEWER" name="Provenance Viewer" {...props} />; }
