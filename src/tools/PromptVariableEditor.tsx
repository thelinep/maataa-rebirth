import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptVariableEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptVariableEditor(props:PromptVariableEditorProps) { return <ToolSurface toolId="TOOL.PROMPT_VARIABLE_EDITOR" name="Prompt Variable Editor" {...props} />; }
