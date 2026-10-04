import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type StateSliceGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function StateSliceGenerator(props:StateSliceGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.STATE_SLICE_GENERATOR" name="State Slice Generator" {...props} />; }
