import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ProviderGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ProviderGenerator(props:ProviderGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PROVIDER_GENERATOR" name="Provider Generator" {...props} />; }
