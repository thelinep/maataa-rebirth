import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SKUGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SKUGenerator(props:SKUGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SKU_GENERATOR" name="SKU Generator" {...props} />; }
