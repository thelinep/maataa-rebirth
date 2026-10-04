import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AudioBedGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AudioBedGenerator(props:AudioBedGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.AUDIO_BED_GENERATOR" name="Audio Bed Generator" {...props} />; }
