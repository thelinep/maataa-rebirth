import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CompoundComponentGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CompoundComponentGenerator(props:CompoundComponentGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.COMPOUND_COMPONENT_GENERATOR" name="Compound Component Generator" {...props} />; }
