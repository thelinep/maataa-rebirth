import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PatternGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PatternGenerator(props:PatternGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PATTERN_GENERATOR" name="Pattern Generator" {...props} />; }
