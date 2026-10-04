import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type VoiceGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function VoiceGenerator(props:VoiceGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.VOICE_GENERATOR" name="Voice Generator" {...props} />; }
