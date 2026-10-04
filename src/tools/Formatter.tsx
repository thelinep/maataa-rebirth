import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FormatterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Formatter(props:FormatterProps) { return <ToolSurface toolId="TOOL.FORMATTER" name="Formatter" {...props} />; }
