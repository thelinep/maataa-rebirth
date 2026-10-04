import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SpacingScaleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SpacingScaleGenerator(props:SpacingScaleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SPACING_SCALE_GENERATOR" name="Spacing Scale Generator" {...props} />; }
