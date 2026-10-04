import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ScheduleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ScheduleGenerator(props:ScheduleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SCHEDULE_GENERATOR" name="Schedule Generator" {...props} />; }
