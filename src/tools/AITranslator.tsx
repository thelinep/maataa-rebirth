import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AITranslatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AITranslator(props:AITranslatorProps) { return <ToolSurface toolId="TOOL.AI_TRANSLATOR" name="AI Translator" {...props} />; }
