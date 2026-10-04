import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextCompressorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextCompressor(props:ContextCompressorProps) { return <ToolSurface toolId="TOOL.CONTEXT_COMPRESSOR" name="Context Compressor" {...props} />; }
