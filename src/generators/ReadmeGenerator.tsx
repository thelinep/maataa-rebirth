import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ReadmeGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ReadmeGenerator(props:ReadmeGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.README_GENERATOR" name="README Generator" {...props} />; }
