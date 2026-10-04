import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MoodboardGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MoodboardGenerator(props:MoodboardGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MOODBOARD_GENERATOR" name="Moodboard Generator" {...props} />; }
