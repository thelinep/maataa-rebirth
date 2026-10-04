import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MarketplaceGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MarketplaceGenerator(props:MarketplaceGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MARKETPLACE_GENERATOR" name="Marketplace Generator" {...props} />; }
