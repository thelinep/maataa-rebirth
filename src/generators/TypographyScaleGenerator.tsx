import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TypographyScaleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TypographyScaleGenerator(props:TypographyScaleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TYPOGRAPHY_SCALE_GENERATOR" name="Typography Scale Generator" {...props} />; }
