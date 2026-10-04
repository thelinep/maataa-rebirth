import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BrandCreativeGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BrandCreativeGenerator(props:BrandCreativeGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BRAND_CREATIVE_GENERATOR" name="Brand Creative Generator" {...props} />; }
