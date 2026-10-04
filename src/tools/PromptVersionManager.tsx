import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptVersionManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptVersionManager(props:PromptVersionManagerProps) { return <ToolSurface toolId="TOOL.PROMPT_VERSION_MANAGER" name="Prompt Version Manager" {...props} />; }
