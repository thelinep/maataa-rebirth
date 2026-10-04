import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type FloorPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function FloorPlanGenerator(props:FloorPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.FLOOR_PLAN_GENERATOR" name="Floor Plan Generator" {...props} />; }
