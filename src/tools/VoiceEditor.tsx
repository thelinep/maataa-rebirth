import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VoiceEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VoiceEditor(props:VoiceEditorProps) { return <ToolSurface toolId="TOOL.VOICE_EDITOR" name="Voice Editor" {...props} />; }
