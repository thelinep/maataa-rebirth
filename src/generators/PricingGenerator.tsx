import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PricingGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PricingGenerator(props:PricingGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PRICING_GENERATOR" name="Pricing Generator" {...props} />; }
