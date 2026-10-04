import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RunOfShowGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RunOfShowGenerator(props:RunOfShowGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RUN_OF_SHOW_GENERATOR" name="Run-of-Show Generator" {...props} />; }
