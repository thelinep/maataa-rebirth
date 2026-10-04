import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ChunkViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ChunkViewer(props:ChunkViewerProps) { return <ToolSurface toolId="TOOL.CHUNK_VIEWER" name="Chunk Viewer" {...props} />; }
