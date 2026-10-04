import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CrewPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CrewPlanGenerator(props:CrewPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CREW_PLAN_GENERATOR" name="Crew Plan Generator" {...props} />; }
