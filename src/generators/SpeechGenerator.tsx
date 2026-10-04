import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SpeechGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SpeechGenerator(props:SpeechGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SPEECH_GENERATOR" name="Speech Generator" {...props} />; }
