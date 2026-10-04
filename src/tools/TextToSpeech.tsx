import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TextToSpeechProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TextToSpeech(props:TextToSpeechProps) { return <ToolSurface toolId="TOOL.TEXT_TO_SPEECH" name="Text-to-Speech" {...props} />; }
