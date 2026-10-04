import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ChunkEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ChunkEditor(props:ChunkEditorProps) { return <ToolSurface toolId="TOOL.CHUNK_EDITOR" name="Chunk Editor" {...props} />; }
