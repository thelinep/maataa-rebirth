import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EventContractViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EventContractViewer(props:EventContractViewerProps) { return <ToolSurface toolId="TOOL.EVENT_CONTRACT_VIEWER" name="Event Contract Viewer" {...props} />; }
