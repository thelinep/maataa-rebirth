import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SequentialChainEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SequentialChainEditor(props:SequentialChainEditorProps) { return <ToolSurface toolId="TOOL.SEQUENTIAL_CHAIN_EDITOR" name="Sequential Chain Editor" {...props} />; }
