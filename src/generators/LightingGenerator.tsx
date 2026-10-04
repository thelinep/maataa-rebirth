import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type LightingGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function LightingGenerator(props:LightingGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.LIGHTING_GENERATOR" name="Lighting Generator" {...props} />; }
