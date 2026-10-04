import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type GuestJourneyGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function GuestJourneyGenerator(props:GuestJourneyGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.GUEST_JOURNEY_GENERATOR" name="Guest Journey Generator" {...props} />; }
