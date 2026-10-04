import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AnimaticGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AnimaticGenerator(props:AnimaticGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ANIMATIC_GENERATOR" name="Animatic Generator" {...props} />; }
