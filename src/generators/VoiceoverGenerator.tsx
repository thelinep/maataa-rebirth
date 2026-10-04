import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type VoiceoverGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function VoiceoverGenerator(props:VoiceoverGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.VOICEOVER_GENERATOR" name="Voiceover Generator" {...props} />; }
