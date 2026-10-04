import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TrailerGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TrailerGenerator(props:TrailerGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TRAILER_GENERATOR" name="Trailer Generator" {...props} />; }
