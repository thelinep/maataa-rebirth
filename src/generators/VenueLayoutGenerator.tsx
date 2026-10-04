import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type VenueLayoutGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function VenueLayoutGenerator(props:VenueLayoutGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.VENUE_LAYOUT_GENERATOR" name="Venue Layout Generator" {...props} />; }
