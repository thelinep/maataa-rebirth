import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MemoryViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MemoryViewer(props:MemoryViewerProps) { return <ToolSurface toolId="TOOL.MEMORY_VIEWER" name="Memory Viewer" {...props} />; }
