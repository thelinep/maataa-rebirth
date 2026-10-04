import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextWindowViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextWindowViewer(props:ContextWindowViewerProps) { return <ToolSurface toolId="TOOL.CONTEXT_WINDOW_VIEWER" name="Context Window Viewer" {...props} />; }
