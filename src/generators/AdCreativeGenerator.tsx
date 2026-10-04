import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AdCreativeGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AdCreativeGenerator(props:AdCreativeGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.AD_CREATIVE_GENERATOR" name="Ad Creative Generator" {...props} />; }
