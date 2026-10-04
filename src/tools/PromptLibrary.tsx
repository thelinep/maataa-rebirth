import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptLibraryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptLibrary(props:PromptLibraryProps) { return <ToolSurface toolId="TOOL.PROMPT_LIBRARY" name="Prompt Library" {...props} />; }
