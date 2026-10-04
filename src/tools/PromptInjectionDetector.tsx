import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptInjectionDetectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptInjectionDetector(props:PromptInjectionDetectorProps) { return <ToolSurface toolId="TOOL.PROMPT_INJECTION_DETECTOR" name="Prompt Injection Detector" {...props} />; }
