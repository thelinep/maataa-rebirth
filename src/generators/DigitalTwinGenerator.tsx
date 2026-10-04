import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DigitalTwinGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DigitalTwinGenerator(props:DigitalTwinGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DIGITAL_TWIN_GENERATOR" name="Digital Twin Generator" {...props} />; }
