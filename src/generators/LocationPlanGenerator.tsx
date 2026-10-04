import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type LocationPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function LocationPlanGenerator(props:LocationPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.LOCATION_PLAN_GENERATOR" name="Location Plan Generator" {...props} />; }
