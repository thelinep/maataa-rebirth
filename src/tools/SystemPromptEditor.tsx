import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SystemPromptEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SystemPromptEditor(props:SystemPromptEditorProps) { return <ToolSurface toolId="TOOL.SYSTEM_PROMPT_EDITOR" name="System Prompt Editor" {...props} />; }
