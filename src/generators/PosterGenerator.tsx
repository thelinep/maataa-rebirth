import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PosterGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PosterGenerator(props:PosterGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.POSTER_GENERATOR" name="Poster Generator" {...props} />; }
