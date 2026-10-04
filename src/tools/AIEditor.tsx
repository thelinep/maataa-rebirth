import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIEditor(props:AIEditorProps) { return <ToolSurface toolId="TOOL.AI_EDITOR" name="AI Editor" {...props} />; }
