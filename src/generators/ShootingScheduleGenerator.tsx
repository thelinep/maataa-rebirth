import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ShootingScheduleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ShootingScheduleGenerator(props:ShootingScheduleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SHOOTING_SCHEDULE_GENERATOR" name="Shooting Schedule Generator" {...props} />; }
