import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VoiceGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VoiceGenerator(props:VoiceGeneratorProps) { return <ToolSurface toolId="TOOL.VOICE_GENERATOR" name="Voice Generator" {...props} />; }
