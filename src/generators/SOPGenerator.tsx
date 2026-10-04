import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SOPGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SOPGenerator(props:SOPGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SOP_GENERATOR" name="SOP Generator" {...props} />; }
