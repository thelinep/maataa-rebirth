import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptTemplateBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptTemplateBrowser(props:PromptTemplateBrowserProps) { return <ToolSurface toolId="TOOL.PROMPT_TEMPLATE_BROWSER" name="Prompt Template Browser" {...props} />; }
