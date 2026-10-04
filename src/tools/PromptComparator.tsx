import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptComparatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptComparator(props:PromptComparatorProps) { return <ToolSurface toolId="TOOL.PROMPT_COMPARATOR" name="Prompt Comparator" {...props} />; }
