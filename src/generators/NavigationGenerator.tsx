import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type NavigationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function NavigationGenerator(props:NavigationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.NAVIGATION_GENERATOR" name="Navigation Generator" {...props} />; }
