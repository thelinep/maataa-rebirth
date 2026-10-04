import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type OfferGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function OfferGenerator(props:OfferGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.OFFER_GENERATOR" name="Offer Generator" {...props} />; }
