import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PromptTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PromptTester(props:PromptTesterProps) { return <ToolSurface toolId="TOOL.PROMPT_TESTER" name="Prompt Tester" {...props} />; }
