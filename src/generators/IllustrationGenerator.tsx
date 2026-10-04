import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type IllustrationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function IllustrationGenerator(props:IllustrationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ILLUSTRATION_GENERATOR" name="Illustration Generator" {...props} />; }
