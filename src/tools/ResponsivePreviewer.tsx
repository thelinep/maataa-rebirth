import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ResponsivePreviewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ResponsivePreviewer(props:ResponsivePreviewerProps) { return <ToolSurface toolId="TOOL.RESPONSIVE_PREVIEWER" name="Responsive Previewer" {...props} />; }
