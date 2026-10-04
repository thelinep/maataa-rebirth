import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MusicGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MusicGenerator(props:MusicGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MUSIC_GENERATOR" name="Music Generator" {...props} />; }
