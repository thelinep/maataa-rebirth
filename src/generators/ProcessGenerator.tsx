import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ProcessGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ProcessGenerator(props:ProcessGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PROCESS_GENERATOR" name="Process Generator" {...props} />; }
