import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvidenceViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvidenceViewer(props:EvidenceViewerProps) { return <ToolSurface toolId="TOOL.EVIDENCE_VIEWER" name="Evidence Viewer" {...props} />; }
