import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ChunkStrategyEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ChunkStrategyEditor(props:ChunkStrategyEditorProps) { return <ToolSurface toolId="TOOL.CHUNK_STRATEGY_EDITOR" name="Chunk Strategy Editor" {...props} />; }
