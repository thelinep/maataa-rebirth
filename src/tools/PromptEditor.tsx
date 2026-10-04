import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptEditor(props:PromptEditorProps) { return <ToolSurface toolId="TOOL.PROMPT_EDITOR" name="Prompt Editor" {...props} />; }
