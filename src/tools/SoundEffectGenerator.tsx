import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SoundEffectGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SoundEffectGenerator(props:SoundEffectGeneratorProps) { return <ToolSurface toolId="TOOL.SOUND_EFFECT_GENERATOR" name="Sound Effect Generator" {...props} />; }
