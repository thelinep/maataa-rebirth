import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ProductGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ProductGenerator(props:ProductGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PRODUCT_GENERATOR" name="Product Generator" {...props} />; }
