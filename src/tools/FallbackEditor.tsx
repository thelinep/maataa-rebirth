import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FallbackEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FallbackEditor(props:FallbackEditorProps) { return <ToolSurface toolId="TOOL.FALLBACK_EDITOR" name="Fallback Editor" {...props} />; }
