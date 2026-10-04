import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EventContractGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EventContractGenerator(props:EventContractGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EVENT_CONTRACT_GENERATOR" name="Event Contract Generator" {...props} />; }
