import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ReactGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ReactGenerator(props:ReactGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.REACT_GENERATOR" name="React Generator" {...props} />; }
