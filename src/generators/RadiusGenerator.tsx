import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RadiusGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RadiusGenerator(props:RadiusGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RADIUS_GENERATOR" name="Radius Generator" {...props} />; }
