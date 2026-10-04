import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EventExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EventExplorer(props:EventExplorerProps) { return <ToolSurface toolId="TOOL.EVENT_EXPLORER" name="Event Explorer" {...props} />; }
