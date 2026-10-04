import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MultimodalPromptBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MultimodalPromptBuilder(props:MultimodalPromptBuilderProps) { return <ToolSurface toolId="TOOL.MULTIMODAL_PROMPT_BUILDER" name="Multimodal Prompt Builder" {...props} />; }
