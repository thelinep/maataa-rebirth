import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EventGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EventGenerator(props:EventGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EVENT_GENERATOR" name="Event Generator" {...props} />; }
