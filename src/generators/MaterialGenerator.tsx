import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MaterialGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MaterialGenerator(props:MaterialGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MATERIAL_GENERATOR" name="Material Generator" {...props} />; }
