import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EventBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EventBuilder(props:EventBuilderProps) { return <ToolSurface toolId="TOOL.EVENT_BUILDER" name="Event Builder" {...props} />; }
