import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIWriterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIWriter(props:AIWriterProps) { return <ToolSurface toolId="TOOL.AI_WRITER" name="AI Writer" {...props} />; }
