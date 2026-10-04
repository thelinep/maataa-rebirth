import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SpeechToTextProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SpeechToText(props:SpeechToTextProps) { return <ToolSurface toolId="TOOL.SPEECH_TO_TEXT" name="Speech-to-Text" {...props} />; }
