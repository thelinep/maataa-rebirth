import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EventPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EventPlanGenerator(props:EventPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EVENT_PLAN_GENERATOR" name="Event Plan Generator" {...props} />; }
